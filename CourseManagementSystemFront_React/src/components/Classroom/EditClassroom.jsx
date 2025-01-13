import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
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

const EditClassroom = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [classroom, setClassroom] = useState({
    classroomId: "",
    classroomName: "",
    capacity: 0,
    courseId: "",
  });
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [classroomResponse, coursesResponse] = await Promise.all([
          axios.get(`http://localhost:5168/api/classroom/${id}`),
          axios.get(
            `http://localhost:5168/api/classroom/available-courses/${id}`
          ),
        ]);

        setClassroom({
          classroomId: classroomResponse.data.classroomId,
          classroomName: classroomResponse.data.classroomName,
          capacity: classroomResponse.data.capacity,
          courseId: classroomResponse.data.courseId || null,
        });
        setCourses(coursesResponse.data.$values);
        toast.success("Classroom data loaded successfully!");
      } catch (err) {
        if (err.response?.config?.url.includes("classroom")) {
          toast.error("Classroom not found.");
        } else if (err.response?.config?.url.includes("available-courses")) {
          toast.error(
            "Details: " + (err.response?.data?.details || "Unknown error")
          );
        } else {
          toast.error("Failed to load classroom data. Please try again.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "courseId" && value === "") {
      setClassroom((prev) => ({
        ...prev,
        [name]: null,
      }));
    } else {
      setClassroom((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.put(
        `http://localhost:5168/api/classroom/${id}`,
        classroom
      );
      toast.success(response.data.Message || "Classroom updated successfully!");
      navigate("/classrooms");
    } catch (err) {
      const errorMessage =
        err.response?.data?.Error ||
        "An error occurred while updating the classroom.";
      const errorDetails =
        err.response?.data?.Details || "Please try again later.";

      toast.error(`${errorMessage}: ${errorDetails}`);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="shadow-lg border-0 rounded-lg animate-card">
            <Card.Header className="bg-primary text-white">
              <h2 className="card-title h4 mb-0 text-center">Edit Classroom</h2>
            </Card.Header>
            <Card.Body className="p-4">
              <Form onSubmit={handleSubmit} className="needs-validation">
                <Form.Group className="form-floating mb-3">
                  <Form.Control
                    id="classroomId"
                    value={classroom.classroomId}
                    readOnly
                    disabled
                  />
                  <Form.Label>Classroom ID</Form.Label>
                </Form.Group>

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
                  <Form.Label className="required">
                    Classroom Name <span className="text-danger">*</span>
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
                  <Form.Label className="required">
                    Capacity <span className="text-danger">*</span>
                  </Form.Label>
                </Form.Group>

                <Form.Group className="form-floating mb-3">
                  <Form.Select
                    id="courseId"
                    name="courseId"
                    value={classroom.courseId}
                    onChange={handleInputChange}
                  >
                    <option value="" key={null}>
                      -- Select Course --
                    </option>
                    {courses.map((course) => (
                      <option key={course.courseId} value={course.courseId}>
                        {course.courseName}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Label>Assigned Course</Form.Label>
                </Form.Group>

                <div className="d-flex justify-content-end gap-2 mt-4">
                  <Button
                    variant="secondary"
                    size="lg"
                    onClick={() => navigate("/classrooms")}
                  >
                    <i className="bi bi-x-circle me-2"></i> Cancel
                  </Button>
                  <Button type="submit" variant="primary" size="lg">
                    <i className="bi bi-save me-2"></i> Save
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
          box-shadow: 0 1rem 3rem rgba(0,0,0,.175)!important;
        }
        .required::after {
          content: " *";
          color: red;
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
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </Container>
  );
};

export default EditClassroom;
