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

    // window.saveAs
    // Shims the saveAs method, using saveBlob in IE10. 
    // And for when Chrome and FireFox get round to implementing saveAs we have their vendor prefixes ready. 
    // But otherwise this creates a object URL resource and opens it on an anchor tag which contains the "download" attribute (Chrome)
    // ... or opens it in a new tab (FireFox)
    // @author Andrew Dodson
    // @copyright MIT, BSD. Free to clone, modify and distribute for commercial and personal use.

    window.saveAs || ( window.saveAs = (window.navigator.msSaveBlob ? function(b,n){ return window.navigator.msSaveBlob(b,n); } : false) || window.webkitSaveAs || window.mozSaveAs || window.msSaveAs || (function(){

        // URL's
        window.URL || (window.URL = window.webkitURL);

        if(!window.URL){
            return false;
        }

        return function(blob,name){
            var url = URL.createObjectURL(blob);

            // Test for download link support
            if( 'download' in document.createElement('a') ){

                var a = document.createElement('a');
                a.setAttribute('href', url);
                a.setAttribute('download', name);

                // Create Click event
                var clickEvent = document.createEvent ('MouseEvent');
                clickEvent.initMouseEvent ('click', true, true, window, 0, 
                    event.screenX, event.screenY, event.clientX, event.clientY, 
                    event.ctrlKey, event.altKey, event.shiftKey, event.metaKey, 
                    0, null);

                // dispatch click event to simulate download
                a.dispatchEvent (clickEvent);

            }
            else{
                // fallover, open resource in new tab.
                window.open(url, '_blank', '');
            }
        };

    })() );
 
})(window, angular, jQuery);
