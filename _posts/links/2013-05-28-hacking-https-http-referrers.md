---
layout: link
title: Hacking HTTPS -> HTTP referrers
category: featured
redirect: http://markpercival.tumblr.com/post/51560498133/hacking-https-http-referrers
tags:
- github
- gist
- curl
- nodejs
---

There was an [interesting article](http://smerity.com/articles/2013/where_did_all_the_http_referrers_go.html) today on HTML5’s solution to solving the missing referrers problem in HTTPS -> HTTP transitions. But I thought I’d describe how Twitter’s t.co ‘fixed’ the problem.

## Background

The root of this problem is that when you click any HTTP link on an HTTPS hosted page the browser will strip any referrer info.

HTML5 is now allowing you to rectify this with a ‘meta’ tag to inform the browser that your HTTPS page outbound traffic is allowed to carry the referrer information to HTTP sites. This apparently has support from the most recent releases of Chrome and Safari.

But what if you want to send the information regardless, even with an old browser. Lets look at the way Twitter solved the problem with their URL shortener service ‘t.co’.

When you click a link on Twitter, you’re actually clicking on a ‘t.co’ link which redirects you to the final URL. But it’s not performing a 302 like many other shorteners.

Unfortunately the way 302/301 redirects work is to send the originating pages referrer data along to the final destination.

For example, lets say your on ‘http://www.cnn.com’ and you click on a link to ‘http://bit.ly/1autubB’. Bit.ly will redirect you via  301 to the destination URL, and your browser will send the referrer headers containing ‘www.cnn.com’.

Unfortunately this doesn’t work on HTTPS. If you’re Twitter, and someone clicks on that Bit.ly link, the originating page is HTTPS and the destination is HTTP, so the browser will strip the referrer information from the request. And since Twitter is 100% HTTPS, this means that they would lose all credit for traffic directed to any non-HTTPS site.

## The Solution

So while Bit.ly uses a 301 to redirect users, Twitter uses a 200 and this:

    curl 'http://t.co/9CQXgns5U5'

```html
<noscript><META http-equiv="refresh" content="0;URL=http://bits.blogs.nytimes.com/2013/05/26/disruptions-at-odds-over-privacy-challenges-of-wearable-computing/"></noscript><body><a href="http://bits.blogs.nytimes.com/2013/05/26/disruptions-at-odds-over-privacy-challenges-of-wearable-computing/"></a><script>document.getElementsByTagName("a")[0].click();</script></body>
```

They’re returning a 200 and subsequent HTML page with embedded javascript that ‘clicks’ the destination URL. The browser treats this as the originating page and sends along the referrer to ‘t.co/9CQXgns5U5’. If the browser has javascript disabled, the ‘meta refresh’ tag will still redirect them (although sans referrer in most cases).

Now the NYTimes knows this came from t.co and therefore most likely from Twitter. It’s a hack, but one that results in Twitter being able to use HTTPS and not lose credit as the source of traffic.
