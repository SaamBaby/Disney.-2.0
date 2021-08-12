import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Image from "next/image";
import { useRouter } from "next/router";
function Slider({ results }) {
  const BASE_URL = "https://image.tmdb.org/t/p/original/";
  return (
    // make sure u enable loading lazy in
    <section className="relative mt-7 shadow-2xl   max-w-screen-2xl">
      <Carousel
        autoPlay
        infiniteLoop
        showStatus={false}
        showIndicators={true}
        showThumbs={false}
        dynamicHeight={true}
        interval={5000}
      >
        {/* <div>
          <img loading="lazy" src="/images/slider-1.jpg" alt="" />
        </div>
        <div>
          <img loading="lazy" src="/images/slider-2.jpg" alt="" />
        </div>
        <div>
          <img loading="lazy" src="/images/slider-3.jpg" alt="" />
        </div>
        <div>
          <img loading="lazy" src="/images/slider-4.jpeg" alt="" />
        </div> */}
        {results.map((result) => (
          <section className="relative min-h-[calc(75vh-65px)]">
            <div class="bg-blend-lighten md:bg-blend-darken flex"> 
              <Image
                key={result.id}
                src={
                  `${BASE_URL}${result.backdrop_path || result.poster_path}` ||
                  `${BASE_URL}${result.poster_path}`
                }
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div></div>
          </section>
        ))}
      </Carousel>
    </section>
  );
}

export default Slider;
