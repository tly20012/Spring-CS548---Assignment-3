const express = require('express')
const router = express.Router()

// Student data
const data = require('../database/2024-spring-student-info.json')

// Get client's device type & IP address
router.use((req, res, next) => {
    req.userIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress
    req.deviceType = req.header('User-Agent')
    next()
})

// GET  / to retrieve all the student-info
router.get('/students', (req, res) => {
    res.json({ data, userIp: req.userIp, deviceType: req.deviceType })
})

// POST /to retrieve your information based on 'student-id'
router.post('/students', (req, res) => {
    const { studentId } = req.body
    if (!studentId) {
        return res.status(400).json({ error: 'Please provide a student ID' })
    }

    // Find the student with the given studentId
    const student = data.find(student => student.student_id === studentId)
    if (!student) {
        return res.status(404).json({ error: 'Student not found' })
    }

    res.json({ student, userIp: req.userIp, deviceType: req.deviceType })
})

// POST /to retrieve student's info who has taken CS548 -> the result should be all students ( return student-id only)
router.post('/cs548/students', (req, res) => {

    // Filter students who have taken CS548 and return their student-id
    const studentIds = data.filter(student =>
        student.courses.some(course => course.course_id === 'CS548')
    ).map(student => student.student_id)

    res.json({ studentIds: studentIds, userIp: req.userIp, deviceType: req.deviceType })
})

// POST /to retrieve who has taken the courses you have taken except CS548
router.post('/myTakenCoursesExceptCS548/students', (req, res) => {
    const { studentId } = req.body
    if (!studentId) {
        return res.status(400).json({ error: 'Please provide a student ID' })
    }

    // Find the student with the given studentId
    const student = data.find(student => student.student_id === studentId)
    if (!student) {
        return res.status(404).json({ error: 'Student not found' })
    }

    // Filter the courses that the student has taken except CS548
    const coursesTakenByMe = student.courses.filter(course => course.course_id !== 'CS548').map(course => course.course_id)

    // Find other students who have taken the same courses except CS548
    // The response should be all other students with their common courses (except CS548) with the given student

    const studentsTakingSameCourses = data.filter(otherStudent =>
        otherStudent.student_id !== studentId && otherStudent.courses.some(course =>
            coursesTakenByMe.includes(course.course_id)))
        .map(otherStudent => {
            const commonCourses = otherStudent.courses.filter(course =>
                coursesTakenByMe.includes(course.course_id)
            );
            return { ...otherStudent, courses: commonCourses }
        })

    res.json({ students: studentsTakingSameCourses, userIp: req.userIp, deviceType: req.deviceType })
})

module.exports = router
