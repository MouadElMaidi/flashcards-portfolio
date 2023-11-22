import React from "react";
import { useSelector, useDispatch } from "react-redux";

import CardRows from "../../components/CardRows";
import { collectionActions } from "../../features/collection/collection-slice";
import { createCollection } from "../../features/collection/collection-slice";

const AddSet = () => {
  const { title, description, cards, isLoading } = useSelector(
    (state) => state.collection,
  );

  const dispatch = useDispatch();

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    dispatch(collectionActions.handleHeaderChange({ name, value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createCollection({ title, description, cards }));
  };

  return (
    <section className="mb-12 mt-16 w-full px-12 py-12">
      <form>
        <header className="flex items-baseline justify-between">
          <h2 className="mb-12 text-3xl font-bold">Create a new study set</h2>
          <button
            className="rounded-lg bg-blue-700  px-4 py-2 font-semibold text-white"
            type="submit"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? "Saving..." : "Create"}
          </button>
        </header>
        <div className="mb-4">
          <input
            type="text"
            placeholder='Enter a title, like "CSS Terminology"'
            name="title"
            id="set-title"
            className="mb-0.5 block w-1/2 border-b-2 border-black bg-transparent py-2 text-lg  placeholder:text-slate-400  focus:border-b-4 focus:border-amber-300 focus:outline-none focus:ring-0"
            value={title}
            onChange={inputChangeHandler}
          />
          <label
            htmlFor="set-title"
            className="text-xs font-bold uppercase tracking-widest text-slate-500"
          >
            title
          </label>
        </div>
        <div className="mb-20">
          <input
            type="text"
            placeholder="Add a description"
            name="description"
            id="set-description"
            className="mb-0.5 block w-1/2 border-b-2 border-black bg-transparent py-2 text-lg  placeholder:text-slate-400  focus:border-b-4 focus:border-amber-300 focus:outline-none focus:ring-0"
            value={description}
            onChange={inputChangeHandler}
          />
          <label
            htmlFor="set-description"
            className="text-xs font-bold uppercase tracking-widest text-slate-500"
          >
            description
          </label>
        </div>
        <CardRows cards={cards} />
        <button
          className="float-right rounded-lg bg-blue-700 px-8 py-4 font-semibold text-white"
          type="submit"
          onClick={handleSubmit}
        >
          Create
        </button>
      </form>
    </section>
  );
};

export default AddSet;
