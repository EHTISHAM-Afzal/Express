const express = require("express");
const customMiddlware = require("./middlware/customMiddleware.js");
const morgan = require("morgan");

const app = express();


// Middleware

app.use(express.json())

// Custome Middlewares

app.use(customMiddlware)
app.use(morgan("dev"))


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
    const {sort} = req.query
    if (sort && sort.toLocaleLowerCase() === "desc") {
        res.send(courses.reverse())
    } else{
        res.send(courses)
    }
})

app.get("/error", (req, res) => {
    throw new Error("Oops i made a mistake")
})


// Query Parameters

app.get("/query", (req, res) => {
    res.send(req.query? req.query : "no query parameters")
})



// POST Method /create data

app.post('/courses', (req, res) => {
    const course = {
        id: courses.length + 1,
        courseName: req.body.courseName
    }
    if (req.body.courseName === undefined) return res.status(400).send("course name is required")
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



app.get("/courses/:coursename", (req, res) => {
    const course = courses.find(c => c.courseName === req.params.coursename)
    if (!course) return res.status(404).send("the course you are looking for is not found")
    res.send(course)
})

// 404 route

app.use(function (req, res, next) {
    res.status(404).send('Sorry cant find that!');
})


// Error  handling

app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send(err.message)
})

const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log(`the app is running on port ${port} `)
})

