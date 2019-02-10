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

function getIndexToBellowEmptyCell(arrColumn, y) {
    /*Проверяем есть ли пустые поля ниже выбранной ячейки, если ДА, возвращаем её индекс*/
    for(let i = arrColumn.length -1; i >= y; i--) {
        if(arrColumn[i] === null) {
            return i;
        }
    }
}
app.get('/field', function(req, res) {
    res.send(field);
});

app.post('/move', function(req, res) {
    const x = req.body.x;
    const y = req.body.y;
    const trackCurrentPlayer = req.body.trackCurrentPlayer;
    /*Проверяем занята ли ячейка*/
    if(field[x][y] !== null) {
        return;
    }

    /*Если есть пустая ячейка ниже получаем её индекс, иначе текущий*/
    const newtPositionOnAxis_Y = getIndexToBellowEmptyCell(field[x], y);

    /*Устанавливаем в ячейку метку текущего игрока*/
    field[x][newtPositionOnAxis_Y] = trackCurrentPlayer;

    console.log(newtPositionOnAxis_Y);

    res.send(field);
});

app.listen(5000, function() {
    console.log('server is ready');
});