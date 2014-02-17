/*global jQuery*/
/*jslint browser:true*/

(function ($) {
    'use strict';

    // DEMO 1: The most basic way
    (function demo1() {
        var prop = {
            listTabs: [
                { title: 'Tab 1', templateId: 'template1' },
                { title: 'Tab 2', templateId: 'template2' },
                { title: 'Tab 3', templateId: 'template3' }
            ]
        };

        $('#demo1').smartTabs(prop);

    }());

    // DEMO 2: The size in em
    (function demo2() {
        var prop = {
            listTabs: [
                { title: 'Tab 1', templateId: 'template1' },
                { title: 'Tab 2', templateId: 'template2' },
                { title: 'Tab 3', templateId: 'template3' }
            ]
        };

        $('#demo2').smartTabs(prop);
        $('#demo2IncreaseButton').click(function () {
            var newValue = parseInt($('#currentFontSize').text(), 10) + 1;
            $('#currentFontSize').text(newValue);
            $('#demo2').css({'font-size': newValue + 'px' });
            $('#demo2DecreaseButton').removeAttr('disabled');
            if (newValue >= 40) {
                $('#demo2IncreaseButton').attr('disabled', 'disabled');
            }
        });
        $('#demo2DecreaseButton').click(function () {
            var newValue = parseInt($('#currentFontSize').text(), 10) - 1;
            $('#currentFontSize').text(newValue);
            $('#demo2').css({'font-size': newValue + 'px' });
            $('#demo2IncreaseButton').removeAttr('disabled');
            if (newValue <= 10) {
                $('#demo2DecreaseButton').attr('disabled', 'disabled');
            }
        });


    }());

    // DEMO 3: Lot of tabs
    (function demo3() {
        var prop = {
            listTabs: [
                { title: 'Tab 1', templateId: 'template1' },
                { title: 'Tab 2', templateId: 'template2' },
                { title: 'Tab 3', templateId: 'template3' },
                { title: 'Tab Number 4', templateId: 'template3' },
                { title: 'This is tab #5', templateId: 'template3' },
                { title: 'Tab 6', templateId: 'template3' }
            ]
        };

        $('#demo3').smartTabs(prop);
    }());

    // DEMO 4: Global removal tab option
    (function demo4() {
        var prop = {
            listTabs: [
                { title: 'Tab 1', templateId: 'template1' },
                { title: 'Tab 2', templateId: 'template2' },
                { title: 'Tab 3', templateId: 'template3' }
            ],
            areRemovable: true
        };

        $('#demo4').smartTabs(prop);
        $('#demo4Reset').click(function () {
            $('#demo4').remove();
            $('#demo4Reset').parent().after('<div id="demo4" class="demo"></div>');
            $('#demo4').smartTabs(prop);
        });
    }());

    // DEMO 5: Local removal tab option
    (function demo5() {
        var prop = {
            listTabs: [
                { title: 'Home', templateId: 'template1' },
                { title: 'Tab 2', templateId: 'template2', isRemovable: true },
                { title: 'Tab 3', templateId: 'template3', isRemovable: true }
            ]
        };

        $('#demo5').smartTabs(prop);
        $('#demo5Reset').click(function () {
            $('#demo5').remove();
            $('#demo5Reset').parent().after('<div id="demo5" class="demo"></div>');
            $('#demo5').smartTabs(prop);
        });
    }());

  // DEMO 6: Local removal tab option
    (function demo6() {
        var prop = {
            listTabs: [
                { title: 'Tab 1', templateId: 'template1' },
                { title: 'Tab 2', templateUrl: './templates/ajax-template.html' },
                { title: 'Tab 3', templateUrl: './templates/not-exisiting-template.html' }
            ]
        };

        $('#demo6').smartTabs(prop);

    }());

  // DEMO 7: Callback function after loading template
    (function demo7() {
        var prop = {
            listTabs: [
                {
                    title: 'With Callback',
                    templateUrl: './templates/ajax-template.html',
                    afterLoadingTemplate: function () {
                        $('#demo7').find('.smartTabsContent:nth-child(1)').append('<div>Callback after loading content</div>');
                    }
                },
                {
                    title: 'Without Callback',
                    templateUrl: './templates/ajax-template.html'
                }
            ]
        };

        $('#demo7').smartTabs(prop);

    }());

    // DEMO 8: Add one tab programatically
    (function demo8() {
        var countTab = 0,
            prop = {
                listTabs: [
                    { title: 'Home', templateId: 'template1' }
                ]
            };

        $('#demo8').smartTabs(prop);
        $('#demo8AddTab').click(function () {
            countTab += 1;
            $('#demo8').smartTabs('addTab', { title: 'New Tab ' + countTab });
        });
    }());

    // DEMO 9: Add several tabs programatically in one go
    (function demo9() {
        var countTab = 1,
            prop = {
                listTabs: [
                    { title: 'Home', templateId: 'template1' }
                ]
            };

        $('#demo9').smartTabs(prop);
        $('#demo9AddTabs').click(function () {
            $('#demo9').smartTabs('addTabs', [{ title: 'New Tab ' + countTab }, { title: 'New Tab ' + (countTab + 1) }]);
            countTab += 2;
        });
    }());

}(jQuery));