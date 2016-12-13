dummyEditor.addWidget({
    template: {
        type: "bootstrap-blockquote",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.",
        footer: "Someone famous"
    },
    name: "bootstrapblockquote.name",
    dependencies: [],
    generateCode: function(item) {
        return {
            html: '<blockquote class="'+item.customClassesPrintable+'"><p>'+item.text+'</p><footer>'+item.footer+'</footer></blockquote>',
            css: ''
        };
    }
});
