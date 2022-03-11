---
categories:
- featured
date: "2014-08-17T00:00:00Z"
title: Tracking the mail with a $29.99 phone
slug: how-it-got-here
---

Tracking the mail with a $29.99 phone
=====================================

Let me frank, I buy a lot of stupid stuff from the Internet. And like most people, I obsess over where it is and when it will I’ll have it in my hands. But even with today’s ubiquitous package tracking, all I really get is a list of places my package visited as it made it’s way to my doorstep. For example, I may know that it stopped in Sacramento, but I’m still left wondering what it did between there and where it originated from. Did it spend a couple days in the back of a truck on the interstate, or maybe it took a shortcut on a plane?

It’s unlikely that UPS and Fedex were going to give me the answers I wanted, so I set out to ship myself something that I could track with more accuracy. I had only two requirements — It must be cheap, and it needed to be small enough to fit into a standard (No. 10) envelope.

Tracking a package with GPS
---------------------------

It’s fairly easy to track objects with GPS ([cheating spouses](http://www.amazon.com/Tracking-Device-Finding-Cheating-Husband/dp/B008981E82), [reddit users](https://www.techdirt.com/articles/20101008/03035211331/guy-finds-fbi-tracking-device-on-car-posts-pics-online-fbi-shows-up-demanding-it-back.shtml), or [lost dogs](http://www.pettracker.com/)), but it does require a bit of specialized equipment. While GPS has made this trivial and cheap, I ran into a few issues with dropping a tracking device in the mail.

1.  By far, the biggest problem is the need for an unobstructed view of the sky. Sitting in the back of a metal truck, it’s unlikely that it would pick up a signal from the GPS satellites over head. I’m also confident that the postal employee will ignore my directions of “This side facing open sky”.
2.  Depending on the frequency of updates, the battery life on most GPS trackers is still poor. Cheaper devices barely last 48 hours, and the more expensive gear is also much heavier due to larger batteries.
3.  Let’s be honest, solving problems with off-the-shelf hardware isn’t very fun.

Android location logging
------------------------

Instead, I looked into buying a cheap Android phone and tossing it in the mail with location logging enabled. Fundamentally this works, but battery life turned out to be a deal breaker. As any Android or iPhone user will attest, most smartphones weren’t designed to go three or four days without a charge. I could attach an extended battery to the phone, but there’s still no guarantee that I’ll get 4 days out of it. Also, apparently stuffing dodgy lithium batteries in the mail is not looked upon highly by the USPS due to fire hazards.

I needed to find a way to extend battery life without increasing the size (A No. 10 envelope can’t handle much). To do that, it’s important we understand a little about how our phones determine location.

GPS is only part of the solution
================================

Many people assume location data comes solely from the GPS chips built into a phone. And sometimes it does… when it’s available. But while GPS is accurate, it’s not ideal for all the environments where we use our phones. When you’re indoors it’s difficult to get a location fix, and GPS tends to drain the battery quickly.

Augmenting GPS
--------------

The solution is to augment GPS with data from the phones surrounding environment. For example, most phones keep track of available WiFi access points, which each are uniquely identifiable via their MAC address (basically a serial number). When Google drives around our streets snapping [awkward](http://top-10-list.org/wp-content/uploads/2012/11/Public-Urination.jpg) and [indifferent](http://assets.nydailynews.com/polopoly_fs/1.1815538.1401819152!/img/httpImage/image.jpg_gen/derivatives/article_970/google-street-view-axe-murderer.jpg?enlarged) photos of us, they also log all the WiFi access points along with current GPS coordinates ([and maybe your internet traffic](http://www.engadget.com/2013/04/22/google-street-view-fine-germany/)). Google now has a huge list of local WiFi AP’s and their coordinates which they can pull from to help determine location.

Sadly, WiFi’s not entirely ubiquitous, so we need a fallback. There’s one piece of information available in nearly every part of the developed world: the ID of the nearby cellular tower. From a geolocation standpoint you can basically treat them like WiFi networks but with a few kilometers of range. Google scoops up these ID’s as well and uses them to get an very broad idea of where you are. It’s not perfect, but it’s a good sanity check for cross referencing with other location data.

Today, when your Android phone wants to know the current location, it sends a list of nearby WiFi AP’s along with the current Cell ID to Google’s location servers (_I’m sure they’re not doing anything bad with it_). Using its street view sourced database, Google hands back a location guestimate along with an accuracy score. Hand it just a Cell ID and you’ll still have some idea what part of the city you’re in, which might be enough. In my case, it’s plenty.

Burner phone to the rescue
==========================

“You prepay for it and you throw it away”

Thanks to China’s commoditization of smartphones, I found a prepaid Android phone from provider Net10 for $30 with a relatively recent version of the Android OS(4.0). Android applications have access to certain cellular radio data, which includes the Cell ID of the tower you’re connected to.

And due to FCC regulations, I didn’t even need to part with the $40 activation fee. That’s because wireless carriers must allow any phone onto their network for 911 purposes. I can’t make non-emergency calls or use data, but the phone still has access to the cellular network and it’s ID’s.

Now I had a cheap cellphone and access to the cellular network ID’s but would it last 4 days in the mail on a charge? As a long time Android user I had my doubts, but I tried simply turning off WiFi, 3G and Bluetooth and was surprised. Checking back two days later, I found that the battery had only dropped by a few percent. It turns out my Android phone lasts nearly two weeks on a single charge when running just the 2G radio and no screen use.

The Result
----------

Using my limited and unwanted Java knowledge, I wrote an Android app to log the current time and base station ID. It’s currently set to run once an hour and I’ve yet to see any measurable effect on the phone’s battery life.

After it’s made the trip, the logs are dumped and run through Google’s Location API. The resulting list of locations looks like [this](https://github.com/mdp/CellIdToGeo/blob/gh-pages/atlsfatl.json).

I sent the phone to a friend in Atlanta first, who dumped the logs, recharged the phone and shipped it back to me.

[ ![](https://miro.medium.com/max/1400/1\*kvzALID33D-YhjkMpqtdcA.png) ](http://mdp.github.io/CellIdToGeo/#atlsfatl.json) The cross-country trip my phone took

You can see [more detailed results the Github project page](http://mdp.github.io/CellIdToGeo/#atlsfatl.json).

While the results aren’t amazingly accurate, it does show the approximate path the envelope took along with the time each marker was logged. From there, it’s pretty easy to figure out the mode of transportation for each leg of the trip. As you can see from the map, the phone made a pretty quick hop over the continent in about 5 hours for both trips, direct from SFO to Atlanta’s Hartsfield Airport. Interestingly, the first trip was Priority and the second was First Class, but in both cases the route and shipping time were rougly the same.

Next Steps
----------

With nearly two weeks of battery life to play with, the next step is increasing the accuracy to street level with WiFi network logging. Adding WiFi will also give it the chance to ‘phone’ home it’s current status via open wireless networks.

Conclusion
----------

I’m honestly a bit surprised that this worked out as well as it did. It easily exceeds my requirements on both price and size, and the battery life was a unexpected bonus. I’ve included all the source code below for anyone else looking to play around with this.

Addendum
========

Resources:
----------

*   My GSM Tracking program on Github — [https://github.com/mdp/GSMTracker](https://github.com/mdp/GSMTracker)
*   The analyzer program for the logs. Looks up the Cell towers with Google and displays the results on a map — [https://github.com/mdp/CellIdToGeo](https://github.com/mdp/CellIdToGeo)
*   Wikipedia “Cell ID” — [http://en.wikipedia.org/wiki/Cell\_ID](http://en.wikipedia.org/wiki/Cell_ID)
*   Like everything on the Internet, this has been done before — [http://webmonkeyuk.wordpress.com/2012/01/26/putting-a-gps-tracker-in-the-mail/](http://webmonkeyuk.wordpress.com/2012/01/26/putting-a-gps-tracker-in-the-mail/)
