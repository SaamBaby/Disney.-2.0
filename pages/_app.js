import { Provider } from "next-auth/client";
import "tailwindcss/tailwind.css";
import "../styles.css";

function MyApp({ Component, pageProps }) {
  // here we are sharing the user state with all the pages
  return (
    <Provider session={pageProps.session}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
