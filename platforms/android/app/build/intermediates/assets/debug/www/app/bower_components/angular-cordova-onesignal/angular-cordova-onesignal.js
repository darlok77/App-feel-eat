(function() {
    'use strict';

    angular.module('rip.cordova.onesignal', [])

    .provider('$cordovaOneSignal', RipCordovaOnesignalProvider);

    ////////////////////

    function RipCordovaOnesignalProvider() {
        
        var config = {
            projectNumber: null,
            googleProjectNumber: '',
            autoRegister: true,
            verbose: false
        };
        
        // ===== Functions =====
        /**
         * Set One Signal project number
         * @param number string Project number
         */
        this.projectNumber = function(number) {
            config.projectNumber = number;
        };

        /**
         * Set Google Project number
         * @param number string Google project number, not shorthand slug
         */
        this.googleProjectNumber = function(number) {
            config.googleProjectNumber = number;
        };

        /**
         * Should the device automatically register for push notifications
         * @param register bool
         */
        this.autoRegister = function(register) {
            config.autoRegister = register
        };

        /**
         * Should we print debug parameters to console
         * @param value
         */
        this.verbose = function(value) {
            config.verbose = value;
        };


        // ===== Service builder =====
        this.$get = ['$log', '$q', '$rootScope', '$window',
            function($log, $q, $rootScope, $window) {
                return new RipCordovaOnesignalService($log, $q, $rootScope, $window, angular.extend({}, config))
            }
        ];
    }

    function RipCordovaOnesignalService($log, $q, $rootScope, $window, config) {

        var TAG = 'RipCordovaOnesignalService:\t';

        var svc = this;

        /** @inheritDoc */
        svc.init = Init;

        /** @inheritDoc */
        svc.registerForPushNotifications = RegisterForPushNotifications;

        /** @inheritDoc */
        svc.sendTag = SendTag;

        /** @inheritDoc */
        svc.sendTags = SendTags;

        /** @inheritDoc */
        svc.getTags = GetTags;

        /** @inheritDoc */
        svc.deleteTag = DeleteTag;

        /** @inheritDoc */
        svc.deleteTags = DeleteTags;

        /** @inheritDoc */
        svc.getIds = GetIds;

        /** @inheritDoc */
        svc.enableVibrate = EnableVibrate;

        /** @inheritDoc */
        svc.enableSound = EnableSound;

        /** @inheritDoc */
        svc.enableNotificationsWhenActive = EnableNotificationsWhenActive;

        /** @inheritDoc */
        svc.enableInAppAlertNotification = EnableInAppAlertNotification;

        /** @inheritDoc */
        svc.setSubscription = SetSubscription;

        /** @inheritDoc */
        svc.postNotification = PostNotification;

        /** @inheritDoc */
        svc.promptLocation = PromptLocation;

        /** @inheritDoc */
        svc.setLogLevel = SetLogLevel;

        return svc;

        // ===== Functions =====

        /**
         * Only required method you need to call to setup OneSignal to receive push notifications
         *
         * @return {Promise} Promise resolved on device ready
         */
        function Init() {
            var q = $q.defer();

            Debug('Trying to initialize OneSignal plugin');

            document.addEventListener('deviceready', function() {

                // Plugin exists
                if($window.plugins && $window.plugins.OneSignal) {
                    Debug('Initialized OneSignal plugin');

                    // Actual plugin call
                    $window.plugins.OneSignal.init(
                        config.projectNumber,
                        {
                            googleProjectNumber: config.googleProjectNumber,
                            autoRegister: config.autoRegister
                        },
                        function (json) {
                            Debug('Notification received: ' + json);

                            $rootScope.$broadcast('OneSignalNotification', json);
                        }
                    );

                    q.resolve();
                }

                // No plugin
                else {
                    $log.error(TAG + 'OneSignal plugin not found. Try adding it to cordova with \'cordova plugin add onesignal-cordova-plugin\'');

                    q.reject();
                }

            }, false);

            return q.promise;
        }

        /**
         * Call this when you would like to prompt an iOS user to accept push notifications with the default system prompt. Only use if you passed false to autoRegister when calling init.
         */
        function RegisterForPushNotifications() {

            // Plugin exists
            if($window.plugins && $window.plugins.OneSignal) {
                $window.plugins.OneSignal.registerForPushNotifications();
            }

        }

        /**
         * Tag a user based on an app event of your choosing so later you can create segments on onesignal.com to target these users. Recommend using sendTags over sendTag if you need to set more than one tag on a user at a time.
         *
         * @param {string} key Key of your choosing to create or update
         * @param {string} value Value to set on the key. NOTE: Passing in a blank String deletes the key, you can also call deleteTag
         */
        function SendTag(key, value) {
            if($window.plugins && $window.plugins.OneSignal) {
                $window.plugins.OneSignal.sendTag(key, value);
            }
        }

        /**
         * Tag a user based on an app event of your choosing so later you can create segments on onesignal.com to target these users
         *
         * @param {object} keyValues Key value pairs of your choosing to create or update. NOTE: Passing in a blank String as a value deletes the key, you can also call deleteTag or deleteTags
         */
        function SendTags(keyValues) {
            if($window.plugins && $window.plugins.OneSignal) {
                $window.plugins.OneSignal.sendTags(keyValues);
            }
        }

        /**
         * Retrieve a list of tags that have been set on the user from the OneSignal server
         *
         * @return {Promise}
         */
        function GetTags() {
            var q = $q.defer();

            if($window.plugins && $window.plugins.OneSignal) {
                $window.plugins.OneSignal.getTags(function(tags) {
                    Debug('Received tags: ' + tags);
                    q.resolve(tags);
                });
            }
            else {
                q.reject('OneSignal plugin not found');
            }

            return q.promise;
        }

        /**
         * Deletes a tag that was previously set on a user with sendTag or sendTags. Use deleteTags if you need to delete more than one
         *
         * @param {string} key
         */
        function DeleteTag(key) {
            if($window.plugins && $window.plugins.OneSignal) {
                $window.plugins.OneSignal.deleteTag(key);
            }
        }

        /**
         * Deletes tags that were previously set on a user with sendTag or sendTags
         *
         * @param {array} keys
         */
        function DeleteTags(keys) {
            if($window.plugins && $window.plugins.OneSignal) {
                $window.plugins.OneSignal.deleteTags(keys);
            }
        }

        /**
         * Lets you retrieve the OneSignal user id and device token. Your handler is called after the device is successfully registered with OneSignal
         *
         * @return {Promise}
         */
        function GetIds() {
            var q = $q.defer();

            if($window.plugins && $window.plugins.OneSignal) {
                $window.plugins.OneSignal.getIds(function(ids) {
                    Debug('Received ids: ' + ids);
                    q.resolve(ids);
                });
            }
            else {
                q.reject();
            }

            return q.promise;
        }

        /**
         * Only applies to Android and Amazon. You can call this from your UI from a button press for example to give your user's options for your notifications.
         *
         * By default OneSignal always vibrates the device when a notification is displayed unless the device is in a total silent mode. Passing false means that the device will only vibrate lightly when the device is in it's vibrate only mode
         *
         * @param {boolean} enable False to disable vibrate, true to re-enable it
         */
        function EnableVibrate(enable) {
            if($window.plugins && $window.plugins.OneSignal) {
                $window.plugins.OneSignal.enableVibrate(enable);
            }
        }

        /**
         * Only applies to Android and Amazon. You can call this from your UI from a button press for example to give your user's options for your notifications.
         *
         * By default OneSignal plays the system's default notification sound when the device's notification system volume is turned on. Passing false means that the device will only vibrate unless the device is set to a total silent mode.
         *
         * @param {boolean} enable False to disable sound, true to re-enable it
         */
        function EnableSound(enable) {
            if($window.plugins && $window.plugins.OneSignal) {
                $window.plugins.OneSignal.enableSound(enable);
            }
        }

        /**
         * By default this is false and notifications will not be shown when the user is in your app, instead the notificationOpenedCallback is fired. If set to true notifications will always show in the notification area and notificationOpenedCallback will not fire until the user taps on the notification.
         *
         * @param {boolean} enable
         */
        function EnableNotificationsWhenActive(enable) {
            if($window.plugins && $window.plugins.OneSignal) {
                $window.plugins.OneSignal.enableNotificationsWhenActive(enable);
            }
        }

        /**
         * By default this is false and notifications will not be shown when the user is in your app, instead the notificationOpenedCallback is fired. If set to true notifications will be shown as native alert boxes if a notification is received when the user is in your app. The notificationOpenedCallback is then fired after the alert box is closed.
         *
         * @param {boolean} enable
         */
        function EnableInAppAlertNotification(enable) {
            if($window.plugins && $window.plugins.OneSignal) {
                $window.plugins.OneSignal.enableInAppAlertNotification(enable);
            }
        }

        /**
         * You can call this method with false to opt users out of receiving all notifications through OneSignal. You can pass true later to opt users back into notifications.
         *
         * @param {boolean} enable
         */
        function SetSubscription(enable) {
            if($window.plugins && $window.plugins.OneSignal) {
                $window.plugins.OneSignal.setSubscription(enable);
            }
        }

        /**
         * Allows you to send notifications from user to user or schedule ones in the future to be delivered to the current device.
         *
         * @param {object} parameters Object of notification options, see our create notification POST call for all options. https://documentation.onesignal.com/v2.0/docs/notifications-create-notification
         * @return {Promise}
         */
        function PostNotification(parameters) {
            var q = $q.defer();

            if($window.plugins && $window.plugins.OneSignal) {
                $window.plugins.OneSignal.postNotification(parameters,
                    function(success) {
                        Debug('Notification post success: ' + success);
                        q.resolve(success);
                    }, function(error) {
                        Debug('Notification post failed: ' + error);
                        q.reject(error);
                    });
            }
            else {
                q.reject('OneSignal plugin not found');
            }

            return q.promise;
        }

        /**
         * Prompts the user for location permission to allow geotagging based on the "Location radius" filter on the OneSignal dashboard.
         */
        function PromptLocation() {
            if($window.plugins && $window.plugins.OneSignal) {
                $window.plugins.OneSignal.promptLocation();
            }
        }

        /**
         * Enable logging to help debug if you run into an issue setting up OneSignal. The logging levels are as follows: 0 = None, 1= Fatal, 2 = Errors, 3 = Warnings, 4 = Info, 5 = Debug, 6 = Verbose. The higher the value the more information is shown.
         *
         * @param {int} logLevel Sets the logging level to print the iOS Xcode log or the Android LogCat log
         * @param {int } visualLevel Sets the logging level to show as alert dialogs
         */
        function SetLogLevel(logLevel, visualLevel) {
            if($window.plugins && $window.plugins.OneSignal) {
                $window.plugins.OneSignal.setLogLevel({ logLevel: logLevel, visualLevel: visualLevel });
            }
        }

        // ===== Utils =====

        function Debug(message) {
            if(config.verbose) {
                $log.debug(TAG + message);
            }
        }
    }

})();
