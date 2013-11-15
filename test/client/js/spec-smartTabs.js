/*global jQuery, describe, it, beforeEach, afterEach, before, after*/

(function ($) {
    'use strict';

    describe('smartTabs', function () {
        before(function () {
            $('body').append('<script id="template1" type="text/template">Template 1</script>');
            $('body').append('<script id="template2" type="text/template">Template 2</script>');
            $('body').append('<script id="template3" type="text/template">Template 3</script>');
        });
        after(function () {
            $('#template1').remove();
            $('#template2').remove();
            $('#template3').remove();
        });

        describe('Basic', function () {
            it('Should exist a jQuery plugin called smartTabs', function () {
                $.fn.smartTabs.should.be.a('function');
            });
        });

        describe('DOM structure', function () {
            beforeEach(function () {
                $('body').append('<div class="myTestDiv"><div>');
            });
            afterEach(function () {
                $('.myTestDiv').remove();
            });


            it('Should create a div element with the css class smartTabsSystem', function () {
                $('.myTestDiv').smartTabs();

                $('.myTestDiv > div.smartTabsSystem').should.have.length(1);
            });
            it('Should create a div element with the css class smartTabsHeader children of smartTabsSystem', function () {
                $('.myTestDiv').smartTabs();

                $('.smartTabsSystem > div.smartTabsHeader').should.have.length(1);
            });
            it('Should create a ul element with the css class smartTabsList children of smartTabsHeader', function () {
                $('.myTestDiv').smartTabs();

                $('.smartTabsHeader > ul.smartTabsList').should.have.length(1);
            });
            it('Should create a div element with the css class smartTabsBody children of smartTabsSystem', function () {
                $('.myTestDiv').smartTabs();

                $('.smartTabsSystem > div.smartTabsBody').should.have.length(1);
            });


            it('Should create li elements', function () {
                /**
                 * For every elements coming in the arguments
                 * a li element should be created with the class name smartTabsTabTitle
                 * children of smartTabsList and contain the title
                 * 
                 */
                var options = [
                    { title: 'Tab 1' },
                    { title: 'Tab 2' },
                    { title: 'Tab 3' },
                    { title: 'Tab 4' }
                ];

                $('.myTestDiv').smartTabs(options);


                $('.smartTabsList > li.smartTabsTabTitle').should.have.length(4);
                $('.smartTabsTabTitle:nth-child(1)').text().should.equal('Tab 1');
                $('.smartTabsTabTitle:nth-child(2)').text().should.equal('Tab 2');
                $('.smartTabsTabTitle:nth-child(3)').text().should.equal('Tab 3');
                $('.smartTabsTabTitle:nth-child(4)').text().should.equal('Tab 4');
            });

            it('Should populate the content of the tab', function () {
                /**
                 * For every tab it should populate its content using the templete ID,
                 * the content element should have the class smartTabsContent
                 * children of smartTabsBody
                 */
                var options = [
                    { title: 'Tab 1', templateId: 'template1' },
                    { title: 'Tab 2', templateId: 'template2' },
                    { title: 'Tab 3', templateId: 'template3' }
                ];

                $('.myTestDiv').smartTabs(options);

                $('.smartTabsBody > div.smartTabsContent').should.have.length(3);
                $('.smartTabsContent:nth-child(1)').html().should.equal($('#template1').html());
                $('.smartTabsContent:nth-child(2)').html().should.equal($('#template2').html());
                $('.smartTabsContent:nth-child(3)').html().should.equal($('#template3').html());

            });

            it('should define the first tab as active', function () {
                /**
                 * The tab being active should get the smartTabsActive css class
                 */

                var options = [
                    { title: 'Tab 1' },
                    { title: 'Tab 2' },
                    { title: 'Tab 3' }
                ];

                $('.myTestDiv').smartTabs(options);

                $('.myTestDiv .smartTabsActive').should.have.length(1);
                $('.smartTabsTabTitle:nth-child(1).smartTabsActive').should.have.length(1);

            });

            it('should allow selecting tabs', function () {
                var options = [
                    { title: 'Tab 1' },
                    { title: 'Tab 2' },
                    { title: 'Tab 3' }
                ];

                $('.myTestDiv').smartTabs(options);

                $('.smartTabsTabTitle:nth-child(3)').click();
                $('.smartTabsTabTitle:nth-child(3).smartTabsActive').should.have.length(1);
                $('.smartTabsTabTitle:nth-child(1)').click();
                $('.smartTabsTabTitle:nth-child(1).smartTabsActive').should.have.length(1);
            });

            it('should only show the content of the selected tab', function () {
                var options = [
                    { title: 'Tab 1', templateId: 'template1' },
                    { title: 'Tab 2', templateId: 'template2' },
                    { title: 'Tab 3', templateId: 'template3' }
                ];

                $('.myTestDiv').smartTabs(options);

                // initially only the content of the first tab should be shown
                $('.smartTabsContent:nth-child(1)').is(':visible').should.equal(true);
                $('.smartTabsContent:nth-child(2)').is(':visible').should.equal(false);
                $('.smartTabsContent:nth-child(3)').is(':visible').should.equal(false);
                // now select the 3rd tab and only its content should be shown
                $('.smartTabsTabTitle:nth-child(3)').click();
                $('.smartTabsContent:nth-child(1)').is(':visible').should.equal(false);
                $('.smartTabsContent:nth-child(2)').is(':visible').should.equal(false);
                $('.smartTabsContent:nth-child(3)').is(':visible').should.equal(true);
            });

            it('should have all the tabs in the same top position', function () {
                var topPosition, options = [
                    { title: 'Tab 1 with a long name', templateId: 'template1' },
                    { title: 'Tab 2 with a long name', templateId: 'template2' },
                    { title: 'Tab 3 with a long name', templateId: 'template3' }
                ];

                // turn the width of the div very small
                $('.myTestDiv').width('20em');
                $('.myTestDiv').smartTabs(options);

                topPosition = $('.smartTabsTabTitle:nth-child(1)').position().top;
                $('.smartTabsTabTitle:nth-child(2)').position().top.should.equal(topPosition);
                $('.smartTabsTabTitle:nth-child(3)').position().top.should.equal(topPosition);
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

        });

        describe('Concurrency', function () {
            beforeEach(function () {
                $('body').append('<div class="myTestDiv1"></div><div class="myTestDiv2"></div>');
            });
            afterEach(function () {
                $('.myTestDiv1').remove();
                $('.myTestDiv2').remove();
            });

            it('should allow create more than one instance of smartTabs', function () {
                var options1 = [
                        { title: 'Tab 1' },
                        { title: 'Tab 2' }
                    ],
                    options2 = [
                        { title: 'Tab 3' },
                        { title: 'Tab 4' },
                        { title: 'Tab 5' }
                    ];

                $('.myTestDiv1').smartTabs(options1);
                $('.myTestDiv2').smartTabs(options2);


                $('.myTestDiv1 .smartTabsTabTitle').should.have.length(2);
                $('.myTestDiv2 .smartTabsTabTitle').should.have.length(3);
                $('.myTestDiv1 .smartTabsTabTitle:nth-child(1)').text().should.equal('Tab 1');
                $('.myTestDiv2 .smartTabsTabTitle:nth-child(2)').text().should.equal('Tab 4');
            });
        });

    });
}(jQuery));
