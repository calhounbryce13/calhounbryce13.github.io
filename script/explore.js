'use strict';

const MAX = 15
const SIZE = 10

const WALLS = [
    [8, 0],
    [7, 0],
    [6, 0],    
    [5, 0],
    [4, 9],
    [5, 9],
    [6, 9],    
    [7, 9],
    [6, 3],
    [6, 4],
    [6, 5],    
    [6, 6],
    [0, 8],
    [0, 9],
    [1, 6],
    [2, 6],
    [8, 5],
    [9, 5],
    [8, 7],
    [9, 7],
    [9, 8],
    [2, 8],
    [4, 7],
    [5, 7],
    [8, 3],
    [8, 2],
    [9, 3],
    [9, 2],
    [0, 0],
    [0, 1],
    [0, 3],    
    [1, 4],
    [2, 0],
    [2, 2],
    [3, 3],
    [4, 3],
    [4, 4],
    [4, 5],
    [4, 1],
    [5, 1],
]

const START = [0, 5]



document.addEventListener("DOMContentLoaded", () => {
    back_to_home();
    maze_setup();
    show_explore();
    toggle_search_functionality();
    reset_maze();
});

const show_explore = function(){
    if(document.getElementsByClassName('explore-content')){
        setTimeout(() => {
            Array.from(document.getElementsByClassName('explore-content'))[0].classList.add('explore-content-shown');
        }, 500);
    }
}

const toggle_search_method = function(event){
    const parent = event.target.parentNode;
    parent.classList.toggle('breadth-selected');
    if(parent.classList.contains('breadth-selected')){
        event.target.textContent = 'BFS';
        return;
    }
    event.target.textContent = 'DFS';
    return
}

const toggle_search_functionality = function(){
    if(document.getElementsByClassName('toggle-switch')){
        const toggleSwitch = Array.from(document.getElementsByClassName('toggle-switch'))[0];
        toggleSwitch.addEventListener('click', (event) => toggle_search_method(event));
    }
}

const back_to_home = function(){
    Array.from(document.getElementsByClassName('back'))[0].addEventListener('click', () => {
        window.location.assign('index.html');
    });
}

const remove_maze = function(){
    const maze = Array.from(document.getElementsByClassName('maze'))[0];
    while((maze.children).length > 0){
        maze.removeChild(maze.lastChild);
    }
}

const reset_maze = function(){
    document.getElementById('reset').addEventListener('click', () => {
        if(document.getElementsByClassName('maze')){
            remove_maze();
            const x = JSON.parse(localStorage.getItem('goal'))[0];
            const y = JSON.parse(localStorage.getItem('goal'))[1];
            const cell = Array.from(document.getElementsByClassName('row'))[x].children[y];
            remove_maze_goal(cell);
            maze_setup();
        }
    });
}

const wall_cell = function(cell){

    for(const wall of WALLS){
        if(wall[0] == cell[0] && wall[1] == cell[1]){
            return true;
        }
    }
    return false;
}

const start_cell = function(cell){

    if(cell[0] == START[0] && cell[1] == START[1]){
        return true;
    }
    return false;
}

const generate_grid = function(dimensions){
    console.log()
    if(typeof dimensions === 'number'){
        if(dimensions > 0 && dimensions < MAX){
            for(let i = 0; i < dimensions; i++){
                const row = document.createElement('div');
                row.classList.add('row');
                for(let j = 0; j < dimensions; j++){
                    const cell = document.createElement('div');
                    cell.classList.add('cell');
                    if(wall_cell([i, j])){
                        cell.classList.add('wall');
                    }
                    else if(start_cell([i, j])){
                        cell.classList.add('start');
                    }
                    else if(localStorage.getItem('goal')){
                        if(JSON.parse(localStorage.getItem('goal'))[0] == i && JSON.parse(localStorage.getItem('goal'))[1] == j){
                            cell.classList.add('goal');
                        }
                    }
                    row.appendChild(cell);
                }
                Array.from(document.getElementsByClassName('maze'))[0].appendChild(row);
            }
            return;
        }
        console.log("error: dimension out of size range");
        return;
    }
    console.log("error: input dimension must be a number");
    return;

}

const add_maze_goal = function(cell, x, y){
    cell.classList.add('goal');
    localStorage.setItem('goal', JSON.stringify([x, y]));
}

const remove_maze_goal = function(cell){
    cell.classList.remove('goal');
    localStorage.removeItem('goal');
}

const cell_functionality = function(event, x, y){
    const cell = event.target;
    if(!(cell.classList.contains('wall'))){
        if(!(cell.classList.contains('start'))){
            if(!(localStorage.getItem('goal'))){
                add_maze_goal(cell, x, y);
                return;
            }
            if(cell.classList.contains('goal')){
                remove_maze_goal(cell);
                return;
            }
            cell.classList.add('wall');
            return;
        }
        console.log("start cell clicked on");
        start_search();
        return
    }
    cell.classList.remove('wall');
    return;
}

const tap_goal_functionality = function(){
    const rows = Array.from(document.getElementsByClassName('row'));
    for(let x = 0; x < rows.length; x++){
        const cells = rows[x].children;
        for(let y = 0; y < cells.length; y++){
            const cell = rows[x].children[y];
            cell.addEventListener('click', (event) => cell_functionality(event, x, y))
        }
    }

}

const maze_setup = function(){
    generate_grid(SIZE);
    tap_goal_functionality();
}

const current_is_target = function(current, target){
    for(let i = 0; i < 2; i++){
        if(current[i] != target[i]) return false;
    }
    const maze = Array.from(document.getElementsByClassName('maze'))[0];
    const cell = maze.children[current[0]].children[current[1]];
    for(let i = 0; i < 10; i++){
        setTimeout(() => {
            cell.classList.toggle('goal');
        }, i * 250);
    }
    return true;
}

const mark_visited = function(current){
    const rows = Array.from(document.getElementsByClassName('row'));
    const row = rows[current[0]];
    const cell = row.children[current[1]];
    cell.classList.add('visited');
}

const valid_neighbor = function(given){
    if(given[0] >= 0 && given[1] >= 0){
        if(given[0] < SIZE && given[1] < SIZE){
            const rows = Array.from(document.getElementsByClassName('row'));
            const cell = rows[given[0]].children[given[1]];
            if(!(cell.classList.contains('wall')) && !(cell.classList.contains('visited'))){
                return true;
            }
        }
    }
    return false;

}

const get_neighbors = function(current){
    const neighbors = [];


    if(valid_neighbor([current[0] - 1, current[1]])){   // up
        neighbors.push([current[0] - 1, current[1]])
    }
    if(valid_neighbor([current[0], current[1] - 1])){   // left
        neighbors.push([current[0], current[1] - 1])
    }
    if(valid_neighbor([current[0] + 1, current[1]])){   // down
        neighbors.push([current[0] + 1, current[1]])
    }
    if(valid_neighbor([current[0], current[1] + 1])){   // right
        neighbors.push([current[0], current[1] + 1])
    }

    return neighbors;
}

const search = async(start, target) => {
    const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
    const frontier = [];
    let current = start
    frontier.push(start);
    do{
        if(Array.from(document.getElementsByClassName('selection'))[0].classList.contains('breadth-selected')){
            current = frontier.shift();
        }
        else{
            current = frontier.pop();
        }
        if(current_is_target(current, target)) break;
        mark_visited(current);
        const neighbors = get_neighbors(current);
        if(neighbors.length > 0){
            for(const neighbor of neighbors){
                frontier.push(neighbor);
            }
        }
        await sleep(250);
    }while(frontier.length > 0);
}


const start_search = function(){
    if(localStorage.getItem('goal')){
        const start = START;
        const target = [JSON.parse(localStorage.getItem('goal'))[0], JSON.parse(localStorage.getItem('goal'))[1]];
        search(start, target);
        return;
    }
    window.alert("error: goal needs to be set first");
}

const start_search_functionality = function(){
    Array.from(document.getElementsByClassName('start'))[0].addEventListener('click', start_search)
}


