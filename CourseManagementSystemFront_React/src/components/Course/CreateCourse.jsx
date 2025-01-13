import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
} from "react-bootstrap";
import { toast } from "react-hot-toast";

const CreateCourse = () => {
  const navigate = useNavigate();
  const [course, setCourse] = useState({
    courseName: "",
    description: "",
    credits: 0,
    instructorId: null,
  });
  const [instructors, setInstructors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchInstructors = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5168/api/instructor"
        );
        setInstructors(response.data.$values);
        toast.success("Instructors fetched successfully!");
      } catch (err) {
        toast.error(err.response?.details);
      }
    };

    fetchInstructors();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "instructorId" && value === "") {
      setCourse((prev) => ({
        ...prev,
        [name]: null,
      }));
    } else {
      setCourse((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5168/api/course",
        course
      );
      toast.success("Course is created successfully!");
      navigate("/courses");
    } catch (err) {
      const errorMessage =
        err.response?.data || "An error occurred while creating the course.";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="shadow-lg border-0 rounded-lg mt-5 animate-card">
            <Card.Header className="bg-primary text-white">
              <h3 className="text-center font-weight-light my-2">
                Create New Course
              </h3>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="form-floating mb-3">
                  <Form.Control
                    type="text"
                    id="courseName"
                    name="courseName"
                    placeholder="Course Name"
                    value={course.courseName}
                    onChange={handleInputChange}
                    required
                  />
                  <Form.Label htmlFor="courseName">Course Name</Form.Label>
                </Form.Group>

                <Form.Group className="form-floating mb-3">
                  <Form.Control
                    as="textarea"
                    id="description"
                    name="description"
                    placeholder="Description"
                    style={{ height: "100px" }}
                    value={course.description}
                    onChange={handleInputChange}
                  />
                  <Form.Label htmlFor="description">Description</Form.Label>
                </Form.Group>

                <Form.Group className="form-floating mb-3">
                  <Form.Select
                    id="instructorId"
                    name="instructorId"
                    value={course.instructorId || ""}
                    onChange={handleInputChange}
                  >
                    <option value="" key={null}>
                      -- Select Instructor --
                    </option>
                    {instructors.map((instructor) => (
                      <option
                        key={instructor.instructorId}
                        value={instructor.instructorId}
                      >
                        {instructor.firstName} {instructor.lastName}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Label htmlFor="instructorId">Instructor</Form.Label>
                </Form.Group>

                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group className="form-floating">
                      <Form.Select
                        id="credits"
                        name="credits"
                        value={course.credits}
                        onChange={handleInputChange}
                      >
                        {[0, 1, 2, 3, 4, 5].map((credit) => (
                          <option key={credit} value={credit}>
                            {credit}
                          </option>
                        ))}
                      </Form.Select>
                      <Form.Label htmlFor="credits">Credits</Form.Label>
                    </Form.Group>
                  </Col>
                </Row>

                <div className="mt-4 mb-0 d-grid gap-2 d-md-flex justify-content-md-end">
                  <Button
                    variant="secondary"
                    onClick={() => navigate("/courses")}
                    className="me-md-2"
                  >
                    <i className="bi bi-arrow-left"></i> Back to List
                  </Button>
                  <Button type="submit" variant="success" disabled={isLoading}>
                    <i className="bi bi-plus-circle"></i>
                    {isLoading ? " Creating..." : " Create Course"}
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

export default CreateCourse;
