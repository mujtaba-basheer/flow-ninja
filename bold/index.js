window.addEventListener("load", async () => {
    const delay = (time) => {
        return new Promise((res) => {
            setTimeout(() => res(null), time);
        });
    };
    const videosContainer = document.querySelector("div.video-container");
    if (videosContainer) {
        const videosContainerCopy = videosContainer.cloneNode(true);
        const videosSection = videosContainer.parentElement;
        videosSection.appendChild(videosContainerCopy);
        videosSection.style.alignItems = "flex-start";
        videosSection.style.flexDirection = "row";
        videosSection.style.overflowX = "hidden";
        videosContainer.style.minWidth = "max-content";
        // videosContainer.style.transition = "transform 500ms linear";
        videosContainerCopy.style.minWidth = "max-content";
        // videosContainerCopy.style.transition = "transform 500ms linear";
        // videosContainer.scrollIntoView();
        const videoEls = videosSection.querySelectorAll("div.staff-video-wrapper video");
        const duration = videoEls.item(0).duration;
        videoEls.forEach((videoEl, i) => {
            videoEl.muted = true;
            videoEl.loop = true;
            const currentTime = (i % 4) * (duration / 4);
            videoEl.currentTime = currentTime;
        });
        videoEls.forEach((videoEl) => {
            videoEl.play();
        });
        let percentShift = 0, 
        // isComplete = false,
        isPaused = false;
        setInterval(() => {
            if (isPaused)
                return;
            videosContainer.style.transform = `translateX(-${percentShift}%)`;
            videosContainerCopy.style.transform = `translateX(-${percentShift}%)`;
            percentShift += 1;
            if (percentShift >= 100) {
                videosContainer.style.transform = `translateX(0)`;
                videosContainerCopy.style.transform = `translateX(0)`;
                percentShift = 0;
            }
        }, 100);
        const onMouseEnter = () => {
            isPaused = true;
            const { currentTime: initialTime, duration } = videoEls.item(0);
            let currentTime = initialTime;
            // const offset = Math.floor((currentTime / duration) * 4);
            videoEls.forEach((videoEl, i) => {
                videoEl.pause();
                // videoEl.currentTime =
                //   initialTime + (((i % 4) * (videoEl.duration / 4)) % 3);
            });
        };
        const onMouseLeave = () => {
            isPaused = false;
            videoEls.forEach((videoEl) => {
                videoEl.play();
            });
        };
        videosContainer.addEventListener("mouseenter", onMouseEnter);
        videosContainer.addEventListener("mouseleave", onMouseLeave);
    }
});
// translateX(-calc(16.375rem + 1.25rem))
