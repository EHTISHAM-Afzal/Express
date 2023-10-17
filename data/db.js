const Mapstore = require('./dbFunctions.js');
const store = new Mapstore("dbs.json");
// store.save('hello.txt', 'hello world');
// console.log(store.read())


store.saveCourse({ courseName : "Java"})
// console.log(store.readCourses())
