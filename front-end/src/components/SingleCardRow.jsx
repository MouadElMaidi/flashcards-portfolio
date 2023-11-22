import { FaTrash } from "react-icons/fa6";
import { useDispatch } from "react-redux";

import { collectionActions } from "../features/collection/collection-slice";

const CardRow = (props) => {
  const dispatch = useDispatch();

  const cardChangeHandler = (e) => {
    const { name, value } = e.target;
    dispatch(collectionActions.handleCardChange({ id: props.id, name, value }));
  };

  const deleteCardHandler = (e) => {
    dispatch(collectionActions.deleteCard(props.id));
  };

  return (
    <div className="bg-white rounded-lg mb-8 shadow-sm">
      <header className="border-b-2 px-7 py-4 flex justify-between items-center text-base">
        <span className="font-medium">{props.index + 1}</span>
        <button
          className="text-slate-700"
          onClick={deleteCardHandler}
          type="button"
        >
          <FaTrash />
        </button>
      </header>
      <div className="grid grid-cols-2 px-7 py-7 justify-stretch gap-x-12">
        <div>
          <input
            type="text"
            className="block text-lg bg-transparent py-2 border-b-2 border-black placeholder:text-slate-400 focus:outline-none  focus:ring-0  focus:border-b-4 focus:border-amber-300 mb-0.5 w-full"
            value={props.question}
            name="question"
            onChange={cardChangeHandler}
          />
          <label className="uppercase text-xs text-slate-500 tracking-widest font-bold">
            term
          </label>
        </div>
        <div>
          <input
            type="text"
            className="block text-lg bg-transparent py-2 border-b-2 border-black placeholder:text-slate-400 focus:outline-none  focus:ring-0  focus:border-b-4 focus:border-amber-300 w-full mb-0.5"
            name="answer"
            value={props.answer}
            onChange={cardChangeHandler}
          />
          <label className="uppercase text-xs text-slate-500 tracking-widest font-bold">
            definition
          </label>
        </div>
      </div>
    </div>
  );
};

export default CardRow;
