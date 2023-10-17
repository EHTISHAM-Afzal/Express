const fs = require('fs');
const path = require('path');

const datadir = 'data'


class MapStore {
    constructor(fileName) {
        this.filepath = path.resolve(datadir, fileName);
    }

    async readCourses() {
        console.log(`Reading File ${this.filepath}`)
        const data = fs.readFileSync(this.filepath, 'utf-8');
        const parsedData = JSON.parse(data);
        return parsedData.Courses;
    }
    async readDb() {
        console.log(`Reading File ${this.filepath}`)
        const parsedData = JSON.parse(fs.readFileSync(this.filepath, 'utf-8'));
        return parsedData;
    }
    async readCourseByName(name) {
        const data = JSON.parse(fs.readFileSync(this.filepath));
        const course = data.Courses.find(c => c.courseName === name);
        if (!course) return "Course Not Found";
        return course;
    }

    async updateCourseByName(name, data) {
        const courses = JSON.parse(fs.readFileSync(this.filepath));
        const course = courses.Courses.find(c => c.courseName === name);
        if (!course) return "Course Not Found";
        const updatedCourse = {
            Courses: courses.Courses.map(course => course.courseName === name ? { ...course, ...data } : course)
        }
        fs.writeFileSync(this.filepath, JSON.stringify(updatedCourse, undefined, 2));
        return `Course Updated`;
    }

    async saveCourse(data) {
        console.log(`Saving to ${this.filepath}...\n`)
        let courses = JSON.parse(fs.readFileSync(this.filepath));
        courses.Courses.push({ id: courses.Courses.length + 1, createdAt: new Date().toUTCString(), ...data });
        const serializedData = JSON.stringify(courses, undefined, 2);
        fs.writeFileSync(this.filepath, serializedData);
        console.log("successfully saved")
        return `course Saved with Course Name ${data.courseName}`;
    };

    async deleteCourseById(id) {
        const data = JSON.parse(fs.readFileSync(this.filepath));
        const course = data.Courses.find(c => c.id === id);
        if (!course) return "Course Not Found";
        const index = data.Courses.indexOf(course);
        data.Courses.splice(index, 1);
        fs.writeFileSync(this.filepath, JSON.stringify(data, undefined, 2));
        return "Course Deleted";
    }

    async deleteCourseByName(name) {
        const data = JSON.parse(fs.readFileSync(this.filepath));
        const course = data.Courses.find(c => c.courseName === name);
        if (!course) return "Course Not Found";
        const index = data.Courses.indexOf(course);
        data.Courses.splice(index, 1);
        fs.writeFileSync(this.filepath, JSON.stringify(data, undefined, 2));
        return "Course Deleted";
    }
}

module.exports = MapStore;