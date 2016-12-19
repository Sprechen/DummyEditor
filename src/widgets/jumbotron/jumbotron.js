dummyEditor.addWidget({
    template: {
        type: "jumbotron",
        isContainer: true,
        columns: [[]]
    },
    name: "jumbotron.name",
    saveSettings: function(item) {
        item.style = "";
        if (item.background) {
            item.style += "background: "+item.background+"; ";
        }
        if (item.imgbackground) {
            item.style += "background-image: url(\""+item.imgbackground+"\"); ";
        }
        if (item.textcolor) {
            item.style += "color: "+item.textcolor+"; ";
        }
        if (item.textalign) {
            item.style += "text-align: "+item.textalign+"; ";
        }
        if (item.paddingtop) {
            item.style += "padding-top: "+item.paddingtop+"; ";
        }
        if (item.paddingleft) {
            item.style += "padding-left: "+item.paddingleft+"; ";
        }
        if (item.paddingright) {
            item.style += "padding-right: "+item.paddingright+"; ";
        }
        if (item.paddingbottom) {
            item.style += "padding-bottom: "+item.paddingbottom+"; ";
        }
    },
    generateCode: function(item) {
        var out = {
            html: '',
            css: ''
        };
        out.css += ".dummy-container-"+item.id+" {\n";
        if (item.background) {
            out.css += "background: "+item.background+";\n";
        }
        if (item.textcolor) {
            out.css += "color: "+item.textcolor+";\n";
        }
        if (item.textalign) {
            out.css += "text-align: "+item.textalign+";\n";
        }
        if (item.paddingtop) {
            out.css += "padding-top: "+item.paddingtop+";\n";
        }
        if (item.paddingleft) {
            out.css += "padding-left: "+item.paddingleft+";\n";
        }
        if (item.paddingright) {
            out.css += "padding-right: "+item.paddingright+";\n";
        }
        if (item.paddingbottom) {
            out.css += "padding-bottom: "+item.paddingbottom+";\n";
        }
        out.css += "}\n";
        out.html += '<div class="container">\n<div';
        if (item.custom_id) out.html += ' id="'+item.custom_id+'"';
        out.html +=' class="jumbotron '+item.customClassesPrintable+' dummy-container-'+item.id+'">\n';
        for (var i = 0; i<item.columns[0].length; i++) {
            var f =  dummyEditor.getWidget(item.columns[0][i].type).generateCode;
            var r = f(item.columns[0][i]);
            out.html += r.html+"\n";
            out.css += r.css+"\n";
        }
        out.html += '</div>\n</div>\n';
        return out;
    }
});
