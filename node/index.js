const express = require('express')
const mysql = require('mysql')

const { config } = require('./config')

const app = express()
const PORT = 3000

const connection = mysql.createConnection(config)
connection.query('CREATE TABLE IF NOT EXISTS people(id int NOT NULL AUTO_INCREMENT, name varchar(255) NOT NULL, PRIMARY KEY(id))')

const users = [['João'], ['Matheus'], ['Pedro'], ['Rafael']]
connection.query('INSERT INTO people(name) VALUES ?', [users])
connection.end()

app.get('/', (req, res) => {
    const connection = mysql.createConnection(config)
    connection.query('SELECT * FROM people', (err, result) => {
        if (err) {
            console.log(err);
        } else {
            const allUsers = `
                <h1>Full Cycle Rocks!</h1>
                <ul>
                    ${result.map(user => `<li>${user.name}</li>`).join('')}
                </ul>
            `
            connection.end()
            res.send(allUsers)
        }
    })
})

app.listen(3000, () => {
    console.log(`Server is running on port ${PORT}`)
})
