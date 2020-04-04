const { Pool } = require('pg')

const pool = new Pool({
  user: 'test',
  password: '123123123',
  host: '116.203.90.25',
  port: 7777,
  database: 'students_hobbies',
})

module.exports = pool
