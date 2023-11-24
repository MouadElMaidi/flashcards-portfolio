import { IoCloseSharp } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

import { uiActions } from "../features/ui/ui-slice";
import { useState } from "react";
import { registerUser } from "../features/user/auth-slice";

const Signup = () => {
  const dispatch = useDispatch();
  const [loginInfo, setLoginInfo] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const closeSignupHandler = () => {
    dispatch(uiActions.hideSignup());
  };

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setLoginInfo((prevInfo) => {
      return { ...prevInfo, [name]: value };
    });
  };

  const signupUser = (e) => {
    e.preventDefault();
    dispatch(
      registerUser({
        username: loginInfo.username,
        email: loginInfo.email,
        password: loginInfo.password,
      }),
    );
  };

  return (
    <>
      <div
        onClick={closeSignupHandler}
        className="absolute left-0 top-0 z-20 h-screen w-full bg-black/25"
      ></div>
      <div className="fixed left-1/2 top-1/2 z-30 w-11/12  max-w-lg translate-x-[-50%] translate-y-[-50%] rounded-xl bg-white px-2 py-4 shadow-lg md:p-6">
        <header className="lg:flex lg:justify-between">
          <h2 className="text-center text-xl font-semibold lg:text-2xl">
            Sign up
          </h2>
          <button
            onClick={closeSignupHandler}
            className="hidden lg:inline-block lg:text-2xl"
          >
            <IoCloseSharp />
          </button>
        </header>

        <hr className="my-4 lg:my-6" />
        <form>
          <input
            type="text"
            placeholder="Username"
            name="username"
            value={loginInfo.username}
            onChange={inputChangeHandler}
            className="mb-2 block w-full rounded-lg border p-2 text-base  lg:mb-4 lg:text-lg"
          />
          <input
            type="email"
            placeholder="Email address"
            name="email"
            value={loginInfo.email}
            onChange={inputChangeHandler}
            className="mb-2 block w-full rounded-lg border p-2 text-base lg:mb-4  lg:text-lg"
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={loginInfo.password}
            onChange={inputChangeHandler}
            className="mb-2 block w-full rounded-lg border p-2 text-base lg:mb-4  lg:text-lg"
          />
          <input
            type="password"
            placeholder="Confirm password"
            name="confirmPassword"
            value={loginInfo.confirmPassword}
            onChange={inputChangeHandler}
            className="mb-6 block w-full rounded-lg border p-2 text-base lg:mb-8  lg:text-lg"
          />
          <button
            onClick={signupUser}
            className="mx-auto block rounded-lg bg-teal-500 px-8 py-2 text-base font-semibold text-white  lg:text-xl"
          >
            Sign up
          </button>
        </form>
      </div>
    </>
  );
};

export default Signup;

/*
<>
      <div
        className="absolute left-0 top-0 w-full h-screen z-20 bg-white/75"
        onClick={closeSignupHandler}
      ></div>
      <section
        className="w-[40rem] fixed top-20  bg-white px-12 py-8 rounded-xl shadow-lg z-30"
        style={{ left: "calc(50% - 20rem)" }}
      >
        <header className="flex justify-between">
          <h2 className="text-4xl font-semibold">Sign up</h2>
          <button onClick={closeSignupHandler}>
            <IoCloseSharp className="text-4xl" />
          </button>
        </header>

        <hr className="my-4" />
        <form>
          <input
            type="text"
            placeholder="Username"
            className="block w-full text-xl p-4 border-2 rounded-lg mb-4"
            name="username"
            value={loginInfo.username}
            onChange={inputChangeHandler}
          />
          <input
            type="email"
            placeholder="Email address"
            className="block w-full text-xl p-4 border-2 rounded-lg mb-4"
            name="email"
            value={loginInfo.email}
            onChange={inputChangeHandler}
          />
          <input
            type="password"
            placeholder="Password"
            className="block w-full text-xl p-4 border-2 rounded-lg mb-4"
            name="password"
            value={loginInfo.password}
            onChange={inputChangeHandler}
          />
          <input
            type="password"
            placeholder="Confirm password"
            className="block w-full text-xl p-4 border-2 rounded-lg mb-4"
            name="confirmPassword"
            value={loginInfo.confirmPassword}
            onChange={inputChangeHandler}
          />
          <button
            onClick={signupUser}
            className="text-2xl bg-green-500 text-white py-4 px-12 font-bold rounded-lg block mx-auto mt-7"
          >
            Sign up
          </button>
        </form>
      </section>
    </>
  */
