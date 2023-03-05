const svgAnimations = [
    {
        element: ".small-top-line.w-embed svg",
        duration: 400,
    },
    {
        element: ".outher-circle._1.w-embed svg",
        duration: 3000,
        onComplete: () => {
            const textEl = document.querySelector("#column-1");
            if (textEl)
                textEl.classList.add("animate");
        },
    },
    {
        element: ".bottom-animated-line.w-embed svg",
        duration: 4000,
    },
    {
        element: ".outher-circle._2.w-embed svg",
        duration: 3000,
        onComplete: () => {
            const textEl = document.querySelector("#column-2");
            if (textEl)
                textEl.classList.add("animate");
        },
    },
    {
        element: ".bottom-small-line.w-embed svg",
        duration: 400,
        onComplete: () => {
            const textEl = document.querySelector(".green-business-banner");
            if (textEl)
                textEl.classList.add("animate");
        },
    },
    {
        element: ".small-top-line.light-green.w-embed svg",
        duration: 2000,
    },
    {
        element: ".outher-circle._3.w-embed svg",
        duration: 3000,
        onComplete: () => {
            const textEl = document.querySelector("#column-3");
            if (textEl)
                textEl.classList.add("animate");
        },
    },
    {
        element: ".bottom-animated-line.light-green.w-embed svg",
        duration: 4000,
    },
    {
        element: ".outher-circle._4.w-embed svg",
        duration: 3000,
        onComplete: () => {
            const textEl = document.querySelector("#column-4");
            if (textEl)
                textEl.classList.add("animate");
        },
    },
    {
        element: ".bottom-small-line.light-blue.w-embed svg",
        duration: 2000,
        onComplete: () => {
            const textEl = document.querySelector(".getting-started-banner");
            if (textEl)
                textEl.classList.add("animate");
        },
    },
    {
        element: ".small-top-line.purple.w-embed svg",
        duration: 2000,
    },
    {
        element: ".outher-circle._5.w-embed svg",
        duration: 3000,
        onComplete: () => {
            const textEl = document.querySelector("#column-5");
            if (textEl)
                textEl.classList.add("animate");
        },
    },
    {
        element: ".bottom-animated-line.purple.w-embed svg",
        duration: 4000,
    },
    {
        element: ".outher-circle._6.w-embed svg",
        duration: 3000,
        onComplete: () => {
            const textEl = document.querySelector("#column-6");
            if (textEl)
                textEl.classList.add("animate");
        },
    },
    {
        element: ".reverse-bottom-line.actuall.w-embed svg",
        duration: 4000,
    },
    {
        element: ".outher-circle._7.w-embed svg",
        duration: 3000,
        onComplete: () => {
            const textEl = document.querySelector("#column-7");
            if (textEl)
                textEl.classList.add("animate");
        },
    },
    {
        element: ".bottom-animated-line.green.w-embed svg",
        duration: 4000,
    },
    {
        element: ".outher-circle._8.w-embed svg",
        duration: 3000,
        onComplete: () => {
            const textEl = document.querySelector("#column-8");
            if (textEl)
                textEl.classList.add("animate");
        },
    },
    {
        element: ".last-line-business.actuall.w-embed svg",
        duration: 4000,
    },
    {
        element: ".last-green-circle.w-embed svg",
        duration: 2000,
    },
];
const svgAnimationsSmaller = [
    {
        element: ".outher-circle._1.w-embed svg",
        duration: 3000,
    },
    {
        element: ".outher-circle._2.w-embed svg",
        duration: 3000,
    },
    {
        element: ".outher-circle._3.w-embed svg",
        duration: 3000,
    },
    {
        element: ".outher-circle._4.w-embed svg",
        duration: 3000,
    },
    {
        element: ".outher-circle._5.w-embed svg",
        duration: 3000,
    },
    {
        element: ".outher-circle._6.w-embed svg",
        duration: 3000,
    },
    {
        element: ".outher-circle._7.w-embed svg",
        duration: 3000,
    },
    {
        element: ".outher-circle._8.w-embed svg",
        duration: 3000,
    },
    {
        element: ".last-green-circle.w-embed svg",
        duration: 2000,
    },
];
let i = 0;
const animArray = window.innerWidth >= 1280
    ? svgAnimations
    : window.innerWidth < 1280 && window.innerWidth >= 320
        ? svgAnimationsSmaller
        : [];
const target = document.querySelector(animArray[i].element);
const options = {
    // threshold: 0.5,
    rootMargin: window.innerWidth > 1280 ? "0px 0px -100px 0px" : "0px",
};
const callback = (entries, observer) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            const pathEl = entry.target.querySelector("path, circle.last-circle");
            if (pathEl) {
                const { duration, onComplete } = animArray[i];
                pathEl.classList.add("animate");
                observer.unobserve(entry.target);
                setTimeout(() => {
                    if (onComplete)
                        onComplete();
                    i += 1;
                    if (animArray[i]) {
                        const { element } = animArray[i];
                        const nextEl = document.querySelector(element);
                        if (nextEl)
                            observer.observe(nextEl);
                    }
                }, duration);
            }
        }
    });
};
const observer = new IntersectionObserver(callback, options);
if (target)
    observer.observe(target);
