import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Card,
  Button,
  Table,
  Badge,
  Modal,
  Form,
  Alert,
} from "react-bootstrap";
import { toast } from "react-hot-toast";

const Instructor = () => {
  const navigate = useNavigate();
  const [instructors, setInstructors] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedInstructor, setSelectedInstructor] = useState(null);

  const [editForm, setEditForm] = useState({
    instructorId: "",
    firstName: "",
    lastName: "",
    email: "",
    hireDate: "",
  });

  useEffect(() => {
    const fetchInstructors = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5168/api/instructor"
        );
        setInstructors(response.data.$values);
        toast.success("Instructors loaded successfully");
      } catch (err) {
        toast.error("Failed to fetch instructors");
      } finally {
        setLoading(false);
      }
    };

    fetchInstructors();
  }, []);

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:5168/api/instructor/${editForm.instructorId}`,
        editForm
      );
      const updatedInstructors = instructors.map((instructor) =>
        instructor.instructorId === editForm.instructorId
          ? { ...instructor, ...editForm }
          : instructor
      );
      setInstructors(updatedInstructors);
      toast.success("Instructor updated successfully");
    } catch (err) {
      toast.error(err.response?.data?.details || "Failed to update instructor");
    } finally {
      setShowEditModal(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5168/api/instructor/${id}`);
      setInstructors(instructors.filter((i) => i.instructorId !== id));
      toast.success("Instructor deleted successfully");
    } catch (err) {
      toast.error(err.response?.data?.details || "Failed to delete instructor");
    } finally {
      setShowDeleteModal(false);
    }
  };

  return (
    <Container fluid className="mt-5">
      <Card className="shadow-lg border-0 animate-card">
        <Card.Header className="bg-primary text-white py-3">
          <div className="d-flex justify-content-between align-items-center">
            <h2 className="mb-0">Instructors</h2>
            <Button
              variant="light"
              onClick={() => navigate("/instructors/create")}
            >
              <i className="bi bi-plus-circle me-2"></i> Add New Instructor
            </Button>
          </div>
        </Card.Header>

        <Card.Body>
          {loading ? (
            <div className="text-center">Loading...</div>
          ) : (
            <div className="table-responsive">
              <Table striped hover className="align-middle">
                <thead className="table-light">
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Hire Date</th>
                    <th>Courses</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {instructors.map((instructor) => (
                    <tr key={instructor.instructorId}>
                      <td>{instructor.instructorId}</td>
                      <td>
                        {instructor.firstName} {instructor.lastName}
                      </td>
                      <td>{instructor.email}</td>
                      <td>{instructor.hireDate.split("T")[0]}</td>
                      <td>
                        {instructor.courses?.$values?.length > 0 ? (
                          instructor.courses.$values.map((course) => (
                            <Badge
                              bg="info"
                              text="dark"
                              className="me-1 mb-1"
                              key={course.courseId}
                            >
                              {course.courseName}
                            </Badge>
                          ))
                        ) : (
                          <Badge bg="secondary">No Courses</Badge>
                        )}
                      </td>
                      <td>
                        <div className="btn-group">
                          <Button
                            variant="outline-primary"
                            size="sm"
                            onClick={() => {
                              setSelectedInstructor(instructor);
                              setEditForm({
                                instructorId: instructor.instructorId,
                                firstName: instructor.firstName,
                                lastName: instructor.lastName,
                                email: instructor.email,
                                hireDate: instructor.hireDate.split("T")[0],
                              });
                              setShowEditModal(true);
                            }}
                          >
                            <i className="bi bi-pencil"></i> Edit
                          </Button>
                          <Button
                            variant="outline-info"
                            size="sm"
                            onClick={() => {
                              setSelectedInstructor(instructor);
                              setShowViewModal(true);
                            }}
                          >
                            <i className="bi bi-info-circle"></i> Details
                          </Button>
                          <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() => {
                              setSelectedInstructor(instructor);
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
              </Table>
            </div>
          )}
        </Card.Body>
      </Card>

      {/* View Modal */}
      <Modal show={showViewModal} onHide={() => setShowViewModal(false)}>
        <Modal.Header closeButton className="bg-info text-white">
          <Modal.Title>Instructor Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedInstructor && (
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Instructor ID</Form.Label>
                <Form.Control
                  type="text"
                  value={selectedInstructor.instructorId}
                  disabled
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  value={selectedInstructor.firstName}
                  disabled
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  value={selectedInstructor.lastName}
                  disabled
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={selectedInstructor.email}
                  disabled
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Hire Date</Form.Label>
                <Form.Control
                  type="date"
                  value={selectedInstructor.hireDate.split("T")[0]}
                  disabled
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Courses</Form.Label>
                <div className="d-flex flex-wrap gap-2">
                  {selectedInstructor.courses?.$values?.map((course) => (
                    <Badge key={course.courseId} bg="info" text="dark">
                      {course.courseName}
                    </Badge>
                  ))}
                </div>
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
      </Modal>

      {/* Edit Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton className="bg-primary text-white">
          <Modal.Title>Edit Instructor</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleEdit}>
            <Form.Group className="mb-3">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                value={editForm.firstName}
                onChange={(e) =>
                  setEditForm({ ...editForm, firstName: e.target.value })
                }
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                value={editForm.lastName}
                onChange={(e) =>
                  setEditForm({ ...editForm, lastName: e.target.value })
                }
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={editForm.email}
                onChange={(e) =>
                  setEditForm({ ...editForm, email: e.target.value })
                }
                required
              />
            </Form.Group>

            <Button type="submit" variant="primary">
              Save Changes
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Delete Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton className="bg-danger text-white">
          <Modal.Title>
            <i className="bi bi-exclamation-triangle me-2"></i>
            Confirm Delete
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedInstructor && (
            <>
              <p>
                Are you sure you want to delete the instructor "
                <strong>
                  {selectedInstructor.firstName} {selectedInstructor.lastName}
                </strong>
                "?
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
            onClick={() => handleDelete(selectedInstructor.instructorId)}
          >
            Delete
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

export default Instructor;
