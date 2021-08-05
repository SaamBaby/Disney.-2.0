import Image from "next/image";
import {
  HomeIcon,
  SearchIcon,
  PlusIcon,
  StarIcon,
} from "@heroicons/react/solid";
import { getSession, signIn, signOut, useSession } from "next-auth/client";
import { useRouter } from "next/router";

function Header() {
  const [session] = useSession();
  const router = useRouter();
  // here seession checks if the user is logged in or if it does have a session
  return (
    <header className="sticky top-0 bg-[#040714] z-[1000]  flex  h-[72px] items-center px-10  md:px-12 ">
      <Image
        onClick={() => router.push("/")}
        src="/images/logo.svg"
        height={80}
        width={80}
        className="cursor-pointer"
      />

      {session && (
        <div className="hidden ml-10 md:flex items-center space-x-6">
          <a className="header-link group">
            <HomeIcon className="h-4" />
            <span className="span">Home</span>
          </a>
          <a className="header-link group">
            <SearchIcon className="h-4" />
            <span className="span">Search</span>
          </a>
          <a className="header-link group">
            <PlusIcon className="h-4" />
            <span className="span">Watchlist</span>
          </a>
          <a className="header-link group">
            <StarIcon className="h-4" />
            <span className="span">Originals</span>
          </a>
          <a className="header-link group">
            <img src="/images/movie-icon.svg" alt="" className="h-5" />
            <span className="span">Movies</span>
          </a>
          <a className="header-link group">
            <img src="/images/series-icon.svg" alt="" className="h-5" />
            <span className="span">Series</span>
          </a>
        </div>
      )}
      {session ? (
        <img
          src={session.user.image}
          alt=""
          className="h-9 ml-auto rounded-full object-cover cursor-pointer"
          onClick={signOut}
        />
      ) : (
        <button
          className="ml-auto uppercase  text-xs border px-3  py-1.5 rounded font-medium hover:bg-white hover:text-black  transition duration-300  "
          onClick={signIn}
        >
          LOGIN
        </button>
      )}
    </header>
  );
}

export default Header;
// server side rendering in next.js
