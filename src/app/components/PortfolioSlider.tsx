"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Pagination, Navigation } from "swiper/modules";

const portfolioItems = [
  {
    title: "Clinically - clinic & health care website",
    image: "/img/portfolio1.png",
  },
  {
    title: "Growthly - SaaS Analytics & Sales Website",
    image: "/img/portfolio2.png",
  },
  {
    title: "Planna - Project Management App",
    image: "/img/portfolio3.png",
  },
];

const PortfolioSlider = () => {
  return (
    <div className="px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Portfolios</h2>
      <Swiper
        /* spaceBetween={30}
                slidesPerView={3}
                pagination={{ clickable: true }} */
        pagination={{ type: "fraction" }}
        navigation
        modules={[Pagination, Navigation]}
        /*  breakpoints={{
                    320: { slidesPerView: 1 },
                    640: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                }} */
        className="h-96 w-[20rem] md:w-[50rem] lg:w-[80rem] rounded-lg"
      >
        {portfolioItems.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="rounded-lg overflow-hidden shadow-md bg-white">
              <Image
                src={item.image}
                alt={item.title}
                width={500}
                height={500}
                className="w-full h-60 object-cover"
              />
              <div className="p-4">
                <p className="font-medium">{item.title}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default PortfolioSlider;
