// Подключаем коннектор к PostgreSQL
const { Client } = require('pg') // пакет pg (npm i pg)

// Создание нового подключения к БД
const client = new Client({
  user: 'test',
  password: '123123123',
  host: '116.203.90.25',
  port: 7777,
  database: 'students_hobbies'
})

client.connect() // Подключение с указанными в client значениями

// Выполнение запроса к БД
client.query('SELECT * FROM students', (err, res) => {
  if (err) {
    console.log(err)
  }

  // в res.rows - массив объектов. Каждый объект - студент
  console.log(res.rows)

  const students = res.rows

  for (const student of students) {
    console.log(`${student.name} ${student.surname} ${student.n_group}`)
  }

  client.end()
})
