window.addEventListener("load", () => {
  const ITERATIONS = [
    [9, 8, 7, 6],
    [8, 7, 6, 5],
    [7, 6, 5, 4],
    [6, 5, 4, 3],
    [5, 4, 3, 2],
  ];
  const isLargeScreen = window.innerWidth > 1024;

  class State {
    constructor() {
      const scrollContainer = document.getElementById("scroll-text");
      this.firstColEl = scrollContainer.querySelector(".col");
      this.secondColEl = scrollContainer.querySelector(".col:last-child");
      this.secondColEl.style.transform = "translate3d(0, -116px, 0)";
      this.cardEls = this.firstColEl.querySelectorAll(".card");
      this.cardOddEls = this.secondColEl.querySelectorAll(".card");

      this.inViewArray = 0;
      this.inViewArrayOdd = 0;
      this.initialLoopDone = 0;
    }

    applyEffect1() {
      const cards = this.cardEls;
      const index = this.inViewArray;

      for (let i = 0; i < 5; i++) {
        let cardEl;
        const isIncluded =
          ITERATIONS[index].includes(i) || ITERATIONS[index].includes(i + 5);

        cardEl = cards.item(i);
        cardEl.classList[isIncluded ? "add" : "remove"]("inview");

        cardEl = cards.item(i + 5);
        cardEl.classList[isIncluded ? "add" : "remove"]("inview");
      }
    }

    applyEffect2() {
      const cards = this.cardOddEls;
      const index = this.inViewArrayOdd;

      for (let i = 0; i < 5; i++) {
        let cardEl;
        const isIncluded =
          ITERATIONS[index].includes(i) || ITERATIONS[index].includes(i + 5);

        cardEl = cards.item(i);
        cardEl.classList[isIncluded ? "add" : "remove"]("inview");

        cardEl = cards.item(i + 5);
        cardEl.classList[isIncluded ? "add" : "remove"]("inview");
      }
    }

    next1() {
      const inViewIndex = this.inViewArray + 1 === 5 ? 0 : this.inViewArray + 1;
      this.inViewArray = inViewIndex;
      this.applyEffect1();
    }

    next2() {
      const inViewIndex =
        this.inViewArrayOdd + 1 === 5 ? 0 : this.inViewArrayOdd + 1;
      this.inViewArrayOdd = inViewIndex;
      this.applyEffect2();
      this.initialLoopDone = true;
    }
  }

  const state = new State();

  let s1, s2, s3;
  let c1 = 0;
  let c2 = 0;

  const step = (timeStamp) => {
    if (!(s1 || s2)) {
      s1 = s2 = timeStamp;
    }
    const e1 = timeStamp - s1;
    const e2 = timeStamp - s2;
    const x1 = (1160 / 15000) * e1;
    const x2 = (1160 / 15000) * e2 - 161;

    state.firstColEl.style.transform = `translate3d(0, ${x1}px, 0)`;
    state.secondColEl.style.transform = `translate3d(0, ${x2}px, 0)`;

    if (x1 > 232 * c1) {
      state.next1();
      c1++;
      if (c1 === 5) {
        c1 = 0;
        s1 = timeStamp;
      }
    }

    if (state.initialLoopDone) {
      if (x2 > 232 * c2) {
        state.next2();
        c2++;
        if (c2 === 5) {
          c2 = 0;
          s2 = timeStamp - s3;
        }
      }
    } else {
      if (x2 > 0) {
        state.next2();
        c2++;
        s3 = timeStamp;
      }
    }

    window.requestAnimationFrame(step);
  };

  if (isLargeScreen) {
    window.requestAnimationFrame(step);
  }
});
