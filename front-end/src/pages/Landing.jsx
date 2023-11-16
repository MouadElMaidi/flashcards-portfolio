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
    <main className="bg-slate-100">
      <section className="container mx-auto grid grid-cols-2 place-items-center gap-x-16 h-screen">
        <article>
          <h1 className="text-8xl mb-6 font-semibold">QuizMe</h1>
          <p className="text-3xl leading-snug">
            Welcome to QuizMe - where you ace your classes with ease!
          </p>
        </article>
        <article className="w-10/12">
          <div className="bg-white px-8 py-8 rounded-xl shadow-lg">
            <form>
              {error && <p>{error}</p>}
              <input
                type="email"
                placeholder="Email address."
                className="block w-full text-2xl p-5 border-2 rounded-lg mb-4"
                name="email"
                value={emailInput}
                onChange={emailChangeHandler}
              />
              <input
                type="password"
                placeholder="Password"
                className="block w-full text-2xl p-5 border-2 rounded-lg mb-6"
                name="password"
                value={passwordInput}
                onChange={passwordChangeHandler}
              />
              <button
                type="submit"
                className="w-full text-2xl bg-purple-700 text-white p-4 font-bold rounded-lg "
                onClick={loginHandler}
              >
                Log in
              </button>
            </form>
            <hr className="my-7" />
            <button
              type="button"
              className="text-2xl bg-green-500 text-white py-4 px-8 font-bold rounded-lg block mx-auto"
              onClick={signupHandler}
            >
              Create a new account
            </button>
          </div>
        </article>
      </section>
      {signupIsVisible && <Signup />}
    </main>
  );
};

export default landing;

/*
<main className="bg-slate-100">
      <section className="container mx-auto grid grid-cols-2 place-items-center gap-x-16 h-screen">
        <article>
          <h1 className="text-8xl mb-6 font-semibold">QuizMe</h1>
          <p className="text-3xl leading-snug">
            Welcome to QuizMe - where you ace your classes with ease!
          </p>
        </article>
        <article className="w-10/12">
          <div className="bg-white px-8 py-8 rounded-xl shadow-lg">
            <form>
              <input
                type="email"
                placeholder="Email address."
                className="block w-full text-2xl p-5 border-2 rounded-lg mb-4"
              />
              <input
                type="password"
                placeholder="Password"
                className="block w-full text-2xl p-5 border-2 rounded-lg mb-6"
              />
              <button
                type="submit"
                className="w-full text-2xl bg-purple-700 text-white p-4 font-bold rounded-lg "
              >
                Log in
              </button>
            </form>
            <hr className="my-7" />
            <button
              type="button"
              className="text-2xl bg-green-500 text-white py-4 px-8 font-bold rounded-lg block mx-auto"
            >
              Create a new account
            </button>
          </div>
        </article>
      </section>
    </main>
*/
