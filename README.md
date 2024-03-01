# Spring-CS548---Assignment-3

1.Create a HTTPS Server

2. Copy this JSON in a file https://github.com/CS548-2024Spring/SFBU-info/blob/main/2024-spring-student-info.jsonLinks to an external site.

3. Create a routes for:

GET  / to retrieve all the student-info
POST /to retrieve your information based on 'student-id'
POST /to retrieve student's info who has taken CS548 -> the result should be all students ( return student-id only)
POST /to retrieve who has taken the courses you have taken except CS548. (Hint: Pass your student-id  for example for Rahel its CS522, find out who has taken this course) one of the logic could be this 
students.filter(student => student.courses.some(course => course.course_id === course_id)

Additional Requirement:

All request should be check client's device and IP Address
Git initialization is must!!!
Return the user device type in each routes. (example: if Shaban is using Windows the return on all routes should be as follows:

{

{// your information based on the routes}

}

deviceType: "Windows"
}

Note: if you are using POSTMAN if should say, "Runtime environment"

> How to run

`node index.js`
