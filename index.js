"use strict";



//This comes from data.js
const CLASSIC = document.querySelector("#classic");
const FRAME = document.querySelector("#classic-wrapper");
const BODY = document.querySelector("body");

var gifs = window.data.data;

for(let i=0; i < 25; i++){
    console.log(gifs[i].url);
}

let myCat = Math.floor(Math.random() * 25);



 console.log([1,2,3,4].join());

// console.log("myCats: " + myCats.join(","));


class Classic { 
    constructor(art_url="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg/687px-Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg")
    {
        // this.frame = "10px solid black";
        this.art_url = art_url;
        console.log("constructed!")
    }
    render(){
        console.log("rendered!")
        // var chi = document.createElement("img");
        // chi.setAttribute("src", this.art_url);
        // chi.setAttribute("width", "100%");
        // FRAME.appendChild(chi);
        // console.log("child added!");
		CLASSIC.setAttribute("src", this.art_url);
        // CLASSIC.style.width="6em";

        // FRAME.style.width="80%";
        // CLASSIC.style.width="99%"
    }
}


// function translateURL(url){
//     let arr = url.split("-");
//     let leng = arr.length;
//     let pointer = arr[leng-1];
//     return "https://media.giphy.com/media/" + pointer + "/giphy.gif";
// }

// var cls = new Classic();
// cls.render();
// var someCat = new Classic("https://giphy.com/gifs/cat-day-office-5r5J4JD9miis")
// someCat.render();
// var someSomeCat = new Classic("https://media.giphy.com/media/5r5J4JD9miis/giphy.gif")
// someSomeCat.render();
// var acro = new Classic("https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/The_Acropolis_of_Athens_viewed_from_the_Hill_of_the_Muses_%2814220794964%29.jpg/1280px-The_Acropolis_of_Athens_viewed_from_the_Hill_of_the_Muses_%2814220794964%29.jpg");
// acro.render();
// var aCat = new Classic(translateURL(gifs[myCat].url));
var aCat = new Classic("https://media.giphy.com/media/" + gifs[myCat].id + "/giphy.gif");
aCat.render();


// CLASSIC.setAttribute("style", "border: 1em yellow solid;");
// aCat.changeFrame("3em");

CLASSIC.addEventListener("click", event => {
    myCat = Math.floor(Math.random() * 25);
    aCat = new Classic("https://media.giphy.com/media/" + gifs[myCat].id + "/giphy.gif");
    aCat.render();
}) 

myCat = Math.floor(Math.random() * 25);
aCat = new Classic("https://media.giphy.com/media/" + gifs[myCat].id + "/giphy.gif");
aCat.render();




function Shuffle(array){
    let copyArray = array;
    let originalLength = copyArray.length;
    let r = Math.floor(Math.random() * copyArray.length);
    console.log("ArrayLength: " + copyArray.length);
    console.log("RandomNumber: " +r);
    let sArr = [];
    console.log(sArr);
    for(let i = 0; i < originalLength; i++){
        // console.log(i);
        sArr.push(copyArray[r]);
        // console.log(sArr);
        copyArray.splice(r,1);
        // console.log(array);
        // console.log("sArr is: " + sArr);
        r = Math.floor(Math.random() * copyArray.length);
    }
    return sArr;
}




let myCats = [];
for(let i=0 ; i<25; i++){
    myCats.push(i);
}
// myCats = Shuffle(myCats);
let i = 0
setInterval(function(){ 
    // document.getElementById("demo").innerHTML = myCats.join(",");
    // document.getElementById("demo1").innerHTML = Shuffle(myCats).join(",");
    // console.log("myCats is: " + myCats.join());
    if(i<25){
        document.getElementById("demo2").innerHTML = myCats[i];
        aCat = new Classic("https://media.giphy.com/media/" + gifs[myCats[i]].id + "/giphy.gif");
        aCat.render();
        i++;
        console.log(i);
    } else {
        i = 0;
        myCats = Shuffle(myCats);
        console.log(i);
        console.warn("Shuffled!");
    }
}, 1000)

//    setInterval(function(){ 
//     myCat = Math.floor(Math.random() * 25);
//     aCat = new Classic("https://media.giphy.com/media/" + gifs[myCats[0]].id + "/giphy.gif");
//     console.log(myCat);
//     aCat.render(); 
//     }, 3000)