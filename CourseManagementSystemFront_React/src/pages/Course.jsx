import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Card, Button, Badge, Modal, Alert } from "react-bootstrap";
import { toast } from "react-hot-toast";

const Course = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("http://localhost:5168/api/course");
        setCourses(response.data?.$values || []);
        toast.success("Courses loaded successfully!");
        setLoading(false);
      } catch (err) {
        const errorMessage =
          err.response?.data?.Error || "Failed to fetch courses";
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:5168/api/course/${id}`
      );
      setCourses(courses.filter((course) => course.courseId !== id));
      toast.success("Course deleted successfully!");
    } catch (err) {
      toast.error(err.response?.data);
    } finally {
      setShowDeleteModal(false);
    }
  };

  const getStatusBadgeVariant = (status) => {
    switch (status) {
      case "Active":
        return "success";
      case "Inactive":
        return "danger";
      default:
        return "secondary";
    }
  };

  return (
    <Container className="mt-5">
      
      <Card className="shadow-lg border-0 animate-card">
        <Card.Header className="bg-primary text-white py-3">
          <div className="d-flex justify-content-between align-items-center">
            <h2 className="mb-0">Courses</h2>
            <Button variant="light" onClick={() => navigate("/courses/create")}>
              <i className="bi bi-plus-circle me-2"></i> Add New Course
            </Button>
          </div>
        </Card.Header>

        <Card.Body>
          {loading ? (
            <div className="text-center">Loading...</div>
          ) : courses.length === 0 ? (
            <Alert variant="info">
              <i className="bi bi-info-circle me-2"></i>
              No courses found. Click the "Add New Course" button to create one.
            </Alert>
          ) : (
            <div className="table-responsive">
              <table className="table table-striped table-hover align-middle">
                <thead className="table-light">
                  <tr>
                    <th>ID</th>
                    <th>Course Name</th>
                    <th>Credits</th>
                    <th>Instructor</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {courses.map((course) => (
                    <tr key={course.courseId}>
                      <td>{course.courseId}</td>
                      <td>{course.courseName}</td>
                      <td>
                        <Badge bg="info" text="dark">
                          {course.credits}
                        </Badge>
                      </td>
                      <td>
                        {course.instructor
                          ? `${course.instructor.firstName} ${course.instructor.lastName}`
                          : "Not Assigned"}
                      </td>
                      <td>
                        <Badge bg={getStatusBadgeVariant(course.status)}>
                          {course.status}
                        </Badge>
                      </td>
                      <td>
                        <div className="btn-group">
                          <Button
                            variant="outline-primary"
                            size="sm"
                            onClick={() =>
                              navigate(`/courses/edit/${course.courseId}`)
                            }
                          >
                            <i className="bi bi-pencil"></i> Edit
                          </Button>
                          <Button
                            variant="outline-info"
                            size="sm"
                            onClick={() =>
                              navigate(`/courses/${course.courseId}`)
                            }
                          >
                            <i className="bi bi-info-circle"></i> Details
                          </Button>
                          <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() => {
                              setCourseToDelete(course);
                              setShowDeleteModal(true);
                            }}
                          >
                            <i className="bi bi-trash"></i> Delete
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card.Body>
      </Card>

      {/* Delete Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton className="bg-danger text-white">
          <Modal.Title>
            <i className="bi bi-exclamation-triangle me-2"></i>
            Confirm Delete
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Are you sure you want to delete the course "
            <strong>{courseToDelete?.courseName}</strong>"?
          </p>
          <p className="text-danger mb-0">
            <small>This action cannot be undone.</small>
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={() => handleDelete(courseToDelete?.courseId)}
          >
            <i className="bi bi-trash me-2"></i>Delete
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

export default Course;
