import { getSession, useSession } from "next-auth/client";
import Head from "next/head";
import Image from "next/image";
import Header from "../../components/Header";
import Hero from "../../components/Hero";
import { useState } from "react";
import { PlusIcon } from "@heroicons/react/solid";
function Movie({ result }) {
  const [session] = useSession();
  const BASE_URL = "https://image.tmdb.org/t/p/original";
  const [showPlayer, setShowPlayer] = useState(false);
  return (
    <div>
      <Head>
        <title>{result.original_title || result.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      {!session ? (
        <Hero />
      ) : (
        <section className="relative z-50  ">
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

          <div
            className="absolute inset-y-28 md:inset-y-auto md:bottom-10 
            inset-x-4 md:inset-x-12 space-y-6 z-50 "
          >
            <h1 className="text-3xl sm:text-4xl  md:text-5xl font-bold">
              {result.original_title || result.title}
            </h1>
            <div className="flex items-center space-x-3 md:space-x-5">
              <button
                className="bg-[#f9f9f9] text-xs md:text-base text-black flex items-center justify-center
               py-2.5 px-6 rounded "
              >
                <span className="uppercase font-medium tracking-wide">
                  Play
                </span>
                <img
                  src="/images/play-icon-black.svg"
                  alt=""
                  className="h-6 md:h-8"
                />
              </button>
              <button
                onClick={() => setShowPlayer(true)}
                className="bg-black/30  opacity-50 text-xs md:text-base border-2
                border-white 
                text-[#f9f9f9] flex items-center justify-center
               py-2.5 px-6 rounded  hover:bg-[#c6c6c6] "
              >
                <span className=" z-50 uppercase font-medium tracking-wide">
                  Trailer
                </span>
                <img
                  src="/images/play-icon-white.svg"
                  alt=""
                  className="h-6 md:h-8"
                />
              </button>
              <div
                className="rounded-full border-2 border-white flex items-center w-11
                justify-center h-11 cursor-pointer bg-black/60"
              >
                <PlusIcon className="h-6" />
              </div>
              <div
                className="rounded-full border-2 border-white flex items-center w-11
                justify-center h-11 cursor-pointer bg-black/60"
              >
                <img src="/images/group-icon.svg" alt="" />
              </div>
            </div>
            <p className=" text-xs md:text-sm">
              {result.release_date || result.first_air_date} .{" "}
              {Math.floor(result.runtime / 60)}h{result.runtime % 60}m .{" "}
              {result.genres.map((genre) => genre.name + " ")}{" "}
            </p>
            <h4 className="text-xs md:text-sm "> {result.overview}</h4>
          </div>
        </section>
      )}
    </div>
  );
}
export default Movie;

export async function getServerSideProps(context) {
  const { id } = context.query;
  const session = await getSession(context);
  const request = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.API_KEY}&language=en-US&append_to_response=videos,images`
  ).then((response) => response.json());

  return {
    props: {
      result: request,
      session,
    },
  };
}
