/*global jQuery*/

(function ($) {
    'use strict';

    var tabIdCounter = 0;

    //////////////////////
    // helper functions //
    //////////////////////

    function getTabId() {
        tabIdCounter += 1;
        return 'smartTabs-tab' + tabIdCounter;
    }

    //////////////////////
    // plugin functions //
    //////////////////////

    function getHiddenTabsButtonHtml() {
        var $button = $('<div class="smartTabsShowHiddenTabs"></div>');

        $button.append('<div></div>');
        $button.hide();

        return $button[0].outerHTML;
    }

    function defineHiddenTabsButtonVisibility($el) {
        var headerWidth = $el.find('.smartTabsHeader').width(),
            $lastChild = $el.find('.smartTabsTabTitle:nth-last-child(1)'),
            rightPosition;

        if ($lastChild.length) {
            rightPosition = $lastChild.position().left;
            rightPosition += $lastChild.outerWidth();
            rightPosition += parseInt($lastChild.css('padding-right'), 10) / 0.6;

            if (rightPosition > headerWidth) {
                $el.find('.smartTabsShowHiddenTabs').show();
            } else {
                $el.find('.smartTabsShowHiddenTabs').hide();
            }
        }
    }

    function initHtml($el) {
        var $tabSystem = $('<div class="smartTabsSystem"></div>');

        // add the header where will be all the tab titles
        $tabSystem.append('<div class="smartTabsHeader"></div>');
        // add the body that will show the content of the tabs
        $tabSystem.append('<div class="smartTabsBody"></div>');

        // add a list to the heather
        $tabSystem.find('.smartTabsHeader').append('<ul class="smartTabsList"></ul>');
        // add a div acting as a button to show the hidden tabs
        $tabSystem.find('.smartTabsHeader').append(getHiddenTabsButtonHtml());

        $el.append($tabSystem[0].outerHTML);
    }

    function initEvents($el) {
        $el.on('click', '.smartTabsTabTitle', function () {
            // first be sure that non of the tabs are active now
            $el.find('.smartTabsTabTitle').removeClass('smartTabsActive');
            // and all the tab contents are hidden
            $el.find('.smartTabsContent').hide();
            // put as active the cliked tab
            $(this).addClass('smartTabsActive');
            // show the content of the selected tab
            $el.find('.smartTabsContent[data-tabid="' + $(this).attr('id') + '"]').show();

        });
    }

    function createTabs($el, listTabs) {
        var i,
            htmlTitles = '',
            htmlContents = '',
            $title,
            $content,
            tabData,
            tabId;


        for (i = 0; i < listTabs.length; i += 1) {
            tabData = listTabs[i];
            tabId = getTabId();

            $title = $('<li class="smartTabsTabTitle"></li>');
            $title.attr('id', tabId);
            $title.text(tabData.title);

            $content = $('<div class="smartTabsContent"></div>');
            $content.attr('data-tabid', tabId);
            $content.html($('#' + tabData.templateId).html());

            if (i === 0) {
                $title.addClass('smartTabsActive');
                $content.show();
            } else {
                $content.hide();
            }

            htmlTitles += $title[0].outerHTML;
            htmlContents += $content[0].outerHTML;
        }

        $el.find('.smartTabsList').append(htmlTitles);
        $el.find('.smartTabsBody').append(htmlContents);

        defineHiddenTabsButtonVisibility($el);

    }

    $.fn.smartTabs = function (options) {
        var $this = $(this);

        initHtml($this);

        initEvents($this);

        createTabs($this, options || []);

    };

}(jQuery));