"use client";
import Image from "next/image";
import "@/app/styles/animations.css";

const IMAGES = [
  "/img/landing_image_1.jpg",
  "/img/landing_image_2.jpg",
  "/img/landing_image_3.jpg",
  "/img/landing_image_4.jpg",
  "/img/landing_image_5.jpg",
  "/img/landing_image_6.jpg",
  "/img/landing_image_7.jpg",
  "/img/landing_image_8.jpg",
  "/img/landing_image_9.jpg",
  "/img/landing_image_10.jpg",
  "/img/landing_image_11.jpg",
  "/img/landing_image_12.jpg"
];

const shuffleArray = (array: string[]) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const FloatingImagesGrid = () => {

  const firstHalf = IMAGES.slice(0, IMAGES.length / 2);
  const secondHalf = IMAGES.slice(IMAGES.length / 2);
  
  const randomImagesDown = [...shuffleArray(firstHalf), ...shuffleArray(firstHalf), ...shuffleArray(firstHalf)];
  const randomImagesUp = [...shuffleArray(secondHalf), ...shuffleArray(secondHalf), ...shuffleArray(secondHalf)];

  return (
    <div className="md:hidden lg:block flex-1 relative gap-4 overflow-hidden h-[700px] images-carousel-landing">
      <div className="grid grid-cols-2 gap-8 -mx-6">
        <div className="flex flex-col gap-4 animate-scroll-down items-end">
          {randomImagesDown.map((src, index) => (
            <div
              key={`down-${index}`}
              className="relative h-40 w-64 transform hover:scale-105 transition-transform"
            >
              <Image
                src={src}
                alt={`Job Preview ${index + 1}`}
                fill
                className="object-cover rounded-xl"
              />
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-4 animate-scroll-up items-start">
          {randomImagesUp.map((src, index) => (
            <div
              key={`up-${index}`}
              className="relative h-40 w-64 transform hover:scale-105 transition-transform"
            >
              <Image
                src={src}
                alt={`Job Preview ${index + 1}`}
                fill
                className="object-cover rounded-xl"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="absolute -z-10 inset-0 overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-20 h-20 bg-blue-500/20 rounded-full blur-xl animate-pulse" />
        <div className="absolute bottom-1/4 left-1/3 w-32 h-32 bg-cyan-500/20 rounded-full blur-xl animate-pulse delay-700" />
        <div className="absolute top-1/3 left-1/4 w-24 h-24 bg-indigo-500/20 rounded-full blur-xl animate-pulse delay-500" />
      </div>
    </div>
  );
};

export default FloatingImagesGrid;