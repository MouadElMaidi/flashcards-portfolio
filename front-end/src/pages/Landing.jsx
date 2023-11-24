import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { uiActions } from "../features/ui/ui-slice";
import Signup from "../components/Signup";
import { loginUser } from "../features/user/auth-slice";

const landing = () => {
  const signupIsVisible = useSelector((state) => state.ui.signupIsVisible);
  const { user, isLoading } = useSelector((state) => state.auth);
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const emailChangeHandler = (e) => {
    setEmailInput(e.target.value);
  };

  const passwordChangeHandler = (e) => {
    setPasswordInput(e.target.value);
  };

  const signupHandler = () => {
    dispatch(uiActions.showSignup());
  };

  const loginHandler = (e) => {
    e.preventDefault();
    if (!emailInput || !passwordInput) {
      setError("Please fill out all fields");
      return;
    }
    setError("");
    dispatch(loginUser({ email: emailInput, password: passwordInput }));
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  return (
    <main>
      <div className="mx-auto h-screen  w-full max-w-lg  px-4 py-8 md:grid md:max-w-6xl md:grid-cols-2 md:place-items-center md:gap-x-6 md:px-12">
        <div className="mb-8 text-center md:text-left">
          <h1 className="mb-4 text-3xl font-bold text-cyan-600 md:text-4xl lg:mb-6 lg:text-6xl">
            QuizMe
          </h1>
          <p className="text-lg font-medium leading-snug lg:text-2xl">
            Welcome to QuizMe - where you ace your classes with ease!
          </p>
        </div>
        <div className="md:w-full">
          <form>
            {error && <p>{error}</p>}
            <input
              type="email"
              placeholder="Email address."
              name="email"
              value={emailInput}
              onChange={emailChangeHandler}
              className="mb-2 block w-full rounded-lg border p-2 text-base lg:p-4 lg:text-lg"
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={passwordInput}
              onChange={passwordChangeHandler}
              className="mb-4 block w-full rounded-lg border p-2 text-base lg:p-4 lg:text-lg"
            />
            <button
              type="submit"
              onClick={loginHandler}
              className="w-full rounded-lg bg-cyan-700 p-2 text-base font-semibold text-white lg:p-4 lg:text-xl"
            >
              Log in
            </button>
          </form>
          <hr className="my-7 border-slate-300" />
          <button
            type="button"
            onClick={signupHandler}
            className="mx-auto block rounded-lg bg-teal-500 px-8 py-2 text-base font-semibold text-white lg:p-4 lg:text-xl"
          >
            Create a new account
          </button>
        </div>
      </div>
      {signupIsVisible && <Signup />}
    </main>
  );
};

export default landing;

/*
    <main>
      <div className="container mx-auto grid h-screen grid-cols-2 place-items-center gap-x-6 px-24">
        <article>
          <h1 className="mb-6 text-6xl font-semibold">QuizMe</h1>
          <p className="text-2xl leading-snug">
            Welcome to QuizMe - where you ace your classes with ease!
          </p>
        </article>
        <article className="w-9/12">
          <div className="rounded-xl bg-white px-4 py-4 shadow-lg">
            <form>
              {error && <p>{error}</p>}
              <input
                type="email"
                placeholder="Email address."
                className="mb-4 block w-full rounded-lg border p-3 text-lg"
                name="email"
                value={emailInput}
                onChange={emailChangeHandler}
              />
              <input
                type="password"
                placeholder="Password"
                className="mb-6 block w-full rounded-lg border p-3 text-lg"
                name="password"
                value={passwordInput}
                onChange={passwordChangeHandler}
              />
              <button
                type="submit"
                className="w-full rounded-lg bg-purple-700 p-2 text-lg font-bold text-white "
                onClick={loginHandler}
              >
                Log in
              </button>
            </form>
            <hr className="my-7" />
            <button
              type="button"
              className="mx-auto mb-4 block rounded-lg bg-green-500 px-8 py-2 text-lg font-bold text-white"
              onClick={signupHandler}
            >
              Create a new account
            </button>
          </div>
        </article>
      </div>
      {signupIsVisible && <Signup />}
    </main>
*/
