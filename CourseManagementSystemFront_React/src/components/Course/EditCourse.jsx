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
} from "react-bootstrap";
import { toast } from "react-hot-toast";

const EditCourse = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [course, setCourse] = useState({
    courseId: "",
    courseName: "",
    description: "",
    credits: 0,
    instructorId: "",
  });
  const [instructors, setInstructors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [courseResponse, instructorsResponse] = await Promise.all([
          axios.get(`http://localhost:5168/api/course/${id}`),
          axios.get("http://localhost:5168/api/instructor"),
        ]);

        setCourse({
          courseId: courseResponse.data.courseId,
          courseName: courseResponse.data.courseName,
          description: courseResponse.data.description,
          credits: courseResponse.data.credits,
          instructorId: courseResponse.data.instructor?.instructorId || "",
        });
        setInstructors(instructorsResponse.data.$values);
        
        toast.success("Course and instructors data loaded!")
      } catch (err) {
        toast.error("An error occurred while retrieving the course or instructors.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

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
      await axios.put(`http://localhost:5168/api/course/${id}`, course);
      toast.success("Course updated successfully.");
      navigate("/courses");
    } catch (err) {
      toast.error(err.response?.data || "Invalid data.");
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
                <i className="bi bi-pencil-square me-2"></i>Edit Course
              </h2>
            </Card.Header>
            <Card.Body>

              <Form onSubmit={handleSubmit}>
                <Form.Control
                  type="hidden"
                  name="courseId"
                  value={course.courseId}
                />

                <Form.Group className="mb-3 form-floating">
                  <Form.Control
                    type="text"
                    id="courseName"
                    name="courseName"
                    placeholder="Enter course name"
                    value={course.courseName}
                    onChange={handleInputChange}
                    required
                  />
                  <Form.Label>Course Name</Form.Label>
                </Form.Group>

                <Form.Group className="mb-3 form-floating">
                  <Form.Control
                    as="textarea"
                    id="description"
                    name="description"
                    placeholder="Enter course description"
                    style={{ height: "100px" }}
                    value={course.description}
                    onChange={handleInputChange}
                  />
                  <Form.Label>Description</Form.Label>
                </Form.Group>

                <Form.Group className="mb-3 form-floating">
                  <Form.Select
                    id="credits"
                    name="credits"
                    value={course.credits}
                    onChange={handleInputChange}
                    aria-label="Select credits"
                  >
                    {[0, 1, 2, 3, 4, 5].map((credit) => (
                      <option key={credit} value={credit}>
                        {credit}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Label>Credits</Form.Label>
                </Form.Group>

                <Form.Group className="mb-3 form-floating">
                  <Form.Select
                    id="instructorId"
                    name="instructorId"
                    value={course.instructorId}
                    onChange={handleInputChange}
                    aria-label="Select instructor"
                  >
                    <option value="" key={null}>-- Select Instructor --</option>
                    {instructors.map((instructor) => (
                      <option
                        key={instructor.instructorId}
                        value={instructor.instructorId}
                      >
                        {instructor.firstName} {instructor.lastName}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Label>Instructor</Form.Label>
                </Form.Group>

                <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-4">
                  <Button
                    variant="secondary"
                    onClick={() => navigate("/courses")}
                    className="me-md-2"
                  >
                    <i className="bi bi-x-circle me-2"></i>Cancel
                  </Button>
                  <Button type="submit" variant="primary">
                    <i className="bi bi-save me-2"></i>Save Changes
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

export default EditCourse;