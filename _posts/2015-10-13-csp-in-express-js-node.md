---
layout: post
title: CSP in Express.js
category: featured
---

CSP in Express.js / Node
========================

[![Mark Percival](https://miro.medium.com/fit/c/56/56/0*7RjQVoSZok0VpscY.jpeg)](https://medium.com/@mdp?source=post_page-----157d040f2f00-----------------------------------)[

Mark Percival

](https://medium.com/@mdp?source=post_page-----157d040f2f00-----------------------------------)[

Oct 13, 2015·1 min read

](https://medium.com/@mdp/csp-in-express-js-node-157d040f2f00?source=post_page-----157d040f2f00-----------------------------------)

This is pretty straightforward, but here’s how I implement CSP in an Express middleware layer.

A few notes:

1.  CSP statements like \`self\` and \`unsafe-eval\`need to include the single quotes in the header, so you’ll need to escape them.
2.  \`connect-src\` are your websocket endpoints
3.  You can whitelist an entire schema (eg. ‘https’), which is also a great way of prevent mixed content warnings, even if you don’t want to explicitly secure all the resources (For example in ‘styles’)
