dummyEditor.addWidget({
    template: {
        type: "editor",
        text: "<br><center><h1>Open settings for edit</h1></center>"
    },
    name: "editor.name",
    dependencies: [
        "ckeditor"
    ],
    generateCode: function(item) {
        return {
            html: '<div class="'+item.customClassesPrintable+'">\n'+item.text+'\n</div>\n',
            css: ""
        };
    }
});


dummyEditor.addListener(function(module) {
    module.controller("editorSettingsController", function($scope) {
        $scope.options = {
            allowedContent: true,
            entities: false,
            extraPlugins: 'justify,font,colordialog,colorbutton'
        }
    });
});
