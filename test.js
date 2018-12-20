

"use strict"

function ajax(url, cb) {
    axios.get(url).then((r) => {

        return cb(r.data);
    });
}

function getFile(url) {
    return ASQ(function (done) {
        ajax(url, done);
    });
}

ASQ()
    .runner(function* loadFiles() {
        var p1 = getFile('https://www.googleapis.com/customsearch/v1/?key=AIzaSyAk4E3PkcuqMPIKiTV3X7Ub7GDNLox-Qqc&cx=016836377050291397168%3Atqz5ktercmo&q=pikachu')

        var data = yield p1;
        var imgData = [];
        var body = document.querySelector('body')
        for (var i = 0; i < data.items.length; i++) {
            imgData.push(data.items[i].pagemap.cse_image)
        }
        imgData = imgData.flat()
        for (var i = 0; i < data.items.length; i++) {
            var Imgs = [];
            Imgs[i] = document.createElement('img');
            Imgs[i].setAttribute('src', imgData[i] != undefined ? imgData[i].src : imgData[0].src)
            body.appendChild(Imgs[i]);
        }



        // var aImg = document.createElement('img');
        // aImg.setAttribute('src',imgData[0].src)
        // var body = document.querySelector('body')
        // console.log(body)
        // body.appendChild(aImg);





    })
    .val(function () {
        console.log("Complete!");
    });
