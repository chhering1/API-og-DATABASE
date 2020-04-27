const mysql = require('mysql2');
const db = mysql.createConnection({
    'host': 'localhost',
    'user': 'root',
    'password': '',
    'database': 'birgers_bolcher'
});

let host = "http://localhost:3333"
let version = "/api/v1";

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

    app.get( version + '/products', function (req, res) {
        db.query(sql, function (err, rows) {
            //console.log(rows)
           
            if (err) {
                res.send(err)
            } else {
                let obj = {};
            obj.data = rows
            obj.url = host + version + '/products';
            
                res.send(obj);
            }
        })
    });

    app.get('/products/:id', function (req, res) {
        db.query(sql, function (err, rows) {
            console.log(req.params.id)
            if (err) {
                res.send(err)
            } else {
                res.send(req.params.id)
            }
        })
    });

    app.get('/farve', function (req, res) {
        let sql = "SELECT id, navn FROM farver"

        db.query(sql, function(err, rows) {
            if(err) throw new Error (err)

            res.send(rows)

            res.send(rows)
        })
    });
    
    app.get('/styrke', function (req, res) {
        let sql = "SELECT id, navn FROM styrke"

        db.query(sql, function(err, rows) {
            if(err) throw new Error (err)

            res.send(rows)
        })
    });

    app.get('/smag', function (req, res) {
        let sql = "SELECT id, navn FROM smag"

        db.query(sql, function(err, rows) {
            if(err) throw new Error (err)

            res.send(rows)
        })
    });

    app.get('/surhed', function (req, res) {
        let sql = "SELECT id, navn FROM surhed"

        db.query(sql, function(err, rows) {
            if(err) throw new Error (err)

            res.send(rows)
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

app.post('/products', function(req, res){
    let sql = `INSERT INTO bolche 
    SET navn=?,
    pris=?,
    vægt = ?,
    fk_smag =?,
    fk_surhed = ?,
    fk_styrke = ?,
    fk_farve = ? `;
    db.query(sql, [ req.body.navn, req.body.pris, req.body.vaegt, 
        req.body.fk_smag, req.body.fk_surhed, req.body.fk_styrke, 
        req.body.fk_farve], function(err, result) {
            if(err) throw new Error(err);
            res.status(201);
            res.end();
        });

    res.send()
    console.log(req.body)
})

app.post('/farve', function (req, res) {
    let sql = ` INSERT INTO farver
    SET navn = ? `;
    db.query( sql, req.body.navn, function (err, result){
        if(err){
            console.log(err);
            res.status(500).end()
            return;
        };
        res.status(201).end();
      
    });
    
});

app.post('/smag', function (req, res) {
    let sql = ` INSERT INTO smag
    SET navn = ? `;
    db.query( sql, req.body.navn, function (err, result){
        if(err){
            console.log(err);
            res.status(500).end()
            return;
        };
        res.status(201).end();
    });
    
});

app.post('/styrke', function (req, res) {
    let sql = ` INSERT INTO styrke
    SET navn = ? `;
    db.query( sql, req.body.navn, function (err, result){
        if(err){
            console.log(err);
            res.status(500).end()
            return;
        };
        res.status(201).end();
    });
    
});

app.post('/surhed', function (req, res) {
    let sql = ` INSERT INTO surhed
    SET navn = ? `;
    db.query( sql, req.body.navn, function (err, result){
        if(err){
            console.log(err);
            res.status(500).end()
            return;
        };
        res.status(201).end();
    });
    
});




}