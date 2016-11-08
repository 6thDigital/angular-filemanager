(function(angular) {
    'use strict';
    angular.module('FileManagerApp').factory('item', ['fileManagerConfig', 'chmod', function(fileManagerConfig, Chmod) {

        var Item = function(model, path) {
            var rawModel = {
                self: model && model.self || '',
                name: model && model.name || '',
                path: path || [],
                type: model && model.type || 'file',
                size: model && parseInt(model.size || 0),
                md5: model && model.md5 || '',
                content: model && model.content || '',
                contentType: model && model.contentType || '',
                contentLanguage: model && model.contentLanguage || '',
                contentEncoding: model && model.contentEncoding || '',
                cacheControl: model && model.cacheControl || '',
                metadata: model && model.metadata || {},
                created: new Date(model && model.created),
                updated: new Date(model && model.updated),
                deleted: new Date(model && model.deleted),
                perms: new Chmod(model && model.rights),
                recursive: false,
                fullPath: function() {
                    var path = this.path.filter(Boolean);
                    return ('/' + path.join('/') + '/' + this.name).replace(/\/\//, '/');
                }
            };

            this.error = '';
            this.processing = false;

            this.model = angular.copy(rawModel);
            this.tempModel = angular.copy(rawModel);
        };

        Item.prototype.update = function() {
            angular.extend(this.model, angular.copy(this.tempModel));
        };

        Item.prototype.revert = function() {
            angular.extend(this.tempModel, angular.copy(this.model));
            this.error = '';
        };

        Item.prototype.isFolder = function() {
            return this.model.type === 'dir';
        };

        Item.prototype.isEditable = function() {
            return !this.isFolder() && fileManagerConfig.isEditableFilePattern.test(this.model.name);
        };

        Item.prototype.isImage = function() {
            return fileManagerConfig.isImageFilePattern.test(this.model.name);
        };

        Item.prototype.isCompressible = function() {
            return this.isFolder();
        };

        Item.prototype.isExtractable = function() {
            return !this.isFolder() && fileManagerConfig.isExtractableFilePattern.test(this.model.name);
        };

        Item.prototype.isSelectable = function() {
            return (this.isFolder() && fileManagerConfig.allowedActions.pickFolders) || (!this.isFolder() && fileManagerConfig.allowedActions.pickFiles);
        };

        return Item;
    }]);
})(angular);
