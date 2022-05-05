window.addEventListener("load", function () {
  // declaring relevant DOM Elements
  const buttonEl = document.querySelector(".w-button");
  const popupWrEl = document.querySelector(".popup-wrapper");
  const player1 = document.getElementById("audio-1");
  const player2 = document.getElementById("audio-2");

  // add player elements
  const addPlayers = () => {
    const audio1 = document.createElement("audio");
    audio1.setAttribute(
      "src",
      "https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3"
    );
    audio1.setAttribute("id", "player-1");
    audio1.setAttribute("autoplay", "true");

    const audio2 = document.createElement("audio");
    audio2.setAttribute(
      "src",
      "https://file-examples-com.github.io/uploads/2017/11/file_example_MP3_700KB.mp3"
    );
    audio2.setAttribute("id", "player-2");

    [audio1, audio2].forEach((audioEl) => {
      audioEl.style.display = "none";
      document.body.appendChild(audioEl);
    });
  };

  // remove player elements
  const removePlayers = () => {
    ["1", "2"].forEach((sl) => {
      document.getElementById(`player-${sl}`).remove();
    });
  };

  // utility functions for controlling audio
  const play = (id) => {
    document.getElementById(`player-${id}`).play();
  };
  const isPlaying = (id) => {
    return !document.getElementById(`player-${id}`).paused;
  };
  const pause = (id) => {
    document.getElementById(`player-${id}`).pause();
  };

  buttonEl.addEventListener("click", (ev) => {
    ev.preventDefault();

    // checking if popup is already displayed
    if (!popupWrEl.style.display || popupWrEl.style.display === "none") {
      popupWrEl.style.display = "block";
      addPlayers();
    }
  });

  // 'play' btn click handler
  const handleClickPlay = (curr, other) => {
    if (isPlaying(curr)) {
      pause(curr);
      return;
    }
    if (isPlaying(other)) pause(other);
    play(curr);
  };

  // adding event handler for click on play btn
  player1
    .querySelector(".play-btn")
    .addEventListener("click", () => handleClickPlay("1", "2"));

  player2
    .querySelector(".play-btn")
    .addEventListener("click", () => handleClickPlay("2", "1"));

  // listener for closing popup
  window.addEventListener("click", (ev) => {
    // checking for off-click
    if (
      !(ev.target === player1 || player1.contains(ev.target)) &&
      !(ev.target === player2 || player2.contains(ev.target)) &&
      ev.target !== buttonEl
    ) {
      popupWrEl.style.display = "none";
      removePlayers();
    }
  });
});
