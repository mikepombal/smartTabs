/*global jQuery*/

(function ($) {
    'use strict';

    function initHtml($el) {
        var html;

        html = '<div class="smartTabsSystem"><div class="smartTabsHeader">';
        html += '<ul class="smartTabsList"></ul></div><div class="smartTabsBody"></div></div>';

        $el.append(html);
    }

    function createTabs(listTabs) {
        var i,
            htmlTitles = '',
            htmlContents = '';

        for (i = 0; i < listTabs.length; i += 1) {
            htmlTitles += '<li class="smartTabsTabTitle">' + listTabs[i].title + '</li>';
            htmlContents += '<div class="smartTabsContent">' + $('#' + listTabs[i].templateId).html() + '</div>';
        }

        $('.smartTabsList').append(htmlTitles);
        $('.smartTabsBody').append(htmlContents);

    }

    $.fn.smartTabs = function (options) {
        var $this = $(this);

        initHtml($this);

        createTabs(options || []);

    };

}(jQuery));