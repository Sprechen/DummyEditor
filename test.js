
var getItemFromIdInternal = function(list, id) {
    for (var i = 0; i < list.length; i++) {
        console.log("comparing "+list[i].id+" and "+id);
        if (list[i].id == id) return list[i];
        if (list[i].isContainer) {
            console.log("its a container, recursion");
            var tmp = getItemFromIdInternal(list[i].columns[0], id);
            if (tmp) return tmp;
        }
    }
    return null;
};

var list = [{
    "type": "container",
    "info": false,
    "isContainer": true,
    "element": "div",
    "columns": [
        [{
            "type": "card",
            "isContainer": true,
            "columns": [
                [{
                    "type": "grid",
                    "isContainer": true,
                    "sgrid": "{\"col\":1,\"colmd\":[12],\"colxs\":[12]}",
                    "grid": {
                        "col": 1,
                        "colmd": [12],
                        "colxs": [12]
                    },
                    "columns": [
                        []
                    ],
                    "info": false,
                    "customClasses": [],
                    "id": 3,
                    "_father": 2
                }]
            ],
            "style": "-webkit-box-shadow: 0px 3px 33px 0px rgba(0,0,0,0.48); -moz-box-shadow: 0px 3px 33px 0px rgba(0,0,0,0.48); box-shadow: 0px 3px 33px 0px rgba(0,0,0,0.48);",
            "elevation": "2",
            "borderRadious": 0,
            "info": false,
            "customClasses": [],
            "id": 2,
            "_father": 1
        }]
    ],
    "customClasses": [".new_class"],
    "id": 1,
    "customClassesPrintable": "new_class ",
    "style": ""
}];

var item = getItemFromIdInternal(list, 2);
console.log(item);
