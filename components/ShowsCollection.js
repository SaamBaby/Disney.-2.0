import CollectionThumbnail from "./CollectionThumbnail";

function ShowsCollection({ results, title }) {
  return (
    <div className="relative flex flex-col space-y-3 my-12 px-8 max-w-[1400px] mx-auto">
      <h2 className="font-semibold">{title}</h2>
      <div
        className="flex space-x-6 space-y-hidden p-2 -m-2  overflow-x-scroll overflow-y-hidden
      scrollbar-hide"
      >
        {results.map((result) => (
          <CollectionThumbnail key={result.id} result={result} />
        ))}
      </div>
    </div>
  );
}

export default ShowsCollection;
