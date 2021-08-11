import Image from "next/image";
import { useRouter } from "next/router";

function MovieThumbnail({ result }) {
  const BASE_URL = "https://image.tmdb.org/t/p/original/";
  const router = useRouter();
  return (
    <div
      className="min-h-[160px] min-w-[250px] md:min-h-[200px] md:min-w-[330px] cursor-pointer border-[2px] rounded-lg 
      border-[#f9f9f9] overflow-visible border-opacity-10 hover:border-opacity-80 transform hover:scale-105 transition duration-300 hover:shadow-2xl"
      onClick={() => router.push(`/movie/${result.id}`)}
    >
      <Image
        src={
          `${BASE_URL}${result.backdrop_path || result.poster_path}` ||
          `${BASE_URL}${result.poster_path}`
        }
        width={330}
        height={210}
        objectFit="cover"
        className="rounded-lg"
      />
    </div>
  );
}

export default MovieThumbnail;
