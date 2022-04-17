window.addEventListener("load", () => {
  // Plarform Tabs

  $(document)
    .find(".one-platform-tabs:has(.tabs-underline)")
    .each(function initialize() {
      const $container = $(this);
      const $active = $container
        .find(".one-platform-category-tabs.w--current")
        .first();
      const $underline = $container.find(".tabs-underline");

      const padding = $active[0]
        ? Number($active.css("padding-right").replace("px", ""))
        : 20;
      const left = $active.position() ? $active.position().left : 0;
      const width = $active.outerWidth() - padding;

      $underline.css({ left, width, transition: "left 0.4s, width 0.2s" });
    });

  $(document)
    .find(".one-platform-tabs:has(.tabs-underline)")
    .each(function () {
      const $tabs = $(this).find(".one-platform-category-tabs");
      $tabs.on("click", function () {
        const $this = $(this);

        const padding = Number($this.css("padding-right").replace("px", ""));
        const left = $this.position().left;
        const width = $this.outerWidth() - padding;

        $(".one-platform-tabs .tabs-underline").css({
          left,
          width,
        });
      });
      $tabs.on("mouseenter", function () {
        const $this = $(this);
        const $parent = $this.parent();
        const $underline = $parent.find(".tabs-underline");

        const padding = Number($this.css("padding-right").replace("px", ""));
        const left = $this.position().left;
        const width = $this.outerWidth() - padding;

        $underline.css({ left, width, transform: "none" });
      });
      $tabs.on("mouseleave", function () {
        const $this = $(this);
        const $parent = $this.parent();
        const $active = $parent
          .find(".one-platform-category-tabs.w--current")
          .first();
        const $underline = $parent.find(".tabs-underline");

        const padding = Number($active.css("padding-right").replace("px", ""));
        const left = $active.position().left;
        const width = $active.outerWidth() - padding;

        $underline.css({ left, width });
      });
    });

  // Solution Tabs

  {
    // const btnLeft = document.getElementById("left");
    // const tabsLeft = document.querySelectorAll(".tab1");
    // const btnRight = document.getElementById("right");
    // const tabsRight = document.querySelectorAll(".tab2");
    // const pgnLeft = document.getElementById("pagination-left");
    // const pgnRight = document.getElementById("pagination-right");

    const nextTabBtn = document.getElementById("solutionsRight");
    const prevTabBtn = document.getElementById("solutionsLeft");
    const leftSlideBtns = document.querySelectorAll("#left, #secondLeft");
    const rightSlideBtns = document.querySelectorAll("#right, #secondRight");
    const slides = [".tab1", ".tab2", ".tab-3"];
    let activeSlide = 0,
      clickLastTab = false,
      target = null;

    const onSlideChange = () => {
      for (let i = 0; i < slides.length; i++) {
        const slideClass = slides[i];
        const slideTabs = document.querySelectorAll(slideClass);

        if (activeSlide === i)
          slideTabs.forEach((tabEl) =>
            tabEl.classList.remove("pointer-events-tab1")
          );
        else
          slideTabs.forEach((tabEl) =>
            tabEl.classList.add("pointer-events-tab1")
          );
      }
    };
    leftSlideBtns.forEach((leftSlideBtn) =>
      leftSlideBtn.addEventListener("click", () => {
        if (target === null && activeSlide === 0) {
          target = 2;
          activeSlide = 1;
          clickLastTab = true;
          rightSlideBtns[0].click();
          return;
        }

        if (target === 0) {
          if (activeSlide === 1) {
            activeSlide = 0;
            setTimeout(() => leftSlideBtns[0].click(), 300);
            return;
          } else if (activeSlide === 0) {
            activeSlide = 1;
            target = null;
          }
        }

        if (activeSlide > 0) activeSlide -= 1;
        else activeSlide = 2;

        const tabs = document.querySelectorAll(slides[activeSlide]);
        const targetTab = tabs[clickLastTab ? tabs.length - 1 : 0];
        setTimeout(() => targetTab.click(), 300);
        clickLastTab = false;

        onSlideChange();
      })
    );
    rightSlideBtns.forEach((rightSlideBtn) =>
      rightSlideBtn.addEventListener("click", () => {
        if (target === null && activeSlide === 2) {
          target = 0;
          activeSlide = 1;
          // setTimeout(() => leftSlideBtns[1].click(), 300);
          leftSlideBtns[1].click();
          return;
        }

        if (target === 2) {
          if (activeSlide === 1) {
            activeSlide = 2;
            setTimeout(() => rightSlideBtns[1].click(), 300);
            return;
          } else if (activeSlide === 2) {
            activeSlide = 1;
            target = null;
          }
        }

        activeSlide = (activeSlide + 1) % 3;
        const tabs = document.querySelectorAll(slides[activeSlide]);
        const targetTab = tabs[clickLastTab ? tabs.length - 1 : 0];
        setTimeout(() => targetTab.click(), 300);
        clickLastTab = false;

        onSlideChange();
      })
    );
    nextTabBtn.addEventListener("click", () => {
      const tabs = document.querySelectorAll(slides[activeSlide]);
      const lastTab = tabs[tabs.length - 1];
      if (lastTab.classList.contains("w--current")) {
        rightSlideBtns[[0, 1, 1][activeSlide]].click();
      }
    });
    prevTabBtn.addEventListener("click", () => {
      const tabs = document.querySelectorAll(slides[activeSlide]);
      const firstTab = tabs[0];
      clickLastTab = true;
      if (firstTab.classList.contains("w--current")) {
        leftSlideBtns[[0, 0, 1][activeSlide]].click();
      }
    });
    // const onMoveToLeft = () => {
    //   tabsLeft.forEach((elLeft) => {
    //     elLeft.classList.remove("pointer-events-tab1");
    //   });
    //   tabsRight.forEach((elRight) => {
    //     elRight.classList.add("pointer-events-tab2");
    //   });
    // };
    // const onMoveToRight = () => {
    //   tabsRight.forEach((elRight) => {
    //     elRight.classList.remove("pointer-events-tab2");
    //   });
    //   tabsLeft.forEach((elLeft) => {
    //     elLeft.classList.add("pointer-events-tab1");
    //   });
    // };

    // onMoveToLeft();
    onSlideChange();

    // btnLeft.addEventListener("click", onMoveToLeft);
    // btnRight.addEventListener("click", onMoveToRight);
    // pgnLeft.addEventListener("click", onMoveToLeft);
    // pgnRight.addEventListener("click", onMoveToRight);
  }

  $(document)
    .find(".solutions-secondary-tabs")
    .each(function initialize() {
      const $container = $(this);
      const $active = $container
        .find(".solutions-category-tabs.w--current")
        .first();
      const $underline = $container.find(".solutions-underline");

      let offset = -60;
      if ($active.css("margin-left") !== "0px") {
        offset += Number($active.css("margin-left").replace("px", ""));
      }
      const padding = Number($active.css("padding-right").replace("px", ""));
      const scroll_offset = $container.scrollLeft();
      // const left = $active.position()
      //   ? $active.position().left + scroll_offset
      //   : 0 + offset + scroll_offset;
      const left = $active.position().left + scroll_offset + offset;
      const width = $active.outerWidth() - padding;

      $underline.css({ left, width, transition: "left 0.4s, width 0.2s" });
    });

  $(document)
    .find(".solutions-secondary-tabs:has(.solutions-underline)")
    .each(function () {
      const $tabs = $(this).find(".solutions-category-tabs");

      $tabs.on("click", function () {
        const $this = $(this);

        let offset = 0;
        if ($this.css("margin-left") !== "0px") {
          offset = Number($this.css("margin-left").replace("px", ""));
        }
        const padding = Number($this.css("padding-right").replace("px", ""));
        const scroll_offset = $this.parent().scrollLeft();
        const left = $this.position().left + offset + scroll_offset;
        const width = $this.outerWidth() - padding;

        setTimeout(
          () =>
            $(".solutions-secondary-tabs .solutions-underline").css({
              left,
              width,
              opacity: 1,
              transform: "none",
            }),
          300
        );
      });
      $tabs.on("mouseenter", function () {
        const $this = $(this);
        if ($this.hasClass("w--current")) return;

        const $parent = $this.parent();
        const $underline = $parent.find(".solutions-underline");

        let offset = 0;
        if ($this.css("margin-left") !== "0px") {
          offset = Number($this.css("margin-left").replace("px", ""));
        }
        const padding = Number($this.css("padding-right").replace("px", ""));
        const scroll_offset = $parent.scrollLeft();
        const left = $this.position().left + offset + scroll_offset;
        const width = $this.outerWidth() - padding;

        $underline.css({ left, width, transform: "none", opacity: "1" });
      });
      $tabs.on("mouseleave", function () {
        const $this = $(this);
        const $parent = $this.parent();
        const $active = $parent
          .find(".solutions-category-tabs.w--current")
          .first();
        const $underline = $parent.find(".solutions-underline");

        let active_offset = 0;
        if ($active.css("margin-left") !== "0px") {
          active_offset = Number($active.css("margin-left").replace("px", ""));
        }
        let this_offset = 0;
        if ($this.css("margin-left") !== "0px") {
          this_offset = Number($this.css("margin-left").replace("px", ""));
        }
        const opacity = $active.css("opacity");
        const active_padding = Number(
          $active.css("padding-right").replace("px", "")
        );
        const this_padding = Number(
          $active.css("padding-right").replace("px", "")
        );
        const scroll_offset = $parent.scrollLeft();
        const left =
          opacity === "0"
            ? $this.position().left + this_offset + scroll_offset
            : $active.position().left + active_offset + scroll_offset;
        const width =
          opacity === "0"
            ? $this.outerWidth() - this_padding
            : $active.outerWidth() - active_padding;

        $underline.css({ left, width, transform: "none" });
        $underline.animate({ opacity }, 400);
      });
    });

  $(".solutions-category-tabs:first-child")
    .trigger("mouseenter")
    .trigger("mouseleave");

  // See Your Work

  $(document)
    .find(".see-your-work-tabs-menu")
    .each(function initialize() {
      const $container = $(this);
      const $active = $container.find(".tabs-see-your-work.w--current").first();
      const $underline = $container.find(".see-your-work-underline");

      const padding = Number($active.css("padding-right").replace("px", ""));
      const left = $active.position() ? $active.position().left : 0;
      const width = $active.outerWidth() - padding;

      $underline.css({ left, width, transition: "left 0.4s, width 0.2s" });
    });

  $(document)
    .find(".see-your-work-tabs-menu:has(.see-your-work-underline)")
    .each(function () {
      const $tabs = $(this).find(".tabs-see-your-work");

      $tabs.on("click", function () {
        const $this = $(this);

        let offset = 0;
        if ($this.css("margin-left") !== "0px") {
          offset = Number($this.css("margin-left").replace("px", ""));
        }
        const padding = Number($this.css("padding-right").replace("px", ""));
        const left = $this.position().left + offset;
        const width = $this.outerWidth() - padding;

        $(".see-your-work-tabs-menu .see-your-work-underline").css({
          left,
          width,
          opacity: 1,
          transform: "none",
        }),
          setTimeout(
            () =>
              $(".see-your-work-tabs-menu .see-your-work-underline").css({
                left,
                width,
                opacity: 1,
                transform: "none",
              }),
            300
          );
      });
      $tabs.on("mouseenter", function () {
        const $this = $(this);
        const $parent = $this.parent();
        const $underline = $parent.find(".see-your-work-underline");

        let offset = 0;
        if ($this.css("margin-left") !== "0px") {
          offset = Number($this.css("margin-left").replace("px", ""));
        }
        const padding = Number($this.css("padding-right").replace("px", ""));
        const left = $this.position().left + offset;
        const width = $this.outerWidth() - padding;
        $underline.css({
          left,
          width,
          transform: "none",
          opacity: "1",
        });
      });
      $tabs.on("mouseleave", function () {
        const $this = $(this);
        const $parent = $this.parent();
        const $active = $parent.find(".tabs-see-your-work.w--current").first();
        const $underline = $parent.find(".see-your-work-underline");

        const isActiveOutsideView =
          $active.hasClass("pointer-events-tab2") ||
          $active.hasClass("pointer-events-tab1");
        let offset = 0;
        if (isActiveOutsideView) {
          if ($this.css("margin-left") !== "0px") {
            offset = Number($this.css("margin-left").replace("px", ""));
          }
        } else {
          if ($active.css("margin-left") !== "0px") {
            offset = Number($active.css("margin-left").replace("px", ""));
          }
        }

        const active_padding = Number(
          $active.css("padding-right").replace("px", "")
        );
        const this_padding = Number(
          $this.css("padding-right").replace("px", "")
        );
        const left = isActiveOutsideView
          ? $this.position().left + offset
          : $active.position().left + offset;
        const width = isActiveOutsideView
          ? $this.outerWidth() - this_padding
          : $active.outerWidth() - active_padding;

        $underline.css({
          left,
          width,
          transform: "none",
        });
        $underline.animate({ opacity: isActiveOutsideView ? 0 : 1 }, 400);
      });
    });

  {
    const btnLeft = document.querySelector(".tablet-arrow-see-your-work.left");
    const btnRight = document.querySelector(
      ".tablet-arrow-see-your-work.right"
    );
    const tabsContainer = document.querySelector(".see-your-work-tabs-menu");
    const tabsLeft = tabsContainer.querySelectorAll(".left");
    const tabsRight = tabsContainer.querySelectorAll(".right");

    const onMoveToLeft = () => {
      tabsLeft.forEach((elLeft) => {
        elLeft.classList.remove("pointer-events-see-your-work-left");
      });
      tabsRight.forEach((elRight) => {
        elRight.classList.add("pointer-events-see-your-work-right");
      });
    };
    const onMoveToRight = () => {
      tabsRight.forEach((elRight) => {
        elRight.classList.remove("pointer-events-see-your-work-right");
      });
      tabsLeft.forEach((elLeft) => {
        elLeft.classList.add("pointer-events-see-your-work-left");
      });
    };

    onMoveToLeft();

    btnLeft.addEventListener("click", onMoveToLeft);
    btnRight.addEventListener("click", onMoveToRight);
  }

  // Customer Tabs

  $(document)
    .find(".customer-tabs-menu")
    .each(function initialize() {
      const $container = $(this);
      const $active = $container.find(".customer-tab.w--current").first();
      const $underline = $container.find(".customer-inspired-line");

      const scroll_offset = $container.scrollLeft();
      const padding = Number($active.css("padding-right").replace("px", ""));
      const left = $active.position()
        ? $active.position().left + scroll_offset
        : scroll_offset;
      const width = $active.outerWidth() - padding;

      $underline.css({ left, width, transition: "left 0.4s, width 0.2s" });
    });

  $(document)
    .find(".customer-tabs-menu:has(.customer-inspired-line)")
    .each(function () {
      const $tabs = $(this).find(".customer-tab");

      $tabs.on("click", function () {
        const $this = $(this);

        setTimeout(() => {
          const padding = Number($this.css("padding-right").replace("px", ""));
          const offset = $this.parent().scrollLeft();
          const left = $this.position().left + offset;
          const width = $this.outerWidth() - padding;

          $(".customer-tabs-menu .customer-inspired-line").css({
            left,
            width,
            opacity: 1,
            transform: "none",
          });
        }, 300);
      });
      $tabs.on("mouseenter", function () {
        const $this = $(this);
        const $parent = $this.parent();
        const $underline = $parent.find(".customer-inspired-line");

        const padding = Number($this.css("padding-right").replace("px", ""));
        const offset = $parent.scrollLeft();
        const left = $this.position().left + offset;
        const width = $this.outerWidth() - padding;

        $underline.css({ left, width, transform: "none", opacity: "1" });
      });
      $tabs.on("mouseleave", function () {
        const $this = $(this);
        const $parent = $this.parent();
        const $active = $parent.find(".customer-tab.w--current").first();
        const $underline = $parent.find(".customer-inspired-line");

        const padding = Number($active.css("padding-right").replace("px", ""));
        const offset = $parent.scrollLeft();
        const left = $active.position().left + offset;
        const width = $active.outerWidth() - padding;

        $underline.css({ left, width, transform: "none" });
      });
    });
});
