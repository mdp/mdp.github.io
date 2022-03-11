---
categories:
- featured
date: "2015-10-13T00:00:00Z"
title: CSP in Express.js
slug: csp-in-express-js-node
---

CSP in Express.js / Node
========================

This is pretty straightforward, but here’s how I implement CSP in an Express middleware layer.

A few notes:

1.  CSP statements like \`self\` and \`unsafe-eval\`need to include the single quotes in the header, so you’ll need to escape them.
2.  \`connect-src\` are your websocket endpoints
3.  You can whitelist an entire schema (eg. ‘https’), which is also a great way of prevent mixed content warnings, even if you don’t want to explicitly secure all the resources (For example in ‘styles’)
