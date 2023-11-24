import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { fetchCollection } from "../../features/collection/collection-slice";
import CardSlider from "../../components/CardSlider";
import Scoreboard from "../../components/Scoreboard";

const SingleCollection = () => {
  const dispatch = useDispatch();
  const { isLoading, singleCollection } = useSelector(
    (state) => state.collection,
  );
  const { isQuizDone } = useSelector((state) => state.quiz);

  const { collectionId } = useParams();

  useEffect(() => {
    dispatch(fetchCollection(collectionId));
  }, []);

  // console.log(collectionId);

  if (isLoading) {
    return (
      <section className="mt-16">
        <h1 className="text-2xl">Loading...</h1>
      </section>
    );
  }

  if (!singleCollection) {
    return (
      <section className="mt-16">
        <h1 className="text-2xl">No such collection</h1>
      </section>
    );
  }

  const { title, description, cards } = singleCollection;

  return (
    <section className="mx-auto mb-12 mt-16 w-full max-w-4xl  px-12 py-12">
      <h2 className="mb-12 text-3xl font-bold">{title}</h2>
      {!isQuizDone ? <CardSlider cards={cards} /> : <Scoreboard />}
    </section>
  );
};

export default SingleCollection;
