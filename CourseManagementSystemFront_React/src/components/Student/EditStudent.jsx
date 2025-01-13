import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { toast } from "react-hot-toast";

const EditStudent = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [student, setStudent] = useState({
    studentId: "",
    firstName: "",
    lastName: "",
    email: "",
    dateOfBirth: "",
    status: "Active",
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5168/api/student/${id}`
        );
        const studentData = response.data.student;
        setStudent({
          ...studentData,
          dateOfBirth: studentData.dateOfBirth.split("T")[0],
        });
        toast.success("Student details fetched!");
      } catch (err) {
        toast.error("Error fetching student!");
      } finally {
        setIsLoading(false);
      }
    };

    fetchStudent();
  }, [id]);

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
      await axios.put(`http://localhost:5168/api/student/${id}`, student);
      toast.success("Student details edited successfully!");
      navigate("/students");
    } catch (err) {
      console.log(err);
      toast.error(
        err.response?.data || "An error occurred while updating the student."
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  return (
    <Container fluid className="mt-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="shadow-lg border-0 animate-card">
            <Card.Header className="bg-primary text-white py-3">
              <h2 className="card-title mb-0">
                <i className="bi bi-person-gear me-2"></i>Edit Student
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
                  />
                  <Form.Label htmlFor="dateOfBirth">Date of Birth</Form.Label>
                </Form.Group>

                <Form.Group className="mb-3 form-floating">
                  <Form.Select
                    id="status"
                    name="status"
                    value={student.status}
                    onChange={handleInputChange}
                    aria-label="Select status"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </Form.Select>
                  <Form.Label htmlFor="status">Status</Form.Label>
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
                    {isLoading ? "Saving..." : "Save Changes"}
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
        .form-floating > .form-control:not(:placeholder-shown) ~ label,
        .form-floating > .form-select ~ label {
          color: #0d6efd;
        }
        .form-control:focus,
        .form-select:focus {
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

export default EditStudent;
