const express = require('express')
const mysql = require('mysql')
const myconn = require('express-myconnection')
const routes = require("./routes") 
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
    res.send('Welcome to my Api Rest')
});
app.use("/flights", routes)

// server running
app.listen(app.get('port'), ()=> {
    console.log('server running on port', app.get('port'));
})