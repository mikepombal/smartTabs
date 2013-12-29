/*global jQuery, describe, it, beforeEach, afterEach*/
/*jslint browser:true*/

(function ($) {
    'use strict';

    describe('Ajax Request', function () {
        beforeEach(function () {
            $('body').append('<div class="myTestDiv"><div>');
        });
        afterEach(function () {
            $('.myTestDiv').remove();
        });

        it('should allow defining a URL to get the html for the tab content', function (done) {
            var options = {
                listTabs: [
                    { title: 'Tab 1', templateUrl: './templates/template1.html' }
                ]
            };

            $('.myTestDiv').smartTabs(options);

            // wait for the ajax request being done
            setTimeout(function () {
                $('.smartTabsContent:nth-child(1)').html().should.contain('<h1>Template #1</h1>');

                done();
            }, 500);


        });

    });

}(jQuery));