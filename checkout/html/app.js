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
      this.cardEls = this.firstColEl.querySelectorAll(".card");
      this.cardOddEls = this.secondColEl.querySelectorAll(".card");

      this.inViewArray = 1;
      this.inViewArrayOdd = 0;
      this.initialLoopDone = 0;
      this.isDocumentInView = true;
      this.hasMounted = false;
      this.t1 = null;
      this.t2 = null;
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
      this.initialLoopDone = true;
      this.applyEffect1();
    }

    timer1() {
      const inViewIndex = this.inViewArray + 1 === 5 ? 0 : this.inViewArray + 1;
      this.inViewArray = inViewIndex;
      this.initialLoopDone = true;
      this.effect1();
    }

    timer2() {
      const inViewIndex =
        this.inViewArrayOdd + 1 === 5 ? 0 : this.inViewArrayOdd + 1;
      this.inViewArrayOdd = inViewIndex;
      this.effect2();
    }

    runAnimation() {
      if (this.firstColEl.classList.contains("pause")) {
        this.firstColEl.classList.remove("pause");
      }

      if (this.secondColEl.classList.contains("pause")) {
        this.secondColEl.classList.remove("pause");
      }
    }

    effect1() {
      if (isLargeScreen) {
        this.runAnimation();
        // this.applyEffect1();
        this.t1 = setTimeout(() => {
          this.applyEffect1();
          this.timer1();
        }, 3000);
      }
    }

    effect2() {
      if (isLargeScreen) {
        this.runAnimation();

        this.t2 = setTimeout(() => {
          this.applyEffect2();
          if (this.t2) this.timer2();
        }, 3000);
      }
    }

    onBlur() {
      this.firstColEl.classList.add("pause");
      this.secondColEl.classList.add("pause");
      this.isDocumentInView = false;
      this.inViewArray = 0;
      this.inViewArrayOdd = 0;
      this.initialLoopDone = false;
      this.effect1();
      this.effect2();
    }

    onFocus() {
      this.timer1();
      this.timer2();
      this.isDocumentInView = true;
    }

    init() {
      if (isLargeScreen) {
        window.addEventListener("blur", this.onBlur);
        window.addEventListener("focus", this.onFocus);
        this.timer1();
        this.timer2();
      }
    }
  }

  const state = new State();

  state.hasMounted = true;

  if (isLargeScreen) {
    state.timer1();
    state.applyEffect2();
    setTimeout(() => {
      state.inViewArrayOdd = 1;
      state.applyEffect2();
      // state.timer2();
    }, 1500);
    // state.init();
  }

  let start, previousTimeStamp;
  let done = false;

  const step = (timeStamp) => {
    console.log(timeStamp);
    if (start === undefined) {
      start = timeStamp;
    }
    const elapsed = timeStamp - start;

    if (elapsed > 3000) {
      state.next1();
    }
  };

  window.requestAnimationFrame(step);
});
