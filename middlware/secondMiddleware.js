const secondMiddleWare = (req, res, next) => {
    console.log("i am second middleware")
    next()
}

module.exports = secondMiddleWare