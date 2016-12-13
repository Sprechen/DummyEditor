dummyEditor.addWidget({
    template: {
        type: "card",
        isContainer: true,
        columns: [[]],
        style: '-webkit-box-shadow: 0px 3px 33px 0px rgba(0,0,0,0.48); -moz-box-shadow: 0px 3px 33px 0px rgba(0,0,0,0.48); box-shadow: 0px 3px 33px 0px rgba(0,0,0,0.48);',
        elevation: '2',
        borderRadious: 0
    },
    name: "card.name",
    saveSettings: function(item) {
        var elevationOptions = {
            "0": "",
            "1": "box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);",
            "2": "box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);",
            "3": "box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);",
            "4": "box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);",
            "5": "box-shadow: 0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);"
        }
        item.style = elevationOptions[item.elevation];
        item.style += " ";
        item.style += 'border-radius:'+item.borderRadius+'; ';
        if (item.margintop) item.style += 'margin-top: '+item.margintop+'; ';
        if (item.marginleft) item.style += 'margin-left: '+item.marginleft+'; ';
        if (item.marginright) item.style += 'margin-right: '+item.marginright+'; ';
        if (item.marginbottom) item.style += 'margin-bottom: '+item.marginbottom+'; ';
        if (item.paddingtop) item.style += 'padding-top: '+item.paddingtop+'; ';
        if (item.paddingleft) item.style += 'padding-left: '+item.paddingleft+'; ';
        if (item.paddingright) item.style += 'padding-right: '+item.paddingright+'; ';
        if (item.paddingbottom) item.style += 'padding-bottom: '+item.paddingbottom+'; ';
        if (item.background) item.style += 'background: #'+item.background+';';
    },
    generateCode: function(item) {
        var out = {
            html: '',
            css: ''
        };
        out.css += ".dummy-card-"+item.id+" {\n";
        var elevationOptions = {
            "0": "",
            "1": "box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);",
            "2": "box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);",
            "3": "box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);",
            "4": "box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);",
            "5": "box-shadow: 0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);"
        }
        out.css += elevationOptions[item.elevation]+"\n";
        out.css += 'border-radius:'+item.borderRadius+';\n';
        if (item.background) {
            out.css += "background: #"+item.background+";\n";
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
        if (item.margintop) {
            out.css += "margin-top: "+item.margintop+";\n";
        }
        if (item.marginleft) {
            out.css += "margin-left: "+item.marginleft+";\n";
        }
        if (item.marginright) {
            out.css += "margin-right: "+item.marginright+";\n";
        }
        if (item.marginbottom) {
            out.css += "margin-bottom: "+item.marginbottom+";\n";
        }
        out.css += "}\n";
        out.html += '<div';
        if (item.custom_id) out.html += ' id=dummy-card-"'+item.id+'"';
        out.html +=' class="'+item.customClassesPrintable+' dummy-card-'+item.id+'">\n';
        for (var i = 0; i<item.columns[0].length; i++) {
            var f =  dummyEditor.getWidget(item.columns[0][i].type).generateCode;
            var r = f(item.columns[0][i]);
            out.html += r.html+"\n";
            out.css += r.css+"\n";
        }
        out.html += '</div>\n';
        return out;
    }
});

dummyEditor.addListener(function(module) {
    module.controller("cardSettingsController", function($scope) {
        $scope.options = {
            "0": "",
            "1": "box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);",
            "2": "box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);",
            "3": "box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);",
            "4": "box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);",
            "5": "box-shadow: 0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);"
        }
    });
});
