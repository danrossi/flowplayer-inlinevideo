flowplayer.inlinevideo.js
=========================

This plugin generates a video tag with webkit-playsinline attribute support. This is required for Apache Cordova inline video playback support in IOS. This is completely
missing from all Html5 based engines. A similar hack is required for crossorigin support which is also added for convenience.

Configure Cordova For Inline Video Support
==========================================

Configure the following tags to enable both inline video support and playback without user interaction (optional).

```
  <preference name="AllowInlineMediaPlayback" value="true"/>
  <preference name="MediaPlaybackRequiresUserAction" value="false"/>
  <preference name="MediaPlaybackAllowsAirPlay" value="true"/>
```