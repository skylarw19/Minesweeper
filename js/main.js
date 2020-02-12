/*----- constants -----*/

/*----- app's state (variables) -----*/
let boardArray = []; //stores what is in each sq of the game board
let playerArray =[]; //input what player assigns to later compare boardArray to playerArray to check if win
//or maybe dont compare boards but if all bombs are flagged --> win. then during handleclik checkwin?? 
//or make player array the same as board array immediately. but change the the bombs to flags/vice versa.
let numRows = 12; //can be user input in future
let numCols = 12;
let numFlagsLeft;
let isGameOver;

/*----- cached element references -----*/
const table = document.querySelector('table');
const flagsLeft = document.getElementById('flagsLeft');
const msg = document.getAnimations('message');

/*----- event listeners -----*/
table.addEventListener('click',reveal);
table.addEventListener('contextmenu',flag);

function reveal(evt){
        let cellID = evt.target.id;
        if(isGameOver === false){
            if (playerArray[cellID] === null || playerArray[cellID] === "flag"){  
                playerArray[cellID] = boardArray[cellID];
                if (playerArray[cellID] === "flag")
                    numFlagsLeft++; 
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
    //checkWin(cellID);
    render();
}

// function isGameOver(cellID){
//     if (playerArray[cellID] === "bomb") 
//         return true;
// }

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
        if (playerArray[i] !== "-"){
            let cellEl = document.getElementById(i);
            if (playerArray[i] === "flag")
                cellEl.textContent =  "☃️"; 
            else if (playerArray[i] === "bomb")
                cellEl.textContent = "🔥";
            else {
                cellEl.textContent = playerArray[i];
                if (playerArray[i]!== null)
                    cellEl.style.backgroundColor = "green"; //--> show lighter color
            }
        }
    }
    flagsLeft.innerHTML = numFlagsLeft;
}


// function checkWin(cellID){
//     if (playerArray[cellID] === "bomb")
//         return "game over";
//     else {
//         let win = true;
//         while (win === true && i<boardArray.length)
//         {
//             if (playerArray[i] === boardArray[i] || (playerArray[i] === "flag" && boardArray[i] === "bomb")){
//                 win = true;
//             }
//             i++;
//         }
//     return win;
//     }
// }

function isWinner(){
    for (let i = 0; i<playerArray.length; i++){
        if(playerArray[i] === "flag" && boardArray[i] === "bomb")
        return true;
    }
}



/*----- functions -----*/

function init(){
    var numSquares =0;
    for (let i=0; i<numRows; i++){
        var row = table.insertRow(i);
        for (let j=0; j<numCols; j++){
            var cell = row.insertCell(-1); //accepts -1 or 0. -1 is to the left
            //cell.innerHTML = `${numSquares}`; //this is just to show the id of each cell so i know what it is
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
    genBombs(30,0);
    genNum();
    numFlagsLeft = 30;
    isGameOver = false;
    render();
    //rendering - init func shoudl render initial bombs and numbers but be HIDDEN until clicked. so anctually inital render shoudln't show anythign at all
    //so maybe init func wont have render func. render shoudl be referenced in handleclick. inside render func:
    //inside render func: need to pass target?? unknown. if bomb show bomb image. 
}


function rndIdx(numBombs){  //pass in num for either numRows or numCols that we want to multiply by
    return idx = Math.floor(Math.random()*numBombs);
}

// function genBombs(numBombs){
//     for (let i=0; i<numBombs; i++){
//         let bombIndex = rndIdx(boardArray.length);
//         if(boardArray[bombIndex]!=="-" && boardArray[bombIndex] !== "bomb"){
//             /*********//////////document.getElementById(bombIndex).innerHTML = "bomb"; //PLACEHOLDER CODE to show where bombs are curently, will need ot render the code
//             boardArray[bombIndex] = "bomb"; //add to board array where bombs are
//         }
//     }
//     return boardArray; 
// }

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

function test(){
for (let i = 0; i<boardArray.length; i++){
    let a = document.getElementById(i);
    a.textContent = boardArray[i];
}
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