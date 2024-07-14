import { Mousewheel } from "swiper/modules";

export const SwiperConfing = {
  spaceBetween: 16,
  slidesPerView: 2,
  modules: [Mousewheel],
  breakpoints: {
    600: {
      slidesPerView: 3,
    },
    768: {
      slidesPerView: 4,
    },
    1024: {
      slidesPerView: 5,
    },
  },
};
