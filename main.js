"use strict";
// relevant information is presented on at least 3 different pokemons

// project displays information regarding the pokemon's hp, attack, defense, and abilities.

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

function propagateCards(productFrames, imgFolder, This) {
    for (var i = 1; i < productFrames.length - 1; i++) {
        var card = new CARD(imgFolder[i - 1], This.moves[i - 1], This.moves[i - 1], "", 'showMovementInfo()', 'Click');
        productFrames[i].innerHTML = This.moves[i - 1];
        card.appendCard(productFrames[i]);
    }
    var k = document.querySelectorAll('.btn')
    for (var i = 0; i < k.length; i++) {
        k[i].parentElement.removeChild(k[i]);
    }

}

class CARD {
    constructor(imgSrc, imgAlt = 'Pokecard', cardTitle, cardText) {
        this.imgSrc = imgSrc;
        this.imgAlt = imgAlt;
        this.cardTitle = cardTitle;
        this.cardText = cardText;
        //this.buttomHref = buttomHref;
        //this.buttomAnchor = buttomAnchor;
    }

    appendCard(myContainer) {
        var myPic = document.createElement('img');
        myPic.className = 'card-img-top';
        myPic.src = this.imgSrc;
        myPic.alt = this.imgAlt;
        var myPicFrame = document.createElement('div');
        myPicFrame.className = 'card';
        myContainer.appendChild(myPicFrame); // Attach the card to its container
        myPicFrame.appendChild(myPic);
        var myPicCardBody = document.createElement('div');
        myPicCardBody.className = 'card-body';
        myPicFrame.appendChild(myPicCardBody);
        var myName = document.createElement('h5');
        myName.className = 'card-title';
        myName.innerHTML = this.cardTitle;
        myPicCardBody.appendChild(myName);
        var myCardText = document.createElement('p');
        myCardText.innerHTML = this.cardText;
        myCardText.className = 'card-text';
        myPicCardBody.appendChild(myCardText);
        // var myRepoButton = document.createElement('a');
        // myRepoButton.className = 'btn btn-primary';
        // myRepoButton.innerHTML = this.buttomAnchor;
        // myRepoButton.href = this.buttomHref;
        // myPicCardBody.appendChild(myRepoButton);
    }

}
class POKEMON {
    constructor(name) {
        var This = this;
        var imgFolder = [];
        var productFrames = document.querySelectorAll('.col');

        ASQ()
            .runner(function* loadFiles() {
                var p1 = getFile('https://pokeapi.co/api/v2/pokemon/' + name + '/')

                var data = yield p1;

                This.name = data.name;
                This.speed = data.stats[0].base_stat;
                This["special-defense"] = data.stats[1].base_stat;
                This["special-attack"] = data.stats[2].base_stat;
                This.defense = data.stats[3].base_stat;
                This.attack = data.stats[4].base_stat;
                This.hp = data.stats[5].base_stat;
                This.data = data;

                This.abilities = [];
                for (var i = 0; i < data.abilities.length; i++) {
                    (This.abilities.push(data.abilities[i].ability.name));
                }

                This.moves = [];
                This.movesURLs = [];
                for (var i = 0; i < data.moves.length; i++) {
                    This.moves.push(data.moves[i].move.name);
                    This.movesURLs.push(data.moves[i].move.url);
                }

                var speed = document.createElement('p');
                speed.innerHTML = 'Speed: ' + This.speed
                var defense = document.createElement('p');
                defense.innerHTML = 'Defense: ' + This.defense
                var attack = document.createElement('p');
                attack.innerHTML = 'Attack: ' + This.attack
                var hp = document.createElement('p');
                hp.innerHTML = 'HP: ' + This.hp
                var abilities = document.createElement('p');
                abilities.innerHTML = 'Abilities: ' + This.abilities;
                var moves = document.createElement('p');

                moves.innerHTML = 'Moves: ' + This.moves;
                var header = document.querySelector('.col');
                header.appendChild(speed);
                header.appendChild(defense);
                header.appendChild(attack);
                header.appendChild(hp);
                header.appendChild(abilities);
                var introParagraph = document.createElement('p');
                introParagraph.innerHTML = 'Hello there, my name is Math-bong, welcome to my pokemon training pokécamp. This page takes up to a minute to load because of numerous ajax calls. Please look at the console.'
                introParagraph.id = 'movesparagraph'
                header.appendChild(introParagraph);

                var movesInfoArray = [];
                for (let i = 0; i < This.movesURLs.length; i++) {
                    var p2 = getFile(This.movesURLs[i]);
                    var moveInfo = yield p2;
                    movesInfoArray.push(['Accuracy: ' + moveInfo.accuracy, ' Power: ' + moveInfo.power, ' Priority: ' + moveInfo.priority]);
                    This.movesInfoArray = movesInfoArray;
                }
                //console.log("Wow",movesInfoArray)


                var imgData = [];
                var moveInfo;
                for (let i = 0; i < This.moves.length; i++) {
                    // var p3 = getFile('https://www.googleapis.com/customsearch/v1/?key=AIzaSyAk4E3PkcuqMPIKiTV3X7Ub7GDNLox-Qqc&cx=016836377050291397168%3Atqz5ktercmo&q=pikachu');

                    var p3 = getFile('https://www.googleapis.com/customsearch/v1/?key=AIzaSyAk4E3PkcuqMPIKiTV3X7Ub7GDNLox-Qqc&cx=016836377050291397168%3Atqz5ktercmo&q=pokemon%20' + name + '%20' + This.moves[i]);
                    imgData.push(moveInfo = yield p3);
                    console.log(imgData);
                    This.imgData = imgData;
                }



                // capture the moves index and store in an array
                // var movesArray = [];

                // var movesInfoArray = [];

                // var p_URLs = [];

                // for (let i = 0; i < data.moves.length; i++) {
                //     movesArray.push(data.moves[i].move.name);
                //     p_URLs.push(data.moves[i].move.url);
                //     var p2 = getFile(p_URLs[i]);
                //     var moveInfo = yield p2;
                //     movesInfoArray.push(['Accuracy: ' + moveInfo.accuracy, ' Power: ' + moveInfo.power, ' Priority: ' + moveInfo.priority]);
                // }

                // var pImages = [];

                // var productFrames = document.querySelectorAll('.col'); 
                // console.log("Warren", pImages)

                // for (var i = 1; i < productFrames.length - 1; i++) {

                //     var p3 = getFile('https://www.googleapis.com/customsearch/v1/?key=AIzaSyAk4E3PkcuqMPIKiTV3X7Ub7GDNLox-Qqc&q=' + This.name + '%20' + This.data.moves[i - 1].move.name)
                //     var pImages = yield p3
                //     console.log("Warren", pImages)

                //     axios.get().then((r) => {

                //         i < productFrames.length - 2 ? imgFolder.push(r.data.items[0].pagemap.cse_image[0].src) : done(imgFolder.push(r.data.items[0].pagemap.cse_image[0].src));
                //     });

                // }

                // propagateCards(productFrames, imgFolder, This)

            }).val(function () {
                // console.log("W",This.imgData);
                // console.log(This.moves);
                //console.log(This.movesInfoArray);
                var productFrames = document.querySelectorAll('.col');
                console.log("productFrames", productFrames.length)
                for (var i = 1; i < productFrames.length - 1; i++) {
                    console.log(i);
                    productFrames[i].innerHTML = '';

                    var card = new CARD(This.imgData[i - 1].items[0].pagemap.cse_image[0].src == undefined ? This.imgData[0].items[0].pagemap.cse_image[0].src : This.imgData[i - 1].items[0].pagemap.cse_image[0].src, This.imgData[i - 1].items[0].pagemap.metatags[0].title == undefined ? This.imgData[0].items[0].pagemap.metatags[0].title : This.imgData[i - 1].items[0].pagemap.metatags[0].title, This.moves[i - 1], This.movesInfoArray[i - 1]);
                    card.appendCard(productFrames[i]);
                }
                console.log("Complete!");
            });

    };


    // console.log("W", Pikachu.moves);
    // var productFrames = document.querySelectorAll('.col');
    // console.log(productFrames.length);
    // for (var i = 1; i < productFrames.length - 1; i++) {
    //     //var pikachuCard = new CARD(imgProcessor[PIKACHU.moves[i - 1]], PIKACHU.moves[i - 1], PIKACHU.moves[i - 1], "", showMovementInfo(), 'Click for Movement Info');
    //     console.log(i);
    //     productFrames[i].innerHTML = Pikachu.moves[i - 1];
    //     //pikachuCard.appendCard(productFrames[i]);
    //     //var b = document.querySelectorAll(".card-img-top");
    //     //console.log(b.length);
    // }//.then(function (done, data) {
    //     
    //     
    //     This.data = data;
    //     done(This.moveData = data.moves);
    //     console.log("1")
    // });//.then(function (done, data) {
    //     console.log("4");
    //     console.log("4", data);
    //     var movesInfo = [];
    //     for (var i = 0; i < data.length; i++) {

    //             axios.get(data[i].move.url).then((r) => {
    //                 console.log(r.data);
    //                 done(movesInfo[i].push([r.data.priority, r.data.power, r.data.accuracy]));
    //                 console.log([r.data.priority, r.data.power, r.data.accuracy]);
    //                 console.log(i);

    //         });
    //     }
    //     This.movesInfo = movesInfo;
    //     console.log("4.1",This.movesInfo);

    // })


}

// var Pokemom;
// var pokemon;
var d = document.querySelector('.container-fluid')
console.log("class", d.classList[1]);
name = d.classList[1]
var Pokemon = new POKEMON(name);

// console.log("W", Pikachu.moves);
// var productFrames = document.querySelectorAll('.col');
// console.log(productFrames.length);
// for (var i = 1; i < productFrames.length - 1; i++) {
//     //var pikachuCard = new CARD(imgProcessor[PIKACHU.moves[i - 1]], PIKACHU.moves[i - 1], PIKACHU.moves[i - 1], "", showMovementInfo(), 'Click for Movement Info');
//     console.log(i);
//     productFrames[i].innerHTML = Pikachu.moves[i - 1];
//     //pikachuCard.appendCard(productFrames[i]);
//     //var b = document.querySelectorAll(".card-img-top");
//     //console.log(b.length);
// }

// const Pikachu = new POKEMON('pikachu')
// var productFrames = document.querySelectorAll('.col');
// console.log(productFrames.length);
// for (var i = 1; i < productFrames.length - 1; i++) {
//     //var pikachuCard = new CARD(imgProcessor[PIKACHU.moves[i - 1]], PIKACHU.moves[i - 1], PIKACHU.moves[i - 1], "", showMovementInfo(), 'Click for Movement Info');
//     console.log(i);
//     productFrames[i].innerHTML = Pikachu.moves[i - 1];
//     //pikachuCard.appendCard(productFrames[i]);
//     //var b = document.querySelectorAll(".card-img-top");
//     //console.log(b.length);
// }



// var imgList = [];
// var a = document.querySelector(".pikachu");
// a.addEventListener("click", function () {
//     console.log(res);

//     axios.get('images.txt').then((promise) => {
//         for (var i = 0; i < promise.data.items.length; i++) {
//             imgList.push(promise.data.items[i].pagemap.cse_image[0].src);
//         }
//     });

//     var PIKACHU = new POKEMON(res);
//     
//     
// });






// // project retrieves pokemon information via the pokemon API
// // project retrieves information using javascript ajax calls

// // function propagateCards() {
// //     var res;
// //     axios.get('https://www.googleapis.com/customsearch/v1/siterestrict?key=AIzaSyAU9cKEuID8xJEwLd_kRzXK4-tb3Hnaci8&cx=016836377050291397168%3Atqz5ktercmo&q=pikachu%20-raichu' + res.data.moves[i].move.name).then((r) => {
// //         var img = r.data.items[0].pagemap.cse_image[0].src;
// //     });
// //     axios.get("https://pokeapi.co/api/v2/pokemon/pikachu/").then((r) => {
// //         res = r;
// //         handleResponse(pikachu, r);
// //     });
// //     var productFrames = document.querySelectorAll('.col');
// //     for (var i = 1; i < productFrames.length - 1; i++) {
// //         var PIKACHU = new POKEMON(res.data);
// //         var pikachuCard = new CARD(img, 'Pikachu Card', PIKACHU.moves[i - 1][0], "some text", `#`, 'Click for sth');
// //         productFrames[i].innerHTML = '';
// //         pikachuCard.appendCard(productFrames[i]);
// //     }
// // }

// var productFrames = document.querySelectorAll('.col');



// // propagateCards();









// function convertStat(st) {
//     var list = '';
//     for (var i = 0; i < st.length; i++) {
//         list += `${st[i].stat.name}: ${st[i].base_stat} <br>`;
//     }
//     return list;
// }

// function resolve(url) {
//     return axios.get(url);
// }
