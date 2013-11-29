/*global jQuery, describe, it, beforeEach, afterEach*/
/*jslint browser:true*/

(function ($) {
    'use strict';

    describe('Base', function () {
        it('Should exist a jQuery plugin called smartTabs', function () {
            $.fn.smartTabs.should.be.a('function');
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
        });

    });

}(jQuery));