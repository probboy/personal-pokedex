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
                speed.className = 'introStat';
                defense.className = 'introStat';
                attack.className = 'introStat';
                hp.className = 'introStat';
                abilities.className = 'introStat';

                var introParagraph = document.createElement('p');

                introParagraph.innerHTML = 'Hello there, my name is Math-bong, welcome to my pokemon training pokécamp.'
                introParagraph.id = 'movesparagraph'
                header.appendChild(introParagraph);

                This.moves = [];
                This.movesURLs = [];
                var movesInfoArray = [];
                var imgData = [];
                var moveInfo;
                var productFrames = document.querySelectorAll('.col');

               
                for (let i = 1; i < productFrames.length - 1; i++) {
                    This.moves.push(data.moves[i-1].move.name);
                    This.movesURLs.push(data.moves[i-1].move.url);

                    var p2 = getFile(This.movesURLs[i-1]);
                    var moveInfo = yield p2;

                    movesInfoArray.push(['Accuracy: ' + moveInfo.accuracy, '<br>Power: ' + moveInfo.power, '<br>Priority: ' + moveInfo.priority]);
                    This.movesInfoArray = movesInfoArray;

                    var p3 = getFile('https://www.googleapis.com/customsearch/v1/?key=AIzaSyAk4E3PkcuqMPIKiTV3X7Ub7GDNLox-Qqc&cx=016836377050291397168%3Atqz5ktercmo&q=pokemon%20' + name + '%20' + This.moves[i-1]);
                    imgData.push(moveInfo = yield p3);

                    This.imgData = imgData;
                    productFrames[i].innerHTML = '';

                    var card = new CARD(This.imgData[i - 1].items[0].pagemap.cse_image[0].src == undefined ? This.imgData[0].items[0].pagemap.cse_image[0].src : This.imgData[i - 1].items[0].pagemap.cse_image[0].src, This.imgData[i - 1].items[0].pagemap.metatags[0].title == undefined ? This.imgData[0].items[0].pagemap.metatags[0].title : This.imgData[i - 1].items[0].pagemap.metatags[0].title, This.moves[i - 1], This.movesInfoArray[i - 1]);
                    
                    card.appendCard(productFrames[i]);
                }
            }).val(function () {
                console.log("Complete!");
            });

    };
}


var d = document.querySelector('.container-fluid')
name = d.classList[1]
var Pokemon = new POKEMON(name);