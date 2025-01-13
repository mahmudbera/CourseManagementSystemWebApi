import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

function Classroom() {
  const navigate = useNavigate();
  const [classrooms, setClassrooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [classroomToDelete, setClassroomToDelete] = useState(null);

  useEffect(() => {
    const fetchClassrooms = async () => {
      try {
        const response = await axios.get("http://localhost:5168/api/classroom");
        setClassrooms(response.data?.data?.$values || []);
        toast.success("Classrooms fetched successfully 🎉");
      } catch (err) {
        toast.error(err.response?.data?.details || "Failed to fetch classrooms 😔");
      } finally {
        setLoading(false);
      }
    };
    fetchClassrooms();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:5168/api/classroom/${id}`
      );
      setClassrooms(
        classrooms.filter((classroom) => classroom.classroomId !== id)
      );
      toast.success(response.data?.message);
    } catch (err) {
      toast.error(err.response?.data?.details || "Failed to delete classroom 😔");
    } finally {
      setShowDeleteModal(false);
    }
  };

  const handleAddNew = () => {
    navigate("/classrooms/create");
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-lg border-0">
        <div className="card-header bg-primary text-white py-3">
          <div className="d-flex justify-content-between align-items-center">
            <h1 className="h3 mb-0">Classrooms</h1>
            <button className="btn btn-light" onClick={handleAddNew}>
              <i className="bi bi-plus-circle me-2"></i> Add New Classroom
            </button>
          </div>
        </div>

        <div className="card-body">
          {loading ? (
            <div className="text-center">Loading...</div>
          ) : classrooms.length === 0 ? (
            <div className="alert alert-info" role="alert">
              <i className="bi bi-info-circle me-2"></i> No classrooms found.
              Click the "Add New Classroom" button to create one.
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover table-striped align-middle">
                <thead className="table-light">
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Capacity</th>
                    <th>Course</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {classrooms.map((classroom) => (
                    <tr key={classroom.classroomId}>
                      <td>{classroom.classroomId}</td>
                      <td>{classroom.classroomName}</td>
                      <td>
                        <span className="badge bg-info">
                          {classroom.capacity}
                        </span>
                      </td>
                      <td>
                        {classroom.course ? (
                          <span className="badge bg-success">
                            {classroom.course.courseName}
                          </span>
                        ) : (
                          <span className="badge bg-warning text-dark">
                            Not Assigned
                          </span>
                        )}
                      </td>
                      <td>
                        <div className="btn-group" role="group">
                          <button
                            className="btn btn-sm btn-outline-primary"
                            onClick={() =>
                              navigate(
                                `/classrooms/edit/${classroom.classroomId}`
                              )
                            }
                          >
                            <i className="bi bi-pencil me-1"></i> Edit
                          </button>
                          <button
                            className="btn btn-sm btn-outline-info"
                            onClick={() =>
                              navigate(
                                `/classrooms/details/${classroom.classroomId}`
                              )
                            }
                          >
                            <i className="bi bi-info-circle me-1"></i> Details
                          </button>
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => {
                              setClassroomToDelete(classroom);
                              setShowDeleteModal(true);
                            }}
                          >
                            <i className="bi bi-trash me-1"></i> Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header bg-danger text-white">
                <h5 className="modal-title">
                  <i className="bi bi-exclamation-triangle me-2"></i> Confirm
                  Deletion
                </h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => setShowDeleteModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <p>
                  Are you sure you want to delete the classroom "
                  <strong>{classroomToDelete?.classroomName}</strong>"?
                </p>
                <p className="text-danger">
                  <small>This action cannot be undone.</small>
                </p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowDeleteModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => handleDelete(classroomToDelete.classroomId)}
                >
                  <i className="bi bi-trash me-2"></i> Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Classroom;
