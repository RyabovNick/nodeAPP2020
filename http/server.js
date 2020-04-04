const http = require('http')
// Подключаем коннектор к PostgreSQL
const pool = require('../config/db')

http
  .createServer((req, res) => {
    const id = parseInt(req.url.replace('/', ''))
    if (isNaN(id)) {
      res.end('Your value not a number')
      return
    }

    // Выполнение запроса к БД
    pool.query(`SELECT * FROM students WHERE id = ${id}`, (err, result) => {
      if (err) {
        console.log(err)
      }

      // Взять 1-ый элемент массива
      const [student] = result.rows // result.rows массив, если что-то нашли

      // Какой content-type возвращает
      res.setHeader('Content-Type', 'application/json')

      // если переменная student имеет значение
      if (student) {
        res.end(JSON.stringify(student))
      } else {
        res.statusCode = 204
        res.end()
      }
    })
  })
  .listen(3000)
