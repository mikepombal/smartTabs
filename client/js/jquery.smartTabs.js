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

    function defineTabsVisibility($el) {
        var i, pxEmFactor, rigthEdge, $tab, rightPosition,
            showHiddenTabsButton = false;


        if ($el.find('.smartTabsTabTitle').length) {

            // to get this factor we choose an element that has a width defined in 'em'
            // (e.g. the padding right of the tab title which is '0.6em' wide)
            // and we get its value in pixels.
            pxEmFactor = parseInt($('.smartTabsTabTitle:nth-child(1)').css('padding-right'), 10) / 0.6;

            // get the value when a tab is considered hidden
            rigthEdge = $el.find('.smartTabsHeader').width();

            for (i = $el.find('.smartTabsTabTitle').length; i > 0; i -= 1) {
                $tab = $('.smartTabsTabTitle:nth-child(' + i + ')');

                // to get the right position of the tab we first get its left one
                rightPosition = $tab.position().left;
                // then we add the full width
                rightPosition += $tab.outerWidth();
                // the width does not include the :after pseudo element
                // but we know it is '1em' wide, using the factor we can get
                // the value in pixels
                rightPosition += pxEmFactor;

                if (rightPosition > rigthEdge) {
                    $tab.addClass('smartTabsHiddenTab');

                    if (!showHiddenTabsButton) {
                        showHiddenTabsButton = true;
                        // as the button is being shown we also need to count it
                        rigthEdge -= 1.7 * pxEmFactor;
                    }
                }
            }

            if (showHiddenTabsButton) {
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

    function showHiddenTabsPopup($el) {
        var $overlay;

        if (!$el.find('.smartTabsSystem > .smartTabsOverlay').length) {
            $overlay = $('<div class="smartTabsOverlay"></div>');

            $overlay.append('<div class="smartTabsPopup"></div>');

            $el.find('.smartTabsSystem').append($overlay[0].outerHTML);
        }
    }

    function initEvents($el) {
        /**
         * Events triggered when clicking on a tab title
         */
        $el.on('click', '.smartTabsTabTitle', function () {
            var $this = $(this);

            // check it the tab is not hidden
            if (!$this.hasClass('smartTabsHiddenTab')) {
                // first be sure that non of the tabs are active now
                $el.find('.smartTabsTabTitle').removeClass('smartTabsActive');
                // and all the tab contents are hidden
                $el.find('.smartTabsContent').hide();
                // put as active the cliked tab
                $this.addClass('smartTabsActive');
                // show the content of the selected tab
                $el.find('.smartTabsContent[data-tabid="' + $this.attr('id') + '"]').show();
            }

        });

        /**
         * Event triggered when clicking on the show hidden tabs button
         */
        $el.on('click', '.smartTabsShowHiddenTabs', function () {
            showHiddenTabsPopup($el);
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

        defineTabsVisibility($el);

    }

    $.fn.smartTabs = function (options) {
        var $this = $(this);

        initHtml($this);

        initEvents($this);

        createTabs($this, options || []);

    };

}(jQuery));