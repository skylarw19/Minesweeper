/*----- constants -----*/
const table = document.querySelector('table');
const tr = document.querySelector('tr');
const td = document.querySelector('td');

/*----- app's state (variables) -----*/
let cellIDArray = []; //create array to store cell id.. ---> do i even need this?
let numRows = 10; //can be user input in future
let numCols = 10;

/*----- cached element references -----*/


/*----- event listeners -----*/
/*----- functions -----*/

function initialRender(){
    for (let i=0; i<numRows; i++){
        cellIDArray[i] = new Array(); //create new array within array (row array)
        var row = table.insertRow(i);
        for (let j=0; j<numCols; j++){
            var cell = row.insertCell(-1); //accepts -1 or 0. -1 is to the left
            //cell.innerHTML = `${i}${j}`; //this is just to show the id of each cell so i know what it is
            cell.id=`${i}${j}`; //store id of cell -- should i put this in an array?
            cellIDArray[i].push(cell.id); //push to end of current row array (i)
        }
    }
}

function rndIdx(num){  //pass in num for either numRows or numCols that we want to multiply by
    return idx = Math.floor(Math.random()*num);
}

function genBombs(num){ //pass in how many bombs to generate
    let bombArr =[];
    for (let i=0; i<num; i++){
        let rowIdx = rndIdx(numRows);
        let colIdx = rndIdx(numCols);
        bombIndex = `${rowIdx}${colIdx}`;
        bombArr.push(bombIndex);
    }
    //return bombArr;

}






initialRender();
console.log(cellIDArray);
// cell02 = document.getElementById('02');
// cell02.style.backgroundColor = "red";
// cell02.textContent = 'blah';

