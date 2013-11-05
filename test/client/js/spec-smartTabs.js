/*global jQuery, describe, it, beforeEach, afterEach*/

(function ($) {
    'use strict';

    describe('smartTabs', function () {

        describe('Basic', function () {
            it('Should exist a jQuery plugin called smartTabs', function () {
                $.fn.smartTabs.should.be.a('function');
            });
        });

        describe('DOM', function () {
            beforeEach(function () {
                $('body').append('<div class="myTestDiv"><div>');
            });
            afterEach(function () {
                $('.myTestDiv').remove();
            });


            it('Should create a div with the css class smartTabsSystem', function () {
                $('.myTestDiv').smartTabs();

                $('.myTestDiv > .smartTabsSystem').should.have.length(1);
            });
            it('Should create a div with the css class smartTabsHeader children of smartTabsSystem', function () {
                $('.myTestDiv').smartTabs();

                $('.smartTabsSystem > .smartTabsHeader').should.have.length(1);
            });
        });
    });
}(jQuery));