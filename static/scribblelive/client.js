'use strict';

if (typeof window.Y === 'undefined') {
  window.Y = {};
}

window.Y.ScribbleLive = function(opts) {
  var $ = window.jQuerySL;
  var scribbleLiveSDK;
  var TemplateOverride = [];
  scribbleLiveSDK = new window.SCRIBBLE.sdk.ScribbleLiveSDK({
    clientid: opts.clientid,
    apitoken: opts.apitoken,
    streamid: opts.streamid,
    onPostAddedCallback: OnPostAddedCallback,
    onPostDeletedCallback: OnPostDeletedCallback,
    onPostEditCallback: OnPostEditCallback,
    render: {
      autoRenderPosts: true,
      stickyHolder: '#scrbbl-holder-stickies',
      postHolder: '#scrbbl-holder-normal',
      paginationHolder: '#paginationHolder'
    },
    templateOverride: TemplateOverride,
    onPollCompleteCallback: OnPollCompleteCallback,
    content: {
      postsOnLoad: 50
    }
  });

  $("#btnLoadMore").on("click", function () {
    scribbleLiveSDK.loadMore();
  });

  function OnPostAddedCallback(postData) {
    //add post to dom
    if (postData.post.is.stuck) {
      $("#scrbbl-holder-stickies").prepend(postData.renderedPost);
    }
    else {
      $("#scrbbl-holder-normal").prepend(postData.renderedPost);
    }
  }

  function OnPostDeletedCallback(postData) {
    //post Deleted...
    postData.renderedPost.remove();
  }

  function OnPostEditCallback(postData) {
    //post Edit...
    var current = $("#scrbbl-post" + postData.post.id);
    current.replaceWith(postData.renderedPost);
  }

  function addPost(postData) {
  }

  function OnPollCompleteCallback(eventData) {
    //post Edit...
    var currentPage = eventData.thread.current;
    var totalPages = eventData.thread.pages;

    var pagerControl = [];
    function addPageLink(i) {
      var el = $("<a>", {text: "Page " + (i+1) + " "});
      el.on('click', function(){
        loadPage(i);
      });
      pagerControl = pagerControl.concat(el[0])
    }

    for (var i = 0; i < totalPages; i++) {
      addPageLink(i);
    }

    console.log(pagerControl);
    $("#paginationHolder").html(pagerControl);
  }

  function loadPage(pageNum) {
    $("#scrbbl-holder-normal").html("");
    scribbleLiveSDK.loadPageNumber(pageNum);
  }
}


window.Y.loadScribbleLive = function(opts) {
  var $ = window.jQuerySL;
  $(document).ready(function () {
    new window.Y.ScribbleLive(opts);
  });
}

