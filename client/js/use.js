/*global jQuery*/

(function ($) {
    'use strict';

    var options = [
        { title: 'Tab 1', templateId: 'template1' },
        { title: 'Super Tab 2', templateId: 'template2' },
        { title: 'Tab 3', templateId: 'template3' },
        { title: 'Another Tab' }
    ];

    $('#myTab').smartTabs(options);


}(jQuery));