/**
 * Swiper 8.4.2
 * Most modern mobile touch slider and framework with hardware accelerated transitions
 * https://swiperjs.com
 *
 * Copyright 2014-2022 Vladimir Kharlampidi
 *
 * Released under the MIT License
 *
 * Released on: September 15, 2022
 */

type SwiperPropsMap = {
  [prop: string]: {
    attr: string;
    type: ("boolean" | "string" | "number" | "auto" | "function" | "swiper")[];
    has_props?: boolean;
    parent?: string;
  };
};

const swiperMap = new Map<string, any>();
const thumbsMap = new Map<string, string>();

const functionsMap: { [name: string]: Function } = {
  renderBullet: (index: number, className: string) =>
    `<span class="${className}">${index + 1}</span>`,
};

const parseBreakpoints = (attr: string) => {
  const res = {};
  const bps = attr.split(";");
  bps.forEach((s) => {
    if (!s) return;
    const params = {};
    const n = s.split(":")[0].trim();
    const q = s.split(":")[1].trim();

    const sp = new URLSearchParams(q);
    const e = sp.entries();
    while (true) {
      try {
        const { value, done } = e.next();
        if (done) break;

        let [k, v] = value;
        if (v === "true") v = true as unknown as string;
        else if (v === "false") v = false as unknown as string;
        else if (!isNaN(Number(v))) v = Number(v) as unknown as string;

        params[k] = v;
      } catch (error) {
        break;
      }
    }

    res[+n] = params;
  });
  return res;
};

const get_swiper_props = (el: HTMLElement) => {
  const swiper_props_map: SwiperPropsMap = {
    "swiper-a11y": { attr: "a11y", type: ["boolean"], has_props: true },
    "touch-move": { attr: "allowTouchMove", type: ["boolean"] },
    "auto-height": { attr: "autoHeight", type: ["boolean"] },
    "swiper-autoplay": { attr: "autoplay", type: ["boolean"], has_props: true },
    "swiper-bp": { attr: "breakpoints", type: ["string"] },
    "centered-slides": { attr: "centeredSlides", type: ["boolean"] },
    "swiper-autoplay-delay": {
      attr: "delay",
      type: ["number"],
      parent: "autoplay",
    },
    "swiper-direction": { attr: "direction", type: ["string"] },
    "swiper-autoplay-disableinteraction": {
      attr: "disableOnInteraction",
      type: ["boolean"],
      parent: "autoplay",
    },
    "free-mode": { attr: "freeMode", type: ["boolean"] },
    "grab-cursor": { attr: "grabCursor", type: ["boolean"] },
    "swiper-loop": { attr: "loop", type: ["boolean"] },
    "swiper-nav": { attr: "navigation", type: ["boolean"], has_props: true },
    "nav-right": { attr: "nextEl", type: ["string"], parent: "navigation" },
    "swiper-pagination": {
      attr: "pagination",
      type: ["boolean"],
      has_props: true,
    },
    "pagination-el": {
      attr: "el",
      type: ["string"],
      parent: "pagination",
    },
    "pagination-click": {
      attr: "clickable",
      type: ["boolean"],
      parent: "pagination",
    },
    "pagination-num": {
      attr: "renderBullet",
      type: ["function"],
      parent: "pagination",
    },
    "nav-left": { attr: "prevEl", type: ["string"], parent: "navigation" },
    "slides-per-column": { attr: "slidesPerColumn", type: ["number", "auto"] },
    "slides-per-column-fill": { attr: "slidesPerColumnFill", type: ["string"] },
    "slides-per-view": { attr: "slidesPerView", type: ["number", "auto"] },
    "slides-per-group": { attr: "slidesPerGroup", type: ["number", "auto"] },
    "space-between": { attr: "spaceBetween", type: ["number"] },
    speed: { attr: "speed", type: ["number"] },
    "thumbs-el": { attr: "swiper", type: ["swiper"], parent: "thumbs" },
    "swiper-thumbs": { attr: "thumbs", type: ["boolean"], has_props: true },
    "ws-progress": { attr: "watchSlidesProgress", type: ["boolean"] },
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
    if (val !== null) {
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
          case "function": {
            custom_config[prop_details.attr] = {
              val: functionsMap[prop_details.attr],
              parent: prop_details.parent,
              attr,
            };
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
  swiper_elements.forEach((swiper_element: HTMLElement) => {
    const id = swiper_element.id;
    const swiper_props = get_swiper_props(swiper_element);
    const bps = swiper_element.getAttribute("swiper-bp");
    if (bps) {
      swiper_props["breakpoints"] = parseBreakpoints(bps);
    }
    // console.log(JSON.stringify(swiper_props));

    // @ts-ignore
    const swiper = new Swiper(swiper_element, swiper_props);
    swiperMap.set(id, swiper);
  });
  for (const x of thumbsMap.entries()) {
    const [main, thumb] = x;
    swiperMap.get(main).thumbs.swiper = swiperMap.get(thumb);
    swiperMap.get(main).init();
  }

  // adding functionality for popup swipers
  const swiper_popup_elements = document.querySelectorAll<HTMLElement>(
    '[ninja-swiper="enabled"][popup-swiper]'
  );
  swiper_popup_elements.forEach((swiper_element: HTMLElement) => {
    const id = swiper_element.id;
    const popup_id = swiper_element.getAttribute("popup-swiper");
    if (popup_id) {
      const popupSwiper = swiperMap.get(popup_id);
      if (popupSwiper) {
        const isLoop =
          (popupSwiper.el as HTMLElement).getAttribute("swiper-loop") ===
          "true";
        $(swiperMap.get(id).slides).on("click", function () {
          const index = $(this).index() + (isLoop ? 2 : 0);
          popupSwiper.slideTo(index);
        });
      }
    }
  });

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
