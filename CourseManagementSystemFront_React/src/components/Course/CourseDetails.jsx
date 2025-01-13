import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Card,
  Row,
  Col,
  Badge,
  Table,
  Button,
  Modal,
  Form,
} from "react-bootstrap";
import { toast } from "react-hot-toast";

const CourseDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [showInstructorModal, setShowInstructorModal] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5168/api/course/${id}`
        );
        setCourse(response.data);
        toast.success("Course details fetched successfuly!");
      } catch (err) {
        toast.error("Course not found");
        console.error("Error fetching course:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  if (loading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Course Details</h2>

      <Card className="shadow-lg border-0 animate-card">
        <Card.Header className="bg-primary text-white d-flex justify-content-between align-items-center">
          <h3 className="mb-0">{course.courseName}</h3>
          <Badge bg="light" text="primary">
            {course.status}
          </Badge>
        </Card.Header>

        <Card.Body>
          <Row>
            <Col md={6}>
              <dl className="row">
                <dt className="col-sm-4">Course ID:</dt>
                <dd className="col-sm-8">{course.courseId}</dd>

                <dt className="col-sm-4">Course Description:</dt>
                <dd className="col-sm-8">{course.description}</dd>

                <dt className="col-sm-4">Credits:</dt>
                <dd className="col-sm-8">{course.credits}</dd>

                <dt className="col-sm-4">Instructor:</dt>
                <dd className="col-sm-8">
                  {course.instructor ? (
                    <Button
                      variant="link"
                      className="p-0 text-decoration-none"
                      onClick={() => setShowInstructorModal(true)}
                    >
                      <i className="bi bi-info-circle me-1"></i>
                      {course.instructor.firstName} {course.instructor.lastName}
                    </Button>
                  ) : (
                    <span>Not Assigned</span>
                  )}
                </dd>
              </dl>
            </Col>

            <Col md={6}>
              <h4>Classroom Information</h4>
              {course.classroom ? (
                <dl className="row">
                  <dt className="col-sm-4">Classroom Name:</dt>
                  <dd className="col-sm-8">{course.classroom.classroomName}</dd>

                  <dt className="col-sm-4">Capacity:</dt>
                  <dd className="col-sm-8">{course.classroom.capacity}</dd>
                </dl>
              ) : (
                <p>No classroom assigned.</p>
              )}
            </Col>
          </Row>

          <h4 className="mt-4">Enrolled Students</h4>
          {course.enrollments && course.enrollments.$values.length > 0 ? (
            <div className="table-responsive">
              <Table striped hover>
                <thead>
                  <tr>
                    <th>Student ID</th>
                    <th>Student Name</th>
                    <th>Enrollment Date</th>
                    <th>Grade</th>
                  </tr>
                </thead>
                <tbody>
                  {course.enrollments.$values.map((enrollment) => (
                    <tr key={enrollment.enrollmentId}>
                      <td>{enrollment.student?.studentId}</td>
                      <td>
                        <Link to={`/students/${enrollment.student?.studentId}`}>
                          {enrollment.student?.firstName} {enrollment.student?.lastName}
                        </Link>
                      </td>
                      <td>{new Date(enrollment.enrollmentDate).toLocaleDateString()}</td>
                      <td>
                        {enrollment.grade ?? (
                          <span className="text-muted">Not graded</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          ) : (
            <p>No students enrolled in this course.</p>
          )}
        </Card.Body>

        <Card.Footer>
          <Button
            variant="primary"
            className="me-2"
            onClick={() => navigate(`/courses/edit/${course.courseId}`)}
          >
            Edit
          </Button>
          <Button variant="secondary" onClick={() => navigate("/courses")}>
            Back to List
          </Button>
        </Card.Footer>
      </Card>

      {/* Instructor Modal */}
      <Modal show={showInstructorModal} onHide={() => setShowInstructorModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Instructor Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Instructor ID</Form.Label>
              <Form.Control
                type="text"
                value={course.instructor?.instructorId}
                disabled
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                value={course.instructor?.firstName}
                disabled
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                value={course.instructor?.lastName}
                disabled
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={course.instructor?.email}
                disabled
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Hire Date</Form.Label>
              <Form.Control
                type="date"
                value={course.instructor?.hireDate?.split('T')[0]}
                disabled
              />
            </Form.Group>

            {/* <Form.Group className="mb-3">
              <Form.Label>Courses</Form.Label>
              <div className="d-flex flex-wrap gap-2">
                {course.instructor?.courses?.map((course) => (
                  <Badge key={course.courseId} bg="info">
                    {course.courseName}
                  </Badge>
                ))}
              </div>
            </Form.Group> */}
          </Form>
        </Modal.Body>
      </Modal>

      <style>{`
        .animate-card {
          animation: fadeIn 1s;
        }
        .card {
          transition: all 0.3s ease-in-out;
        }
        .card:hover {
          box-shadow: 0 1rem 3rem rgba(0,0,0,.175)!important;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </Container>
  );
};

export default CourseDetails;