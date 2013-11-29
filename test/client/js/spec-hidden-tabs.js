/*global jQuery, describe, it, beforeEach, afterEach*/
/*jslint browser:true*/

(function ($) {
    'use strict';

    describe('Hidden Tabs', function () {
        beforeEach(function () {
            $('body').append('<div class="myTestDiv"><div>');
        });
        afterEach(function () {
            $('.myTestDiv').remove();
        });

        it('should exist a div to show any hidden tab', function () {
            /**
             * This div acting as a button should be on the right on the tab header 
             */
            $('.myTestDiv').smartTabs();

            $('.smartTabsHeader > div.smartTabsShowHiddenTabs').should.have.length(1);

        });

        it('should hide the smartTabsShowHiddenTabs all the tabs can be fully shown', function () {
            var options = [
                { title: 'Tab 1' },
                { title: 'Tab 2' },
                { title: 'Tab 3' }
            ];

            $('.myTestDiv').width('100em');
            $('.myTestDiv').smartTabs(options);
            $('.smartTabsShowHiddenTabs').is(':visible').should.equal(false);
            // Check also that the button appear when it should
            $('.myTestDiv').html('');
            $('.myTestDiv').width('10em');
            $('.myTestDiv').smartTabs(options);
            $('.smartTabsShowHiddenTabs').is(':visible').should.equal(true);
        });

        it('should desactivate any hidden tab', function () {
            /**
             * We call a hidden tab any of them that are not fully visible
             * either hidden by the edge of the div container, or by the
             * button the show the hidden tabs
             */
            var rightPosition, $el, i, pxEmFactor, rigthEdge,
                options = [
                    { title: 'Tab 1' },
                    { title: 'Tab 2' },
                    { title: 'Tab 3' },
                    { title: 'Tab 4' },
                    { title: 'Tab 5' }
                ];

            $('.myTestDiv').width('22em');
            $('.myTestDiv').smartTabs(options);

            // to get this factor we choose an element that has a width defined in 'em'
            // (e.g. the padding right of the tab title which is '0.6em' wide)
            // and we get its value in pixels.
            pxEmFactor = parseInt($('.smartTabsTabTitle:nth-child(1)').css('padding-right'), 10) / 0.6;

            // get the value when a tab is considered hidden
            rigthEdge = $('.smartTabsHeader').width();
            // remove the with of the button (1.7em) if it is being shown
            if ($('.smartTabsShowHiddenTabs').is(':visible')) {
                rigthEdge -= 1.7 * pxEmFactor;
            }

            for (i = 1; i <= 5; i += 1) {
                $el = $('.smartTabsTabTitle:nth-child(' + i + ')');

                // to get the right position of the tab we first get its left one
                rightPosition = $el.position().left;
                // then we add the full width
                rightPosition += $el.outerWidth();
                // the width does not include the :after pseudo element
                // but we know it is '1em' wide, using the factor we can get
                // the value in pixels
                rightPosition += pxEmFactor;

                if (rightPosition > rigthEdge) {
                    $el.hasClass('smartTabsHiddenTab').should.equal(true);
                } else {
                    $el.hasClass('smartTabsHiddenTab').should.equal(false);
                }
            }

        });

        it('should not allow activate a hidden tab', function () {
            var options = [
                    { title: 'Tab 1' },
                    { title: 'Tab 2' },
                    { title: 'Tab 3' },
                    { title: 'Tab 4' },
                    { title: 'Tab 5' }
                ];

            $('.myTestDiv').width('22em');
            $('.myTestDiv').smartTabs(options);

            $('.smartTabsTabTitle:nth-child(4)').hasClass('smartTabsHiddenTab').should.equal(true);
            $('.smartTabsTabTitle:nth-child(4)').click();
            $('.smartTabsTabTitle:nth-child(4)').hasClass('smartTabsActive').should.equal(false);
        });

        it('should show a popup when clicking on the hidden tabs button', function () {
            /**
             * the popup should be inserted in an overlay that cover the whole div
             * where the tab system is created. It should be created only once
             * and only if needed (if user has clicked on the button at least once)
             */

            $('.myTestDiv').smartTabs();


            $('.smartTabsOverlay').should.have.length(0);
            $('.smartTabsPopup').should.have.length(0);

            $('.smartTabsShowHiddenTabs').click();

            $('.smartTabsSystem').children().should.have.length(3);
            $('.smartTabsSystem').children(':nth-child(3)').hasClass('smartTabsOverlay').should.equal(true);
            $('.smartTabsOverlay > .smartTabsPopup').should.have.length(1);

            // test that a second click wont create it again
            $('.smartTabsShowHiddenTabs').click();

            $('.smartTabsOverlay').should.have.length(1);
            $('.smartTabsPopup').should.have.length(1);
        });

        it('should hide the hidden tabs list popup if clicking outside it', function () {
            /**
             * Outside the popup but inside the smartTabs controle
             */

            $('.myTestDiv').smartTabs();

            // Show the popup (inside the overlay)
            $('.smartTabsShowHiddenTabs').click();

            $('.smartTabsOverlay').is(':visible').should.equal(true);

            // by clicking anyway on the overlay it should hide it (and so the popup as well)
            $('.smartTabsOverlay').click();

            $('.smartTabsOverlay').is(':visible').should.equal(false);
        });

        it('should list the hidden tabs when the popup shows up', function () {
            var options = [
                    { title: 'Tab 1' },
                    { title: 'Tab 2' },
                    { title: 'Tab 3' },
                    { title: 'Tab 4' },
                    { title: 'Tab 5' }
                ],
                $list,
                $tab,
                i;

            $('.myTestDiv').width('22em');
            $('.myTestDiv').smartTabs(options);

            // show the popup
            $('.smartTabsShowHiddenTabs').click();

            // check the ul element is created
            $('.smartTabsPopup > ul.smartTabsHiddenTabsList').should.have.length(1);
            $list = $('.smartTabsHiddenTabsList');

            for (i = 0; i < options.length; i += 1) {
                $tab = $('.smartTabsTabTitle:nth-child(' +  i + ')');
                if ($tab.hasClass('smartTabsHiddenTab')) {
                    $list.find('li[data-tabid="' + $tab.attr('id') + '"]').should.have.length(1);
                    $list.find('li[data-tabid="' + $tab.attr('id') + '"]').text().should.equal($tab.text());
                }
            }

        });

        it('should move the selected hidden tab to the first position', function (done) {
            var options = [
                    { title: 'Tab 1' },
                    { title: 'Tab 2' },
                    { title: 'Tab 3' },
                    { title: 'Tab 4' },
                    { title: 'Tab 5' }
                ],
                $selectedHiddenTab,
                $firstTab,
                tabId;

            $('.myTestDiv').width('22em');
            $('.myTestDiv').smartTabs(options);

            // show the popup
            $('.smartTabsShowHiddenTabs').click();

            $selectedHiddenTab = $('.smartTabsHiddenTabsList > li').first();
            // gets the tabid it is referencing
            tabId = $selectedHiddenTab.data('tabid');
            // select the first hidden tab
            $selectedHiddenTab.click();

            // wait for the animation ending
            setTimeout(function () {
                $firstTab = $('.smartTabsList li').first();
                // check the tab is at the first position
                $firstTab.attr('id').should.equal(tabId);
                // check the tab is active and not hidden anymore
                $firstTab.hasClass('smartTabsHiddenTab').should.equal(false);
                $firstTab.hasClass('smartTabsActive').should.equal(true);

                done();
            }, 500);
        });

    });

}(jQuery));