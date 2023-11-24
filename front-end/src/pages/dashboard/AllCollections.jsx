import { useEffect } from "react";
import { getUserFromLocalStorage } from "../../utils/localStorage";
import { getAllCollections } from "../../features/allCollections/allCollectionsSlice";
import { useDispatch, useSelector } from "react-redux";
import CollectionsContainer from "../../components/CollectionsContainer";

const AllCollections = () => {
  const dispatch = useDispatch();
  const { collections } = useSelector((state) => state.allCollections);

  useEffect(() => {
    dispatch(getAllCollections());
  }, []);

  return (
    <section className="mb-12 mt-16 w-full px-12 py-12">
      <h2 className="mb-12 text-3xl font-bold">All collections</h2>
      <CollectionsContainer collections={collections} />
    </section>
  );
};

export default AllCollections;
