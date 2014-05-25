'use strict';

/**
 * Wraps the
 * @param text {string} haystack to search through
 * @param search {string} needle to search for
 * @param [caseSensitive] {boolean} optional boolean to use case-sensitive searching
 */
angular.module('filters', [])
    .filter('highlight', function() {
        return function(text, search, caseSensitive) {
            if (text && (search || angular.isNumber(search))) {
                text = text.toString();
                search = search.toString();
                if (caseSensitive) {
                    return text.split(search).join('<span class="highlighted">' + search + '</span>');
                } else {
                    return text.replace(new RegExp(search, 'gi'), '<span class="highlighted">$&</span>');
                }
            } else {
                return text;
            }
        };
    })
    .filter('to_trusted', ['$sce',
        function($sce) {
            return function(text) {
                return $sce.trustAsHtml(text);
            };
        }
    ]);