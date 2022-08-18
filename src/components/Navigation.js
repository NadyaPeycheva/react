import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export function Navigation({user}) {

  const guest = (
    <div id="guest">
      <Link to="/login" className="button">
        Login
      </Link>
      <Link to="/register" className="button">
        Register
      </Link>
    </div>
  );

  const logedUser = (
    <div id="user">
      <span>Welcome, {user} </span>
      <Link to="/allPets" className="button">
        My Pets
      </Link>
      <Link to="/add" className="button">
        Add Pet
      </Link>
      <Link
        to="logout"
        className="button"
        onClick={localStorage.removeItem("user")}
      >
        Logout
      </Link>
    </div>
  );
  return (
    <nav className="navbar">
      <section className="navbar-dashboard">
        <Link to="/">Dashboard</Link>
        {user ? logedUser : guest}
      </section>
    </nav>
  );
}
