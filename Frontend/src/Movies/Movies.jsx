import NewMovies from "../Movies/NewMovies";
import NewMovie from "../Movies/NewMovie";
import { ClipLoader } from "react-spinners";
import { useState } from "react";

const Movies = () => {
  const [loading, setLoading] = useState(false);
  if (loading) {
    return (
      <div className="text-center">
        <ClipLoader loading={true} />
      </div>
    );
  }

  return (
    <div>
      <NewMovies />

      <NewMovie />
    </div>
  );
};

export default Movies;
