dummyEditor.addWidget({
    template: {
        type: "input",
        name: "",
        inputType: "text",
        label: "Label:",
        inputId: "test",
        placeholder: "Placeholder"
    },
    name: "input.name",
    dependencies: [],
    generateCode: function(item) {

        html = '<div class="form-group '+item.customClassesPrintable+'">\n';
        if (item.label) {
            html += '<label for="'+item.inputId+'">'+item.label+'</label>\n';
        }
        html += '<input type="'+item.inputType+'" name="'+item.name+'" class="form-control" ';
        html += 'id="'+item.inputId+'" placeholder="'+item.placeholder+'">\n';
        html += '</div>\n';

        return {
            html: html,
            css: ''
        };
    }
});
