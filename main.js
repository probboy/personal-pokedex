"use strict";
// relevant information is presented on at least 3 different pokemons
class PERSON {
    constructor(name) {
        this.name = name
    }
    name() {
        return `${this.name}`
    }
}

// the fiticious trainer name is Math Bong, which extends the class PERSON

class MATHBONG extends PERSON {
    constructor(name) {
        super(name)
    }
    all() {
        return 0; //return an array of pokemon objects
    }

    get(name) {
        return 0; //return a pokemon object housing pokemon object information for the pokemon it found
    }

}

// project displays information regarding the pokemon's hp, attack, defense, and abilities.

class POKEMON {
    constructor(name) {
        this.name = name;

        const Pokemon = axios.get("https://pokeapi.co/api/v2/pokemon/" + this.name + "/");

        Pokemon.then((result) => {
            this.hp = result.data.stats[5].base_stat;
            this.attack = result.data.stats[4].base_stat;
            this.defense = result.data.stats[1].base_stat;
            this.abilities = [];
            for (i = 0; i < result.data.abilities.length; i++) {
                this.abilities.push(result.data.abilities[i].ability.name);
            }
            this.moves = [];
            for (var i = 0; i < result.data.moves.length; i++) {
                this.moves.push([result.data.moves[i].move.name, null, null, null]);
            }
        });
    }
}



// project retrieves pokemon information via the pokemon API
// project retrieves information using javascript ajax calls

const PIKACHU = axios.get("https://pokeapi.co/api/v2/pokemon/pikachu/");
const RAICHU = axios.get("https://pokeapi.co/api/v2/pokemon/raichu/");
const MEW = axios.get("https://pokeapi.co/api/v2/pokemon/mew/");


// AIzaSyC2PXaAyuJg27AGxyWtRs--xHvw301jOjk  
//unction convertStats


PIKACHU.then((res) => {
    var pikachuData = res.data.moves;
    var pikachuStats = res.data.stats;

    const PIKACHUIMAGES = axios.get('https://www.googleapis.com/customsearch/v1?key=AIzaSyAU9cKEuID8xJEwLd_kRzXK4-tb3Hnaci8&cx=016836377050291397168%3Atqz5ktercmo&q=pikachu%20%20-raichu')
    const pikachuImages = [];
    PIKACHUIMAGES.then((res) => {
        for (var i = 0; i < res.data.items.length; i++) {
            pikachuImages.push(res.data.items[i].pagemap.cse_image[0].src);
        }
    });


    PIKACHUIMAGES.then((res) => {
        var productFrames = document.querySelectorAll('.col');
        for (var i = 1; i < productFrames.length - 1; i++) {
            let pikachuCard = new CARD(pikachuImages[i < 10 ? i : i % 10], 'Pikachu', pikachuData[i - 1].move.name, convertStat(pikachuStats), pikachuImages[i < 10 ? i : i % 10], 'Click for Photo');
            productFrames[i].innerHTML = '';
            pikachuCard.appendCard(productFrames[i]);
        }
    });
});


function convertStat(st) {
    var list = '';
    for (var i = 0; i < st.length; i++) {
        list += `${st[i].stat.name}: ${st[i].base_stat} <br>`;
    }
    return list;
}

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

//for example move: {name: "mega-punch", url: "https://pokeapi.co/api/v2/move/5/"}
var MOVES = [];
var priority, power, accuracy;
// function pokemonPower() {
//     axios.get("https://pokeapi.co/api/v2/move/5/").then((res) => {
//         resolve('resolved');
//         priority = res.data.priority;
//         power = res.data.power;
//         accuracy = res.data.accuracy;
//         console.log(res);
//         console.log(priority, power, accuracy);
//     });
//     console.log(priority, power, accuracy)
//     // setTimeout(function () { console.log(priority, power, accuracy); }, 3000);
// }
// pokemonPower();

// async function resolve() {
//     return axios.get("https://pokeapi.co/api/v2/move/5/").then((res) => {
//         resolve('resolved');
//     });


// }

// resolve();

// async function pokePower() {
//     var priority = await resolve();
//     var power = await resolve();
//     var accuracy = await resolve();
//     console.log("Tai", resolve().then((res)=>{console.log(res.data)}));
// }

// pokePower();



// axios.get("https://pokeapi.co/api/v2/move/5/").then((res)

var priority;
var power;
var accuracy;


asyncCall();

function resolveAfter2Seconds() {
    return axios.get("https://pokeapi.co/api/v2/move/5/");
}

async function asyncCall() {
    console.log('calling');
    var result = await resolveAfter2Seconds();
    priority= result.data.priority;
    power = result.data.power;
    accuracy = result.data.accuracy;
    console.log(priority,power,accuracy);
    return [priority,power,accuracy];
}