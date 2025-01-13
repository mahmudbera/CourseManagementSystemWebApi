import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Table,
  Badge,
  Alert,
  Modal,
  Form,
} from "react-bootstrap";
import CourseFilters from "../components/Shared/CoursesMenu/CourseFilters";
import { toast } from "react-hot-toast";

const Enrollment = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showGradeModal, setShowGradeModal] = useState(false);
  const [selectedEnrollment, setSelectedEnrollment] = useState(null);

  const [newEnrollment, setNewEnrollment] = useState({
    studentId: "",
    courseId: "",
    enrollmentDate: new Date().toISOString(),
  });

  const [gradeForm, setGradeForm] = useState({
    enrollmentId: "",
    studentId: "",
    courseId: "",
    enrollmentDate: "",
    grade: "",
  });

  const [filteredEnrollments, setFilteredEnrollments] = useState([]);

  useEffect(() => {
    if (!enrollments.length) return;

    const params = new URLSearchParams(window.location.search);
    const courseId = params.get("courseId");

    if (courseId) {
      const filtered = enrollments.filter(
        (enrollment) => enrollment.courseId === parseInt(courseId)
      );
      setFilteredEnrollments(filtered);
    } else {
      setFilteredEnrollments(enrollments);
    }
  }, [enrollments]);

  const handleFilterChange = useCallback(
    (courseId) => {
      if (!courseId) {
        setFilteredEnrollments(enrollments);
      } else {
        const filtered = enrollments.filter(
          (enrollment) => enrollment.courseId === courseId
        );
        setFilteredEnrollments(filtered);
      }
    },
    [enrollments]
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [enrollmentsRes, studentsRes, coursesRes] = await Promise.all([
          axios.get("http://localhost:5168/api/enrollment"),
          axios.get("http://localhost:5168/api/student"),
          axios.get("http://localhost:5168/api/course"),
        ]);

        const enrollmentsData = enrollmentsRes.data.$values;
        setEnrollments(enrollmentsData);
        setFilteredEnrollments(enrollmentsData);
        setStudents(studentsRes.data.$values);
        setCourses(coursesRes.data.$values);

        toast.success("Data loaded successfully!");
      } catch (err) {
        toast.error("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCreateEnrollment = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5168/api/enrollment",
        newEnrollment
      );

      const getEnrollments = await axios.get(
        "http://localhost:5168/api/enrollment"
      );
      const newEnrollments = getEnrollments.data.$values;
      setEnrollments(newEnrollments);
      const params = new URLSearchParams(window.location.search);
      const courseId = params.get("courseId");
      if (courseId) {
        const filtered = newEnrollments.filter(
          (enrollment) => enrollment.courseId === parseInt(courseId)
        );
        setFilteredEnrollments(filtered);
      } else {
        setFilteredEnrollments(newEnrollments);
      }
      setNewEnrollment({
        studentId: "",
        courseId: "",
        enrollmentDate: new Date().toISOString(),
      });

      toast.success("Enrollment created successfully!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create enrollment");
    } finally {
      setShowCreateModal(false);
    }
  };

  const handleDeleteEnrollment = async (id) => {
    try {
      await axios.delete(`http://localhost:5168/api/enrollment/${id}`);
      setEnrollments(enrollments.filter((e) => e.enrollmentId !== id));

      toast.success("Success")
    } catch (err) {
      toast.error("Error")
    } finally {
      setShowDeleteModal(false);
    }
  };

  const handleUpdateGrade = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5168/api/enrollment/${gradeForm.enrollmentId}`,
        gradeForm
      );
      const updatedEnrollments = enrollments.map((e) =>
        e.enrollmentId === gradeForm.enrollmentId
          ? { ...e, grade: gradeForm.grade }
          : e
      );
      toast.success(response.data?.message);
      setEnrollments(updatedEnrollments);
    } catch (err) {
      console.log(err)
      toast.error(err.response?.data?.message)
    } finally {
      setShowGradeModal(false);
    }
  };

  return (
    <Container fluid>
      <Row className="min-vh-100">
        <Col md={2} className="border-end bg-light py-3">
          <CourseFilters onFilterChange={handleFilterChange} />
        </Col>

        <Col md={10}>
          <Card className="shadow-lg border-0 my-3 animate-card">
            <Card.Header className="bg-primary text-white py-3">
              <div className="d-flex justify-content-between align-items-center">
                <h1 className="h3 mb-0">Enrollments</h1>
                <Button
                  variant="light"
                  onClick={() => setShowCreateModal(true)}
                >
                  <i className="bi bi-plus-circle me-2"></i> Create New
                  Enrollment
                </Button>
              </div>
            </Card.Header>

            <Card.Body>
              {loading ? (
                <div className="text-center">Loading...</div>
              ) : filteredEnrollments.length === 0 ? (
                <Alert variant="info">
                  <i className="bi bi-info-circle me-2"></i>
                  No enrollments found. Click the "Create New Enrollment" button
                  to add one.
                </Alert>
              ) : (
                <div className="table-responsive">
                  <Table striped hover className="align-middle">
                    <thead className="table-light">
                      <tr>
                        <th>ID</th>
                        <th>Student Name</th>
                        <th>Course Name</th>
                        <th>Enrollment Date</th>
                        <th>Grade</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredEnrollments.map((enrollment) => (
                        <tr key={enrollment.enrollmentId}>
                          <td>{enrollment.enrollmentId}</td>
                          <td>
                            {enrollment.student.firstName}{" "}
                            {enrollment.student.lastName}
                          </td>
                          <td>{enrollment.course.courseName}</td>
                          <td>
                            {new Date(
                              enrollment.enrollmentDate
                            ).toLocaleDateString()}
                          </td>
                          <td>
                            {enrollment.grade ? (
                              <Badge bg="success">{enrollment.grade}</Badge>
                            ) : (
                              <Badge bg="warning" text="dark">
                                Not graded
                              </Badge>
                            )}
                            <Button
                              variant="outline-primary"
                              size="sm"
                              className="ms-2"
                              onClick={() => {
                                setGradeForm({
                                  enrollmentId: enrollment.enrollmentId,
                                  studentId: enrollment.studentId,
                                  courseId: enrollment.courseId,
                                  enrollmentDate: enrollment.enrollmentDate,
                                  grade: enrollment.grade || "",
                                });
                                setShowGradeModal(true);
                              }}
                            >
                              <i className="bi bi-pencil-square"></i> Edit Grade
                            </Button>
                          </td>
                          <td>
                            <Button
                              variant="outline-danger"
                              size="sm"
                              onClick={() => {
                                setSelectedEnrollment(enrollment);
                                setShowDeleteModal(true);
                              }}
                            >
                              <i className="bi bi-trash"></i> Delete
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Create Enrollment Modal */}
      <Modal show={showCreateModal} onHide={() => setShowCreateModal(false)}>
        <Modal.Header closeButton className="bg-primary text-white">
          <Modal.Title>Create New Enrollment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Student</Form.Label>
              <Form.Select
                value={newEnrollment.studentId}
                onChange={(e) =>
                  setNewEnrollment({
                    ...newEnrollment,
                    studentId: e.target.value,
                  })
                }
                required
              >
                <option value="">Select a student</option>
                {students.map((student) => (
                  <option key={student.studentId} value={student.studentId}>
                    {student.firstName} {student.lastName}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Course</Form.Label>
              <Form.Select
                value={newEnrollment.courseId}
                onChange={(e) =>
                  setNewEnrollment({
                    ...newEnrollment,
                    courseId: e.target.value,
                  })
                }
                required
              >
                <option value="">Select a course</option>
                {courses.map((course) => (
                  <option key={course.courseId} value={course.courseId}>
                    {course.courseName}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCreateModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleCreateEnrollment}>
            Create Enrollment
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton className="bg-danger text-white">
          <Modal.Title>
            <i className="bi bi-exclamation-triangle me-2"></i>
            Confirm Deletion
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedEnrollment && (
            <>
              <p>
                Are you sure you want to delete the enrollment for{" "}
                <strong>
                  {selectedEnrollment.student.firstName}{" "}
                  {selectedEnrollment.student.lastName}
                </strong>{" "}
                in <strong>{selectedEnrollment.course.courseName}</strong>?
              </p>
              <p className="text-danger mb-0">
                <small>This action cannot be undone.</small>
              </p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={() =>
              handleDeleteEnrollment(selectedEnrollment.enrollmentId)
            }
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Edit Grade Modal */}
      <Modal show={showGradeModal} onHide={() => setShowGradeModal(false)}>
        <Modal.Header closeButton className="bg-primary text-white">
          <Modal.Title>Edit Grade</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Grade</Form.Label>
              <Form.Control
                type="number"
                step="0.1"
                min="0"
                max="100"
                value={gradeForm.grade}
                onChange={(e) =>
                  setGradeForm({ ...gradeForm, grade: e.target.value })
                }
                required
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowGradeModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleUpdateGrade}>
            Save Changes
          </Button>
        </Modal.Footer>
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
        .table-hover tbody tr {
          transition: all 0.2s ease-in-out;
        }
        .table-hover tbody tr:hover {
          background-color: rgba(0,0,0,.075)!important;
        }
        .btn-group .btn {
          transition: all 0.2s ease-in-out;
        }
        .btn-group .btn:hover {
          transform: translateY(-2px);
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </Container>
  );
};

export default Enrollment;
