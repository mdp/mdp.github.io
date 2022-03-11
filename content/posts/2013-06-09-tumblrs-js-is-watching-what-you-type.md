---
categories:
- featured
date: "2013-06-09T00:00:00Z"
tags:
- github
- evernote
title: Tumblr's shoehorned JS watches for dirty tricks
slug: tumblrs-js-is-watching-what-you-type
---

I stumbled across this the other day on Tumblr.
One of the issues with letting people render
any HTML they want on your domain is that nefarious users can render a password
field on an official looking page and capture the input from the victim.

Tumblr seems to have come up strategy to try and prevent tricked users from
entering their passwords.

View the source and you'll see that they inject the following JS on the top of every page load before
the `<html>` tag. I've beautified it and pasted it here:

```js
(function () {
    var a = translated_warning_string;
    var b = function (d) {
        d = d || window.event;
        var c = d.target || d.srcElement;
        if (c.type == "password") {
            if (confirm(a)) {
                b = function () {}
            } else {
                c.value = "";
                return false
            }
        }
    };
    if (typeof document.addEventListener != "undefined") {
        document.addEventListener("keypress", b, true)
    }
})();
```

So essentially every keypress is checked to see if it's being entered into a
password field. If it is, then the user is warned with a localized string that
this is not a Tumblr password field:

```js
<script>var translated_warning_string = 'Warning: Never enter your Tumblr password unless \u201chttps://www.tumblr.com/login\u201d\x0ais the address in your web browser.\x0a\x0aYou should also see a green \u201cTumblr, Inc.\u201d identification in the address bar.\x0a\x0aSpammers and other bad guys use fake forms to steal passwords.\x0a\x0aTumblr will never ask you to log in from a user\u2019s blog.\x0a\x0aAre you absolutely sure you want to continue?';</script>
```

Kind of a neat hack.
