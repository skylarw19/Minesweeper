/*----- constants -----*/

/*----- app's state (variables) -----*/
let boardArray = []; //stores what is in each sq of the game board
let playerArray =[]; //input what player assigns to later compare boardArray to playerArray to check if win
let numRows = 10; //can be user input in future
let numCols = 10;
let boardSize = numRows*numCols;
let bombIdxArr = [];

/*----- cached element references -----*/
const table = document.querySelector('table');
const tr = document.querySelector('tr');
const td = document.querySelector('td');

/*----- event listeners -----*/
table.addEventListener('click',handleclick);
table.addEventListener('contextmenu',handleDoubleClick);

function handleclick(evt){
    let cellID = evt.target.id;
    console.log(cellID);
    evt.target.innerHTML = cellID;   
    // once clicked, show Image
    // if click is bomb, lose 
    // if click is 0, expand board
}

function handleDoubleClick(evt){
    let cellID = evt.target.id;
    console.log("hello" + cellID);
    evt.target.innerHTML = "double";
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
    //genBombs(25); // init function should generate bombs
    //genNum(); // init func should genNum into board array
    //rendering - init func shoudl render initial bombs and numbers but be HIDDEN until clicked.
    //so maybe init func wont have render func. render shoudl be referenced in handleclick. inside render func:
    //inside render func: need to pass target?? unknown. if bomb show bomb image. 
}

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

function rndIdx(numBombs){  //pass in num for either numRows or numCols that we want to multiply by
    return idx = Math.floor(Math.random()*numBombs);
}

function genBombs(numBombs){
    for (let i=0; i<numBombs; i++){
        let bombIndex = rndIdx(boardArray.length);
        document.getElementById(bombIndex).innerHTML = "bomb"; //PLACEHOLDER CODE to show where bombs are curently, will need ot render the code
        bombIdxArr.push(bombIndex); //used just to test out what the boms are
        boardArray[bombIndex] = "bomb"; //add to board array where bombs are
    }
    return bombIdxArr; 
}

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

function genNum(){
    for (let i=0; i<boardArray.length; i++){
        for (let j=0; j<boardArray[0].length; j++){
        
                // if(boardArray[i-1][j-1] !== undefined && boardArray[i-1][j-1] !== "bomb")
                //     boardArray[i-1][j-1]++;
                // if(boardArray[i-1][j] !== undefined && boardArray[i-1][j] !== "bomb")
                //     boardArray[i-1][j]++;
                // if(boardArray[i-1][j+1] !== undefined && boardArray[i-1][j+1] !== "bomb")
                //     boardArray[i-1][j+1]++;
                // if(boardArray[i][j-1] !== undefined && boardArray[i][j-1] !== "bomb")
                //     boardArray[i][j-1]++;
                // if(boardArray[i][j+1] !== undefined && boardArray[i][j+1] !== "bomb")
                //     boardArray[i][j+1]++;
                // if(boardArray[i+1][j-1] !== undefined && boardArray[i+1][j-1] !== "bomb")
                //     boardArray[i+1][j-1]++;
                // if(boardArray[i+1][j] !== undefined && boardArray[i+1][j] !== "bomb")
                //     boardArray[i+1][j]++;
                // if(boardArray[i+1][j+1] !== undefined && boardArray[i+1][j+1] !== "bomb")
                //     boardArray[i+1][j+1]++;
            }
        }
    }

function render(){

}
init();
genBombs(25);

// init();
// genNum();
// console.log(boardArray);

// cell02 = document.getElementById('02');
// cell02.style.backgroundColor = "red";
// cell02.textContent = 'blah';

