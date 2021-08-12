import { getSession, useSession } from "next-auth/client";
import Head from "next/head";
import Category from "../components/Category";
import Header from "../components/Header";
import Hero from "../components/Hero";
import MoviesCollection from "../components/MoviesCollection";
import ShowsCollection from "../components/ShowsCollection";
import Slider from "../components/Slider";

export default function Home({
  popularMovies,
  popularShows,
  top_ratedMovies,
  top_ratedShows,
}) {
  // hre we can use the hook to get the session  instead of passing it as props
  // we can only use like this for session to be shared
  //  since we pass session into provider in app.js we get the session
  // by using the hooks
  const [session] = useSession();
  return (
    <div className="min-h-screen">
      <Head>
        <title>Disney+</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      {!session ? (
        <Hero />
      ) : (
        <main
          className="relative min-h-screen after:bg-home 
          after:bg-center after:bg-cover after bg-no-repeat 
          after:bg-fixed after:absolute after:inset-0 after:z-[-1]"
        >
          <Slider results={popularMovies} />
          <Category />
          <MoviesCollection results={popularMovies} title="PopularMovies" />
          <ShowsCollection results={popularShows} title="PopularShows" />
          <MoviesCollection
            results={top_ratedMovies}
            title="Top Rated Movies"
          />
          <ShowsCollection results={top_ratedShows} title="Top Rated Shows" />
        </main>
      )}
    </div>
  );
}

export async function getServerSideProps(context) {
  // please dont forget to send context to the  getsession unction
  // hre we are using promise . all to to get multiple fetch results
  // here promise all triggers all teh fetch resuls in the
  const session = await getSession(context);
  const [
    popularMoviesRes,
    popularShowsRes,
    top_ratedMoviesRes,
    top_ratedShowsRes,
  ] = await Promise.all([
    fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}&language=en-US&page=1`
    ),
    fetch(
      `https://api.themoviedb.org/3/tv/popular?api_key=${process.env.API_KEY}&language=en-US&page=1`
    ),
    fetch(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.API_KEY}&language=en-US&page=1`
    ),
    fetch(
      `https://api.themoviedb.org/3/tv/top_rated?api_key=${process.env.API_KEY}&language=en-US&page=1`
    ),
  ]);
  const [popularMovies, popularShows, top_ratedMovies, top_ratedShows] =
    await Promise.all([
      popularMoviesRes.json(),
      popularShowsRes.json(),
      top_ratedMoviesRes.json(),
      top_ratedShowsRes.json(),
    ]);
  return {
    props: {
      session,
      popularMovies: popularMovies.results,
      popularShows: popularShows.results,
      top_ratedMovies: top_ratedMovies.results,
      top_ratedShows: top_ratedShows.results,
    },
  };
}
