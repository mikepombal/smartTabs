/*global jQuery*/

(function ($) {
    'use strict';

    var options = {
        listTabs: [
            { title: 'Tab 1', templateId: 'template1' },
            { title: 'Super Tab 2', templateId: 'template2' },
            { title: 'Tab 3', templateId: 'template3' },
            { title: 'Another Tab' },
            { title: 'Tab 5', templateId: 'template3' },
            { title: 'The one before the last', templateId: 'template3' },
            { title: 'Last Tab', templateId: 'template3' }
        ],
        areCloseable: true
    };

    $('#myTab').smartTabs(options);


}(jQuery));