/*----- constants -----*/
const table = document.querySelector('table');
const tr = document.querySelector('tr');
const td = document.querySelector('td');

/*----- app's state (variables) -----*/
let cellID = []; //create array to store cell id.. 

/*----- cached element references -----*/
/*----- event listeners -----*/
/*----- functions -----*/

function init(){
    var x = document.createElement("td")
    tr.appendChild(x);
}

function render(){
    for (let i=0; i<10; i++){
        var row = table.insertRow(i);
        for (let j=0; j<10; j++){
            var cell = row.insertCell(-1); //accepts -1 or 0. -1 is to the left
            cell.innerHTML = `${i}${j}`;
            cell.id=`${i}${j}`; //store id of cell -- should i put this in an array
            cellID[i].push(cell.id);
        }
    }
}


render();
console.log(cellID);
