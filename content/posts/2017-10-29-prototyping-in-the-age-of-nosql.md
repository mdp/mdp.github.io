---
categories:
- featured
date: "2017-10-29T00:00:00Z"
title: Prototyping in the age of NoSQL
slug: prototyping-in-the-age-of-nosql
---

Prototyping in the age of NoSQL
===============================

TLDR; I love Firebase, but their database offering leaves a lot to be desired when you’re in the early stages of prototyping a new application.

I’ve recently been exploring Firebase and while I love the ability to quickly get a project up and running, it’s data storage layer leaves a lot to be desired at the prototype stage of a new project.

I’m not going to argue that non-relational data stores are ‘wrong’ or should be ‘considered harmful’. In fact it’s quite the opposite, I’ve readily put them to use in the past, especially when performance is an issue.

My concern is how they are often floated as the ideal platform to prototype on. Reasons commonly cited include:

*   They provide a simpler interface
*   Flexible data models (document stores in particular)
*   Scaling is built in

Here’s where I disagree. It’s hard to know how you’ll query and segment your data when you’re in the prototyping phase. The flexible data model seems like a blessing, but it’s got a huge caveat — **The way you organize your data will severely impact how you are able to query from it**.

On the flip-side, in an RDBMS world we have the upfront cost of deciding a schema early on, but the query language gives you a lot of flexibility when it comes to using that data. Will it be slower? Maybe. But that’s a concern for a later date.

Denormalization should be the last step
---------------------------------------

Firebase rightfully suggests that you [denormalize your data](https://firebase.google.com/docs/database/web/structure-data#fanout) in order to query it from different angles (eg. Posts by Author, a list of Authors, a list of Posts).

So you make the changes and later on realize you want the thumbnail field on Author available in the “list of Posts” view. Now you’ve got a couple issue to tackle.

*   You’ll need a migration process to query all the Authors, then get all their Posts, and update the ‘thumbnail’ field on each Post.
*   You’ll need to chase down every method where the Author document is updated and make sure it updates all the Post documents. This could be abstracted away into one call, but you’ll need to write this abstraction.

You know what’s frustrating about the above example. You had to do **all that work for a because of a view template change**. The core functionality of the app didn’t change. The fundamental data behind the app didn’t change. The only thing that changed was our designer wanted to add a thumbnail to the view.

Tradeoffs
---------

There’s no silver bullet here. Firebase gives you incredible flexibility for of having a single product where you can host and deploy your applications. The downside is that you’ll be on the hook for structuring your data in a way that works for your queries — queries that may change rapidly when you’re in the first stages of development.

As your product matures, it’s likely you’ll be able to make these decisions, and Firebase becomes a real contender.
