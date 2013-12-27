/*global jQuery*/

(function ($) {
    'use strict';

    var methods,
        tabIdCounter = 0,
        // default values
        defaults = {
            // the list of tab objects the control contains
            listTabs: [],
            // by default all the tabs cannot be removed
            areCloseable: false
        };

    //////////////////////
    // helper functions //
    //////////////////////

    /**
     * Defines a unique tabId
     * @return {String} The tab id
     */
    function getTabId() {
        tabIdCounter += 1;
        return 'smartTabs-tab' + tabIdCounter;
    }

    /**
     * Defines the html of the button to show the list of hidden tabs
     * @return {String} The html string
     */
    function getHiddenTabsButtonHtml() {
        var $button = $('<div class="smartTabsShowHiddenTabs"></div>');

        $button.append('<div></div>');
        $button.hide();

        return $button[0].outerHTML;
    }

    /**
     * Defines the ratio em -> px
     * @param  {Object} $el The jQuery object of the current instance
     * @return {Number}     The factor is simply the font size used by the instance
     */
    function getPxEmFactor($el) {
        // the em to px factor is simply the font-size
        return parseInt($el.css('font-size'), 10);
    }

    /**
     * For every tab defines if its visibility type depending of its position
     * @param  {Object} $el The jQuery object of the current instance
     */
    function defineTabsVisibility($el) {
        var i, pxEmFactor, rigthEdge, $tab, rightPosition,
            showHiddenTabsButton = false;


        if ($el.find('.smartTabsTabTitle').length) {

            pxEmFactor = getPxEmFactor($el);

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
                } else {
                    $tab.removeClass('smartTabsHiddenTab');
                }
            }

            if (showHiddenTabsButton) {
                $el.find('.smartTabsShowHiddenTabs').show();
            } else {
                $el.find('.smartTabsShowHiddenTabs').hide();
            }
        }
    }

    /**
     * Define the HTML base of the plugin
     * @param  {Object} $el The jQuery object of the current instance
     */
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
        // add a div to hide the shaddow of the active tab
        $tabSystem.find('.smartTabsHeader').append('<div class="smartTabsHideActiveShadow"></div>');

        $el.append($tabSystem[0].outerHTML);
    }

    /**
     * Define the list of hidden tabs and show it in a popup
     * @param  {Object} $el The jQuery object of the current instance
     */
    function showHiddenTabsPopup($el) {
        var $overlay, $list;

        // define the list of the hidden tabs
        $list = $('<ul class="smartTabsHiddenTabsList"></ul>');
        $el.find('.smartTabsHiddenTab').each(function () {
            var $this = $(this);

            $list.append('<li data-tabid="' + $this.attr('id') + '">' + $this.text() + '</li>');
        });

        if ($el.find('.smartTabsSystem > .smartTabsOverlay').length) {
            $el.find('.smartTabsPopup').html($list[0].outerHTML);
            $el.find('.smartTabsOverlay').show();
        } else {
            $overlay = $('<div class="smartTabsOverlay"></div>');

            $overlay.append('<div class="smartTabsPopup"></div>');
            $overlay.find('.smartTabsPopup').html($list[0].outerHTML);

            $el.find('.smartTabsSystem').append($overlay[0].outerHTML);
        }

        // reveal the popup using animation
        $el.find('.smartTabsPopup').show(300);
    }

    /**
     * Give the focus to a specific tab
     * @param  {Object} $el      The jQuery object of the current instance
     * @param  {String} tabId    The tab id to give the focus to
     * @param  {Boolean} isFirst Defines if the tab has to be shown in the first position
     */
    function selectTab($el, tabId, isFirst) {
        var $tab = $el.find('.smartTabsTabTitle[id="' + tabId + '"]'),
            tabWidth;
        // check if the tab is currently hidden
        if (isFirst) {
            // get the tab width plus his left margin
            tabWidth = $tab.outerWidth() + parseInt($tab.css('margin-right'), 10);
            // hide the tab down under the body
            $tab.css('top', '2em');
            // simulate a move to the right to give space to the tab
            $el.find('.smartTabsList').animate({ 'margin-left': tabWidth }, 200, function () {
                // if so relocate it in the first position
                $tab.prependTo($el.find('.smartTabsList'));
                $el.find('.smartTabsList').css('margin-left', 0);
                // and redifined the tabs visibility
                defineTabsVisibility($el);
                // reveal the tab using animation
                $tab.animate({ 'top': 0 }, 200);
                // give the focus to the tab
                $tab.click();
            });
        }
    }

    /**
     * Remove a tab from the control
     * @param  {Object} $el  The jQuery object of the current instance
     * @param  {Object} $tab The jQuery object of the tab to be removed
     */
    function removeTab($el, $tab) {

        // If the removed tab has is active then give the focus to the first one
        // (if it is the first one being removed then give it to the following tab)
        if ($tab.hasClass('smartTabsActive')) {
            if ($tab.attr('id') === $el.find('.smartTabsTabTitle:nth-child(1)').attr('id')) {
                $el.find('.smartTabsTabTitle:nth-child(2)').click();
            } else {
                $el.find('.smartTabsTabTitle:nth-child(1)').click();
            }
        }

        // remove the content of the tab
        $el.find('.smartTabsContent[data-tabid="' + $tab.attr('id') + '"]').remove();

        // begin the animation of removing the tab title
        $tab.animate({ 'top': '2em' }, 200, function () {

            $tab.animate({ 'width': 0, 'margin-right': 0 }, 200, function () {
                $tab.remove();

                defineTabsVisibility($el);
            });
        });

    }

    /**
     * Define all the needed events
     * @param  {Object} $el The jQuery object of the current instance
     */
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

        /**
         * Event triggered when cliking on the overlay of the hidden tabs list popup
         */
        $el.on('click', '.smartTabsOverlay', function () {
            $el.find('.smartTabsOverlay').hide();
            // hide the popup itself to use animation when showing it
            $el.find('.smartTabsPopup').hide();
        });

        /**
         * Event triggered when selecting one of the hidden tabs in the popup
         */
        $el.on('click', '.smartTabsHiddenTabsList > li', function () {
            selectTab($el, $(this).data('tabid'), true);
        });

        /**
         * Event triggered when removing a tab
         */
        $el.on('click', 'i.closeable', function (e) {
            removeTab($el, $(this).parent());
            // avoid firing the select tab event
            e.stopPropagation();
        });
    }

    /**
     * Define for a tab its html of the title and the content
     * @param  {Object} tabConfig The configuration of the tab
     * @return {Array}           An array with both html (title and content) and also the tab Id
     */
    function createTab(tabConfig) {
        var $title, $content, tabId = getTabId();

        $title = $('<li class="smartTabsTabTitle"></li>');
        $title.attr('id', tabId);
        $title.text(tabConfig.title);

        $content = $('<div class="smartTabsContent"></div>');
        $content.attr('data-tabid', tabId);
        $content.html($('#' + tabConfig.templateId).html());

        // if the tab can be removed than add button to do so
        if (tabConfig.isCloseable) {
            $title.append('<i class="closeable"></i>');
        }

        if (tabConfig.isActive) {
            $title.addClass('smartTabsActive');
            $content.show();
        } else {
            $content.hide();
        }

        return {
            tabId: tabId,
            tabTitleHtml: $title[0].outerHTML,
            tabContentHtml: $content[0].outerHTML
        };
    }

    /**
     * Create a tab for every item in the list
     * @param  {Object} $el     The jQuery object of the current instance
     * @param  {Object} options The user options to use (if not defined than the default ones)
     */
    function createTabs($el, options) {
        var i,
            tab,
            htmlTitles = '',
            htmlContents = '',
            tabConfig;

        for (i = 0; i < options.listTabs.length; i += 1) {
            tabConfig = options.listTabs[i];

            if (i === 0) {
                tabConfig.isActive = true;
            }

            // define if the tab can be removed depending in both individual and global tab configuration
            if (tabConfig.isCloseable === undefined && options.areCloseable) {
                tabConfig.isCloseable = true;
            }

            tab = createTab(tabConfig);

            htmlTitles += tab.tabTitleHtml;
            htmlContents += tab.tabContentHtml;
        }

        $el.find('.smartTabsList').append(htmlTitles);
        $el.find('.smartTabsBody').append(htmlContents);

        defineTabsVisibility($el);

    }

    /**
     * Add a new tab to the list
     * @param {Object} $el       The jQuery object of the current instance
     * @param {object} tabConfig The configuration of the new tab
     */
    function addNewTab($el, tabConfig) {
        var tab = createTab(tabConfig);

        $el.find('.smartTabsList').append(tab.tabTitleHtml);
        $el.find('.smartTabsBody').append(tab.tabContentHtml);

        selectTab($el, tab.tabId, true);
    }

    /**
     * Add new tabs to the list
     * @param {Object} $el           The jQuery object of the current instance
     * @param {Array} listTabsConfig The array containing the config of each new tab
     */
    function addNewTabs($el, listTabsConfig) {
        var i;

        for (i = listTabsConfig.length - 1; i >= 0; i -= 1) {
            addNewTab($el, listTabsConfig[i]);
        }
    }

    /**
     * the methods object contains all the action that users can do with the plugin
     * @type {Object}
     */
    methods = {
        /**
         * Initialize an instance of the plugin
         * @param  {[Object]} options User configuration to overide the default one
         */
        init: function init(options) {
            var $this = $(this);

            initHtml($this);

            initEvents($this);

            createTabs($this, $.extend({}, defaults, options));
        },

        /**
         * Allow adding one tab to the list
         * @param {Object} options The configuration of the tab to be added
         */
        addTab: function addTab(tabConfig) {
            addNewTab($(this), tabConfig);
        },

        /**
         * Allow adding a list of new tabs
         * @param {Array} listTabsConfig The array containing the config of each new tab
         */
        addTabs: function addTabs(listTabsConfig) {
            addNewTabs($(this), listTabsConfig);
        }
    };

    /**
     * Plugin entry
     */
    $.fn.smartTabs = function (method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === "object" || !method) {
            return methods.init.apply(this, arguments);
        } else {
            console.log("Method "+ method + " does not exist on jQuery.smartTabs");
        }
    };

}(jQuery));