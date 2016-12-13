dummyEditor.addWidget({
    template: {
        type: "carousel",
        showControllers: true,
        height: '300px',
        interval: 2000,
        data: [
            {
                "url": "/nightsky.jpg",
                "alt": "image1",
                "text_h2": "OK",
                "text_small": ""
            },
            {
                "url": "/rock.jpg",
                "alt": "image2",
                "text_h2": "Second",
                "text_small": ""
            }
        ]
    },
    name: "carousel.name",
    dependencies: [],
    saveSettings: function(item) {

        $('#carousel-'+item.id).carousel({interval:item.interval});

        /*if (item.horizontal=='1') {
            item.style = "width: ";
        } else {
            item.style = "height: ";
        }
        item.style += item.size+";";*/
    },
    generateCode: function(item) {
        var css = '';
        var html = '';
        html += '<div id="carousel-'+item.id+'" class="carousel slide '+item.customClassesPrintable+'" data-ride="carousel" data-interval="'+item.interval+'">\n';
        html += '<ol class="carousel-indicators">\n';
        for (var i = 0; i<item.data.length; i++) {
            html += '<li data-target="#carousel-'+item.id+'" data-slide-to="'+i+'" class="'+(i==0 ? 'active':'')+'"></li>\n';
        }
        html += '</ol>\n';
        html += '<div class="carousel-inner" role="listbox">\n';
        for (var i = 0; i<item.data.length; i++) {
            var img = item.data[i];
            html += '<div class="item '+(i==0 ? 'active':'')+'">\n';
            html += '<img src="'+img.url+'" alt="'+img.alt+'" style="height:'+item.height+'; margin: 0 auto;">\n';
            html += '<div class="carousel-caption">\n';
            if (img.text_h2) {
                html += '<h2>'+img.text_h2+'</h2>\n';
            }
            if (img.text_small) {
                html += '<p>'+img.text_small+'</p>\n';
            }
            html += '</div>\n';
            html += '</div>\n';
        }
        html += '</div>\n';
        if (item.showControllers) {
            html += '<a class="left carousel-control" href="#carousel-'+item.id+'" role="button" data-slide="prev">\n';
            html += '<span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>\n';
            html += '<span class="sr-only">Previous</span>\n';
            html += '</a>\n';
            html += '<a class="right carousel-control" href="#carousel-'+item.id+'" role="button" data-slide="next">\n';
            html += '<span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>\n';
            html += '<span class="sr-only">Next</span>\n';
            html += '</a>\n';
        }
        html += '</div>\n';
        /*var css = ".spacer-"+item.id+" {\n";
        if (item.horizontal=='1') {
            css += "width: ";
        } else {
            css += "height: ";
        }
        css += item.size+";\n}\n";
        return {
            html: '<div class="spacer-'+item.id+'"></div>',
            css: css
        };*/
        return {
            html: html,
            css: css
        }
    }
});


dummyEditor.addListener(function(module) {
    module.controller("carouselSettingsController", function($scope) {
        $scope.addImg = function() {
            $scope.item.data.push({});
        }
        $scope.removeImg = function(index) {
            $scope.item.data.splice(index,1);
        }
    });
});
