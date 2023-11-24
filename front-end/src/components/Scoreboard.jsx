import { useSelector } from "react-redux";
const Scoreboard = () => {
  const { finalScore } = useSelector((state) => state.quiz);

  return (
    <>
      <h2 className="mb-12 text-4xl font-bold">
        Way to go! You've reviewed all the cards.
      </h2>
      <p>This is your final score</p>
      <div>
        <h4>
          Correct Answers : <span>{finalScore.correctAnswers}</span>
        </h4>
        <h4>
          Skipped Answers : <span>{finalScore.skippedAnswers}</span>
        </h4>
        <h4>
          Wrong Answers : <span>{finalScore.wrongAnswers}</span>
        </h4>
      </div>
    </>
  );
};

export default Scoreboard;
