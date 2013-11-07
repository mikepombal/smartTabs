/*global jQuery, describe, it, beforeEach, afterEach*/

(function ($) {
    'use strict';

    describe('smartTabs', function () {

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

                $('div.myTestDiv > div.smartTabsSystem').should.have.length(1);
            });
            it('Should create a div element with the css class smartTabsHeader children of smartTabsSystem', function () {
                $('.myTestDiv').smartTabs();

                $('div.smartTabsSystem > div.smartTabsHeader').should.have.length(1);
            });
            it('Should create a li element with the css class smartTabsList children of smartTabsHeader', function () {
                $('.myTestDiv').smartTabs();

                $('div.smartTabsHeader > li.smartTabsHeader').should.have.length(1);
            });
            it('Should create a div element with the css class smartTabsBody children of smartTabsSystem', function () {
                $('.myTestDiv').smartTabs();

                $('div.smartTabsSystem > div.smartTabsBody').should.have.length(1);
            });
        });
    });
}(jQuery));