import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [stats, setStats] = useState([
    { title: "Courses", count: 0 , color: "error"},
    { title: "Students", count: 0, color: "success" },
    { title: "Classrooms", count: 0, color: "info" },
    { title: "Instructors", count: 0, color: "warning" },
  ]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5168/api/home/dashboard"
        );
        setStats([
          { title: "Courses", count: response.data.activeCourses, color: "error" },
          { title: "Students", count: response.data.activeStudents, color: "success" },
          { title: "Classrooms", count: response.data.activeClassrooms, color: "info" },
          { title: "Instructors", count: response.data.totalInstructors, color: "warning" },
        ]);
        setLoading(false);
      } catch (err) {
        setError("Failed to load dashboard statistics");
        setLoading(false);
        console.error("Error fetching dashboard stats:", err);
      }
    };

    fetchDashboardStats();
  }, []);

  const quickAccessCards = [
    {
      title: "Manage Classes",
      icon: "calendar3",
      description:
        "Schedule classes, assign instructors, or update class details.",
      link: "/classrooms",
    },
    {
      title: "Manage Courses",
      icon: "book",
      description: "Add, edit, or remove courses from the system.",
      link: "/courses",
    },
    {
      title: "Manage Enrollments",
      icon: "person-badge",
      description: "Assign enrollments or update grades.",
      link: "/enrollments",
    },
    {
      title: "Manage Instructors",
      icon: "person-badge",
      description:
        "Add new Instructors, assign courses, or update information.",
      link: "/instructors",
    },
    {
      title: "Manage Students",
      icon: "people",
      description: "Enroll students, update information, or view records.",
      link: "/students",
    },
  ];

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Main Content */}
        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1 className="h2">Dashboard</h1>
          </div>

          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}

          {/* Stats Cards */}
          <div className="row row-cols-1 row-cols-md-2 row-cols-xl-4 g-4 mb-4">
            {stats.map((item, index) => {
              return <HomeCard key={index} title={item.title} count={loading ? "..." : item.count} color={item.color} />
            })}
          </div>

          {/* Quick Access Section */}
          <h2 className="mb-4">Quick Access</h2>
          <div className="row row-cols-1 row-cols-md-2 g-4">
            {quickAccessCards.map((card, index) => (
              <div className="col" key={index}>
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">
                      <i className={`bi bi-${card.icon}`}></i> {card.title}
                    </h5>
                    <p className="card-text">{card.description}</p>
                    <Link to={card.link} className="btn btn-primary">
                      Go to {card.title.split(" ")[1]}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>

      <style>{`
        .sidebar {
          position: fixed;
          top: 0;
          bottom: 0;
          left: 0;
          z-index: 100;
          padding: 48px 0 0;
          box-shadow: inset -1px 0 0 rgba(0, 0, 0, 0.1);
        }

        .sidebar .nav-link {
          font-weight: 500;
          color: #333;
        }

        .sidebar .nav-link.active {
          color: #007bff;
        }

        .sidebar .nav-link:hover {
          color: #007bff;
        }

        .sidebar-sticky {
          position: relative;
          top: 0;
          height: calc(100vh - 48px);
          padding-top: 0.5rem;
          overflow-x: hidden;
          overflow-y: auto;
        }

        .card {
          transition: transform 0.2s ease-in-out;
        }

        .card:hover {
          transform: translateY(-5px);
        }
      `}</style>
    </div>
  );
};

const HomeCard = ({ title, count, color }) => {
  return (
    <div className="col">
      <div className={`card h-100 border-${color}`}>
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text display-4">{count}</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
