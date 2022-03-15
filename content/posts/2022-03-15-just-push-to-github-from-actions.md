---
date: 2022-03-15
categories:
- featured
title: Just push to github (or how I stopped using personal access tokens)
---

Github pages has long felt like a bit of an orphan product at Github, but it's still a useful one, and one that I find myself using for a variety of reasons (documentation, static demo pages).

Before Github actions became a thing, it was quite a chore to get something up on Github pages from a CI system like Travis. Usually you either needed to create a deploy key or use a personal access token. I have serious issues with Personal Access Tokens because although you can limit their capabilities, you can't limit their access to specific projects. This creates a situation where a personal access token used to deploy a Github Page can also be used to commit changes to any other projects I have access to as a user. This feels like a lot of risk for the benefits of being able to simply push a commit to a Github Page.

Unfortunately most of the documentation and marketplace plugins for pushing commits to Github Pages make use of the Personal Access Token. But this is no longer a requirement, and it's actually much easier to just use `actions/checkout`, which handles the authentication to the current repository (https://github.com/actions/checkout#Push-a-commit-using-the-built-in-token).

And in the interest of keeping this short and informative, here's the basic deploy action script I use to deploy this site with Hugo, but it should be adjustable with just about process where you need to push a compiled subdirectory to Github Pages.


```yaml
name: deploy-to-github-pages
on:
  push:
    branches:
      - main
jobs:
  deploy_to_gh_pages:
    runs-on: ubuntu-latest
    env:
      DEPLOY_BRANCH: main
    steps:
      - uses: actions/checkout@v3

      - name: Setup Hugo
        uses: peaceiris/actions-hugo@v2
        with:
          hugo-version: '0.91.2'
          # extended: true

      - name: Build
        run: hugo --minify

      - name: Deploy public dir
        run: |
          touch public/.nojekyll
          git config user.name github-actions
          git config user.email github-actions@github.com
          git add -f public
          git commit -m "Hugo build and deploy from Github workflows"
          git push -u origin `git subtree split --prefix public $DEPLOY_BRANCH`:refs/heads/gh-pages --force
```

### Git magic

There's some complex stuff on the last few lines, but let's break it down.

- 'public' is ignored in .gitignore, so we need to add it forcefully with the '-f' and commit the changes
- We're going split the subtree at the 'public' directory (see: [Using git subtrees to split a repository](https://lostechies.com/johnteague/2014/04/04/using-git-subtrees-to-split-a-repository/)) and get the hash.
- Then we force push the subtree hash to gh-pages on origin

