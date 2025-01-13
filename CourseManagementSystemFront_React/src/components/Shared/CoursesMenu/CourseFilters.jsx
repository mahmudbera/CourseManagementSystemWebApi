import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { Card, ListGroup, Button } from "react-bootstrap";

const CourseFilters = ({ onFilterChange }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("http://localhost:5168/api/course");
        setCourses(response.data.$values);
        setLoading(false);
      } catch (err) {
        setError("Failed to load courses");
        setLoading(false);
        console.error("Error fetching courses:", err);
      }
    };

    fetchCourses();
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const courseId = params.get("courseId");
    if (courseId) {
      const parsedId = parseInt(courseId);
      setSelectedCourseId(parsedId);
      onFilterChange(parsedId);
    }
  }, [location.search]);

  const handleCourseClick = (courseId) => {
    if (selectedCourseId === courseId) {
      handleClearFilter();
    } else {
      setSelectedCourseId(courseId);
      onFilterChange(courseId);
      navigate(`${location.pathname}?courseId=${courseId}`);
    }
  };

  const handleClearFilter = () => {
    setSelectedCourseId(null);
    onFilterChange(null);
    navigate(location.pathname);
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <Card className="border-0 shadow-sm">
      <Card.Header className="bg-primary text-white">
        <div className="d-flex justify-content-between align-items-center">
          <h6 className="mb-0">
            <i className="bi bi-list me-2"></i>
            Categories
          </h6>
          <Button
            variant="link"
            className="p-0 text-white"
            onClick={toggleCollapse}
          >
            <i className={`bi bi-chevron-${isCollapsed ? 'down' : 'up'}`}></i>
          </Button>
        </div>
      </Card.Header>

      {!isCollapsed && (
        <>
          <Card.Body className="p-2">
            <small>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handleClearFilter();
                }}
                className="text-muted text-decoration-none float-end"
              >
                <i className="bi bi-filter-circle-x me-1"></i>
                Clear Filter
              </a>
            </small>
          </Card.Body>
          <Card.Body className="p-0">
            <ListGroup variant="flush">
              {courses.map((course) => (
                <ListGroup.Item
                  key={course.courseId}
                  action
                  active={selectedCourseId === course.courseId}
                  onClick={() => handleCourseClick(course.courseId)}
                  className="text-decoration-none"
                >
                  <i className="bi bi-mortarboard me-2"></i>
                  {course.courseName}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card.Body>
        </>
      )}

      <style>{`
        .list-group-item {
          cursor: pointer;
          transition: all 0.2s;
        }
        .list-group-item:hover {
          background-color: #f8f9fa;
        }
        .list-group-item.active {
          background-color: #0d6efd;
          border-color: #0d6efd;
        }
        .list-group-item.active:hover {
          background-color: #0b5ed7;
        }
        .btn-link:hover {
          opacity: 0.8;
        }
        .btn-link:focus {
          box-shadow: none;
        }
      `}</style>
    </Card>
  );
};

export default CourseFilters;
