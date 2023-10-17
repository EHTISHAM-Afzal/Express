const express = require("express");
const customMiddlware = require("./middlware/customMiddleware.js");
const morgan = require("morgan");
const Mapstore = require('./data/dbFunctions.js');
const store = new Mapstore("dbs.json");

const app = express();


// Middleware

app.use(express.json())

// Custome Middlewares

app.use(customMiddlware)
app.use(morgan("dev"))


// GET Method /read data

app.get("/", async (req, res) => {
    store.readDb()
        .then(data => res.send(data))
        .catch(err => {
            console.log(err)
            res.status(500).send("Internal Server Error")
            throw new Error();
        })
})

app.get("/about", (req, res) => {
    res.send("this is about page")
})

app.get('/courses', async (req, res) => {
    const { sort } = req.query
    store.readCourses().then(courses => {
        if (courses.length === 0) {
            return res.status(404).send("no courses found")
        }
        else if (sort && sort.toLocaleLowerCase() === "desc") {
            res.send(courses.reverse())
        } else {
            res.send(courses)
        }
    })
})


app.get("/courses/:coursename", (req, res) => {
    store.readCourseByName(req.params.coursename)
        .then(course => {
            res.send(course)
        }).catch(err => {
            res.status(404).send("the course you are looking for is not found")
            throw new Error(err)
        })
})

app.get("/error", (req, res) => {
    throw new Error("Oops i made a mistake")
})


// Query Parameters

app.get("/query", (req, res) => {
    res.send(req.query ? req.query : "no query parameters")
})



// POST Method /create data

app.post('/courses', (req, res) => {
    store.saveCourse(req.body).then((course) => {
        res.send(course)
    }).catch((err) => {
        res.status(500).send("Internal Server Error")
        throw new Error(err)
    })
})


// PUT Method /update data

app.put('/courses/:coursename', (req, res) => {
    store.updateCourseByName(req.params.coursename , req.body).then((course) => {
        res.send(course)
    })
})


// DELETE Method /delete data

app.delete("/courses/:coursename", (req, res) => {
    store.deleteCourseByName(req.params.coursename).then((course) => {
        res.send(course)
    })
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

