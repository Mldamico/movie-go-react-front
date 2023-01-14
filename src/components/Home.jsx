import React from "react";
import { Link } from "react-router-dom";
import Ticket from "../images/movie-tickets.webp";
export const Home = () => {
  return (
    <>
      <div className="text-center">
        <h2>Find a movie to watch tonight!</h2>
        <hr />
        <Link to="/movies">
          <img src={Ticket} alt="Movie Tickets" style={{ width: 200 }} />
        </Link>
      </div>
    </>
  );
};
