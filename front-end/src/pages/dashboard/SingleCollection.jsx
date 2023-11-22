import { useParams } from "react-router-dom";

const SingleCollection = () => {
  const { collectionId } = useParams();

  console.log(collectionId);

  return <div>SingleCollection</div>;
};

export default SingleCollection;
