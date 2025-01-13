import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Card,
  Badge,
  Row,
  Col,
  ListGroup,
  Button,
  Modal,
} from "react-bootstrap";
import { toast } from "react-hot-toast";

const ClassroomDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [classroom, setClassroom] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchClassroom = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5168/api/classroom/${id}`
        );
        setClassroom(response.data);
        toast.success("Classroom details loaded successfully!");
      } catch (err) {
        toast.error(
          err.response?.data?.details ||
            "Failed to load classroom details. Please try again later."
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchClassroom();
  }, [id]);

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:5168/api/classroom/${id}`
      );
      toast.success(response.data?.message);
      navigate("/classrooms");
    } catch (err) {
      toast.error(
        err.response?.data?.details || "Failed to delete classroom 😔"
      );
    } finally {
      setShowDeleteModal(false);
    }
  };

  if (isLoading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  return (
    <Container className="mt-5">
      <Card className="shadow-lg border-0 rounded-lg animate-card">
        <Card.Header className="bg-primary text-white d-flex justify-content-between align-items-center py-3">
          <h1 className="h3 mb-0">{classroom.classroomName}</h1>
          <Badge bg="light" text="primary" className="fs-6">
            ID: {classroom.classroomId}
          </Badge>
        </Card.Header>

        <Card.Body>
          <Row className="g-4">
            <Col md={6}>
              <h2 className="h4 mb-3 border-bottom pb-2">
                Classroom Information
              </h2>
              <dl className="row">
                <dt className="col-sm-4 text-muted">Name</dt>
                <dd className="col-sm-8 fw-bold">{classroom.classroomName}</dd>

                <dt className="col-sm-4 text-muted">Capacity</dt>
                <dd className="col-sm-8">
                  <Badge bg="info" text="dark" className="fs-6">
                    {classroom.capacity} students
                  </Badge>
                </dd>

                <dt className="col-sm-4 text-muted">Status</dt>
                <dd className="col-sm-8">
                  <Badge
                    bg={classroom.courseId ? "success" : "danger"}
                    className="fs-6"
                  >
                    {classroom.courseId ? "Active" : "Inactive"}
                  </Badge>
                </dd>
              </dl>
            </Col>

            <Col md={6}>
              <h2 className="h4 mb-3 border-bottom pb-2">Assigned Course</h2>
              {classroom.course ? (
                <dl className="row">
                  <dt className="col-sm-4 text-muted">Course Name</dt>
                  <dd className="col-sm-8 fw-bold">
                    {classroom.course.courseName}
                  </dd>

                  <dt className="col-sm-4 text-muted">Course ID</dt>
                  <dd className="col-sm-8">{classroom.course.courseId}</dd>

                  <dt className="col-sm-4 text-muted">Instructor</dt>
                  <dd className="col-sm-8">
                    {classroom.course.instructor
                      ? `${classroom.course.instructor.firstName} ${classroom.course.instructor.lastName}`
                      : "Not Assigned"}
                  </dd>
                </dl>
              ) : (
                <p className="text-muted fst-italic">
                  No course currently assigned to this classroom.
                </p>
              )}
            </Col>
          </Row>

          <h2 className="h4 mt-5 mb-4 border-bottom pb-2">
            Additional Information
          </h2>
          <Row className="g-4">
            <Col md={6}>
              <Card className="bg-light h-100">
                <Card.Body>
                  <h3 className="h5 card-title mb-3">Equipment</h3>
                  <ListGroup variant="flush">
                    {["Projector", "Whiteboard", "Computer"].map((item) => (
                      <ListGroup.Item
                        key={item}
                        className="bg-transparent d-flex align-items-center"
                      >
                        <i className="bi bi-check-circle-fill text-success me-2"></i>
                        {item}
                      </ListGroup.Item>
                    ))}
                    <ListGroup.Item className="bg-transparent d-flex align-items-center">
                      <i className="bi bi-x-circle-fill text-danger me-2"></i>
                      Smart Board
                    </ListGroup.Item>
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>

            <Col md={6}>
              <Card className="bg-light h-100">
                <Card.Body>
                  <h3 className="h5 card-title mb-3">Accessibility</h3>
                  <ListGroup variant="flush">
                    {["Wheelchair Accessible", "Hearing Loop System"].map(
                      (item) => (
                        <ListGroup.Item
                          key={item}
                          className="bg-transparent d-flex align-items-center"
                        >
                          <i className="bi bi-check-circle-fill text-success me-2"></i>
                          {item}
                        </ListGroup.Item>
                      )
                    )}
                    <ListGroup.Item className="bg-transparent d-flex align-items-center">
                      <i className="bi bi-x-circle-fill text-danger me-2"></i>
                      Braille Signage
                    </ListGroup.Item>
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Card.Body>

        <Card.Footer className="bg-light">
          <div className="d-flex justify-content-between align-items-center">
            <Button variant="outline-secondary" as={Link} to="/classrooms">
              <i className="bi bi-arrow-left me-2"></i>Back to List
            </Button>
            <div>
              <Button
                variant="primary"
                className="me-2"
                onClick={() =>
                  navigate(`/classrooms/edit/${classroom.classroomId}`)
                }
              >
                <i className="bi bi-pencil me-2"></i>Edit
              </Button>
              <Button variant="danger" onClick={() => setShowDeleteModal(true)}>
                <i className="bi bi-trash me-2"></i>Delete
              </Button>
            </div>
          </div>
        </Card.Footer>
      </Card>

      {/* Delete Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton className="bg-danger text-white">
          <Modal.Title>
            <i className="bi bi-exclamation-triangle-fill me-2"></i>
            Confirm Deletion
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Are you sure you want to delete the classroom "
            <strong>{classroom?.classroomName}</strong>"?
          </p>
          <p className="text-danger mb-0">
            <small>This action cannot be undone.</small>
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
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
        .list-group-item {
          transition: background-color 0.3s ease-in-out;
        }
        .list-group-item:hover {
          background-color: rgba(0,0,0,.03)!important;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </Container>
  );
};

export default ClassroomDetail;
