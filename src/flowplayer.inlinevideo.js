/* flowplayer.inlinevideo.js
 * Inline video support for Flowplayer 6
 * This is a hack to work around limitations in all available Html5 based engines that have the inline attribute missing.
 * 2016-05-14
 *
 * By Daniel Rossi, Electroteque Media
 * License: X11/MIT
 *   See https://github.com/danrossi/flowplayer-inlinevideo/blob/master/LICENSE.md
 */

/*global self */
/*jslint bitwise: true, indent: 4, laxbreak: true, laxcomma: true, smarttabs: true, plusplus: true */

/*! @source https://github.com/danrossi/flowplayer-inlinevideo/blob/master/src/flowplayer.inlinevideo.js */

'use strict';

flowplayer(function(player, root) {

  var common = flowplayer.common,
    video = common.find("video", root)[0];

  //if the cordova api is available enable inline video support.
  if (!!window.cordova) flowplayer.support.inlineVideo = true;

  function setInlineVideo()  {
    if (!video) return;
    video.setAttribute("webkit-playsinline","");
  }

  /**
   * Add a video tag if not available
   */
  function addVideoTagIfMissing() {
    if (!video) {
      var videoTag = common.createElement("video", {className: "fp-engine",
        crossOrigin: "anonymous",
        'x-webkit-airplay': "allow",
        preload: player.splash ? 'none' : 'metadata',
        autoplay:  player.splash ? 'autoplay' : false,
        'webkit-playsinline': true
      });

      common.prepend(common.find(".fp-player", root)[0], videoTag);

      video = common.find("video", root)[0];
    }
  }

  addVideoTagIfMissing();
  setInlineVideo();

});
