dummyEditor.addWidget({
    template: {
        type: "image",
        src: "https://assets-cdn.github.com/images/modules/logos_page/GitHub-Mark.png",
        width: "100px",
        height: "100px"
    },
    name: "image.name",
    generateCode: function(item) {
        var out = {
            html: '',
            css: ''
        };
        out.html += '<img class="image-'+item.id+' '+item.customClassesPrintable+'" src="'+item.src+'" ';
        if (item.alt) out.html += 'alt="'+item.alt+'" ';
        out.css = '.image-'+item.id+': {\n';
        if (item.width) out.css += 'width: '+item.width+';\n';
        if (item.height) out.css += 'height: '+item.height+';\n';
        out.css += '}\n';
        out.html += '/>';
        return out;
    }
});
