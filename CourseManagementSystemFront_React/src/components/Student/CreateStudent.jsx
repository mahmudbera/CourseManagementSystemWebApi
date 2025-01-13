import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Alert,
} from "react-bootstrap";
import { toast } from "react-hot-toast";

const CreateStudent = () => {
  const navigate = useNavigate();
  const [student, setStudent] = useState({
    firstName: "",
    lastName: "",
    email: "",
    dateOfBirth: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStudent((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5168/api/student",
        student
      );
      toast.success("Student created successfully!")
      navigate("/students");
    } catch (err) {
      toast.error(err.response?.data);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container fluid className="mt-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="shadow-lg border-0 animate-card">
            <Card.Header className="bg-primary text-white py-3">
              <h2 className="card-title mb-0">
                <i className="bi bi-person-plus-fill me-2"></i>Add New Student
              </h2>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3 form-floating">
                  <Form.Control
                    type="text"
                    id="firstName"
                    name="firstName"
                    placeholder="Enter first name"
                    value={student.firstName}
                    onChange={handleInputChange}
                    required
                  />
                  <Form.Label htmlFor="firstName">First Name</Form.Label>
                </Form.Group>

                <Form.Group className="mb-3 form-floating">
                  <Form.Control
                    type="text"
                    id="lastName"
                    name="lastName"
                    placeholder="Enter last name"
                    value={student.lastName}
                    onChange={handleInputChange}
                    required
                  />
                  <Form.Label htmlFor="lastName">Last Name</Form.Label>
                </Form.Group>

                <Form.Group className="mb-3 form-floating">
                  <Form.Control
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter email"
                    value={student.email}
                    onChange={handleInputChange}
                    required
                  />
                  <Form.Label htmlFor="email">Email</Form.Label>
                </Form.Group>

                <Form.Group className="mb-3 form-floating">
                  <Form.Control
                    type="date"
                    id="dateOfBirth"
                    name="dateOfBirth"
                    placeholder="Select date of birth"
                    value={student.dateOfBirth}
                    onChange={handleInputChange}
                    required
                    onFocus={(e) => e.target.showPicker()}
                  />
                  <Form.Label htmlFor="dateOfBirth">Date of Birth</Form.Label>
                </Form.Group>

                <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-4">
                  <Button
                    variant="secondary"
                    onClick={() => navigate("/students")}
                    className="me-md-2"
                  >
                    <i className="bi bi-x-circle me-2"></i>Cancel
                  </Button>
                  <Button type="submit" variant="primary" disabled={isLoading}>
                    <i className="bi bi-save me-2"></i>
                    {isLoading ? "Saving..." : "Save"}
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

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
        .form-floating > .form-control:focus ~ label,
        .form-floating > .form-control:not(:placeholder-shown) ~ label {
          color: #0d6efd;
        }
        .form-control:focus {
          border-color: #0d6efd;
          box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </Container>
  );
};

export default CreateStudent;
