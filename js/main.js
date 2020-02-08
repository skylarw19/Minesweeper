/*----- constants -----*/
const table = document.querySelector('table');
const tr = document.querySelector('tr');
const td = document.querySelector('td');

/*----- app's state (variables) -----*/
let cellID = []; //create array to store cell id.. 

/*----- cached element references -----*/
/*----- event listeners -----*/
/*----- functions -----*/

// function render(){
//     for (let i=0; i<10; i++){
//         var row = table.insertRow(i);
//         for (let j=0; j<10; j++){
//             var cell = row.insertCell(-1); //accepts -1 or 0. -1 is to the left
//             cell.innerHTML = `${i}${j}`;
//             cell.id=`${i}${j}`; //store id of cell -- should i put this in an array?
//             cellID.push(cell.id);
//         }
//     }
// }

function render(){
    for (let i=0; i<10; i++){
        cellID[i] = new Array(); //create new array within array (row array)
        var row = table.insertRow(i);
        for (let j=0; j<10; j++){
            var cell = row.insertCell(-1); //accepts -1 or 0. -1 is to the left
            cell.innerHTML = `${i}${j}`;
            cell.id=`${i}${j}`; //store id of cell -- should i put this in an array?
            cellID[i].push(cell.id); //push to end of current row array (i)
        }
    }
}


render();
console.log(cellID);
// cell02 = document.getElementById('02');
// cell02.textContent = 'blah';

