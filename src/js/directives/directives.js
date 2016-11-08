(function(angular) {
    'use strict';
    var app = angular.module('FileManagerApp');

    app.directive('angularFilemanager', ['$parse', 'fileManagerConfig', function($parse, fileManagerConfig) {
        return {
            restrict: 'EA',
            templateUrl: fileManagerConfig.tplPath + '/main.html'
        };
    }]);

    app.directive('ngFile', ['$parse', function($parse) {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                var model = $parse(attrs.ngFile);
                var modelSetter = model.assign;

                element.bind('change', function() {
                    scope.$apply(function() {
                        modelSetter(scope, element[0].files);
                    });
                });
            }
        };
    }]);

    app.directive('ngRightClick', ['$parse', function($parse) {
        return function(scope, element, attrs) {
            var fn = $parse(attrs.ngRightClick);
            element.bind('contextmenu', function(event) {
                scope.$apply(function() {
                    event.preventDefault();
                    fn(scope, {$event: event});
                });
            });
        };
    }]);

    // app.directive('scrolly', ['$log', function ($log) {
    //     return {
    //         restrict: 'A',
    //         link: function (scope, element, attrs) {
    //             var raw = element[0];
    //             $log.debug('loading directive');
                    
    //             element.bind('scroll', function () {
    //                 $log.debug('in scroll');
    //                 $log.debug(raw.scrollTop + raw.offsetHeight);
    //                 $log.debug(raw.scrollHeight);
    //                 if (raw.scrollTop + raw.offsetHeight > raw.scrollHeight) {
    //                     $log.debug('I am at the bottom');
    //                     scope.$apply(attrs.scrolly);
    //                 }
    //             });
    //         }
    //     };
    // }]);

    app.directive('scrolly', ['$log', function ($log) {
      return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            $log.debug('loading scrolly');
            // var fn = scope.$eval(attrs.scrolly), 
            var clientHeight = element[0].clientHeight;

            element.on('scroll', function (e) {
                var el = e.target;

                if ((el.scrollHeight - el.scrollTop) <= clientHeight) { // fully scrolled
                    $log.debug('scrolled to bottom...');
                    scope.$apply(attrs.scrolly);
                }
            });
        }

      };

    }]);
    
})(angular);
