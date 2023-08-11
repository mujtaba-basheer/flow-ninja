type ItemT = {
  name: string;
  path: string;
  imgName: string;
};
type DataT = {
  items: ItemT[];
};

window.addEventListener("load", async () => {
  const delay = (time: number) => {
    return new Promise((res) => {
      setTimeout(() => res(null), time);
    });
  };

  const videosContainer = document.querySelector<HTMLDivElement>(
    "div.video-container"
  );
  if (videosContainer) {
    const videosContainerCopy = videosContainer.cloneNode(
      true
    ) as HTMLDivElement;
    const videosSection = videosContainer.parentElement as HTMLDivElement;
    videosSection.appendChild(videosContainerCopy);
    videosSection.style.alignItems = "flex-start";
    videosSection.style.flexDirection = "row";
    videosSection.style.overflowX = "hidden";
    videosContainer.style.minWidth = "max-content";
    // videosContainer.style.transition = "transform 500ms linear";
    videosContainerCopy.style.minWidth = "max-content";
    // videosContainerCopy.style.transition = "transform 500ms linear";

    // videosContainer.scrollIntoView();
    const videoEls = videosSection.querySelectorAll<HTMLVideoElement>(
      "div.staff-video-wrapper video"
    );
    const duration = videoEls.item(0).duration;
    videoEls.forEach((videoEl, i) => {
      videoEl.muted = true;
      videoEl.loop = true;
      videoEl.preload = "metadata";
      videoEl.setAttribute("controls", "true");
      // const currentTime = (i % 4) * (duration / 4);
      videoEl.currentTime = 0;
    });
    videoEls.forEach((videoEl) => {
      videoEl.play();
      videoEl.removeAttribute("controls");
    });

    let pixelShift = 0;
    let percentShift = 0;
    // isComplete = false,
    let isPaused = false;
    const containerWidth = videosContainer.getBoundingClientRect().width;

    const move = () => {
      if (isPaused) return;
      videosContainer.style.transform = `translateX(-${percentShift}%)`;
      videosContainerCopy.style.transform = `translateX(-${percentShift}%)`;
      percentShift += 0.075;
      if (percentShift >= 100) {
        videosContainer.style.transform = `translateX(0)`;
        videosContainerCopy.style.transform = `translateX(0)`;
        percentShift = 0;
      }
      videoEls.forEach((videoEl, i) => {
        if (videoEl.paused && !isPaused) videoEl.play();
      });
      window.requestAnimationFrame(move);
    };

    window.requestAnimationFrame(move);

    /*
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
      window.requestAnimationFrame(move);
    };

    videosSection.addEventListener("mouseenter", onMouseEnter);
    videosSection.addEventListener("mouseleave", onMouseLeave);
    */
  }

  // Matter-js
  {
    const {
      Engine,
      Render,
      Runner,
      Bodies,
      Body,
      Composite,
      MouseConstraint,
      Mouse,
      Events,
      Svg,
      Common,
      Vertices,
      Vector,
    } = Matter;
    const setup = () => {
      const canvasWrap = document.getElementById("logo-section");
      const numSteps = 20.0;
      let boxElement;
      let prevRatio = 0.0;
      let increasingColor = "rgba(40, 40, 190, ratio)";
      let decreasingColor = "rgba(190, 40, 40, ratio)";
      let observer: IntersectionObserver;
      let debounce_observer: NodeJS.Timeout | null;
      let isFirst = true;
      let popAble = false;
      const imgUrlBase =
        "https://flow-ninja-assets.s3.amazonaws.com/bold/images";
      const data = {
        items: [
          {
            name: "Casio",
            path: "M279.187 71.8488L49.2217 9.18733C31.8452 4.45255 13.9205 14.7007 9.18572 32.0772C4.45094 49.4537 14.6991 67.3784 32.0756 72.1131L262.041 134.775C279.418 139.509 297.343 129.261 302.077 111.885C306.812 94.5083 296.564 76.5836 279.187 71.8488Z",
            imgName: "casio.png",
          },
          {
            name: "G-Shock",
            path: "M278.095 80.5931L50.5326 9.69937C33.3377 4.34256 15.0559 13.9392 9.69907 31.1341C4.34225 48.329 13.9389 66.6108 31.1338 71.9676L258.697 142.861C275.891 148.218 294.173 138.622 299.53 121.427C304.887 104.232 295.29 85.9499 278.095 80.5931Z",
            imgName: "g-shock.png",
          },
          {
            name: "Keen",
            path: "M253.133 12.1951L48.0128 3.13733C24.3594 2.09283 4.33784 20.421 3.29334 44.0744L3.2929 44.0843C2.2484 67.7377 20.5765 87.7593 44.2299 88.8038L249.35 97.8616C273.003 98.9061 293.025 80.578 294.07 56.9246L294.07 56.9146C295.114 33.2612 276.786 13.2396 253.133 12.1951Z",
            imgName: "keen.png",
          },
          {
            name: "Aesop",
            path: "m0,0h218.98v63.98h-218.98z",
            imgName: "aesop.png",
          },
          {
            name: "Amazon Fashion",
            path: "m0,0h304.57v66.22h-304.57z",
            imgName: "amazon-fashion.png",
          },
          {
            name: "Andrew Fitzsimons",
            path: "m202.07,19.24v-.98c0-9.81-7.95-17.76-17.76-17.76H53.77c-9.81,0-17.76,7.95-17.76,17.76v.98c0,9.81-7.95,17.76-17.76,17.76h0c-9.81,0-17.76,7.95-17.76,17.76v14.68c0,9.81,7.95,17.76,17.76,17.76h201.57c9.81,0,17.76-7.95,17.76-17.76v-14.68c0-9.81-7.95-17.76-17.76-17.76h0c-9.81,0-17.76-7.95-17.76-17.76Z",
            imgName: "andrew-fitzsimons.png",
          },
          {
            name: "Bang And Olufsen",
            path: "m0,0h154.56v154.56h-154.56z",
            imgName: "bang-and-olufsen.png",
          },
          {
            name: "Cannondal",
            path: "m0,0h303.57v65.22h-303.57z",
            imgName: "cannondal.png",
          },
          {
            name: "Elf",
            path: "m0,0h154.56v154.56h-154.56z",
            imgName: "elf.png",
          },
          {
            name: "Espirit",
            path: "m0,0h242.13v66.22h-242.13z",
            imgName: "espirit.png",
          },
          {
            name: "Freitag",
            path: "m0,0h242.66v63.98h-242.66z",
            imgName: "yazio.png",
          },
          {
            name: "G-Star Raw",
            path: "m0,0h353.49v58.08h-353.49z",
            imgName: "g-star-raw.png",
          },
          {
            name: "Head",
            path: "m0,0h154.56v154.56h-154.56z",
            imgName: "head.png",
          },
          {
            name: "Link and Co",
            path: "m0,0h304.57v66.22h-304.57z",
            imgName: "link-and-co.png",
          },
          {
            name: "Mango",
            path: "m0,0h304.57v66.22h-304.57z",
            imgName: "mango.png",
          },
          {
            name: "Matchasome",
            path: "m0,0h154.56v154.56h-154.56z",
            imgName: "matchasome.png",
          },
          {
            name: "Paulas Choice",
            path: "m0,0h304.57v66.22h-304.57z",
            imgName: "paulas-choice.png",
          },
          {
            name: "Rodeo Drive",
            path: "m0,0h242.66v63.98h-242.66z",
            imgName: "rodeo-drive.png",
          },
          {
            name: "Royal Hawaiian Center",
            path: "m0,0h304.57v66.22h-304.57z",
            imgName: "royal-hawaiian-center.png",
          },
          {
            name: "Stapelstein",
            path: "m0,0h304.57v66.22h-304.57z",
            imgName: "stapelstein.png",
          },
          {
            name: "Weleda",
            path: "m0,0h213.51v66.22h-213.51z",
            imgName: "weleda.png",
          },
          {
            name: "Yniq",
            path: "m0,0h154.56v154.56h-154.56z",
            imgName: "yniq.png",
          },
        ],
      };
      const method = {
        shuffleArray: (array: ItemT[]) => {
          let copy = array.concat();
          let arr: ItemT[] = [];
          while (copy.length) {
            arr.push(
              copy.splice(parseInt(Math.random() * copy.length + ""), 1)[0]
            );
          }
          return arr;
        },
        getBodyScale: (w?: number) => {
          const cw = w || document.documentElement.clientWidth;
          // texture scale 은 절대값이 있다, 1.0이 origin
          // body scale 은 절대값이 없다, 현재 값 기준으로 변동, 1.5이후 2를 주는 경우 origin 기준 3배가 된다
          let textureScale = 1.0;
          let bodyScale = 1.0;
          if (cw <= 768) {
            textureScale = 1.0;
          } else if (cw <= 1024) {
            textureScale = 1.0;
          } else if (cw <= 1400) {
            textureScale = 1.2;
          } else if (cw <= 1600) {
            textureScale = 2.0;
          } else if (cw <= 2000) {
            textureScale = 2.0;
          } else {
            textureScale = 1.2;
          }
          bodyScale = (bodyScale / beforeScale) * textureScale;
          beforeScale = textureScale;
          console.log({ textureScale: textureScale, bodyScale: bodyScale });
          return { textureScale: textureScale, bodyScale: bodyScale };
        },
        getMatterRect2: (w?: number) => {
          let cw = w || document.documentElement.clientWidth;
          let matterW = cw * 2;
          let matterH = 0;
          if (cw <= 768) {
            matterW = 1536;
            matterH = 2800;
          } else if (cw <= 1024) {
            matterW = 2048;
            matterH = (matterW * 1800) / 1600;
          } else if (cw <= 1400) {
            matterW = 2400;
            matterH = (matterW * 1400) / 1600;
          } else if (cw <= 1600) {
            matterW = 3200;
            matterH = (matterW * 1200) / 1600;
          } else {
            matterW = 3800;
            matterH = (matterW * 900) / 1600;
          }
          matterH += 200; // bottom wall gap
          return {
            matterW: matterW,
            matterH: window.innerHeight * 1.5,
          };
        },
      };
      const deviceCheck = {
        width: 0,
        device: "",
        deviceWidth: 0,
        callback: [],
        check() {
          const cw = document.documentElement.clientWidth;
          this.width = cw;
          let current: string;
          if (cw <= 768) {
            current = "mobile";
            this.deviceWidth = 768;
          } else if (cw <= 1024) {
            current = "tablet";
            this.deviceWidth = 1024;
          } else if (cw <= 1400) {
            current = "desktop-s";
            this.deviceWidth = 1400;
          } else if (cw <= 1600) {
            current = "desktop-m";
            this.deviceWidth = 1600;
          } else {
            current = "desktop-l";
            this.deviceWidth = 1600;
          }
          if (this.device !== current) {
            this.device = current;
            this.callback.forEach((item) => item(this.device));
          }
          return this.device;
        },
        addChangeEvent(cb) {
          this.callback.push(cb);
        },
      };
      const shuffleItems = method.shuffleArray(data.items);
      const standardScaleWidth = 1024;
      let beforeScale = 1;
      let debounce_resize: NodeJS.Timeout | null = null;
      let matterRect = method.getMatterRect2(standardScaleWidth);
      let CB_RESIZE;
      // Matter js create engine
      const engine = Engine.create();
      const world = engine.world;
      engine.timing.timeScale = 1.2;
      engine.gravity.x = 0;
      engine.gravity.y = 1.2;
      // engine.gravity.isPoint = true;
      let mouseConstraint: Matter.MouseConstraint;
      let render: Matter.Render;
      let runner: Matter.Runner;
      const onMounted = () => {
        deviceCheck.check();
        let textureScale: number;
        let bodyScale: number;
        // create renderer
        if (canvasWrap) {
          render = Render.create({
            element: canvasWrap,
            engine: engine,
            options: {
              width: matterRect.matterW,
              height: window.innerHeight / 2 || matterRect.matterH,
              background: "transparent",
              wireframes: false,
            },
          });
        }
        Render.run(render);
        // create runner
        runner = Runner.create();
        Runner.run(runner, engine);
        // SVG PATH ADD
        // add bodies
        // 최초에 2배수로 그린 후 resize event 내에서 scale 조정
        const vertexSets = [];
        var color = Common.choose([
          "#556270",
          "#4ECDC4",
          "#C7F464",
          "#FF6B6B",
          "#C44D58",
        ]);
        shuffleItems.forEach((item, i) => {
          const newElement = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "path"
          );
          newElement.setAttribute("d", item.path);
          const points = Svg.pathToVertices(newElement, 30);
          // @ts-ignore
          vertexSets.push(Vertices.scale(points, 1, 1));
          Composite.add(
            world,
            Bodies.fromVertices(
              //100 + Math.round(Common.random()*800),
              //200 + i * 5,
              matterRect.matterW / 4 +
                Math.round((Common.random() * matterRect.matterW) / 2),
              matterRect.matterH / 1.5,
              // @ts-ignore
              vertexSets[vertexSets.length - 1],
              {
                render: {
                  // fillStyle: color,
                  // strokeStyle: color,
                  // lineWidth: 1,
                  sprite: {
                    texture: `${imgUrlBase}/${item.imgName}`,
                    xScale: 1,
                    yScale: 1,
                  },
                  //visible: false
                },
                id: i,
                plugin: {
                  //index:      i,
                  status: "on",
                  name: item.name,
                },
              },
              true
            )
          );
        });
        // WALL ADD x,y,w,h
        const wallTop = Bodies.rectangle(
          matterRect.matterW / 2,
          0 - 490,
          matterRect.matterW,
          1000,
          {
            isStatic: true,
            label: "roof",
            render: { fillStyle: "transparent" },
          }
        );
        const wallBottom = Bodies.rectangle(
          matterRect.matterW / 2,
          matterRect.matterH + 300,
          matterRect.matterW,
          1000,
          {
            isStatic: true,
            label: "ground",
            render: { fillStyle: "transparent" },
          }
        );
        const wallLeft = Bodies.rectangle(
          0 - 390,
          matterRect.matterH / 2,
          800,
          matterRect.matterH,
          {
            isStatic: true,
            label: "wallLeft",
            render: { fillStyle: "transparent" },
          }
        );
        const wallRight = Bodies.rectangle(
          matterRect.matterW + 390,
          matterRect.matterH / 2,
          800,
          matterRect.matterH,
          {
            isStatic: true,
            label: "wallRight",
            render: { fillStyle: "transparent" },
          }
        );
        const wallMinime = Bodies.rectangle(
          (matterRect.matterW / 15) * 5.8,
          matterRect.matterH - 210,
          380,
          180,
          {
            isStatic: true,
            label: "wallMinime",
            render: { fillStyle: "transparent" },
          }
        );
        Composite.add(world, [
          wallTop,
          wallBottom,
          wallLeft,
          wallRight,
          wallMinime,
        ]);
        // Observer
        boxElement = document.querySelector("#logo-section");
        // Events
        const popScene = (engine: Matter.Engine) => {
          console.log("function: popScene");
          const bodies = Composite.allBodies(engine.world);
          for (let i = 0; i < bodies.length; i++) {
            const body = bodies[i];
            if (
              !body.isStatic &&
              body.position.y >=
                1300 /* && body.position.x > render.canvas.width/4 && body.position.x < render.canvas.width/1.33*/
            ) {
              Body.applyForce(body, body.position, {
                x: 0.01 * body.mass * Common.choose([1, -1]),
                //y: (0.06 * body.mass) * -2
                y: 0.06 * body.mass * -1,
              });
            }
          }
        };
        const shakeScene = (engine: Matter.Engine, isStart?: boolean) => {
          console.log("function: shakeScene");
          var bodies = Composite.allBodies(engine.world);
          for (var i = 0; i < bodies.length; i++) {
            var body = bodies[i];
            if (!body.isStatic && isStart) {
              Body.setPosition(body, {
                x:
                  matterRect.matterW / 2 +
                  Math.round((Math.random() * matterRect.matterW) / 2),
                y: matterRect.matterH / 1.2,
              });
              body.render.visible = true;
            }
            if (!body.isStatic && body.position.y >= 500) {
              var forceMagnitude = 0.015 * body.mass;
              Body.applyForce(body, body.position, {
                x: isStart ? 0 : 0.09 * body.mass * Common.choose([1, -1]),
                y: isStart ? -4 * Math.random() - 1 : 0.08 * body.mass * -1,
              });
            }
          }
        };
        const resizeCanvas = () => {
          console.log("function: resizeCanvas");
          const matterRect = method.getMatterRect2();
          const bodies = Composite.allBodies(engine.world);
          const scale = method.getBodyScale();
          textureScale = scale.textureScale;
          bodyScale = scale.bodyScale;
          for (let i = 0; i < bodies.length; i++) {
            const body = bodies[i];
            if (!body.isStatic) {
              const forceMagnitude = 0.015 * body.mass;
              Body.applyForce(body, body.position, {
                x:
                  body.position.x >= 500 &&
                  render.canvas.width > matterRect.matterW
                    ? -4
                    : 0,
                y: body.position.y >= 500 ? -2 : 0,
              });
              Body.scale(body, bodyScale, bodyScale);
              if (body.render.sprite) {
                body.render.sprite.xScale = body.render.sprite.yScale =
                  textureScale;
              }
            }
          }
          setTimeout(() => {
            Body.scale(wallTop, Math.max(1, matterRect.matterW / 1500), 1);
            Body.scale(wallBottom, Math.max(1, matterRect.matterW / 1500), 1);
            Body.scale(wallLeft, 1, Math.max(1, matterRect.matterH / 2000));
            Body.scale(wallRight, 1, Math.max(1, matterRect.matterH / 2000));
            Body.setPosition(wallTop, {
              x: matterRect.matterW / 2,
              y: 0 - 490,
            });
            Body.setPosition(wallBottom, {
              x: matterRect.matterW / 2,
              y: matterRect.matterH + 300,
            });
            Body.setPosition(wallLeft, {
              x: 0 - 390,
              y: matterRect.matterH / 2,
            });
            Body.setPosition(wallRight, {
              x: matterRect.matterW + 390,
              y: matterRect.matterH / 2,
            });
            Body.setPosition(wallMinime, {
              x: (matterRect.matterW / 15) * 5.8,
              y: matterRect.matterH - 210,
            });
            render.canvas.width = matterRect.matterW;
            render.canvas.height = matterRect.matterH;
          }, 100);
        };
        const buildThresholdList = () => {
          let thresholds: number[] = [];
          let numSteps = 50;
          for (let i = 1.0; i <= numSteps; i++) {
            let ratio = i / numSteps;
            thresholds.push(ratio);
          }
          thresholds.push(0);
          return thresholds;
        };
        const handleIntersect: IntersectionObserverCallback = (
          entries,
          observer
        ) => {
          console.log("function: handleIntersect");
          if (entries[0].intersectionRatio > 0.5) {
            if (isFirst) {
              shakeScene(engine, true);
              isFirst = false;
              setTimeout(() => {
                popAble = true;
              }, 2000);
            } else {
              if (!popAble) return;
              popScene(engine);
              //shakeScene(engine, true);
              popAble = false;
            }
          }
          entries.forEach((entry) => {
            if (entry.intersectionRatio > prevRatio) {
              //entry.target.style.backgroundColor = increasingColor.replace("ratio", entry.intersectionRatio);
              // @ts-ignore
              entry.target.style.opacity =
                Math.min(entry.intersectionRatio * 5, 1) + "";
            } else {
              //entry.target.style.backgroundColor = decreasingColor.replace("ratio", entry.intersectionRatio);
              // @ts-ignore
              entry.target.style.opacity =
                Math.min(entry.intersectionRatio * 5, 1) + "";
            }
            prevRatio = entry.intersectionRatio;
          });
          // debounce
          if (debounce_observer) clearTimeout(debounce_observer);
          debounce_observer = setTimeout(() => {
            popAble = true;
          }, 300);
        };
        const createObserver = () => {
          console.log("function: createObserver");
          let options = {
            root: null,
            rootMargin: "0px",
            threshold: buildThresholdList(),
          };
          observer = new IntersectionObserver(handleIntersect, options);
          observer.observe(boxElement);
        };
        createObserver();
        CB_RESIZE = () => {
          // debounce
          if (debounce_resize) {
            clearTimeout(debounce_resize);
            debounce_resize = setTimeout(() => {
              deviceCheck.check();
            }, 500);
          }
        };
        window.addEventListener("resize-x", CB_RESIZE);
        deviceCheck.addChangeEvent(resizeCanvas);
        // 초기 스케일 조정
        resizeCanvas();
        // add mouse control
        var mouse = Mouse.create(render.canvas);
        mouseConstraint = MouseConstraint.create(engine, {
          mouse: mouse,
          constraint: {
            stiffness: 0.2,
            render: {
              visible: false,
            },
          },
        });
        Composite.add(world, mouseConstraint);
        // keep the mouse in sync with rendering
        render.mouse = mouse;
        // background drag event flag
        let hitTest = false;
        let cancelTouch = false;
        // an example of using mouse events on a mouse
        Events.on(mouseConstraint, "mousedown", function (event) {
          if (!hitTest) {
            /* type1 */
            mouseConstraint.mouse.element.removeEventListener(
              "touchmove",
              // @ts-ignore
              mouseConstraint.mouse.mousemove
            );
            mouseConstraint.mouse.element.removeEventListener(
              "touchstart",
              // @ts-ignore
              mouseConstraint.mouse.mousedown
            );
            mouseConstraint.mouse.element.removeEventListener(
              "touchend",
              // @ts-ignore
              mouseConstraint.mouse.mouseup
            );
            cancelTouch = true;
          }
        });
        Events.on(mouseConstraint, "mouseup", function (event) {
          /* type1 */
          if (!hitTest) {
            mouseConstraint.mouse.element.addEventListener(
              "touchmove",
              // @ts-ignore
              mouseConstraint.mouse.mousemove
            );
            mouseConstraint.mouse.element.addEventListener(
              "touchstart",
              // @ts-ignore
              mouseConstraint.mouse.mousedown
            );
            mouseConstraint.mouse.element.addEventListener(
              "touchend",
              // @ts-ignore
              mouseConstraint.mouse.mouseup
            );
            cancelTouch = false;
          }
          //Events.off(mouseConstraint, 'mousemove');
          hitTest = false;
          dragBody = null;
        });
        var dragBody = null;
        Events.on(mouseConstraint, "mousemove", function (event) {
          if (dragBody != null) {
            // @ts-ignore
            var mousePosition = event.mouse.position;
            // ### object hit test!!..
            if (
              mousePosition.y <= 200 ||
              mousePosition.y >= render.canvas.height - 200 ||
              mousePosition.x <= 20 ||
              mousePosition.x >= render.canvas.width - 20 ||
              (wallMinime.bounds.min.x < mousePosition.x &&
                mousePosition.x < wallMinime.bounds.max.x &&
                wallMinime.bounds.min.y < mousePosition.y &&
                mousePosition.y < wallMinime.bounds.max.y)
            ) {
              event.source.body
                ? (event.source.body.collisionFilter.category = 0x0004)
                : null;
              event.source.constraint.bodyB = null;
              mouseConstraint.mouse.element.dispatchEvent(new Event("mouseup"));
            }
          }
        });
        Events.on(mouseConstraint, "startdrag", function (event) {
          //render.canvas.style.cursor = 'grabbing';
          if (!cancelTouch) {
            hitTest = true;
          }
          dragBody = event.body;
        });
        Events.on(mouseConstraint, "enddrag", function (event) {
          //render.canvas.style.cursor = 'default';
          const xGap = Math.abs(
            event.mouse.mousedownPosition.x - event.mouse.mouseupPosition.x
          );
          const yGap = Math.abs(
            event.mouse.mousedownPosition.y - event.mouse.mouseupPosition.y
          );
          if (
            hitTest &&
            !event.body.isStatic &&
            Math.max(10, xGap, yGap) == 10
          ) {
            switch (event.body.id) {
              case "Switch":
                if (event.body.plugin.status == "on") {
                  event.body.plugin.status = "off";
                } else {
                  event.body.plugin.status = "on";
                }
                shakeScene(engine);
                break;
            }
          }
        });
        // Remove default Prevent event
        mouseConstraint.mouse.element.removeEventListener(
          "mousewheel",
          // @ts-ignore
          mouseConstraint.mouse.mousewheel
        );
        mouseConstraint.mouse.element.removeEventListener(
          "DOMMouseScroll",
          // @ts-ignore
          mouseConstraint.mouse.mousewheel
        );
      };
      onMounted();
    };
    setup();
  }
});
