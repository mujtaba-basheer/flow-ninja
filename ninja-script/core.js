const kebabToCamelCase = (str) => {
    const words = str.split("-");
    let cs = "";
    for (let i = 0; i < words.length; i++) {
        let word = words[i];
        if (i !== 0 && word) {
            word = word.charAt(0).toUpperCase() + word.substring(1);
        }
        cs += word;
    }
    return cs;
};
const get_swiper_props = (el) => {
    const swiper_props_map = {
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
    };
    const default_config = {
        spaceBetween: 40,
        speed: 1100,
        loop: true,
        slidesPerView: "auto",
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
                }
            }
        }
    }
    for (const prop of Object.keys(custom_config)) {
        if (custom_config[prop].parent &&
            custom_config[custom_config[prop].parent]) {
            const parent_prop = custom_config[prop].parent;
            if (typeof custom_config[parent_prop] !== "object") {
                custom_config[parent_prop] = {};
            }
            custom_config[parent_prop][prop] = custom_config[prop].val;
            delete custom_config[prop];
        }
        else {
            custom_config[prop] = custom_config[prop].val;
        }
    }
    const config = Object.assign(default_config, custom_config);
    return config;
};
window.addEventListener("load", (ev) => {
    // applying default styles
    document.body.style["-webkit-font-smoothing"] = "antialiased";
    document.body.style["-moz-osx-font-smoothing"] = "greyscale";
    // initializing swipers
    const swiper_elements = document.querySelectorAll('[ninja-swiper="enabled"]');
    swiper_elements.forEach((swiper_element) => {
        const swiper_props = get_swiper_props(swiper_element);
        // @ts-ignore
        new Swiper(swiper_element, swiper_props);
    });
    // applying css styles
    document.styleSheets[0].insertRule(`.scroll-box[hide-scrollbar="true"]::-webkit-scrollbar {
    display: none;
  }`, 0);
    document.styleSheets[0].insertRule(`.scroll-box[hide-scrollbar="true"] {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }`, 0);
});
