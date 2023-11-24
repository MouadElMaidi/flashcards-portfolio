import Slider from "react-slick";
import { useRef, useState } from "react";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import { useDispatch } from "react-redux";

import SingleCardSlide from "./SingleCardSlide";
import { quizActions } from "../features/quiz/quiz-slice";

const CardSlider = ({ cards }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slider = useRef(null);

  const dispatch = useDispatch();

  const prevSlide = () => {
    dispatch(quizActions.resetSelectedResult());
    dispatch(quizActions.hideAnswer());
    slider?.current?.slickPrev();
  };

  const nextSlide = () => {
    dispatch(quizActions.hideAnswer());
    dispatch(quizActions.calculateScore());

    slider?.current?.slickNext();
    if (currentSlide === cards.length - 1) {
      dispatch(quizActions.revealFinalScore());
    }
  };

  const settings = {
    dots: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    swipe: false,
    infinite: false,
    beforeChange: (curr, next) => {
      setCurrentSlide(next);
    },
  };

  return (
    <div>
      <Slider {...settings} className="shadow-xl" ref={slider}>
        {cards &&
          cards.map((card) => {
            return <SingleCardSlide card={card} key={card.id} />;
          })}
      </Slider>
      <div className="my-4 flex items-center justify-center">
        <button className="rounded-full border-2 p-4" onClick={prevSlide}>
          <FaArrowLeftLong />
        </button>
        <span className="mx-4 font-semibold text-slate-600">
          {cards && currentSlide + 1 + " / " + cards.length}
        </span>
        <button className="rounded-full border-2 p-4" onClick={nextSlide}>
          <FaArrowRightLong />
        </button>
      </div>
    </div>
  );
};

export default CardSlider;
