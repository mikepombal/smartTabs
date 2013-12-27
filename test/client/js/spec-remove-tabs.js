/*global jQuery, describe, it, beforeEach, afterEach*/
/*jslint browser:true*/

(function ($) {
    'use strict';

    describe('Remove Tabs', function () {
        beforeEach(function () {
            $('body').append('<div class="myTestDiv"><div>');
        });
        afterEach(function () {
            $('.myTestDiv').remove();
        });

        it('should show an icon to close the tabs if needed', function () {
            /**
             * If the global configuration areCloseable is set to true
             * then all the tabs should contain an icon to close it
             */

            var options = {
                listTabs: [
                    { title: 'Tab 1' },
                    { title: 'Tab 2' },
                    { title: 'Tab 3' }
                ],
                areCloseable: true
            };

            $('.myTestDiv').smartTabs(options);

            $('.smartTabsTabTitle:nth-child(1)').html().should.contain('<i class="closeable"></i>');
            $('.smartTabsTabTitle:nth-child(2)').html().should.contain('<i class="closeable"></i>');
            $('.smartTabsTabTitle:nth-child(3)').html().should.contain('<i class="closeable"></i>');

        });

        it('should remove a tab from the list when closing it', function (done) {
            var options = {
                listTabs: [
                    { title: 'Tab 1' },
                    { title: 'Tab 2' },
                    { title: 'Tab 3' }
                ],
                areCloseable: true
            };

            $('.myTestDiv').smartTabs(options);

            $('.smartTabsTabTitle:nth-child(1)').find('.closeable').click();

            // wait for the animation ending
            setTimeout(function () {
                $('.smartTabsTabTitle').should.have.length(2);
                $('.smartTabsTabTitle:nth-child(1)').text().should.equal('Tab 2');
                $('.smartTabsTabTitle:nth-child(2)').text().should.equal('Tab 3');

                done();
            }, 500);
        });

        it('should keep the active status of a tab if it is not the one being removed', function (done) {
            var options = {
                listTabs: [
                    { title: 'Tab 1' },
                    { title: 'Tab 2' },
                    { title: 'Tab 3' }
                ],
                areCloseable: true
            };

            $('.myTestDiv').smartTabs(options);

            $('.smartTabsTabTitle:nth-child(2)').find('.closeable').click();

            // wait for the animation ending
            setTimeout(function () {
                $('.smartTabsTabTitle:nth-child(1).smartTabsActive').should.have.length(1);

                done();
            }, 500);
        });

        it('should give the focus to the first tab if it is the active tab being removed', function (done) {
            var options = {
                listTabs: [
                    { title: 'Tab 1' },
                    { title: 'Tab 2' },
                    { title: 'Tab 3' }
                ],
                areCloseable: true
            };

            $('.myTestDiv').smartTabs(options);

            $('.smartTabsTabTitle:nth-child(3)').click();
            $('.smartTabsTabTitle:nth-child(3)').find('.closeable').click();

            // wait for the animation ending
            setTimeout(function () {
                $('.smartTabsTabTitle:nth-child(1).smartTabsActive').should.have.length(1);

                done();
            }, 500);
        });

        describe('Tab content', function () {
            beforeEach(function () {
                $('body').append('<script id="template1" type="text/template">Template 1</script>');
                $('body').append('<script id="template2" type="text/template">Template 2</script>');
                $('body').append('<script id="template3" type="text/template">Template 3</script>');
            });
            afterEach(function () {
                $('#template1').remove();
                $('#template2').remove();
                $('#template3').remove();
            });


            it('should also remove the content of the tab being removed', function (done) {
                var options = {
                    listTabs: [
                        { title: 'Tab 1', templateId: 'template1' },
                        { title: 'Tab 2', templateId: 'template2' },
                        { title: 'Tab 3', templateId: 'template3' }
                    ],
                    areCloseable: true
                };

                $('.myTestDiv').smartTabs(options);

                $('.smartTabsTabTitle:nth-child(2)').find('.closeable').click();

                // wait for the animation ending
                setTimeout(function () {
                    $('.smartTabsBody > div.smartTabsContent').should.have.length(2);
                    $('.smartTabsContent:nth-child(1)').html().should.equal($('#template1').html());
                    $('.smartTabsContent:nth-child(2)').html().should.equal($('#template3').html());

                    done();
                }, 500);
            });
        });

        it('should allow specifying only one or more tabs as closeable', function () {
            /**
             * If the global configuration areCloseable is set to false (or not defined)
             * it should be possible to make one or more tabs closeable by configuring
             * the tab property isCloseable as true
             */

            var options = {
                listTabs: [
                    { title: 'Tab 1' },
                    { title: 'Tab 2', isCloseable: true },
                    { title: 'Tab 3' }
                ]
            };

            $('.myTestDiv').smartTabs(options);

            $('.smartTabsTabTitle:nth-child(1)').html().should.not.contain('<i class="closeable"></i>');
            $('.smartTabsTabTitle:nth-child(2)').html().should.contain('<i class="closeable"></i>');
            $('.smartTabsTabTitle:nth-child(3)').html().should.not.contain('<i class="closeable"></i>');

        });

        it('should allow overwriting the areCloseable property for each tab', function () {
            /**
             * If the global configuration areCloseable is set to true
             * it should be possible to make one or more tabs as not closeable by configuring
             * the tab property isCloseable as false
             */

            var options = {
                listTabs: [
                    { title: 'Tab 1' },
                    { title: 'Tab 2', isCloseable: false },
                    { title: 'Tab 3' }
                ],
                areCloseable: true
            };

            $('.myTestDiv').smartTabs(options);

            $('.smartTabsTabTitle:nth-child(1)').html().should.contain('<i class="closeable"></i>');
            $('.smartTabsTabTitle:nth-child(2)').html().should.not.contain('<i class="closeable"></i>');
            $('.smartTabsTabTitle:nth-child(3)').html().should.contain('<i class="closeable"></i>');

        });
    });

}(jQuery));