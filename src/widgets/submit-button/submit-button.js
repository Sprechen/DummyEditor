dummyEditor.addWidget({
    template: {
        type: "submit-button",
        text: "Button",
        bclass: "btn-primary",
        bsize: '',
    },
    name: "submitbutton.name",
    dependencies: [],
    generateCode: function(item) {
        return {
            html: '<input type="submit" class="btn '+item.bclass+' '+item.bsize+' '+item.customClassesPrintable+'" value="'+item.text+'"></input>',
            css: ''
        };
    }
});
