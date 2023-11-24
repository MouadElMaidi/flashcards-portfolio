import CollectionCard from "./CollectionCard";

const CollectionsContainer = ({ collections }) => {
  return (
    <ul>
      {collections.map((collection) => {
        return <CollectionCard key={collection.id} {...collection} />;
      })}
    </ul>
  );
};

export default CollectionsContainer;
