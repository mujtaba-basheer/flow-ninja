const addScriptTags: () => Promise<null> = () => {
  const gsap_url =
    "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.10.4/gsap.min.js";
  const draggable_url =
    "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.10.4/Draggable.min.js";

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

const formatNum = new Intl.NumberFormat(undefined, {
  style: "percent",
  maximumFractionDigits: 2,
  minimumFractionDigits: 2,
});

window.addEventListener("load", async () => {
  try {
    await addScriptTags();

    gsap.registerPlugin(Draggable);

    const MAX_Y = 484,
      MIN_Y = 0,
      MAX_VAL = 0.15,
      MIN_VAL = 0.0,
      MIN_RESULT = 0.0379,
      MAX_RESULT = 0.0938,
      Y_MIN_OFFSET = 93,
      Y_MAX_OFFSET = 395;

    const sliderHandle = document.querySelector(".range-slider-handle");
    const rangeFill = document.querySelector(".range-slider-fill");
    const resultEl = document.querySelector<HTMLElement>("#interest-rate");
    const appreciationEl =
      document.querySelector<HTMLElement>("#appreciation-rate");

    const draggables = Draggable.create(sliderHandle, {
      type: "y",
      bounds: { minY: -MAX_Y, maxY: MIN_Y },
      onDrag: setValues,
    });
    function setValues() {
      const y = -draggables[0].y;

      gsap.set(rangeFill, {
        y: 0,
        height: y,
        onUpdate: draggables[0].update,
      });

      const val = (y / (MAX_Y - MIN_Y)) * (MAX_VAL - MIN_VAL) + MIN_VAL;
      appreciationEl.textContent = formatNum.format(val);

      let result = 0;
      if (y < 93) result = MIN_RESULT;
      else if (y > 395) result = MAX_RESULT;
      else {
        result =
          ((y - Y_MIN_OFFSET) / (Y_MAX_OFFSET - Y_MIN_OFFSET)) *
            (MAX_RESULT - MIN_RESULT) +
          MIN_RESULT;
      }

      resultEl.textContent = formatNum.format(result);
    }

    setValues();
  } catch (error) {
    console.error(error);
  }
});
