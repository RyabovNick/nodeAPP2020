const express = require('express')
const pool = require('./config/db')
const app = express()
const port = 3000

// для парсинга json (req.body) в API запросах
app.use(express.json())

app.get('/courses_with_hobbies', async (req, res) => {
  const query = `
  WITH all_students AS (
    SELECT substr(st.n_group::varchar, 1, 1) as course,
    count(*)::real as c
    FROM students st
    GROUP BY substr(st.n_group::varchar, 1, 1)
    ), students_with_hobbies AS (
      SELECT  substr(st.n_group::varchar, 1, 1) as course,
              count(distinct st.id)::real as c
      FROM students st
      INNER JOIN students_hobbies sh ON st.id = sh.student_id
      WHERE sh.date_finish is null
      GROUP BY substr(st.n_group::varchar, 1, 1)
    )
    
  SELECT a_s.course, swh.c/a_s.c as proportion
  FROM all_students a_s
  INNER JOIN students_with_hobbies swh ON a_s.course = swh.course
  WHERE swh.c/a_s.c > 0.3
  `

  try {
    const { rows } = await pool.query(query)
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(rows))
  } catch (err) {
    console.log('err: ', err)
    res.statusCode = 400
    res.end()
  }
})

app.get('/hobbies', async (req, res) => {
  const query = 'SELECT id, name, risk::real FROM hobbies'

  try {
    const { rows } = await pool.query(query)
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(rows))
  } catch (err) {
    console.log('err: ', err)
    res.statusCode = 400
    res.end()
  }
})

// url example: http://localhost:3000/student?id=10
app.get('/student/:id', async (req, res) => {
  const { id } = req.params
  const query = `SELECT * FROM students WHERE id = $1`

  // Запрос к базе async/await
  try {
    const result = await pool.query(query, [id])
    // Проверка, если запрос ничего не возвращает
    if (!result) {
      res.statusCode = 204
      res.end()
      return
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

    console.log('Three')
  } catch (err) {
    console.log('err: ', err)
    res.statusCode = 400
    res.end()
  }
})

/**
 * Запрос к базе в callback стиле
 */
function calbackQuery() {
  pool.query(query, [id], (err, result) => {
    console.log('Two')
    if (err) {
      console.log('err: ', err)
      res.statusCode = 400
      res.end()
    }

    // Проверка, если запрос ничего не возвращает
    if (!result) {
      res.statusCode = 204
      res.end()
      return
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
}

app.post('/student', function (req, res) {
  const { name, surname, n_group, phone, city, score, birth_date } = req.body

  res.send('Got a POST request')
})

app.put('/user', function (req, res) {
  res.send('Got a PUT request at /user')
})

app.delete('/user', function (req, res) {
  res.send('Got a DELETE request at /user')
})

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
)
