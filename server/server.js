
const express = require('express');
const pool = require('./database');
const cors = require('cors')

const port = process.env.PORT || 4000;
const app = express();


app.use(cors({ origin: 'http://localhost:8082', credentials: true }));
app.use(express.json());

app.listen(port, () => {
    console.log("Server is listening to port " + port)
});


app.get('/api/courses', async(req, res) => {
    try {
        console.log("A GET all request has arrived");
        const course = await pool.query(
            "SELECT * FROM courses"
        );
        res.json(course.rows);
    } catch (err) {
        console.error(err.message);
    }
});

app.get('/api/courses/:id', async(req,res) => {
    try{
        console.log("get a course with route parameter  request has arrived");
        const { id } = req.params;
        console.log(req.params.id);
        console.log(id);
        const courses = await pool.query(
            "SELECT * FROM courses WHERE id = $1", [id]
        );
        res.json(courses.rows[0]);
    } catch(err) {
        console.error(err.message);
    }
});

app.put('/api/courses/:id', async(req, res) => {
    try {
        console.log("put arrived");
        const {id} = req.params;
        const course = req.body;

        const updateCourse = await pool.query(
            "UPDATE courses SET (coursename, coursecode, max, registered, available, groupsnumbers, description) = ($2, $3, $4, $5, $6, $7, $8) WHERE id = $1", [id, course.coursename, course.coursecode, course.max, course.registered, course.available, course.groupsnumbers, course.description]
        );
        res.json(updateCourse);
    } catch(err) {
        console.error(err.message);
    }
})

