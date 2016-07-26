flowplayer.inlinevideo.js
=========================

This plugin generates a video tag with webkit-playsinline attribute support. This is required for both "pin to Home Screen" IOS WebView apps and Apache Cordova inline video playback support in IOS.

This is completely missing from all Html5 based engines. A similar hack is required for crossorigin support which is also added for convenience.

The feature detection will override an "inlineVideo" flowplayer support config for Cordova and standalone IOS WebView apps. This is needed or video is completely hidden.

Configure Cordova For Inline Video Support
==========================================

Configure the following tags to enable both inline video support and playback without user interaction (optional).

```
  <preference name="AllowInlineMediaPlayback" value="true"/>
  <preference name="MediaPlaybackRequiresUserAction" value="false"/>
  <preference name="MediaPlaybackAllowsAirPlay" value="true"/>
```

Standalone App support
======================

Special metadata tags are required to be added for both Android and IOS pinned standalone app support. This includes a link to the app icon.
If these tags are already configured then a duplicate tag will not be added.

The following will be prepended to the page

```
<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,shrink-to-fit=no,user-scalable=no,minimal-ui">

<meta name="mobile-web-app-capable" content="yes">
<meta name="theme-color" content="black">
<link rel="icon" sizes="192x192" href="/path/to/icon.png">

<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<link rel="apple-touch-icon" sizes="192x192" href="/path/to/icon.png">
```

See more:

https://developer.apple.com/library/mac/documentation/AppleApplications/Reference/SafariWebContent/ConfiguringWebApplications/ConfiguringWebApplications.html
https://developer.chrome.com/multidevice/android/installtohomescreen

Create HomeScreen app of webpage
================================

1. touch the pin icon at the bottom of Safari.
2. touch "Add to Home Screen"
3. choose a name and touch "Add"


Configuration
=============

* touchIcon - the url to the touch icon which will be used for the app icon.
* iconSizes - the icon dimensions ie. 192x192

Known Issues
============

Only Cordova apps can hide the status bar. In IOS standalone apps there is now no way to hide the statusbar even when going fullscreen video.
