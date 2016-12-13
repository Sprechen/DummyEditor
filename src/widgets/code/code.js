dummyEditor.addWidget({
    template: {
        type: "code",
        code: '<strong>hello</strong>'
    },
    name: "code.name",
    generateCode: function(item) {
        return {
            html: '<div class="'+item.customClassesPrintable+'">\n'+item.code+'\n</div>\n',
            css: ''
        };
    }
});
