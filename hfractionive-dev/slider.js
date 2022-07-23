const addScriptTags = () => {
    const gsap_url = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.10.4/gsap.min.js";
    const draggable_url = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.10.4/Draggable.min.js";
    return new Promise((res, rej) => {
        const tag1 = document.createElement("script");
        tag1.type = "application/javascript";
        tag1.src = gsap_url;
        document.body.appendChild(tag1);
        tag1.addEventListener("load", () => {
            const tag2 = document.createElement("script");
            tag2.type = "application/javascript";
            tag2.src = draggable_url;
            document.body.appendChild(tag2);
            tag2.addEventListener("load", () => res(null));
            tag2.addEventListener("error", (ev) => rej(new Error(ev.message)));
        });
        tag1.addEventListener("error", (ev) => rej(new Error(ev.message)));
    });
};
window.addEventListener("load", async () => {
    try {
        await addScriptTags();
        gsap.registerPlugin(Draggable);
        const MAX_Y = 494, MIN_Y = 0, MAX_VAL = 0.0849, MIN_VAL = 0.0388, APPRECIATION = 0.05;
        const sliderHandle = document.querySelector(".range-slider-handle");
        const rangeFill = document.querySelector(".range-slider-fill");
        const resultEl = document.querySelector("#interest-rate");
        const draggables = Draggable.create(sliderHandle, {
            type: "y",
            // bounds:"#container",
            bounds: { minY: -MAX_Y, maxY: MIN_Y },
            onDrag: setValues,
        });
        function setValues() {
            const y = -draggables[0].y;
            console.log(draggables[0].y);
            const val = (y / (MAX_Y - MIN_Y)) * (MAX_VAL - MIN_VAL) + MIN_VAL;
            const result = val * APPRECIATION;
            resultEl.textContent = new Intl.NumberFormat(undefined, {
                style: "percent",
                maximumFractionDigits: 2,
                minimumFractionDigits: 2,
            }).format(result);
            gsap.set(rangeFill, {
                y: 0,
                height: y,
                onUpdate: draggables[0].update,
            });
        }
        setValues();
    }
    catch (error) {
        console.error(error);
    }
});
