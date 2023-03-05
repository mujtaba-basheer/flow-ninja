type ArticleT = {
  id: string;
  type: "blog";
  heading: string;
  image_url: string;
  time_to_read: string;
  paragraph_text: string;
  category: string;
  color: {
    tag: string;
    text: string;
  };
  url: string;
};
type CourseT = {
  id: string;
  type?: string;
  heading: string;
  image_url: string;
  url: string;
};
type AskEmersonT = {
  id: string;
  type: "ask-emerson";
  heading: string;
  image_url: string;
  category: string;
  length: string;
  color: {
    tag: string;
    text: string;
  };
  url: string;
};
type PodcastT = {
  id: string;
  type: "podcast";
  heading: string;
  image_url: string;
  episode_number: string;
  length: string;
  paragraph_text: string;
  category: string;
  color: {
    tag: string;
    text: string;
  };
  url: string;
};
type RecentlyVisitedItemT = ArticleT | PodcastT | AskEmersonT;

window.addEventListener("load", () => {
  const limit: number = 4;
  const [, type, id] = window.location.pathname.split("/");
  if (type === "blog") {
    const recently_visited_items: (ArticleT | PodcastT)[] = JSON.parse(
      localStorage.getItem("recently-visited-items") || "[]"
    );

    const articleIndex = recently_visited_items.findIndex((a) => a.id === id);
    if (articleIndex !== -1) {
      for (let i = articleIndex; i > 0; i--) {
        const temp: ArticleT | PodcastT = recently_visited_items[i];
        recently_visited_items[i] = recently_visited_items[i - 1];
        recently_visited_items[i - 1] = temp;
      }
    } else {
      const articleDetails: ArticleT = {
        id: id,
        type: "blog",
        heading: "",
        image_url: "",
        time_to_read: "",
        paragraph_text: "",
        category: "",
        color: {
          tag: "rgb(4, 136, 210)",
          text: "rgb(255, 255, 255)",
        },
        url: "",
      };

      articleDetails.url = window.location.href;

      // extracting heading
      const headingEl =
        document.querySelector<HTMLHeadingElement>("h1#card-heading");
      if (headingEl) articleDetails.heading = headingEl.textContent + "";

      // extracting image url
      const imageEl =
        document.querySelector<HTMLImageElement>("img#card-image");
      if (imageEl) articleDetails.image_url = imageEl.src;

      // extracting time to read
      const ttrEl = document.querySelector<HTMLDivElement>("div#time-to-read");
      if (ttrEl) articleDetails.time_to_read = ttrEl.textContent + "";

      // extracting paragraph text
      const richTextEl = document.querySelector<HTMLDivElement>(
        `div[data-rich-text="paragraph"]`
      );
      if (richTextEl) {
        const paraEl = richTextEl.querySelector<HTMLParagraphElement>("p");
        if (paraEl) articleDetails.paragraph_text = paraEl.textContent + "";
      }

      // extracting category and colours
      const categoryEl =
        document.querySelector<HTMLDivElement>("div#card-category");
      if (categoryEl) {
        articleDetails.category = categoryEl.textContent + "";
        articleDetails.color.tag = categoryEl.style.backgroundColor;
        articleDetails.color.text = categoryEl.style.color;
      }

      if (recently_visited_items.length === limit) recently_visited_items.pop();

      recently_visited_items.unshift(articleDetails);
    }

    localStorage.setItem(
      "recently-visited-items",
      JSON.stringify(recently_visited_items)
    );
  } else if (type === "ask-emerson") {
    const recently_visited_items: RecentlyVisitedItemT[] = JSON.parse(
      localStorage.getItem("recently-visited-items") || "[]"
    );
    const questionIndex = recently_visited_items.findIndex((a) => a.id === id);
    if (questionIndex !== -1) {
      for (let i = questionIndex; i > 0; i--) {
        const temp: RecentlyVisitedItemT = recently_visited_items[i];
        recently_visited_items[i] = recently_visited_items[i - 1];
        recently_visited_items[i - 1] = temp;
      }
    } else {
      const questionDetails: AskEmersonT = {
        id: id,
        type: "ask-emerson",
        heading: "",
        image_url: "",
        length: "",
        category: "",
        color: {
          tag: "rgb(4, 136, 210)",
          text: "rgb(255, 255, 255)",
        },
        url: "",
      };

      questionDetails.url = window.location.href;

      // extracting heading
      const headingEl =
        document.querySelector<HTMLHeadingElement>("h1#card-heading");
      if (headingEl) questionDetails.heading = headingEl.textContent + "";

      // extracting image url
      const imageEl =
        document.querySelector<HTMLImageElement>("img#card-image");
      if (imageEl) questionDetails.image_url = imageEl.src;

      // extracting duration
      const durationEl = document.querySelector<HTMLDivElement>(
        "div#episode-duration"
      );
      if (durationEl) questionDetails.length = durationEl.textContent + "";

      // extracting category and colours
      const categoryEl =
        document.querySelector<HTMLDivElement>("div#card-category");
      if (categoryEl) {
        questionDetails.category = categoryEl.textContent + "";
        questionDetails.color.tag = categoryEl.style.backgroundColor;
        questionDetails.color.text = categoryEl.style.color;
      }

      if (recently_visited_items.length === limit) recently_visited_items.pop();
      recently_visited_items.unshift(questionDetails);
    }
    localStorage.setItem(
      "recently-visited-items",
      JSON.stringify(recently_visited_items)
    );
  } else if (type === "podcast") {
    const recently_visited_items: (ArticleT | PodcastT)[] = JSON.parse(
      localStorage.getItem("recently-visited-items") || "[]"
    );

    const podcastIndex = recently_visited_items.findIndex((a) => a.id === id);
    if (podcastIndex !== -1) {
      for (let i = podcastIndex; i > 0; i--) {
        const temp: ArticleT | PodcastT = recently_visited_items[i];
        recently_visited_items[i] = recently_visited_items[i - 1];
        recently_visited_items[i - 1] = temp;
      }
    } else {
      const podcastDetails: PodcastT = {
        id: id,
        type: "podcast",
        heading: "",
        image_url: "",
        episode_number: "",
        length: "",
        paragraph_text: "",
        category: "",
        color: {
          tag: "rgb(4, 136, 210)",
          text: "rgb(255, 255, 255)",
        },
        url: "",
      };

      podcastDetails.url = window.location.href;

      // extracting heading
      const headingEl =
        document.querySelector<HTMLHeadingElement>("h1#card-heading");
      if (headingEl) podcastDetails.heading = headingEl.textContent + "";

      // extracting image url
      const imageEl =
        document.querySelector<HTMLImageElement>("img#card-image");
      if (imageEl) podcastDetails.image_url = imageEl.src;

      // extracting episode number
      const epNoEl = document.querySelector<HTMLDivElement>(
        "div#episode-info div.episode-number"
      );
      if (epNoEl) podcastDetails.episode_number = epNoEl.textContent + "";

      // extracting duration
      const durationEl = document.querySelector<HTMLDivElement>(
        "div#episode-duration"
      );
      if (durationEl) podcastDetails.length = durationEl.textContent + "";

      // extracting paragraph text
      const richTextEl = document.querySelector<HTMLDivElement>(
        `div[data-rich-text="paragraph"]`
      );
      if (richTextEl) {
        const paraEl = richTextEl.querySelector<HTMLParagraphElement>("p");
        if (paraEl) podcastDetails.paragraph_text = paraEl.textContent + "";
      }

      // extracting category and colours
      const categoryEl =
        document.querySelector<HTMLDivElement>("div#card-category");
      if (categoryEl) {
        podcastDetails.category = categoryEl.textContent + "";
        podcastDetails.color.tag = categoryEl.style.backgroundColor;
        podcastDetails.color.text = categoryEl.style.color;
      }

      if (recently_visited_items.length === limit) recently_visited_items.pop();

      recently_visited_items.unshift(podcastDetails);
    }

    localStorage.setItem(
      "recently-visited-items",
      JSON.stringify(recently_visited_items)
    );
  } else if (
    type === "courses" ||
    type === "the-love-and-respect-experience-video-devotional" ||
    type === "15-day-marriage-plan"
  ) {
    const courses: CourseT[] = JSON.parse(
      localStorage.getItem("courses") || "[]"
    );
    const courseIndex = courses.findIndex((a) => a.id === id);
    if (courseIndex !== -1) {
      for (let i = courseIndex; i > 0; i--) {
        const temp: CourseT = courses[i];
        courses[i] = courses[i - 1];
        courses[i - 1] = temp;
      }
    } else {
      const courseDetails: CourseT = {
        id: id,
        heading: "",
        image_url: "",
        url: "",
      };

      courseDetails.url = window.location.href;

      // extracting heading
      const headingEl =
        document.querySelector<HTMLHeadingElement>("h1#card-heading");
      if (headingEl) courseDetails.heading = headingEl.textContent + "";

      // extracting image url
      const imageEl =
        document.querySelector<HTMLImageElement>("img#card-image");
      if (imageEl) courseDetails.image_url = imageEl.src;

      if (courses.length === limit) courses.pop();
      courses.unshift(courseDetails);
    }
    localStorage.setItem("courses", JSON.stringify(courses));
  }
});
