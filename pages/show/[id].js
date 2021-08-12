import { PlayIcon, PlusIcon } from "@heroicons/react/solid";
import { getSession, useSession } from "next-auth/client";
import Head from "next/head";
import Image from "next/image";
import Header from "../../components/Header";
import Hero from "../../components/Hero";
function Show({ result }) {
  const [session] = useSession();
  console.log(result);
  const BASE_URL = "https://image.tmdb.org/t/p/original";
  return (
    <div>
      <Head>
        <title>{result.title || result.original_name || result.name}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      {!session ? (
        <Hero />
      ) : (
        <section className="relative z-50">
          <div className="relative min-h-[calc(100vh-72px)]">
            <Image
              src={
                `${BASE_URL}${result.backdrop_path || result.poster_path}` ||
                `${BASE_URL}${result.poster_path}`
              }
              layout="fill"
              objectFit="cover"
            />
          </div>

          <div className="absolute inset-y-12  md:inset-y-auto md:bottom-20 inset-x-4 md:inset-x-12 space-y-6  z-50">
            <h1 className="text-3xl sm:text-4xl  md:text-5xl font-bold">
              {result.title || result.original_name || result.name}
            </h1>
            <div className=" flex items-center space-x-3 md:space-x-5">
              <button className="flex  cursor-pointer bg-white  border-2   rounded  text-xs  items-center justify-center text-black md:text-base py-2.5 px-5">
                <span className="z-50 uppercase font-medium tracking">
                  PLAY
                </span>
                <img
                  src="/images/play-icon-black.svg"
                  alt=""
                  className="h-6 w-8"
                />
              </button>

              <button className="  flex cursor-pointer bg-black/30 border-2  border-white  rounded  text-xs  text-white md:text-base py-2.5 px-6 md: opacity-80  hover:bg-[#c6c6c6] hover:bg-opacity-50">
                <span className="z-50 uppercase font-medium tracking-wide">
                  TRAILER
                </span>
                <img
                  src="/images/play-icon-white.svg"
                  alt=""
                  className="h-6 w-8"
                />
              </button>
              <div
                className="rounded-full border-2 border-white flex items-center w-11
                justify-center h-11 cursor-pointer bg-black/60"
              >
                <PlusIcon className="h-6" />
              </div>
              <div className="rounded-full bg-black/30 border-2 border-white  w-11 items-center cursor-pointer justify-center h-11">
                <img src="/images/group-icon.svg" alt="" />
              </div>
            </div>
            <p className="text-xs md:text-sm">
              {result.release_date || result.first_air_date} .{" "}
              {result.number_of_seasons}{" "}
              {result.number_of_seasons != 1 ? "seasons" : " season"}{" "}
              {result.genres.map((genre) => genre.name + "  ")}{" "}
            </p>
            <h4 className="text-xs md:text-sm mr-24">{result.overview}</h4>
          </div>
        </section>
      )}
    </div>
  );
}

export default Show;

export async function getServerSideProps(context) {
  const { id } = context.query;
  const session = await getSession(context);
  const request = await fetch(
    `https://api.themoviedb.org/3/tv/${id}?api_key=${process.env.API_KEY}&language=en-US&append_to_response=videos`
  ).then((res) => res.json());

  return {
    props: {
      result: request,
      session,
    },
  };
}
