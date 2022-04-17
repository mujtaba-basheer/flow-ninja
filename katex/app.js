window.addEventListener("load", () => {
  const formulaEl = document.getElementById("formula");
  const removeTags = (str = "") => {
    const tagsToRemove = ["<strong>", "</strong>", "<br>"];
    let res = [],
      words = str.split(" ");

    for (let word of words) {
      for (const tag of tagsToRemove) {
        if (word.includes(tag)) word = word.replace(tag, "");
      }
      res.push(word);
    }

    return res.join("\\kern{1em}");
  };

  const html = katex.renderToString(
    removeTags(
      "(also eine Potenz) <strong>ableiten</strong> willst, dann musst du die <strong>Hochzahl</strong> (den Exponenten) <strong>nach vorne ziehen</strong> und die <strong>Hochzahl minus 1</strong> rechnen. Also:"
    ),
    // "(also eine Potenz) <strong>ableiten</strong> willst, dann musst du die <strong>Hochzahl</strong> (den Exponenten) <strong>nach vorne ziehen</strong> und die <strong>Hochzahl minus 1</strong> rechnen. Also:",
    {
      throwOnError: false,
    }
  );
  formulaEl.innerHTML = html;
});

// A $( document ).ready() block.
$(document).ready(function () {
  const removeTags = (str = "") => {
    const tagsToRemove = ["<strong>", "</strong>", "<br>"];
    let res = [],
      words = str.split(" ");

    for (let word of words) {
      for (const tag of tagsToRemove) {
        if (word.includes(tag)) word = word.replace(tag, "");
      }
      res.push(word);
    }

    return res.join("\\kern{1em}");
  };

  document.querySelectorAll(".lesson-rich-text h6").forEach(function (item) {
    var string = item.innerHTML;
    console.log(string);
    var renderedMath = katex.renderToString(removeTags(string), {
      throwOnError: false,
    });
    console.log(renderedMath);
    item.innerHTML = renderedMath;
  });
});
