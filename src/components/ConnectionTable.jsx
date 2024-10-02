import React from 'react';
import './css/ConnectionTable.css';
const ConnectionTable = ({ connections, onEdit }) => (
  <table>
    <thead>
      <tr>
        <th>ID</th>
        <th>Applicant Name</th>
        <th>Gender</th>
        <th>District</th>
        <th>State</th>
        <th>Pincode</th>
        <th>Ownership</th>
        <th>GovtID Type</th>
        <th>ID Number</th>
        <th>Category</th>
        <th>Load Applied</th>
        <th>Date of Application</th>
        <th>Status</th>
        <th>Reviewer Name</th>
        <th>Reviewer Comments</th>
        <th>Actions</th> {/* Added Actions column */}
      </tr>
    </thead>
    <tbody>
      {connections.length > 0 ? (
        connections.map((conn) => (
          <tr key={conn.id}>
            <td>{conn.ID}</td>
            <td>{conn.Applicant_Name}</td>
            <td>{conn.Gender}</td>
            <td>{conn.District}</td>
            <td>{conn.State}</td>
            <td>{conn.Pincode}</td>
            <td>{conn.Ownership}</td>
            <td>{conn.GovtID_Type}</td>
            <td>{conn.ID_Number}</td>
            <td>{conn.Category}</td>
            <td>{conn.Load_Applied}</td>
            <td>{conn.Date_of_Application}</td>
            <td>{conn.Status}</td>
            <td>{conn.Reviewer_Name}</td>
            <td>{conn.Reviewer_Comments}</td>
            <td>
              <button onClick={() => onEdit(conn.ID)}>Edit</button> {/* Edit button */}
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan="15" style={{ textAlign: 'center' }}>No results found</td>
        </tr>
      )}
    </tbody>
  </table>
);

export default ConnectionTable;
