const snackeDasck = document.querySelector('.snackeDasck');
const fild_element_X = 15;
const fild_element_Y = 15;
let direction = 'y+';
let SNAKE_SPEED = 200;
let FOOD_SPEED = 6000;
let point = 0;
let isStart = false;
let snacke = [];
// let localStorageResults = [];
const pointWatch = document.querySelector('span');
const btnStart = document.querySelector('.btnStart');
const btnRestart = document.querySelector('.btnRestart');
const finishCount = document.querySelector('.finishCount');


function initStart() {
    playingField()
    pointWatch.textContent = point

    btnStart.addEventListener('click', startGame);
    btnRestart.addEventListener('click', refreshGame);
    addEventListener('keydown', changeDirection);
}

initStart()

function playingField() {
    const table = document.createElement('table');
    table.setAttribute('class', 'tableGame');
    for (let i = 0; i < fild_element_X; i++) {
        var tr = document.createElement('tr');
        tr.setAttribute('class', `table_tr tr_${i}`);

        for (let y = 0; y < fild_element_Y; y++) {
            let td = document.createElement('td');
            td.setAttribute('class', `table_td td_${i}_${y}`);

            tr.append(td);
        }

        table.appendChild(tr);
    }

    snackeDasck.appendChild(table);

}


function haveFood(unit) {
    let check = false;

    let unit_classes = unit.getAttribute('class').split(' ');

    if (unit_classes.includes('foodUnit')) {
        check = true;
        creatFood();
        point++;
        pointWatch.textContent = point;
    }
    return check;
}



function creatFood() {
    let food = false;

    while (!food) {
        var food_X = Math.floor(Math.random() * fild_element_X);
        var food_Y = Math.floor(Math.random() * fild_element_Y);

        var food_td = document.querySelector(`.td_${food_Y}_${food_X}`);
        var food_td_classes = food_td.getAttribute('class').split(' ');

        if (!food_td_classes.includes('snackeUnit')) {
            food_td.setAttribute('class', food_td.getAttribute('class') + ' foodUnit');
            food = true;
        }
    }
}

function isSnakeUnit(unit) {
    let check = false;

    if (snacke.includes(unit)) {
        check = true;
    }
    return check;
}



function move() {
    let snake_head_classes = snacke[snacke.length - 1].getAttribute('class').split(' ');

    let new_unitHead;
    var snake_coords = snake_head_classes[1].split('_');
    var coord_y = parseInt(snake_coords[1]);
    var coord_x = parseInt(snake_coords[2]);

    if (direction === 'y+') {
        new_unitHead = document.querySelector(`.td_${coord_y - 1}_${coord_x}`)
    }
    if (direction === 'y-') {
        new_unitHead = document.querySelector(`.td_${coord_y + 1}_${coord_x}`)
    }
    if (direction === 'x-') {
        new_unitHead = document.querySelector(`.td_${coord_y}_${coord_x - 1}`)
    }
    if (direction === 'x+') {
        new_unitHead = document.querySelector(`.td_${coord_y}_${coord_x + 1}`)
    }

    // console.log(new_unitHead)

    if (new_unitHead === null) {
        finishTheGame();
    }

    if (!haveFood(new_unitHead)) {
        let removed = snacke.splice(0, 1)[0];
        let classes = removed.getAttribute('class').split(' ');

        removed.setAttribute('class', classes[0] + ' ' + classes[1]);
    } else {
        if (SNAKE_SPEED > 50) {
            SNAKE_SPEED -= 15;
            clearInterval(snake_timer);
            snake_timer = setInterval(move, SNAKE_SPEED);
        }
    }

    if (!isSnakeUnit(new_unitHead)) {
        new_unitHead.setAttribute('class', new_unitHead.getAttribute('class') + ' snackeUnit');
        snacke.push(new_unitHead);
    }
    else {
        finishTheGame();
    }


}



function start_creat_body() {
    let snacke_start_coord_x = Math.floor(fild_element_X / 2);
    let snacke_start_coord_y = Math.floor(fild_element_Y / 2);

    let snacke_head = document.querySelector(`.td_${snacke_start_coord_x}_${snacke_start_coord_y}`);
    snacke_head.setAttribute('class', snacke_head.getAttribute('class') + ' snackeUnit');

    let snacke_tail = document.querySelector(`.td_${snacke_start_coord_x - 1}_${snacke_start_coord_y}`);
    snacke_tail.setAttribute('class', snacke_tail.getAttribute('class') + ' snackeUnit');

    snacke.push(snacke_head);
    snacke.push(snacke_tail);
    pointWatch.textContent = point;
}


function refreshGame() {
    location.reload();
}


function startGame() {
    if (!isStart) {
        isStart = true;

        btnStart.className = "notactive";

        creatFood()
        start_creat_body()

        snake_timer = setInterval(move, SNAKE_SPEED);
        food_timer = setInterval(creatFood, FOOD_SPEED);


    }
}

function changeDirection(e) {
    switch (e.keyCode) {
        case 37: // Клавиша влево
            if (direction != 'x+') {
                direction = 'x-'
            }
            break;
        case 38: // Клавиша вверх
            if (direction != 'y-') {
                direction = 'y+'
            }
            break;
        case 39: // Клавиша вправо
            if (direction != 'x-') {
                direction = 'x+'
            }
            break;
        case 40: // Клавиша вниз
            if (direction != 'y+') {
                direction = 'y-'
            }
            break;
    }
}

function saveLocakStorage(point) {
    if (localStorage.length > 10) {
        let dellNum = localStorage.length - 8;
        for (let i = 0; i < dellNum; i++) {
            localStorage.removeItem(localStorage.key(i))
        }
    }

    localStorage.setItem(`Ваш результат за ${new Date().getSeconds()} секунд`, JSON.stringify(point));
}

function finishTheGame() {
    isStart = false;
    clearInterval(snake_timer);
    clearInterval(food_timer);
    finishCount.textContent = `Вы заработали ${point} очков`;
    saveLocakStorage(point);

}