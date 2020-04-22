const mysql = require('mysql2');
const db = mysql.createConnection({
    'host': 'localhost',
    'user': 'root',
    'password': '',
    'database': 'birgers_bolcher'
});

module.exports = function (app) {
    const sql = `SELECT 

       bolche.navn as 'navn',
       bolche.pris as 'pris',
       bolche.vægt as 'vægt',
       farver.navn as 'farve',
       styrke.navn as 'styrke',
       smag.navn as 'smag',
       surhed.navn as 'surhed'
       
       FROM bolche

inner join farver on bolche.fk_farve = farver.id 
inner join styrke on bolche.fk_styrke = styrke.id 
inner join smag on bolche.fk_smag = smag.id 
inner join surhed on bolche.fk_surhed = surhed.id
        `;

        const sqlsingle = sql + ' WHERE  id = ? ';

    app.get('/getAll', function (req, res) {
        db.query(sql, function (err, rows) {
            if (err) {
                res.send(err)
            } else {
                res.send(rows)
            }
        })
    });

    app.get('/getAll/:id', function (req, res) {
        db.query(sql, function (err, rows) {
            console.log(req.params.id)
            if (err) {
                res.send(err)
            } else {
                res.send(req.params.id)
            }
        })
    });
    

    app.get('/', function (req, res){
        res.send("Tekst fra et route")
    })
    app.get('/test', function(req, res){
        res.send("Dette er en test")
    })
    app.get('/author', function (req, res) {
        let user = {
            "firstname": "Chhering",
            "lastname": "Lama"
        }
        res.send(user)
    })
}