import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Card, ListGroup, Button } from "react-bootstrap";

const StudentFilters = ({ onFilterChange }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const statuses = [
    { id: "Active", name: "Active" },
    { id: "Inactive", name: "Inactive" },
  ];

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const status = params.get("status");
    if (status) {
      setSelectedStatus(status);
      onFilterChange(status);
    }
  }, [location.search]);

  const handleStatusClick = (status) => {
    if (selectedStatus === status) {
      handleClearFilter();
    } else {
      setSelectedStatus(status);
      onFilterChange(status);
      navigate(`${location.pathname}?status=${status}`);
    }
  };

  const handleClearFilter = () => {
    setSelectedStatus(null);
    onFilterChange(null);
    navigate(location.pathname);
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

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
              {statuses.map((status) => (
                <ListGroup.Item
                  key={status.id}
                  action
                  active={selectedStatus === status.id}
                  onClick={() => handleStatusClick(status.id)}
                  className="text-decoration-none"
                >
                  <i className="bi bi-mortarboard me-2"></i>
                  {status.name}
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

export default StudentFilters;
