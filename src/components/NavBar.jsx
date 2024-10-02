import React from 'react';
import './css/NavBar.css'; // Import the CSS file

export default function NavBar() {
  return (
    <div className="navbar"> {/* Apply the navbar class */}
      <a href="/" className="active"> {/* Optionally add active class for the home link */}
        Home
      </a>
      <a href="/addUser">
        Add User
      </a>
      <a href="/reports">
        Reports
      </a>
    </div>
  );
}
