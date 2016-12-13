dummyEditor.addWidget({
    template: {
        type: "triplets",
        info: false,
        title: "test",
        backgroud: "1abc9c",
        text: "text"
    },
    name: "triplets.name",
    saveSettings: function(item) {
    },
    generateCode: function(item) {
        return {html:"",css:""}
    }
});
