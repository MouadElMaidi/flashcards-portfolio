import React from "react";
import { Link, NavLink } from "react-router-dom";
import { FaCirclePlus } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { useDispatch } from "react-redux";

import { authActions } from "../features/user/auth-slice";

const MainNavigation = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(authActions.logoutUser());
  };

  return (
    <header className="fixed left-0 right-0 top-0 grid h-16 grid-cols-[auto_1fr_auto] items-center justify-items-center border-b bg-white px-8">
      <div className="flex items-center">
        <Link to="/" className="text-2xl font-bold">
          QuizMe
        </Link>
        <nav>
          <ul className="flex">
            <li className="ml-8">
              <NavLink to="/" className="text-base font-semibold">
                Home
              </NavLink>
            </li>
            <li className="ml-8">
              <NavLink to="/sets" className="text-base font-semibold">
                You library
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>

      <form
        className="flex w-full place-items-center rounded-full px-12 text-base"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div className="flex h-11 items-center rounded-s-full border-y-2 border-l-2 bg-white px-4 text-slate-600">
          <FaSearch />
        </div>
        <input
          type="text"
          placeholder="Find your set faster with a search"
          className="h-11 w-full rounded-e-full border-y-2  border-r-2 focus:outline-none focus:ring-0"
        />
      </form>
      <div className="flex place-content-center">
        <Link
          type="buttons"
          className="mr-8 inline text-4xl text-blue-700"
          to="/add-set"
        >
          <FaCirclePlus />
        </Link>
        <button
          className="rounded-md bg-violet-700 px-4 py-2 font-bold text-white"
          onClick={handleLogout}
        >
          Logout
        </button>
        {/* <button
          type="button"
          className="inline h-[2.33rem] w-[2.33rem] rounded-full bg-purple-600 text-xl font-medium text-white"
        >
          M
        </button> */}
      </div>
    </header>
  );
};

export default MainNavigation;
