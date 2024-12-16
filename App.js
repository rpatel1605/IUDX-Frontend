import React, { useState } from "react";
import "./App.css";

const ConsentDashboard = () => {
  const [connections, setConnections] = useState([
    {
      id: 1,
      connectionType: "Education",
      hostUser: "Beginner",
      guestUser: "Admissions",
      createdOn: "06/12/2024",
      validTill: "20/12/2024",
      sharedFiles: [
        { name: "document1.pdf", size: "1MB" },
        { name: "document2.pdf", size: "2MB" },
      ],
      status: "active",
    },
    {
      id: 2,
      connectionType: "Documents",
      hostUser: "Sachin",
      guestUser: "Education",
      createdOn: "05/12/2024",
      validTill: "18/12/2024",
      sharedFiles: [{ name: "datafile1.csv", size: "500KB" }],
      status: "active",
    },
    {
      id: 3,
      connectionType: "Research",
      hostUser: "Researcher",
      guestUser: "Lab",
      createdOn: "07/12/2024",
      validTill: "21/12/2024",
      sharedFiles: [
        { name: "research_data.xlsx", size: "3MB" },
        { name: "analysis.pdf", size: "1.5MB" },
      ],
      status: "active",
    },
  ]);

  const handleRevoke = (id) => {
    if (window.confirm("Are you sure you want to revoke this connection?")) {
      setConnections(connections.map(conn => 
        conn.id === id ? {...conn, status: "revoked"} : conn
      ));
    }
  };

  const getTotalConnections = () => connections.length;
  const getActiveConnections = () => connections.filter(conn => conn.status === "active").length;
  const getTotalSharedFiles = () => 
    connections.reduce((total, connection) => total + connection.sharedFiles.length, 0);
  const getAverageConnectionAge = () => {
    const today = new Date();
    const totalDays = connections.reduce((total, connection) => {
      const createdDate = new Date(connection.createdOn);
      const diffTime = Math.abs(today - createdDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return total + diffDays;
    }, 0);
    return Math.round(totalDays / connections.length);
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Consent Dashboard</h1>
      </div>
      <div className="dashboard-stats">
        <div className="stat-card">
          <div className="stat-title">Active Connections</div>
          <div className="stat-value">{getActiveConnections()}</div>
        </div>
        <div className="stat-card">
          <div className="stat-title">Total Files Shared</div>
          <div className="stat-value">{getTotalSharedFiles()}</div>
        </div>
        <div className="stat-card">
          <div className="stat-title">Avg. Connection Age</div>
          <div className="stat-value">{getAverageConnectionAge()} days</div>
        </div>
      </div>
      
      <div className="active-connections">
        <h2 className="section-title">Active Connections</h2>
        <div className="connection-cards">
          {connections.filter(conn => conn.status === "active").map((connection) => (
            <div key={connection.id} className="connection-card">
              <div className="connection-header">
                <h3>{connection.connectionType}</h3>
                <span className="connection-status">{connection.status}</span>
              </div>
              <div className="connection-details">
                <p><strong>Host:</strong> {connection.hostUser}</p>
                <p><strong>Guest:</strong> {connection.guestUser}</p>
                <p><strong>Created:</strong> {connection.createdOn}</p>
                <p><strong>Valid Till:</strong> {connection.validTill}</p>
              </div>
              <div className="connection-files">
                <h4>Shared Files:</h4>
                <ul>
                  {connection.sharedFiles.map((file, index) => (
                    <li key={index}>{file.name} ({file.size})</li>
                  ))}
                </ul>
              </div>
              <button className="action-button" onClick={() => handleRevoke(connection.id)}>
                Revoke
              </button>
            </div>
          ))}
        </div>
      </div>

      <h2 className="section-title">All Connections</h2>
      <table className="dashboard-table">
        <thead>
          <tr>
            <th>Connection Type</th>
            <th>Host User</th>
            <th>Guest User</th>
            <th>Created On</th>
            <th>Valid Till</th>
            <th>Shared Files</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {connections.map((connection) => (
            <tr key={connection.id}>
              <td>{connection.connectionType}</td>
              <td>{connection.hostUser}</td>
              <td>{connection.guestUser}</td>
              <td>{connection.createdOn}</td>
              <td>{connection.validTill}</td>
              <td>
                <ul className="file-list">
                  {connection.sharedFiles.map((file, i) => (
                    <li key={i}>{`${file.name} (${file.size})`}</li>
                  ))}
                </ul>
              </td>
              <td>{connection.status}</td>
              <td>
                {connection.status === "active" && (
                  <button
                    className="action-button"
                    onClick={() => handleRevoke(connection.id)}
                  >
                    Revoke
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ConsentDashboard;