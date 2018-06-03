[OneSignal API reference](https://documentation.onesignal.com/docs/cordova-api-reference)

# AngularJS Cordova OneSignal module

This is a wrapper for OneSignal plugin for Cordova. It wraps the plain js cordova plugin interface to something more angular

## Getting started

1. First you need to add [OneSignal](https://onesignal.com/) plugin to your Cordova enabled project

        cordova plugin add onesignal-cordova-plugin
        
2. Then pull this plugin from bower repository

        bower install --save angular-cordova-onesignal
        
3. Include the following file in your app

        ./bower_components/angular-cordova-onesignal/angular-cordova-onesignal.js
        
4. Add plugin dependency to your app

        angular.module('app', [
            // ...
            'rip.cordova.onesignal'
        ])
        
5. Configure the service in your config phase

        angular.module('app')
        
        .config(function($cordovaOneSignalProvider) {
            $cordovaOneSignalProvider.projectNumber('e67cf111-eq19-7bfb-890a-18bdm13m259f');    // Project number provided by OneSignal
            $cordovaOneSignalProvider.googleProjectNumber('994906666666');  // Project number provided by Google Developers
            $cordovaOneSignalProvider.verbose(true);    // This will throw debug lines to console
        })
        
6. Initialize plugin in your run phase or whenever appropriate

        angular.module('app')
        
        .run(function($cordovaOneSignal) {
            $cordovaOneSignalProvider.init()
                .then(function() {
                    // Other stuff you do after initializing, like setting tags and so on
                })
            ;
        })
        
7. You should now see the device listed in OneSignal dashboard

## Configuration options ($cordovaOneSignalProvider)

The provider provides these methods

* `$cordovaOneSignalProvider.projectNumber( string )` - sets OneSignal project number, this one is required by OneSignal API
* `$cordovaOneSignalProvider.googleProjectNumber( string )` - sets Google Project number. This is only required if you are using push notifications on Android. [See this for more info](https://documentation.onesignal.com/docs/android-generating-a-gcm-push-notification-key)
* `$cordovaOneSignalProvider.autoRegister( boolean )` - whenever to automatically register device for push notifications on `.init()`. This defaults to true and will display a prompt message on iOS.
* `$cordovaOneSignalProvider.verbose( boolean )` - whenever you want debug output to console. This defaults to false to keep your console clean, but I suggest setting this to true.

## Runtime API ($cordovaOneSignal)

You should check [OneSignal API reference](https://documentation.onesignal.com/docs/cordova-api-reference) for a complete reference.

The only differences are:

* You use `$cordovaOneSignal` instead of `window.plugins.OneSignal`
* `$cordovaOneSignal.init()` returns a promise that is resolved after `deviceready` event
* `$cordovaOneSignal.getTags()` takes no arguments and instead returns a promise that is resolved with the tags json
* `$cordovaOneSignal.getIds()` has the same treatment as getTags(), it returns a promise and is resolved with ids json
* `$cordovaOneSignal.postNotification( parameters )` takes only one argument, which is parameters and returns a response which is resolved or rejected with jsons returned by OneSignal API
* `$cordovaOneSignal.setLogLevel( logLevel, visualLevel )` takes two arguments instead of an object
