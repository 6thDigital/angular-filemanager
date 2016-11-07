(function(window, angular, $) {
    'use strict';
    angular.module('FileManagerApp', ['pascalprecht.translate', 'ngFileUpload']);

    /**
     * jQuery inits
     */
    $(window.document).on('shown.bs.modal', '.modal', function() {
        window.setTimeout(function() {
            $('[autofocus]', this).focus();
        }.bind(this), 100);
    });

    $(window.document).on('click', function() {
        $('#ng-filemanager-context-menu').hide();
    });

    $(window.document).on('contextmenu', '.main-navigation .table-files tr.item-list:has("td"), .item-list', function(e) {
        var menu = $('#ng-filemanager-context-menu');

        function setContextMenuPostion(event, contextMenu) {

            var mousePosition = {};
            var menuPostion = {};
            var menuDimension = {};

            menuDimension.x = contextMenu.outerWidth();
            menuDimension.y = contextMenu.outerHeight();
            mousePosition.x = event.pageX;
            mousePosition.y = event.pageY;

            if (mousePosition.x + menuDimension.x > $(window).width() + $(window).scrollLeft()) {
                menuPostion.x = mousePosition.x - menuDimension.x;
            } else {
                menuPostion.x = mousePosition.x;
            }

            if (mousePosition.y + menuDimension.y > $(window).height() + $(window).scrollTop()) {
                menuPostion.y = mousePosition.y - menuDimension.y;
            } else {
                menuPostion.y = mousePosition.y;
            }

            return menuPostion;
        }

        var pos = setContextMenuPostion(e, menu);

        menu.hide().css({
          // display: 'block',
          left: pos.x,
          top: pos.y,
          position: 'absolute'
        }).appendTo('body').show();
        e.preventDefault();
    });

    if (! Array.prototype.find) {
        Array.prototype.find = function(predicate) {
            if (this == null) {
                throw new TypeError('Array.prototype.find called on null or undefined');
            }
            if (typeof predicate !== 'function') {
                throw new TypeError('predicate must be a function');
            }
            var list = Object(this);
            var length = list.length >>> 0;
            var thisArg = arguments[1];
            var value;

            for (var i = 0; i < length; i++) {
                value = list[i];
                if (predicate.call(thisArg, value, i, list)) {
                    return value;
                }
            }
            return undefined;
        };
    }
 
})(window, angular, jQuery);
