"use strict";
// relevant information is presented on at least 3 different pokemons

// project displays information regarding the pokemon's hp, attack, defense, and abilities.

class CARD {
    constructor(imgSrc, imgAlt = 'Pokecard', cardTitle, cardText, buttomHref, buttomAnchor) {
        this.imgSrc = imgSrc;
        this.imgAlt = imgAlt;
        this.cardTitle = cardTitle;
        this.cardText = cardText;
        this.buttomHref = buttomHref;
        this.buttomAnchor = buttomAnchor;
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
        var myRepoButton = document.createElement('a');
        myRepoButton.className = 'btn btn-primary';
        myRepoButton.innerHTML = this.buttomAnchor;
        myRepoButton.href = this.buttomHref;
        myPicCardBody.appendChild(myRepoButton);
    }

}
class POKEMON {
    constructor(name) {
        var This = this;
        var data;
        var imgFolder = [];
        var Timer = false;
        var productFrames = document.querySelectorAll('.col');
        ASQ(name).then(function (done, name) {
            axios.get('https://pokeapi.co/api/v2/pokemon/' + name + '/').then((r) => {
                if (r.data != undefined) {
                    done(data = r.data);
                }
            });
        }).then(function (done, data) {
            var Data;
            done(Data = data);
        }).then(function (done, data) {
            This.name = data.name;
            This.speed = data.stats[0].base_stat;
            This["special-defense"] = data.stats[1].base_stat;
            This["special-attack"] = data.stats[2].base_stat;
            This.defense = data.stats[3].base_stat;
            This.attack = data.stats[4].base_stat;
            This.hp = data.stats[5].base_stat;
            done(This.data = data);
            This.abilities = [];
            for (var i = 0; i < data.abilities.length; i++) {
                (This.abilities.push(data.abilities[i].ability.name));
            }
            This.moves = [];
            for (var i = 0; i < data.moves.length; i++) {
                This.moves.push(data.moves[i].move.name);
            }
        }).then(function (done, data) {
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
            introParagraph.innerHTML = 'Hello there, my name is Math-bong, welcome to my pokemon training pokécamp. Upcoming new features are draging and dropping your favorite cards using event handler.'
            introParagraph.id = 'movesparagraph'
            done(header.appendChild(introParagraph));
            console.log("1W", data);
        }).then(function (done, data) {

            var productFrames = document.querySelectorAll('.col');
            for (var i = 1; i < productFrames.length - 1; i++) {
                var a;
                setTimeout(console.log, 2000, i, This.data.moves[i - 1].move.name);
                axios.get('https://www.googleapis.com/customsearch/v1/?key=AIzaSyAMTf_ZQRAa3l2kznIZmNQqGp9DyZMA3mc&q=' + This.name + '%20' + This.data.moves[i - 1].move.name).then((r) => {

                    i < productFrames.length - 2 ? imgFolder.push(r.data.items[0].pagemap.cse_image[0].src) : done(imgFolder.push(r.data.items[0].pagemap.cse_image[0].src));
                });

            }
            console.log("2W", data);

        }).then(function (done, data) {

            done(setTimeout(console.log, 9000, "imgFolder2", imgFolder.length, imgFolder));

            console.log(data);
        }).then(function (done, data) {
            console.log("imgFolder", imgFolder.length, imgFolder);

            done(setTimeout(propagateCards, 10000, productFrames, imgFolder, This))

            console.log("3W", data);
        }).then(function (done, data) {



        })

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
var Pokemom;
var pokemon;
var d = document.querySelector('.container-fluid')
console.log("class", d.classList[1]);
name = d.classList[1]
ASQ(name).then(function (done, name) {
    done(Pokemon = new POKEMON(name));
    var pokemon = Pokemon
    console.log(pokemon)


}).then(function (done, pikachu) {
    done(pokemon);
    console.log("New Pokemon", Pokemon);
}).then(function (done, Pokemon) {
    console.log(Pokemon.hp)
    var pokemon;
    done(pokemon = Pokemon);
    //console.log("2",pikachu);
})

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
