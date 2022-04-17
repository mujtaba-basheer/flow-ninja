window.addEventListener("load", () => {
  const openDropdown = (observer) => {
    var dropdown = document.querySelector("#w-dropdown-toggle-2");
    triggerMouseEvent(dropdown, "mousedown");
    triggerMouseEvent(dropdown, "mouseup");
    function triggerMouseEvent(node, eventType) {
      var clickEvent = new MouseEvent(eventType, {
        bubbles: true,
        cancelable: true,
        view: window,
      });
      node.dispatchEvent(clickEvent);
    }

    observer.disconnect();
  };

  const section = document.querySelector("div#aa");

  const options = {
    root: document.body,
    rootMargin: "-100px 0",
    threshold: 0.75,
  };
  const callback = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        openDropdown(observer);
      }
    });
  };
  const observer = new IntersectionObserver(callback, options);

  observer.observe(section);
});
