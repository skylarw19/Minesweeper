/*----- constants -----*/
const table = document.querySelector('table');
const tr = document.querySelector('tr');
const td = document.querySelector('td');

/*----- app's state (variables) -----*/
let cellIDArray = []; //create array to store cell id.. ---> do i even need this?

/*----- cached element references -----*/


/*----- event listeners -----*/
/*----- functions -----*/

function initialRender(){
    for (let i=0; i<10; i++){
        cellIDArray[i] = new Array(); //create new array within array (row array)
        var row = table.insertRow(i);
        for (let j=0; j<10; j++){
            var cell = row.insertCell(-1); //accepts -1 or 0. -1 is to the left
            //cell.innerHTML = `${i}${j}`; //this is just to show the id of each cell so i know what it is
            cell.id=`${i}${j}`; //store id of cell -- should i put this in an array?
            cellIDArray[i].push(cell.id); //push to end of current row array (i)
        }
    }
}

function rndIdxI(){
    return idx = Math.floor(Math.random()*10);
}


initialRender();
console.log(cellIDArray);
// cell02 = document.getElementById('02');
// cell02.textContent = 'blah';

