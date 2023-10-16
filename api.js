const express = require("express");


const app = express();


app.use(express.json())

const courses = [
    {
        "id": 1,
        "courseName": "JavaScript"
    },
    {
        "id": 2,
        "courseName": "Java"
    },
    {
        "id": 3,
        "courseName": "Python"
    }
]

// GET Method /read data

app.get("/", (req, res) => {
    res.send("Helllo ihtisham")
})

app.get("/about", (req, res) => {
    res.send("this is about page")
})

app.get('/courses', (req, res) => {
    res.send(courses)
})


// POST Method /create data

app.post('/courses', (req, res) => {
    const course = {
        id: courses.length + 1,
        courseName: req.body.courseName
    }
    courses.push(course)
    res.send(course)
})


// PUT Method /update data

app.put('/courses/:coursename', (req, res) => {
    const course = courses.find(c => c.courseName === req.params.coursename)
    if (!course) res.status(404).send("the course you are looking for is not found")
    course.courseName = req.body.courseName
    res.send(course)
})


// DELETE Method /delete data

app.delete("/courses/:coursename", (req, res) => {
    const course = courses.find(c => c.courseName === req.params.coursename)
    if (!course) res.status(404).send("the course you are looking for is not found")
    const index = courses.indexOf(course)
    courses.splice(index, 1)
    res.send(courses)
})



// Query Parameters

app.get("/course", (req, res) => {
    res.send(req.query)
})



app.get("/courses/:coursename", (req, res) => {
    const course = courses.find(c => c.courseName === req.params.coursename)
    if (!course) {
        return res.status(404).send("the course you are looking for is not found")
    } else {
        res.send(course)
    }
})


const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log(`the app is running on port ${port} `)
})

