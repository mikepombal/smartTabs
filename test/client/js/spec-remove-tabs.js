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

        it('should also remove the content of the tab being removed');

        it('should allow specifying the closable status for each tab');
        it('should remove a tab from the list when clicking on its close button');
    });

}(jQuery));