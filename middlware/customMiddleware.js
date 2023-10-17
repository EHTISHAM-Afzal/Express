const customMiddlware = (req, res, next) => {
    console.log("i am first middleware")
    next()
}

module.exports = customMiddlware