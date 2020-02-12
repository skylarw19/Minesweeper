/*----- constants -----*/

/*----- app's state (variables) -----*/
let boardArray = [];
let playerArray =[]; 
let numRows = 16; //can be user input in future
let numCols = 20;
let numberBombs = 30;
let numFlagsLeft = numberBombs;
let isGameOver;


/*----- cached element references -----*/
const table = document.querySelector('table');
const flagsLeft = document.getElementById('flagsLeft');
const msg = document.getElementById('message');

/*----- event listeners -----*/
table.addEventListener('click',reveal);
table.addEventListener('contextmenu',flag);

/*----- functions -----*/

function reveal(evt){
        let cellID = evt.target.id;
        if(isGameOver === false){
            if (playerArray[cellID] === null || playerArray[cellID] === "flag"){  
                if (playerArray[cellID] === "flag")
                    numFlagsLeft++; 
                playerArray[cellID] = boardArray[cellID];
            }  
            if(boardArray[cellID]===0) //if it clicked on zero
                search(cellID);
        }
        if(boardArray[cellID]==="bomb"){
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

function render(){
    for (let i=0; i<boardArray.length; i++){
        let cellEl = document.getElementById(i);
        if (playerArray[i] !== "-"){
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
                    cellEl.classList.add("revealNum"); //--> show lighter color
            }
        } else cellEl.classList.add("edge");
    }
    if (isWinner(numberBombs)){
        msg.textContent = `Congratulations - You've saved Olaf from melting and the rest of Arendelle from burning down! 
        The cold never bothered you anyway`
    }
    if (isGameOver === true){
        msg.textContent = `Oh no! You were not able to succesfully aid Elsa in the fight against Hans. 
        Olaf has melted.`
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

function init(){
    var numSquares =0;
    for (let i=0; i<numRows; i++){
        var row = table.insertRow(i);
        for (let j=0; j<numCols; j++){
            var cell = row.insertCell(-1);
            cell.id=`${numSquares}`; //each td of the cell has an id matching an arrayindex
            boardArray.push(0); //initialize board array with value of 0
            numSquares++;
        }
    }
    //gen player array
    for (let i=0; i<boardArray.length; i++){
        playerArray[i] = null;
    }
    //change edges to -
    for (let i=0; i<boardArray.length; i++){
       if (i<numCols){ //top row
           boardArray[i] = "-";
           playerArray[i] = "-";
       }
       if (i%numCols===0){ //left column
            boardArray[i] = "-";
            playerArray[i] = "-";
       }
       if ((i+1)%numCols===0){ //right column
            boardArray[i] = "-";
            playerArray[i] = "-";
       }
       if (i>(boardArray.length-numCols) && i<boardArray.length){ //bottom row
           boardArray[i] = "-";
           playerArray[i] = "-";
       }
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
    console.log("bombCount after while loop: "+bombCount);
     // ensure a bomb is not completely surrounded by other bombs
    for (let i=0; i<boardArray.length; i++){
        if(boardArray[i] === "bomb"){
            let neighboringBombs = 0;
            for (let j = 0; j<8; j++){
                let location = [i-numCols-1,i-numCols,i-numCols+1,i+1,i+numCols+1,i+numCols,i+numCols-1,i-1];
                if (boardArray[location[j]] === "bomb" || boardArray[location[j]] === "-")
                    neighboringBombs++;
            }
            if (neighboringBombs === 8){
                boardArray[i] = 0;
                console.log("original bombcount: " + bombCount);
                bombCount--;
                console.log("new bomb count: " + bombCount);
                console.log("index is " + i);
                genBombs(numBombs,bombCount);
            }
        }  
    }
    console.log(bombCount);
    return boardArray;
}

function isBomb(i){
    return boardArray[i]==="bomb";
}

function genNum(){
    for (let i=0; i<boardArray.length; i++){
        let location = [i-numCols-1,i-numCols,i-numCols+1,i+1,i+numCols+1,i+numCols,i+numCols-1,i-1]
        if(boardArray[i]!=="bomb" && boardArray[i]!== "-"){ //if sq not bomb and not border, count surroundings;
            let count = 0;
            for (let j=0; j<8; j++){
                if (isBomb(location[j])) count++;
            }
            boardArray[i] = count;
        }
    }
    return boardArray;
}

function search(i){
    i = parseInt(i);
    let location = [i-numCols-1,i-numCols,i-numCols+1,i+1,i+numCols+1,i+numCols,i+numCols-1,i-1];
    for (let j=0; j<8; j++){
        if (boardArray[location[j]] !== 0 && boardArray[location[j]] !== "bomb"){
            if (playerArray[location[j]] === null){
                playerArray[location[j]] = boardArray[location[j]];
                //document.getElementById(`${location[j]}`).innerHTML = playerArray[location[j]];  ///placeholder code. render function will display ALL of player Array
            } 
        }
        else if (boardArray[location[j]]===0){
            if (playerArray[location[j]] === null){
                playerArray[location[j]] = boardArray[location[j]];
                //document.getElementById(`${location[j]}`).innerHTML = playerArray[location[j]]; ///placeholder code. render function will display ALL of player Array
                search(location[j]);
            }
        }
    }
    return playerArray;
}

init();