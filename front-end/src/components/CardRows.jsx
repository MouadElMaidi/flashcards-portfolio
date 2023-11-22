import { useDispatch } from "react-redux";

import CardRow from "./SingleCardRow";
import { collectionActions } from "../features/collection/collection-slice";

const CardRows = ({ cards }) => {
  const dispatch = useDispatch();

  const addCardHandler = () => {
    dispatch(collectionActions.addCard());
  };

  return (
    <div>
      <ul className="mb-20">
        {cards.map((card, index) => {
          return (
            <li key={card.id}>
              <CardRow index={index} {...card} />
            </li>
          );
        })}
      </ul>
      <button
        className="mb-12 w-full rounded-md bg-white py-10 font-bold uppercase tracking-widest underline decoration-cyan-400 decoration-4 underline-offset-8 hover:text-amber-400 hover:decoration-amber-400"
        type="button"
        onClick={addCardHandler}
      >
        + Add Card
      </button>
    </div>
  );
};

export default CardRows;
