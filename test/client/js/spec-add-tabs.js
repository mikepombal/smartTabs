/*global jQuery, describe, it, beforeEach, afterEach*/
/*jslint browser:true*/

(function ($) {
    'use strict';

    describe('Add Tabs', function () {
        beforeEach(function () {
            $('body').append('<div class="myTestDiv"><div>');
        });
        afterEach(function () {
            $('.myTestDiv').remove();
        });

        it('should allow adding a new tab to the list', function (done) {
            /**
             * Adding a tab should put it at the first position
             * and give it the focus
             */

            var options = [
                { title: 'Tab 1' },
                { title: 'Tab 2' },
                { title: 'Tab 3' }
            ];

            $('.myTestDiv').smartTabs(options);

            $('.myTestDiv').smartTabs('addTab', { title: 'New Tab' });

            // wait for the animation ending
            setTimeout(function () {
                // check the new tab was inserted at the first position
                $('.smartTabsTabTitle:nth-child(1)').text().should.equal('New Tab');
                // check the new tab has focus
                $('.smartTabsTabTitle:nth-child(1)').hasClass('smartTabsActive').should.equal(true);

                done();
            }, 500);
        });

        it('should allow adding a list of new tabs to the list');

    });

}(jQuery));