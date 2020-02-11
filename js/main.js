/*----- constants -----*/

/*----- app's state (variables) -----*/
let boardArray = []; //stores what is in each sq of the game board
let playerArray =[]; //input what player assigns to later compare boardArray to playerArray to check if win
//or maybe dont compare boards but if all bombs are flagged --> win. then during handleclik checkwin?? 
//or make player array the same as board array immediately. but change the the bombs to flags/vice versa.
let numRows = 12; //can be user input in future
let numCols = 12;

/*----- cached element references -----*/
const table = document.querySelector('table');

/*----- event listeners -----*/
table.addEventListener('click',reveal);
table.addEventListener('contextmenu',flag);
//table.addEventListener('dblclick',questionMark); 

function reveal(evt){
    let cellID = evt.target.id;
    //console.log(cellID); //coment out
    /***********************/// evt.target.innerHTML = boardArray[cellID]; //show on the board what is in the board array. woudl need to pass cellID to render func to display
    if (playerArray[cellID] === null /* OR EQUALS FLAG */){  //if playerarr cell is empty OR equals flag
        playerArray[cellID] = boardArray[cellID]; //set player array to what board array ele is
        //will need to add something here to check win condition if they click a bomb
        //console.log(playerArray); //comment out
    }  
    if(boardArray[cellID]===0) //if it clicked on zero
        search(cellID);
    // once clicked, show Image/number
    // if click is bomb, lose 
    // if click is 0, expand board
    // if it already shows a number/blank then it can't be clicked again
    render();
}


function render(){
    for (let i=0; i<boardArray.length; i++){
        let cellID = document.getElementById(i);
        if (playerArray[i] !== "-"){
            if (playerArray[i]==="bomb"){
                cellID.style.backgroundColor = "red";
            } else {
                cellID.textContent = playerArray[i];
                if (playerArray[i]!== null)
                    cellID.style.backgroundColor = "green";
            }
        }
    }
}

function flag(evt){
    let cellID = evt.target.id;
    //console.log("hello" + cellID);
    evt.preventDefault(); //prevents rightclikc menu from popping up
    //evt.target.innerHTML = "rClick";
    //when you right click, you're flaggin it. 
    evt.target.style.backgroundImage = "url('https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/237/snowflake_2744.png')";

}

// function questionMark(evt){
//     let cellID = evt.target.id;
//     playerArray[cellID] = "?"; 
//     console.log("hello")
// }


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
    genBombs(25);
    genNum();
    //rendering - init func shoudl render initial bombs and numbers but be HIDDEN until clicked. so anctually inital render shoudln't show anythign at all
    //so maybe init func wont have render func. render shoudl be referenced in handleclick. inside render func:
    //inside render func: need to pass target?? unknown. if bomb show bomb image. 
}


function rndIdx(numBombs){  //pass in num for either numRows or numCols that we want to multiply by
    return idx = Math.floor(Math.random()*numBombs);
}

function genBombs(numBombs){
    for (let i=0; i<numBombs; i++){
        let bombIndex = rndIdx(boardArray.length);
        // with border
        if(boardArray[bombIndex]!=="-"){
            /*********//////////document.getElementById(bombIndex).innerHTML = "bomb"; //PLACEHOLDER CODE to show where bombs are curently, will need ot render the code
            boardArray[bombIndex] = "bomb"; //add to board array where bombs are
        }
        //////////////////////////////////
    }
    return boardArray; 
}

function isBomb(i){
    return boardArray[i]==="bomb";
}


function search(i){
    i = parseInt(i);
    let location = [i-numCols-1,i-numCols,i-numCols+1,i+1,i+numCols+1,i+numCols,i+numCols-1,i-1];
    for (let j=0; j<8; j++){
        if (boardArray[location[j]] !== 0 && boardArray[location[j]] !== "bomb"){
            if (playerArray[location[j]] === null){
                playerArray[location[j]] = boardArray[location[j]];
                document.getElementById(`${location[j]}`).innerHTML = playerArray[location[j]];  ///placeholder code. render function will display ALL of player Array
            } 
        }
        else if (boardArray[location[j]]===0){
            if (playerArray[location[j]] === null){
                playerArray[location[j]] = boardArray[location[j]];
                document.getElementById(`${location[j]}`).innerHTML = playerArray[location[j]]; ///placeholder code. render function will display ALL of player Array
                search(location[j]);
            }
        }
    }
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

init();


// function genNum(){
//     for (let i=0; i<boardArray.length; i++){
//         let count = 0;
//         sqType = squareType(i);
//         if (boardArray[i]!=="bomb"){
//             switch (sqType){
//                 case "top left corner": 
//                     if(isBomb(1)) count++;
//                     if(isBomb(numCols)) count++;
//                     if(isBomb(numCols+1)) count++;
//                     break;
//                 case "top right corner":
//                     if(isBomb(i-1)) count++; //left 
//                     if(isBomb(i+numCols-1)) count++; //bot left
//                     if(isBomb(i+numCols)) count++; //bot
//                     break;
//                 case "top row":
//                     if(isBomb(i-1)) count++; //left 
//                     if(isBomb(i+1)) count++; //right 
//                     if(isBomb(i+numCols-1)) count++; //bot left
//                     if(isBomb(i+numCols)) count++; //bot
//                     if(isBomb(i+numCols+1)) count++; //bot right
//                     break;
//                 case "bot left corner":
//                     if(isBomb(i-numCols)) count++; //top
//                     if(isBomb(i-numCols+1)) count++; //top right
//                     if(isBomb(i+1)) count++; //right
//                     break;
//                 case "left col":
//                     if(isBomb(i-numCols)) count++; //top
//                     if(isBomb(i-numCols+1)) count++; //top right
//                     if(isBomb(i+1)) count++; //right
//                     if(isBomb(i+numCols+1)) count++; //bot right
//                     if(isBomb(i+numCols)) count++; //bot
//                     break;
//                 case "bot right corner":
//                     if(isBomb(i-1)) count++;
//                     if(isBomb(i-numCols)) count++;
//                     if(isBomb(i-numCols-1)) count++;
//                     break;
//                 case "right col":
//                     if(isBomb(i-numCols)) count++; //top
//                     if(isBomb(i-numCols-1)) count++; //top left
//                     if(isBomb(i-1)) count++; //left 
//                     if(isBomb(i+numCols-1)) count++; //bot left
//                     if(isBomb(i+numCols)) count++; //bot
//                     break;
//                 case "bot row":
//                     if(isBomb(i-1)) count++; //left 
//                     if(isBomb(i-numCols-1)) count++; //top left
//                     if(isBomb(i-numCols)) count++; //top
//                     if(isBomb(i-numCols+1)) count++; //top right
//                     if(isBomb(i+1)) count++; //right
//                     break;
//                 default:
//                     if(isBomb(i-numCols-1)) count++; //top left
//                     if(isBomb(i-numCols)) count++; //top
//                     if(isBomb(i-numCols+1)) count++; //top right
//                     if(isBomb(i+1)) count++; //right
//                     if(isBomb(i+numCols+1)) count++; //bot right
//                     if(isBomb(i+numCols)) count++; //bot
//                     if(isBomb(i+numCols-1)) count++; //bot left
//                     if(isBomb(i-1)) count++; //left 
//                     break;
//             }
//             boardArray[i] = count;
//         }
//     }
//     return boardArray;
// }

// function squareType(i){
//     if (i<numCols){
//         if (i===0) return "top left corner";
//         else if (i===numCols-1) return "top right corner";
//         else return "top row"
//     } else if (i%numCols===0){
//         if (i===boardArray.length-numCols) return "bot left corner"
//         else return "left col"
//     } else if ((i+1)%numCols===0){
//         if (i===boardArray.length-1) return "bot right corner"
//         else return "right col"
//     } else if (i>(boardArray.length-numCols) && i<boardArray.length) return "bot row";
//     else return "regular";
// }




// function init(){
//     for (let i=0; i<numRows; i++){
//         boardArray[i] = new Array(); //create new array within array (row array)
//         var row = table.insertRow(i);
//         for (let j=0; j<numCols; j++){
//             var cell = row.insertCell(-1); //accepts -1 or 0. -1 is to the left
//             //cell.innerHTML = `${i}${j}`; //this is just to show the id of each cell so i know what it is
//             cell.id=`${i}${j}`; //each td of the cell has an id matching an arrayindex
//             boardArray[i].push(0); //push to end of current row array (i) - initial board array will have value starting as 0
//         }
//     }
//     genBombs(25);
// }

// function genBombs(num){ //pass in how many bombs to generate
//     for (let i=0; i<num; i++){
//         let rowIdx = rndIdx(numRows);
//         let colIdx = rndIdx(numCols);
//         bombIndex = `${rowIdx}${colIdx}`;
//         // are these 2 lines needed? what if i push this into an array and then do getelementbyid(${array[idx]}) for rendering. first line below is place hodler
//         document.getElementById(bombIndex).innerHTML = "bomb"; //put bombs on board // this is just PLACEHOLDER CODE i wouldn't show bomb until they accidentally click it
//         bombIdxArr.push(bombIndex); //do i even need this
//         //
//         boardArray[rowIdx][colIdx] = "bomb"; //add bomb to board array that stores bomb/num
//     }
//     return bombIdxArr; 
//     //numBombs = bombIdxArr.length;
// }

// function genNum(){
//     for (let i=0; i<boardArray.length; i++){
//         for (let j=0; j<boardArray[0].length; j++){
        
//                 // if(boardArray[i-1][j-1] !== undefined && boardArray[i-1][j-1] !== "bomb")
//                 //     boardArray[i-1][j-1]++;
//                 // if(boardArray[i-1][j] !== undefined && boardArray[i-1][j] !== "bomb")
//                 //     boardArray[i-1][j]++;
//                 // if(boardArray[i-1][j+1] !== undefined && boardArray[i-1][j+1] !== "bomb")
//                 //     boardArray[i-1][j+1]++;
//                 // if(boardArray[i][j-1] !== undefined && boardArray[i][j-1] !== "bomb")
//                 //     boardArray[i][j-1]++;
//                 // if(boardArray[i][j+1] !== undefined && boardArray[i][j+1] !== "bomb")
//                 //     boardArray[i][j+1]++;
//                 // if(boardArray[i+1][j-1] !== undefined && boardArray[i+1][j-1] !== "bomb")
//                 //     boardArray[i+1][j-1]++;
//                 // if(boardArray[i+1][j] !== undefined && boardArray[i+1][j] !== "bomb")
//                 //     boardArray[i+1][j]++;
//                 // if(boardArray[i+1][j+1] !== undefined && boardArray[i+1][j+1] !== "bomb")
//                 //     boardArray[i+1][j+1]++;
//             }
//         }
//     }
//
