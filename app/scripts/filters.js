'use strict';

/**
 * Wraps the
 * @param text {string} haystack to search through
 * @param search {string} needle to search for
 * @param [caseSensitive] {boolean} optional boolean to use case-sensitive searching
 */
angular.module('filters', [])
    .filter('highlight', function() {
        return function(text, search) {
            if (text && (search || angular.isNumber(search))) {
                text = text.toString();
                search = search.toString();
                return text.replace(new RegExp("\\b"+search+"\\b", 'gi'), '<span class="highlighted">$&</span>');
            } else {
                return text;
            }
        };
    })
    .filter('toTrusted', ['$sce',
        function($sce) {
            return function(text) {
                return $sce.trustAsHtml(text);
            };
        }
    ]);