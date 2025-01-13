import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { toast } from "react-hot-toast";

const CreateInstructor = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    hireDate: new Date().toISOString().split('T')[0]
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5168/api/instructor', formData);
      toast.success(response.data?.message)
      navigate("/instructors");
    } catch (error) {
      toast.error(error.response?.data?.details)
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-lg">
                     <div className="card-header bg-primary text-white">
              <h2 className="mb-0">Create Instructor</h2>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <div className="form-floating">
                      <input
                        name="firstName"
                        className="form-control"
                        placeholder="First Name"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                      />
                      <label>First Name</label>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-floating">
                      <input
                        name="lastName"
                        className="form-control"
                        placeholder="Last Name"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                      />
                      <label>Last Name</label>
                    </div>
                  </div>
                </div>

                <div className="form-floating mb-3">
                  <input
                    name="email"
                    className="form-control"
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                  <label>Email</label>
                </div>

                <div className="form-floating mb-3">
                  <input
                    name="hireDate"
                    className="form-control"
                    type="date"
                    value={formData.hireDate}
                    onChange={handleChange}
                    required
                  />
                  <label>Hire Date</label>
                </div>

                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                  <a href="/instructors" className="btn btn-secondary me-md-2">
                    <i className="bi bi-arrow-left"></i> Back to List
                  </a>
                  <button type="submit" className="btn btn-success">
                    <i className="bi bi-person-plus"></i> Create Instructor
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateInstructor;
