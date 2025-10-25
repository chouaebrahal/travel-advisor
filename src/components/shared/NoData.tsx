
const NoData = ({ searchError , placeError }: { searchError: string | null ,placeError:string | null }) => {
  const error = searchError || placeError;
  return (
    <div className="h-full w-full grid items-center">
      {error ? (
        <h3 className="text-secondary text-4xl animate-bounce">{error}</h3>
      ) : (
        <div className="text-secondary text-4xl animate-bounce">
          Hmm... looks like there’s nothing here yet. Try searching somewhere else!
        </div>
      )}
    </div>
  );
};

export default NoData;
