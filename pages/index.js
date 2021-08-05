import { getSession, useSession } from "next-auth/client";
import Head from "next/head";
import Category from "../components/Category";
import Header from "../components/Header";
import Hero from "../components/Hero";
import MoviesCollection from "../components/MoviesCollection";
import ShowsCollection from "../components/ShowsCollection";
import Slider from "../components/Slider";

export default function Home() {
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
          <Slider />
          <Category />
          <MoviesCollection />
          <ShowsCollection />
        </main>
      )}
    </div>
  );
}

export async function getServerSideProps(context) {
  // please dont forget to send context to the  getsession unction
  const session = await getSession(context);
  return {
    props: {
      session,
    },
  };
}
