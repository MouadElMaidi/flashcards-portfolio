import { useNavigate } from "react-router-dom";

const CollectionCard = ({ title, id }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/collection/${id}`);
  };

  return (
    <div
      className="mb-8  max-w-4xl cursor-pointer rounded-md bg-white p-4 shadow-md"
      onClick={handleClick}
    >
      <h4 className="text-lg font-semibold">{title}</h4>
    </div>
  );
};

export default CollectionCard;
