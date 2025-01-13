import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Card,
  Table,
  Badge,
  Button,
  Alert,
} from "react-bootstrap";
import { toast } from "react-hot-toast";

const StudentDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [student, setStudent] = useState(null);
  const [averageGrade, setAverageGrade] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5168/api/student/${id}`
        );
        setStudent(response.data.student);
        setAverageGrade(response.data.averageGrade);
        toast.success("Student details loaded successfully!");
      } catch (err) {
        toast.error("Failed to load student details");
      } finally {
        setLoading(false);
      }
    };

    fetchStudent();
  }, [id]);

  if (loading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  return (
    <Container fluid className="mt-5">
      <Row className="justify-content-center">
        <Col md={10} lg={8}>
          <Card className="shadow-lg border-0 animate-card">
            <Card.Header className="bg-primary text-white py-3">
              <h2 className="card-title mb-0">
                <i className="bi bi-person-badge me-2"></i>Student Details
              </h2>
            </Card.Header>

            <Card.Body>
              <Row className="mb-4">
                <Col md={3} className="text-center">
                  <img
                    src={`https://api.dicebear.com/7.x/initials/svg?seed=${student.firstName}${student.lastName}`}
                    alt={`${student.firstName} ${student.lastName}`}
                    className="img-fluid rounded-circle mb-3"
                  />
                  <h3>{`${student.firstName} ${student.lastName}`}</h3>
                  <p className="text-muted">Student ID: {student.studentId}</p>
                </Col>

                <Col md={9}>
                  <dl className="row">
                    <dt className="col-sm-4">
                      <i className="bi bi-envelope me-2"></i>Email
                    </dt>
                    <dd className="col-sm-8">{student.email}</dd>

                    <dt className="col-sm-4">
                      <i className="bi bi-calendar me-2"></i>Date of Birth
                    </dt>
                    <dd className="col-sm-8">
                      {new Date(student.dateOfBirth).toLocaleDateString()}
                    </dd>

                    <dt className="col-sm-4">
                      <i className="bi bi-calendar-check me-2"></i>Enrollment
                      Date
                    </dt>
                    <dd className="col-sm-8">
                      {new Date(student.enrollmentDate).toLocaleDateString()}
                    </dd>
                  </dl>
                </Col>
              </Row>

              <h4 className="mb-3">
                <i className="bi bi-book me-2"></i>Enrollments
              </h4>
              {student.enrollments?.$values?.length > 0 ? (
                <div className="table-responsive">
                  <Table striped hover className="align-middle">
                    <thead className="table-light">
                      <tr>
                        <th>Course Name</th>
                        <th>Course Credit</th>
                        <th>Grade</th>
                      </tr>
                    </thead>
                    <tbody>
                      {student.enrollments.$values.map((enrollment) => (
                        <tr key={enrollment.enrollmentId}>
                          <td>{enrollment.course.courseName}</td>
                          <td>{enrollment.course.credits}</td>
                          <td>
                            {enrollment.grade ? (
                              <Badge bg="success">
                                {Number(enrollment.grade).toFixed(2)}
                              </Badge>
                            ) : (
                              <Badge bg="secondary">Not graded</Badge>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className="table-primary">
                        <td colSpan={2}>
                          <strong>Average Grade</strong>
                        </td>
                        <td>
                          {averageGrade ? (
                            <Badge bg="primary">
                              {Number(averageGrade).toFixed(2)}
                            </Badge>
                          ) : (
                            <Badge bg="secondary">N/A</Badge>
                          )}
                        </td>
                      </tr>
                    </tfoot>
                  </Table>
                </div>
              ) : (
                <Alert variant="info">
                  <i className="bi bi-info-circle me-2"></i>
                  No enrollments found for this student.
                </Alert>
              )}
            </Card.Body>

            <Card.Footer className="bg-light">
              <div className="d-flex justify-content-between">
                <Button
                  variant="secondary"
                  onClick={() => navigate("/students")}
                >
                  <i className="bi bi-arrow-left me-2"></i>Back to List
                </Button>
                <Button
                  variant="primary"
                  onClick={() =>
                    navigate(`/students/edit/${student.studentId}`)
                  }
                >
                  <i className="bi bi-pencil me-2"></i>Edit
                </Button>
              </div>
            </Card.Footer>
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
        .table-hover tbody tr {
          transition: all 0.2s ease-in-out;
        }
        .table-hover tbody tr:hover {
          background-color: rgba(0,0,0,.075)!important;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </Container>
  );
};

export default StudentDetails;
