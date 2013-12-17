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
        it('should remove a tab from the list when closing it');
        it('should allow specifying the closable status for each tab');
        it('should remove a tab from the list when clicking on its close button');
    });

}(jQuery));