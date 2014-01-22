/*global jQuery, describe, it, beforeEach, afterEach*/
/*jslint browser:true*/

(function ($) {
    'use strict';

    describe('Concurrency', function () {
        beforeEach(function () {
            $('body').append('<div class="myTestDiv1"></div><div class="myTestDiv2"></div>');
        });
        afterEach(function () {
            $('.myTestDiv1').remove();
            $('.myTestDiv2').remove();
        });

        it('should allow create more than one instance of smartTabs', function () {
            var options1 = {
                    listTabs: [
                        { title: 'Tab 1' },
                        { title: 'Tab 2' }
                    ]
                },
                options2 = {
                    listTabs: [
                        { title: 'Tab 3' },
                        { title: 'Tab 4' },
                        { title: 'Tab 5' }
                    ]
                };

            $('.myTestDiv1').smartTabs(options1);
            $('.myTestDiv2').smartTabs(options2);


            $('.myTestDiv1 .smartTabsTabTitle').should.have.length(2);
            $('.myTestDiv2 .smartTabsTabTitle').should.have.length(3);
            $('.myTestDiv1 .smartTabsTabTitle:nth-child(1)').text().should.equal('Tab 1');
            $('.myTestDiv2 .smartTabsTabTitle:nth-child(2)').text().should.equal('Tab 4');
        });


        it('should not interfere the tab hidden status between instances', function () {
            /**
             * This test was written due to the issue #7 as some hidden where hidden
             * by mistake
             */

            var options1 = {
                    listTabs: [
                        { title: 'Tab 1' },
                        { title: 'Tab 2' },
                        { title: 'Tab 3' },
                        { title: 'Tab 4' },
                        { title: 'Tab 5' },
                        { title: 'Tab 6' },
                        { title: 'Tab 7' }
                    ]
                },
                options2 = {
                    listTabs: [
                        { title: 'Tab 1' },
                        { title: 'Tab 2' },
                        { title: 'Tab 3' },
                        { title: 'Tab 4' },
                        { title: 'Tab 5' }
                    ]
                };

            $('.myTestDiv1').width('20em');
            $('.myTestDiv2').width('15em');

            $('.myTestDiv1').smartTabs(options1);
            $('.myTestDiv2').smartTabs(options2);

            $('.myTestDiv1 .smartTabsTabTitle:nth-child(3)').hasClass('smartTabsHiddenTab').should.equal(false);

        });

    });

}(jQuery));