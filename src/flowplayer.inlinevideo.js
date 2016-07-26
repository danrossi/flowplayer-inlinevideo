/* flowplayer.inlinevideo.js
 * Inline video support for Flowplayer 6
 * This is a hack to work around limitations in all available Html5 based engines that have the inline attribute missing.
 * Injects required metadata for inline play back support on IOS Iphone. All other mobile devices ok.
 * This requires "pinning" the page to the home screen which creates a standalone WebView app.
 * This static function is based on https://github.com/aframevr/aframe/blob/master/src/core/scene/metaTags.js
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
    video = common.find("video", root)[0],
      UA = navigator.userAgent,
      isIOS = /iP(hone|od|ad)/.test(UA),
      isAndroid = /MeeGo|Android/.test(UA),
      isMobile =  isAndroid || isIOS,
      config = {
        touchIcon: null,
        iconSizes: "192x192",
        isIOS: isIOS,
        isMobile: isMobile
      };

  flowplayer.extend(config, player.conf.inline);

  //inject metadata required for inline video support.
  MetadataInjector(config);

  //if the cordova api is available enable inline video support.
  if (!!window.cordova || !!window.navigator.standalone) flowplayer.support.inlineVideo = true;

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

/**
 * Injects required metadata for inline play back support on IOS Iphone. All other mobile devices ok.
 * This requires "pinning" the page to the home screen which creates a standalone WebView app.
 * This static function is based on https://github.com/aframevr/aframe/blob/master/src/core/scene/metaTags.js
 * @param config
 * @constructor
 */
function MetadataInjector(config) {
  function inject() {
    var headEl = document.head;
    var headScriptEl = headEl.querySelector('script');
    var tag;
    var headTags = [];

    if (config.isMobile) {

      addMetaTag("viewport", 'width=device-width,initial-scale=1,maximum-scale=1,shrink-to-fit=no,user-scalable=no,minimal-ui');
      addMetaTag("mobile-web-app-capable", "yes");
      addMetaTag("theme-color", "black");
      if (!!config.touchIcon) addLinkTag("icon", config.touchIcon, config.iconSizes);



      if (config.isIOS) {
        addMetaTag("apple-mobile-web-app-capable", "yes");
        addMetaTag("apple-mobile-web-app-status-bar-style", "black-translucent");

        if (!!config.touchIcon) addLinkTag("apple-touch-icon", config.touchIcon, config.iconSizes);
      }
    }

    function exists(name) {
      return document.querySelector('meta[name="' + name + '"]');
    }

    function iconExists(rel) {
      return document.querySelector('link[rel="' + rel + '"]');
    }

    function addMetaTag(name, content) {
      if (!exists(name)) {
        var meta = document.createElement('meta');
        meta.name = name;
        meta.content = content;
        append(meta);
      }
    }

    function addLinkTag(name, icon, sizes) {
      if (!iconExists(name)) {
        var meta = document.createElement('link');
        meta.rel = name;
        meta.sizes = sizes;
        meta.href = icon;
        append(meta);
      }
    }

    function append(tag) {
      if (headScriptEl) {
        headScriptEl.parentNode.insertBefore(tag, headScriptEl);
      } else {
        headEl.appendChild(tag);
      }
    }

  }

  inject();
}
