let express = require('express');

let app = express();

let cors = require('cors');

const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.use(cors());


let field =  [
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
];

let playerTrack = null;
let winner = null;

function getIndexToBellowEmptyCell(arrColumn, y) {
    /*Проверяем есть ли пустые поля ниже выбранной ячейки, если ДА, возвращаем её индекс*/
    for(let i = arrColumn.length -1; i >= y; i--) {
        if(arrColumn[i] === null) {
            return i;
        }
    }
};

function checkAxis_X(x, y, curTrack) {
    let count = 1,
        step = 1;
    /*проверяем влево от текущего*/
    while(field[x - step] !== undefined && field[x - step][y] === curTrack) {
        if(count !== 4) {
            count++;
            step++;
        }
    }
    step = 1;
    
    /*проверяем вправо от текущего*/
    while(field[x + step] !== undefined && field[x + step][y] === curTrack) {
        if(count !== 4) {
            count++;
            step++;
        }
    }
    
    if(count >= 4) {
        winner = curTrack;
    }
}

app.get('/field', function(req, res) {
    res.send(field);
});

app.post('/move', function(req, res) {
    let x = req.body.x;
    let y = req.body.y;
    /*Проверяем занята ли ячейка*/
    if(field[x][y] !== null) {
        return;
    }

    /*Если есть пустая ячейка ниже получаем её индекс, иначе текущий*/
    let newtPositionOnAxis_Y = getIndexToBellowEmptyCell(field[x], y);

    /*Устанавливаем в ячейку текущего игрока или возвращаем поле*/
    switch(playerTrack) {
        case null: 
        playerTrack = req.body.player;
        break;
        case req.body.player:
        res.send(field); 
        return;
        default:
        playerTrack = req.body.player;
    }
    
    field[x][newtPositionOnAxis_Y] = playerTrack;

     /*Проверяем, есть ли победитель*/
     /*Проверка оси Х*/
    checkAxis_X(x, newtPositionOnAxis_Y, playerTrack);
    winner === null? res.send(field): res.send({field: field, winner: winner});
});

app.listen(5000, function() {
    console.log('server is ready');
});