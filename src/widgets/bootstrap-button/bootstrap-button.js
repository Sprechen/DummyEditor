dummyEditor.addWidget({
    template: {
        type: "bootstrap-button",
        text: "Button",
        bclass: "btn-primary",
        bsize: '',
        url: "#"
    },
    name: "bootstrapbutton.name",
    dependencies: [],
    generateCode: function(item) {
        //var css = ".gly-"+item.id+" {\ncolor: #"+item.color+";\nfont-size: "+item.size+";\n}\n";
        return {
            html: '<a class="btn '+item.bclass+' '+item.bsize+' '+item.customClassesPrintable+'" href="'+item.url+'">'+item.text+'</a>',
            css: ''
        };
    }
});
