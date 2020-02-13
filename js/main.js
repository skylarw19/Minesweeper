///////////////*----- app's state (variables) -----*/
let boardArray = [];
let playerArray =[]; 
let numRows = 16; //can be user input in future
let numCols = 20;
let numberBombs = 30;
let numFlagsLeft = numberBombs;
let isGameOver;

/////////////*----- cached element references -----*/
const table = document.querySelector('table');
const flagsLeft = document.getElementById('flagsLeft');
const msg = document.getElementById('message');
const restart = document.getElementById('restartBtn');

//////////////////*----- event listeners -----*/
table.addEventListener('click',reveal);
table.addEventListener('contextmenu',flag);
restart.addEventListener('click',init);

//////////////////////////*----- functions -----*/

function reveal(evt){
        let cellID = evt.target.id;
        if(isGameOver === false){
            if (playerArray[cellID] === null || playerArray[cellID] === "flag"){ //if not yet revealed or flag
                if (playerArray[cellID] === "flag")
                    numFlagsLeft++; 
                playerArray[cellID] = boardArray[cellID];
            }  
            if(boardArray[cellID]===0) //if clicked zero, reveal all connecting zeros
                searchZero(cellID);
        }
        if(boardArray[cellID]==="bomb"){ //if clicked bomb will need to reveal all bombs
            for(let i=0; i<boardArray.length; i++){
                if (boardArray[i] === "bomb")
                    playerArray[i] = "bomb";   
            }
            isGameOver = true;
        }
    render();
}

function flag(evt){
    evt.preventDefault(); 
    if(isGameOver === false){
        let cellID = evt.target.id;
        if (playerArray[cellID]===null){
            playerArray[cellID] = "flag";
            numFlagsLeft--;
        }
    }
    render();
}

function init(){
    //clear board
    table.innerHTML = "";
    boardArray.splice(0,boardArray.length);

    //generate board and boardArray
    var numSquares =0;
    for (let i=0; i<numRows; i++){
        var row = table.insertRow(i);
        for (let j=0; j<numCols; j++){
            var cell = row.insertCell(-1);
            cell.id=`${numSquares}`; //set id of td
            boardArray.push(0); 
            numSquares++;
        }
    }
    //gen player array and change edges to "-"
    for (let i=0; i<boardArray.length; i++){
       if (i<numCols){ //top row
           boardArray[i] = "-";
           playerArray[i] = "-";
       }
       else if (i%numCols===0){ //left column
            boardArray[i] = "-";
            playerArray[i] = "-";
       }
       else if ((i+1)%numCols===0){ //right column
            boardArray[i] = "-";
            playerArray[i] = "-";
       }
       else if (i>(boardArray.length-numCols) && i<boardArray.length){ //bottom row
           boardArray[i] = "-";
           playerArray[i] = "-";
       }
       else playerArray[i] = null;
    }
    genBombs(numberBombs,0);
    genNum();
    isGameOver = false;
    render();
}

function rndIdx(numBombs){  //pass in num for either numRows or numCols that we want to multiply by
    return idx = Math.floor(Math.random()*numBombs);
}

function genBombs(numBombs, bombCount){
    while (bombCount < numBombs){ //gen Bombs with no repeat indexes
        let bombIndex = rndIdx(boardArray.length)
        if(boardArray[bombIndex]!=="-" && boardArray[bombIndex] !== "bomb"){
            boardArray[bombIndex] = "bomb"; 
            bombCount++;
        }
    }
    // ensure a bomb is not completely surrounded by other bombs
    for (let i=0; i<boardArray.length; i++){
        if(isBomb(i)){
            let neighboringBombs = 0;
            for (let j = 0; j<8; j++){
                let location = [i-numCols-1,i-numCols,i-numCols+1,i+1,i+numCols+1,i+numCols,i+numCols-1,i-1];
                if (isBomb(location[j]) || boardArray[location[j]] === "-")
                    neighboringBombs++;
            }
            if (neighboringBombs === 8){
                boardArray[i] = 0;
                bombCount--;
                genBombs(numBombs,bombCount);
            }
        }  
    }
    return boardArray;
}

function isBomb(i){
    return boardArray[i]==="bomb";
}

function genNum(){
    for (let i=0; i<boardArray.length; i++){
        let location = [i-numCols-1,i-numCols,i-numCols+1,i+1,i+numCols+1,i+numCols,i+numCols-1,i-1]
        if(boardArray[i]!=="bomb" && boardArray[i]!== "-"){ //if sq is not bomb and not border, count surroundings;
            let count = 0;
            for (let j=0; j<8; j++){
                if (isBomb(location[j])) count++;
            }
            boardArray[i] = count;
        }
    }
    return boardArray;
}

//if zero is clicked, all connecting zeros must be revealed until it reveals number
function searchZero(i){
    i = parseInt(i);
    let location = [i-numCols-1,i-numCols,i-numCols+1,i+1,i+numCols+1,i+numCols,i+numCols-1,i-1];
    for (let j=0; j<8; j++){
        if (boardArray[location[j]] !== 0 && boardArray[location[j]] !== "bomb"){
            if (playerArray[location[j]] === null){
                playerArray[location[j]] = boardArray[location[j]];
            } 
        }
        else if (boardArray[location[j]]===0){
            if (playerArray[location[j]] === null){
                playerArray[location[j]] = boardArray[location[j]];
                searchZero(location[j]);
            }
        }
    }
    return playerArray;
}

function render(){
    for (let i=0; i<boardArray.length; i++){
        let cellEl = document.getElementById(i);
        if (playerArray[i] !== "-"){  //if edge, do not show on board
            cellEl.classList.add("regular");
            if (playerArray[i] === "flag"){
                cellEl.textContent =  "❄️"; 
                cellEl.classList.add("revealed");
            }
            else if (playerArray[i] === "bomb"){
                cellEl.textContent = "🔥";
                cellEl.classList.add("revealed");
            }
            else {
                cellEl.textContent = playerArray[i];
                if (playerArray[i]!== null)
                    cellEl.classList.add("revealNum"); 
            }
        } else cellEl.classList.add("edge");
    }
    //message
    msg.innerHTML = `Prince Hans has decided to take revenge by planting fires around Arendelle to melt Olaf and burn down the city. 
    <br>Help Elsa save Olaf by putting out the fires as fast as possible!`;
    if (isWinner(numberBombs)){
        msg.innerHTML = `Congratulations - You've saved Olaf from melting and the rest of Arendelle from burning down! 
        <br> The cold never bothered you anyway!`;
    }
    if (isGameOver === true){
        msg.innerHTML = `Oh no! You were not able to succesfully aid Elsa in the fight against Hans. 
        <br> Olaf has melted.`;
    }
    flagsLeft.innerHTML = `${numFlagsLeft} ❄️`;
}

function isWinner(numberBombs){
    let flagCount =0;
    for (let i = 0; i<playerArray.length; i++){
        if(playerArray[i] === "flag" && boardArray[i] === "bomb")
            flagCount++;
    }
    if (flagCount === numberBombs) return true;
}

init();