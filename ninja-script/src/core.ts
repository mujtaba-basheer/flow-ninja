type SwiperPropsMap = {
  [prop: string]: {
    attr: string;
    type: ("boolean" | "string" | "number" | "auto" | "swiper")[];
    has_props?: boolean;
    parent?: string;
  };
};

// const kebabToCamelCase = (str: string) => {
//   const words = str.split("-");
//   let cs: string = "";
//   for (let i = 0; i < words.length; i++) {
//     let word = words[i];
//     if (i !== 0 && word) {
//       word = word.charAt(0).toUpperCase() + word.substring(1);
//     }
//     cs += word;
//   }
//   return cs;
// };

const swiperMap = new Map<string, any>();
const thumbsMap = new Map<string, string>();

const get_swiper_props = (el: HTMLElement) => {
  const swiper_props_map: SwiperPropsMap = {
    "space-between": {
      attr: "spaceBetween",
      type: ["number"],
    },
    speed: {
      attr: "speed",
      type: ["number"],
    },
    "swiper-loop": {
      attr: "loop",
      type: ["boolean"],
    },
    "slides-per-view": {
      attr: "slidesPerView",
      type: ["number", "auto"],
    },
    "swiper-autoplay": {
      attr: "autoplay",
      type: ["boolean"],
      has_props: true,
    },
    "swiper-autoplay-delay": {
      attr: "delay",
      type: ["number"],
      parent: "autoplay",
    },
    "swiper-autoplay-disableinteraction": {
      attr: "disableOnInteraction",
      type: ["boolean"],
      parent: "autoplay",
    },
    "swiper-a11y": {
      attr: "a11y",
      type: ["boolean"],
      has_props: true,
    },
    "ws-progress": {
      attr: "watchSlidesProgress",
      type: ["boolean"],
    },
    "centered-slides": {
      attr: "centeredSlides",
      type: ["boolean"],
    },
    "grab-cursor": {
      attr: "grabCursor",
      type: ["boolean"],
    },
    "touch-move": {
      attr: "allowTouchMove",
      type: ["boolean"],
    },
    "swiper-nav": {
      attr: "navigation",
      type: ["boolean"],
      has_props: true,
    },
    "nav-right": {
      attr: "nextEl",
      type: ["string"],
      parent: "navigation",
    },
    "nav-left": {
      attr: "prevEl",
      type: ["string"],
      parent: "navigation",
    },
    "swiper-thumbs": {
      attr: "thumbs",
      type: ["boolean"],
      has_props: true,
    },
    "thumbs-el": {
      attr: "swiper",
      type: ["swiper"],
      parent: "thumbs",
    },
  };

  const default_config = {
    spaceBetween: 40,
    speed: 1100,
    loop: true,
    slidesPerView: "auto",
    allowTouchMove: false,
    autoplay: {
      delay: 500,
      disableOnInteraction: false,
    },
  };

  const custom_config = {};
  for (const attr of Object.keys(swiper_props_map)) {
    const val = el.getAttribute(attr);
    if (val) {
      const prop_details = swiper_props_map[attr];

      const types = prop_details.type;
      for (const type of types) {
        switch (type) {
          case "string": {
            custom_config[prop_details.attr] = {
              val,
              parent: prop_details.parent,
              attr,
            };
            break;
          }
          case "number": {
            if (!isNaN(Number(val))) {
              custom_config[prop_details.attr] = {
                val: Number(val),
                parent: prop_details.parent,
                attr,
              };
            }
            break;
          }
          case "boolean": {
            if (val === "true" || val === "false") {
              custom_config[prop_details.attr] = {
                val: val === "true",
                parent: prop_details.parent,
                attr,
              };
            }
            break;
          }
          case "auto": {
            if (val === "auto") {
              custom_config[prop_details.attr] = {
                val: "auto",
                parent: prop_details.parent,
                attr,
              };
            }
            break;
          }
          case "swiper": {
            if (swiperMap.has(val)) {
              custom_config[prop_details.attr] = {
                val: swiperMap.get(val),
                parent: prop_details.parent,
                attr,
              };
            } else if (attr === "thumbs-el") {
              thumbsMap.set(el.id, val);
            }
            break;
          }
        }
      }
    }
  }
  for (const prop of Object.keys(custom_config)) {
    if (
      custom_config[prop].parent &&
      custom_config[custom_config[prop].parent]
    ) {
      const parent_prop = custom_config[prop].parent;
      if (typeof custom_config[parent_prop] !== "object") {
        custom_config[parent_prop] = {};
      }
      custom_config[parent_prop][prop] = custom_config[prop].val;
      delete custom_config[prop];
    } else {
      custom_config[prop] = custom_config[prop].val;
    }
  }

  const config = Object.assign(default_config, custom_config);
  return config;
};

window.addEventListener("load", (ev: any) => {
  // applying default styles
  document.body.style["-webkit-font-smoothing"] = "antialiased";
  document.body.style["-moz-osx-font-smoothing"] = "greyscale";

  // initializing thumbs swipers
  const swiper_thumb_elements = document.querySelectorAll<HTMLElement>(
    '[ninja-swiper="enabled"][thumbs]'
  );
  swiper_thumb_elements.forEach((swiper_element) => {
    const id = swiper_element.id;
    const swiper_props = get_swiper_props(swiper_element);
    // @ts-ignore
    const swiper = new Swiper(swiper_element, swiper_props);
    swiperMap.set(id, swiper);
  });
  for (const x of thumbsMap.entries()) {
    const [main, thumb] = x;
    swiperMap.get(main).thumbs.swiper = swiperMap.get(thumb);
    swiperMap.get(main).init();
  }

  // initializing swipers
  const swiper_elements = document.querySelectorAll<HTMLElement>(
    '[ninja-swiper="enabled"]:not([thumbs])'
  );
  swiper_elements.forEach((swiper_element) => {
    const id = swiper_element.id;
    const swiper_props = get_swiper_props(swiper_element);
    // @ts-ignore
    const swiper = new Swiper(swiper_element, swiper_props);
    swiperMap.set(id, swiper);
  });
  for (const x of thumbsMap.entries()) {
    const [main, thumb] = x;
    swiperMap.get(main).thumbs.swiper = swiperMap.get(thumb);
    swiperMap.get(main).init();
  }

  let ssIndex = 0;
  while (true) {
    if (ssIndex === document.styleSheets.length) break;

    try {
      // applying smooth scrolling
      document.styleSheets[ssIndex].insertRule(
        `div[ninja-swiper="enabled"] div.flowninja-swiper-wrapper[swiper-smooth= "true"] {
        -webkit-transition-timing-function:linear!important;
        -o-transition-timing-function:linear!important;
        transition-timing-function:linear!important;
      }`,
        0
      );

      // applying css styles
      document.styleSheets[ssIndex].insertRule(
        `.scroll-box[hide-scrollbar="true"]::-webkit-scrollbar {
        display: none;
      }`,
        0
      );
      document.styleSheets[ssIndex].insertRule(
        `.scroll-box[hide-scrollbar="true"] {
        -ms-overflow-style: none;
        scrollbar-width: none;
      }`,
        0
      );

      break;
    } catch (error) {
      ssIndex++;
    }
  }
});
