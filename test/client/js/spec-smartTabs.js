/*global jQuery, describe, it, beforeEach, afterEach, before, after*/

(function ($) {
    'use strict';

    describe('smartTabs', function () {
        before(function () {
            $('body').append('<script id="template1" type="text/template">Template 1</script>');
            $('body').append('<script id="template2" type="text/template">Template 2</script>');
            $('body').append('<script id="template3" type="text/template">Template 3</script>');
        });
        after(function () {
            $('#template1').remove();
            $('#template2').remove();
            $('#template3').remove();
        });

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


            it('Should create li elements', function () {
                /**
                 * For every elements coming in the arguments
                 * a li element should be created with the class name smartTabsTabTitle
                 * children of smartTabsList and contain the title
                 * 
                 */
                var options = [
                    { title: 'Tab 1' },
                    { title: 'Tab 2' },
                    { title: 'Tab 3' },
                    { title: 'Tab 4' }
                ];

                $('.myTestDiv').smartTabs(options);


                $('.smartTabsList > li.smartTabsTabTitle').should.have.length(4);
                $('.smartTabsTabTitle:nth-child(1)').text().should.equal('Tab 1');
                $('.smartTabsTabTitle:nth-child(2)').text().should.equal('Tab 2');
                $('.smartTabsTabTitle:nth-child(3)').text().should.equal('Tab 3');
                $('.smartTabsTabTitle:nth-child(4)').text().should.equal('Tab 4');
            });

            it('Should populate the content of the tab', function () {
                /**
                 * For every tab it should populate its content using the templete ID,
                 * the content element should have the class smartTabsContent
                 * children of smartTabsBody
                 */
                var options = [
                    { title: 'Tab 1', templateId: 'template1' },
                    { title: 'Tab 2', templateId: 'template2' },
                    { title: 'Tab 3', templateId: 'template3' }
                ];

                $('.myTestDiv').smartTabs(options);

                $('.smartTabsBody > div.smartTabsContent').should.have.length(3);
                $('.smartTabsContent:nth-child(1)').html().should.equal($('#template1').html());
                $('.smartTabsContent:nth-child(2)').html().should.equal($('#template2').html());
                $('.smartTabsContent:nth-child(3)').html().should.equal($('#template3').html());

            });

            it('should define the first tab as active', function () {
                /**
                 * The tab being active should get the smartTabsActive css class
                 */

                var options = [
                    { title: 'Tab 1' },
                    { title: 'Tab 2' },
                    { title: 'Tab 3' }
                ];

                $('.myTestDiv').smartTabs(options);

                $('.myTestDiv .smartTabsActive').should.have.length(1);
                $('.smartTabsTabTitle:nth-child(1).smartTabsActive').should.have.length(1);

            });

        });

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

    });
}(jQuery));
