import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./components/Shared/Layout";

import Classroom from "./pages/Classroom.jsx";
import Course from "./pages/Course.jsx";
import Enrollment from "./pages/Enrollment.jsx";
import Instructor from "./pages/Instructor.jsx";
import Student from "./pages/Student.jsx";

import CreateClassroom from "./components/Classroom/CreateClassroom";
import ClassroomDetail from "./components/Classroom/ClassroomDetail";
import EditClassroom from "./components/Classroom/EditClassroom";

import CreateInstructor from "./components/Instructor/CreateInstructor";

import CreateCourse from "./components/Course/CreateCourse";
import EditCourse from "./components/Course/EditCourse";
import CourseDetails from "./components/Course/CourseDetails";

import CreateStudent from "./components/Student/CreateStudent";
import EditStudent from "./components/Student/EditStudent";
import StudentDetails from "./components/Student/StudentDetails";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/classrooms" element={<Classroom />} />
          <Route path="/courses" element={<Course />} />
          <Route path="/enrollments" element={<Enrollment />} />
          <Route path="/instructors" element={<Instructor />} />
          <Route path="/students" element={<Student />} />

          <Route path="/classrooms/create" element={<CreateClassroom />} />
          <Route path="/classrooms/details/:id" element={<ClassroomDetail />} />
          <Route path="/classrooms/edit/:id" element={<EditClassroom />} />

          <Route path="/instructors/create" element={<CreateInstructor />} />

          <Route path="/courses/create" element={<CreateCourse />} />
          <Route path="/courses/edit/:id" element={<EditCourse />} />
          <Route path="/courses/:id" element={<CourseDetails />} />

          <Route path="/students/create" element={<CreateStudent />} />
          <Route path="/students/edit/:id" element={<EditStudent />} />
          <Route path="/students/:id" element={<StudentDetails />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
