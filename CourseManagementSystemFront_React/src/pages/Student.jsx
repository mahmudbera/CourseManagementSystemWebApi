import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Table,
  Badge,
} from "react-bootstrap";
import StudentFilters from "../components/Shared/StudentStatus/StudentFilters";
import { toast } from "react-hot-toast";

const Student = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredStudents, setFilteredStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get("http://localhost:5168/api/student");
        setStudents(response.data.$values);
        toast.success("Students loaded successfully!")
      } catch (err) {
        toast.error("Error fetching students!")
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const handleDeactivate = async (id) => {
    try {
      await axios.put(`http://localhost:5168/api/student/${id}/deactivate`);
      const updatedStudents = students.map((student) =>
        student.studentId === id ? { ...student, status: "Inactive" } : student
      );
      setStudents(updatedStudents);
      toast.success("Student deactivated successfully");
    } catch (err) {
      toast.error(err.response?.data || "Failed to deactivate student");
    }
  };

  useEffect(() => {
    if (!students.length) return;
    
    const params = new URLSearchParams(window.location.search);
    const status = params.get("status");
    
    if (status) {
      const filtered = students.filter(
        (student) => student.status === status
      );
      setFilteredStudents(filtered);
    } else {
      setFilteredStudents(students);
    }
  }, [students]);

  const handleFilterChange = useCallback((status) => {
    if (!status) {
      setFilteredStudents(students);
    } else {
      const filtered = students.filter(
        (student) => student.status === status
      );
      setFilteredStudents(filtered);
    }
  }, [students]);

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
    <Container fluid className="py-4">
      <Row className="justify-content-center">
        <Col md={3} lg={2} className="mb-4 mb-md-0">
          <StudentFilters onFilterChange={handleFilterChange} />
        </Col>

        <Col md={9} lg={8}>
          <Card className="shadow-lg border-0 animate-fade-in">
            <Card.Header className="bg-primary text-white py-3">
              <div className="d-flex justify-content-between align-items-center">
                <h2 className="h4 mb-0">Student List</h2>
                <Button
                  variant="light"
                  size="sm"
                  onClick={() => navigate("/students/create")}
                >
                  <i className="bi bi-plus-circle me-2"></i>Add New Student
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
                        <th className="text-center">ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th className="text-center">Status</th>
                        <th className="text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredStudents.map((student) => (
                        <tr key={student.studentId}>
                          <td className="text-center">{student.studentId}</td>
                          <td>{student.firstName}</td>
                          <td>{student.lastName}</td>
                          <td className="text-center">
                            <Badge bg={getStatusBadgeVariant(student.status)}>
                              {student.status}
                            </Badge>
                          </td>
                          <td className="text-center">
                            <div className="btn-group">
                              <Button
                                variant="outline-primary"
                                size="sm"
                                onClick={() =>
                                  navigate(`/students/edit/${student.studentId}`)
                                }
                                title="Edit"
                              >
                                <i className="bi bi-pencil"></i> Edit
                              </Button>
                              <Button
                                variant="outline-info"
                                size="sm"
                                onClick={() =>
                                  navigate(`/students/${student.studentId}`)
                                }
                                title="Details"
                              >
                                <i className="bi bi-info-circle"></i> Details
                              </Button>
                              <Button
                                variant="outline-danger"
                                size="sm"
                                onClick={() => handleDeactivate(student.studentId)}
                                disabled={student.status === "Inactive"}
                                title="Deactivate"
                              >
                                <i className="bi bi-trash"></i> Deactivate
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
        </Col>
      </Row>

      <style>{`
        .animate-fade-in {
          animation: fadeIn 0.5s ease-in-out;
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
        .badge {
          font-size: 0.8rem;
          padding: 0.35em 0.65em;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </Container>
  );
};

export default Student;