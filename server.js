const express = require('express')
const mysql = require('mysql')
const myconn = require('express-myconnection')

const app = express()
app.set('port', process.env.PORT || 9000)
const dbOptions = {
    host: 'mdb-test.c6vunyturrl6.us-west-1.rds.amazonaws.com',
    user: 'bsale_test',
    password: 'bsale_test',
    database: 'airline'
}


// middlewares
app.use(myconn(mysql, dbOptions, 'single'))

// routes
app.get('/', (req, res) =>{
    res.send('Welcome to my API')
});

app.get('/flights', (req, res) => {
    req.getConnection((err, conn) => {
        if(err) return res.send(err)

        conn.query('SELECT * FROM flight', (err, rows) => {
            if(err) return res.send(err)

            res.json(rows)
        })
    })
})


// server running
app.listen(app.get('port'), ()=> {
    console.log('server running on port', app.get('port'));
})