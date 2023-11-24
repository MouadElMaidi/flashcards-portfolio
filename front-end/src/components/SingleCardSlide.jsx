import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import { BsFillSkipForwardFill } from "react-icons/bs";

import { quizActions } from "../features/quiz/quiz-slice";

const SingleCardSlide = ({ card: { question, answer } }) => {
  const { isAnswerVisible, selectedResult } = useSelector(
    (state) => state.quiz,
  );
  const dispatch = useDispatch();

  const handleCardClick = () => {
    dispatch(quizActions.revealAnswer());
  };

  const handleOptionChange = (e) => {
    const { value } = e.target;
    dispatch(quizActions.handleChange(value));
  };

  return (
    <div
      className="relative flex h-96 cursor-pointer items-center justify-center rounded-lg bg-white p-8 text-center"
      onClick={handleCardClick}
    >
      <p className="text-3xl">{isAnswerVisible ? answer : question}</p>
      {isAnswerVisible && (
        <div className="absolute inset-x-auto bottom-0 grid grid-cols-3 gap-x-7">
          <div className="p-4">
            <input
              type="radio"
              name="question-status"
              value="correct"
              id="correct"
              onChange={handleOptionChange}
            />
            <label htmlFor="correct">
              <FaThumbsUp />
            </label>
          </div>
          <div className="p-4">
            <input
              type="radio"
              name="question-status"
              value="skip"
              id="skip"
              onChange={handleOptionChange}
            />
            <label htmlFor="skip">
              <BsFillSkipForwardFill />
            </label>
          </div>
          <div className="p-4">
            <input
              type="radio"
              name="question-status"
              value="wrong"
              id="wrong"
              onChange={handleOptionChange}
            />
            <label htmlFor="wrong">
              <FaThumbsDown />
            </label>
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleCardSlide;
