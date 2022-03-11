---
categories:
- featured
date: "2013-04-02T00:00:00Z"
redirect: http://markpercival.tumblr.com/post/47005466109/curl-directly-to-a-gist
tags:
- github
- gist
- curl
- nodejs
title: curl directly to a gist
---
I was messing with my Raspberry Pi via ssh tonight and wanted to quickly stash a file to gist.github.com.

One option, I can install the command line gist tool.

But wouldn’t it be nice if you could just curl the content of the file directly to Gist

```sh
  $ curl --data-binary @README.md http://cist.herokuapp.com/read.md
  #> https://gist.github.com/32d1b11087f326a9653f
```

Much better. If you want to run your own curl to gist bridge, see the code at https://github.com/mdp/cist
