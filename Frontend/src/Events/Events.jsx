import ArtistPage from "../Artist/ArtistsPage";
import TopEvent from "../Events/TopEvent";
import { useSearch } from "../Context/SearchProvider";

const Events = () => {
  const { query } = useSearch();

  return (
    <div className="">
      {!query && <ArtistPage />}
      <TopEvent />
    </div>
  );
};

export default Events;
