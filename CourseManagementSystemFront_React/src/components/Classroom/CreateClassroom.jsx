import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
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
import toast from "react-hot-toast";

const CreateClassroom = () => {
  const navigate = useNavigate("");
  const [classroom, setClassroom] = useState({
    classroomName: "",
    capacity: 0,
    courseId: null,
  });
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchAvailableCourses = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5168/api/classroom/available-courses-for-new"
        );
        setCourses(response.data.$values || []);
        toast.success("Courses fetched successfully! 🎉");
      } catch (err) {
        toast.error(err);
      }
    };

    fetchAvailableCourses();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setClassroom((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5168/api/classroom",
        classroom
      );
      toast.success(response.data.message);
      navigate("/classrooms");
    } catch (err) {
		toast.error(err.response?.data?.details);
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
                Create New Classroom
              </h3>
            </Card.Header>
            <Card.Body>

              <Form onSubmit={handleSubmit}>
                <Form.Group className="form-floating mb-3">
                  <Form.Control
                    type="text"
                    id="classroomName"
                    name="classroomName"
                    placeholder="Enter classroom name"
                    value={classroom.classroomName}
                    onChange={handleInputChange}
                    required
                  />
                  <Form.Label htmlFor="classroomName" className="required">
                    Classroom Name
                  </Form.Label>
                </Form.Group>

                <Form.Group className="form-floating mb-3">
                  <Form.Control
                    type="number"
                    id="capacity"
                    name="capacity"
                    placeholder="Enter capacity"
                    min="1"
                    value={classroom.capacity}
                    onChange={handleInputChange}
                    required
                  />
                  <Form.Label htmlFor="capacity" className="required">
                    Capacity
                  </Form.Label>
                </Form.Group>

                <Form.Group className="form-floating mb-3">
                  <Form.Select
                    id="courseId"
                    name="courseId"
                    value={classroom.courseId}
                    onChange={handleInputChange}
                  >
                    <option value="">-- Select Course (Optional) --</option>
                    {courses.map((course) => (
                      <option key={course.courseId} value={course.courseId}>
                        {course.courseName}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Label htmlFor="courseId">Assigned Course</Form.Label>
                </Form.Group>

                <div className="mt-4 mb-0 d-flex justify-content-end gap-2">
                  <Button
                    variant="secondary"
                    onClick={() => navigate("/classrooms")}
                  >
                    <i className="bi bi-x-circle"></i> Cancel
                  </Button>
                  <Button type="submit" variant="primary" disabled={isLoading}>
                    <i className="bi bi-plus-circle"></i>
                    {isLoading ? " Creating..." : " Create Classroom"}
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <style>{`
        .animate-card {
          transition: all 0.3s ease-in-out;
          animation: fadeIn 1s;
        }
        .animate-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.175) !important;
        }
        .required::after {
          content: " *";
          color: red;
        }
        .form-control:focus,
        .form-select:focus {
          border-color: #86b7fe;
          box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .form-floating > .form-control:focus,
        .form-floating > .form-control:not(:placeholder-shown) {
          padding-top: 1.625rem;
          padding-bottom: 0.625rem;
        }
        .form-floating > .form-control:-webkit-autofill {
          padding-top: 1.625rem;
          padding-bottom: 0.625rem;
        }
        .form-floating > .form-select {
          padding-top: 1.625rem;
          padding-bottom: 0.625rem;
        }
      `}</style>
    </Container>
  );
};

export default CreateClassroom;
