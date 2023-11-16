import React from "react";
import { Link, NavLink } from "react-router-dom";
import { FaCirclePlus } from "react-icons/fa6";

const MainNavigation = () => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-slate-400 flex h-23">
      <Link to="/" className="">
        QuizMe
      </Link>
      <nav>
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/sets">You library</NavLink>
          </li>
        </ul>
      </nav>
      <form>
        <input type="text" placeholder="Find your set faster with a search" />
      </form>
      <button type="buttons">
        <FaCirclePlus />
      </button>
      <button type="button">M</button>
    </header>
  );
};

export default MainNavigation;
