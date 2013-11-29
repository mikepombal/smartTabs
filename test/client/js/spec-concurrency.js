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

}(jQuery));