cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
  {
    "id": "org.apache.cordova.geolocation.Coordinates",
    "file": "plugins/org.apache.cordova.geolocation/www/Coordinates.js",
    "pluginId": "org.apache.cordova.geolocation",
    "clobbers": [
      "Coordinates"
    ]
  },
  {
    "id": "org.apache.cordova.geolocation.PositionError",
    "file": "plugins/org.apache.cordova.geolocation/www/PositionError.js",
    "pluginId": "org.apache.cordova.geolocation",
    "clobbers": [
      "PositionError"
    ]
  },
  {
    "id": "org.apache.cordova.geolocation.Position",
    "file": "plugins/org.apache.cordova.geolocation/www/Position.js",
    "pluginId": "org.apache.cordova.geolocation",
    "clobbers": [
      "Position"
    ]
  },
  {
    "id": "org.apache.cordova.geolocation.geolocation",
    "file": "plugins/org.apache.cordova.geolocation/www/geolocation.js",
    "pluginId": "org.apache.cordova.geolocation",
    "clobbers": [
      "navigator.geolocation"
    ]
  },
  {
    "id": "onesignal-cordova-plugin.OneSignal",
    "file": "plugins/onesignal-cordova-plugin/www/OneSignal.js",
    "pluginId": "onesignal-cordova-plugin",
    "clobbers": [
      "OneSignal"
    ]
  }
];
module.exports.metadata = 
// TOP OF METADATA
{
  "cordova-plugin-whitelist": "1.3.3",
  "org.apache.cordova.geolocation": "0.3.6",
  "onesignal-cordova-plugin": "2.4.0"
};
// BOTTOM OF METADATA
});