var a;
$(".talent-item").each(function () {
  let a = $(this).clone();
  $(a).appendTo(".swiper-cms");
}),
  $(".slider-talent-navigation").css("transform", "translateY(-20px)"),
  $(".slider-talent-navigation").css("opacity", "0");
const b = new Swiper(".talent-slider-container", {
  direction: "horizontal",
  spaceBetween: 20,
  slidesPerView: 1,
  navigation: {
    nextEl: ".pr__cms-slider-arrow-next",
    prevEl: ".pr__cms-slider-arrow-prev",
  },
  breakpoints: { 991: { shortSwipes: !0 } },
});
function c() {
  $(".talent-item-hover").removeClass("talent-item-hover-active"),
    $($(".talent-item-hover")[b.activeIndex]).addClass(
      "talent-item-hover-active"
    );
}
$(".pr__cms-slider-arrow-next").click(function () {
  c();
}),
  $(".pr__cms-slider-arrow-prev").click(function () {
    c();
  });
let d = 0;
$(".talent-item-hover").each(function () {
  let a = $(this).clone();
  $(a).attr("number-slide", d),
    d++,
    $(a).appendTo(".slider-talent-navigation-wrapper"),
    $(".talent-item-hover").removeClass("talent-item-hover-active"),
    $($(".talent-item-hover")[b.activeIndex]).addClass(
      "talent-item-hover-active"
    );
}),
  $(".talent-item-hover").hover(function () {
    $(".talent-item-hover").removeClass("talent-item-hover-active"),
      $(this).addClass("talent-item-hover-active"),
      b.slideTo($(this).attr("number-slide"));
  }),
  $(".pr__cms-filter").click(function () {
    $(".pr__cms-filter").removeClass("pr__cms-filter-active"),
      $(this).addClass("pr__cms-filter-active");
    let c = $(this).attr("tab-filter");
    $(".tab-filter-content").animate({ opacity: 0 }, 250),
      setTimeout(() => {
        $(".tab-filter-content").css("display", "none"),
          $(`.tab-filter-content[tab-filter="${c}"]`).css("display", "block"),
          $(`.tab-filter-content[tab-filter="${c}"]`).animate(
            { opacity: 1 },
            250
          );
      }, 250);
    let e = $(this).text();
    g(),
      $(".slider-talent-navigation").css("transform", "translateY(20px)"),
      $(".slider-talent-navigation").css("opacity", "0"),
      setTimeout(function () {
        if (
          ($(".swiper-cms").empty(),
          $(".slider-talent-navigation-wrapper").empty(),
          "All" == e)
        )
          $(".talent-item").each(function () {
            let a = $(this).clone();
            $(a).appendTo(".swiper-cms");
          }),
            (d = 0),
            $(".talent-item-hover").each(function () {
              let a = $(this).clone();
              $(a).attr("number-slide", d),
                d++,
                $(a).appendTo(".slider-talent-navigation-wrapper"),
                $(".talent-item-hover").removeClass("talent-item-hover-active");
            });
        else {
          let a = [];
          $(`.collection-list-talents .category[name-category="${e}"]`)
            .parents(".talent-item")
            .each(function () {
              let b = $(this).clone();
              a.push(b), a.reverse();
            });
          for (let c = 0; c < a.length; c++) $(".swiper-cms").append(a[c]);
          (d = a.length - 1),
            $(`.collection-list-talents .category-list[name-category="${e}"]`)
              .parents(".talent-item-hover")
              .each(function () {
                let a = $(this).clone();
                $(a).attr("number-slide", d),
                  d--,
                  $(a).appendTo(".slider-talent-navigation-wrapper"),
                  $(".talent-item-hover").removeClass(
                    "talent-item-hover-active"
                  );
              });
        }
        b.update(),
          b.slideTo(0),
          $($(".talent-item-hover")[b.activeIndex]).addClass(
            "talent-item-hover-active"
          ),
          $(".talent-item-hover").hover(function () {
            $(".talent-item-hover").removeClass("talent-item-hover-active"),
              $(this).addClass("talent-item-hover-active"),
              b.slideTo($(this).attr("number-slide"));
          }),
          $(".slider-talent-navigation").css(
            "transition",
            "transform 0ms,opacity 0ms,-webkit-transform 0ms"
          ),
          $(".slider-talent-navigation").css("transform", "translateY(-20px)");
      }, a),
      setTimeout(function () {
        $(".slider-talent-navigation").css(
          "transition",
          "background-color .5s,transform 250ms,opacity 250ms,-webkit-transform 250ms"
        ),
          $(".slider-talent-navigation").css("transform", "translateY(0px)"),
          $(".slider-talent-navigation").css("opacity", "1"),
          f();
      }, a + 200);
  });
let e = !1;
function f() {
  let a = 0,
    b;
  $(".talent-item").css(
    "transition",
    "transform 0ms,opacity 0ms,-webkit-transform 0ms"
  ),
    $(".talent-item").css("transform", "translateY(-20px)"),
    setTimeout(function () {
      $(".talent-item").css(
        "transition",
        "background-color .5s,transform 250ms,opacity 250ms,-webkit-transform 250ms"
      );
      for (let c = 0; c < $(".talent-item").length; c++)
        (b = window.setTimeout(function () {
          $($(".talent-item")[c]).css("opacity", "1"),
            $($(".talent-item")[c]).css("transform", "translateY(0px)");
        }, a)),
          (a += 50),
          c >= 7
            ? (window.clearTimeout(b),
              $($(".talent-item")[c]).css("opacity", "1"),
              $($(".talent-item")[c]).css("transform", "translateY(0px)"),
              (a += 0))
            : (a += 50);
    }, 50);
}
function g() {
  a = 0;
  let c;
  for (let b = 0; b < $(".talent-item").length; b++)
    (c = window.setTimeout(function () {
      $($(".talent-item")[b]).css("opacity", "0"),
        $($(".talent-item")[b]).css("transform", "translateY(20px)");
    }, a)),
      b >= 7
        ? (window.clearTimeout(c),
          $($(".talent-item")[b]).css("opacity", "0"),
          $($(".talent-item")[b]).css("transform", "translateY(20px)"),
          (a += 0))
        : (a += 50);
}
$(".pr__cms-switcher").click(function () {
  $(".slider-talent-navigation").css(
    "transition",
    "background-color .5s,transform 250ms,opacity 250ms,-webkit-transform 250ms"
  ),
    g(),
    e
      ? ($(".slider-talent-navigation").css("transform", "translateY(20px)"),
        $(".slider-talent-navigation").css("opacity", "0"),
        setTimeout(function () {
          $(".slider-talent-navigation").css(
            "transition",
            "transform 0ms,opacity 0ms,-webkit-transform 0ms"
          ),
            $(".slider-talent-navigation").css("width", "0px"),
            $(".slider-talent-navigation").css("height", "0px"),
            $(".slider-talent-navigation").css(
              "transform",
              "translateY(-20px)"
            ),
            document.documentElement.style.setProperty("--slideList", "1"),
            991 > $(window).width() &&
              $(".talent-item-photo-container").css("max-width", "128px"),
            (e = !1);
        }, a))
      : setTimeout(function () {
          $(".slider-talent-navigation").css("width", "auto"),
            $(".slider-talent-navigation").css("height", "auto"),
            $(".slider-talent-navigation").css("transform", "translateY(0px)"),
            $(".slider-talent-navigation").css("opacity", "1"),
            document.documentElement.style.setProperty("--slideList", ".5"),
            991 > $(window).width() &&
              $(".talent-item-photo-container").css("max-width", "95px"),
            (e = !0);
        }, a),
    setTimeout(function () {
      f();
    }, a);
}),
  $(document).ready(function () {
    var a,
      b,
      c = !1;
    $("#bts-button-video").click(function () {
      clearTimeout(a),
        (c = !0),
        $("#bts-button-video").css("opacity", "0"),
        $(".pr__bts-video-container").css("opacity", "1"),
        setTimeout(function () {
          $("#bts-button-video").css("display", "none"),
            $("#bts-video").attr("controls", "true"),
            $("#bts-video").attr("controlsList", "nodownload noplaybackrate"),
            $("#bts-video").attr("disablepictureinpicture", "false"),
            $("#bts-video").attr("disablepictureinpicture", "false");
        }, 1e3),
        $("#bts-video").get(0).play();
    }),
      $("#bts-button-video").hover(
        function () {
          $("#bts-button-video").css("border-color", "transparent"),
            $("#bts-pie-loader").addClass("animate"),
            $("#bts-pie-loader").css("--p", "100"),
            (a = setTimeout(function () {
              (c = !0),
                $("#bts-button-video").css("opacity", "0"),
                $(".pr__bts-video-container").css("opacity", "1"),
                ($("#bts-video").get(0).muted = !0),
                setTimeout(function () {
                  $("#bts-button-video").css("display", "none"),
                    $("#bts-video").attr("controls", "true"),
                    $("#bts-video").attr(
                      "controlsList",
                      "nodownload noplaybackrate"
                    ),
                    $("#bts-video").attr("disablepictureinpicture", "false"),
                    $("#bts-video").attr("disablepictureinpicture", "false"),
                    $("#bts-video").get(0).play();
                }, 1e3);
            }, 5e3));
        },
        function () {
          c ||
            ($("#bts-button-video").css("border-color", "#EBD34D"),
            $("#bts-pie-loader").removeClass("animate"),
            $("#bts-pie-loader").css("--p", "0"),
            clearTimeout(a));
        }
      );
    var d = !1;
    $("#hero-video-play").click(function () {
      clearTimeout(b),
        (d = !0),
        setTimeout(function () {
          $("#hero-video").attr("controls", "true"),
            $("#hero-video").attr("controlsList", "nodownload noplaybackrate"),
            $("#hero-video").attr("disablepictureinpicture", "false"),
            $("#hero-video").attr("disablepictureinpicture", "false");
        }, 1e3),
        $("#hero-video").get(0).play();
    }),
      $("#hero-video-play").hover(
        function () {
          $(".hero-play-overlay-black").css("transform", "translateY(0%)"),
            $(".hero-play-overlay-black").css(
              "transition",
              "transform 5s,-webkit-transform 5s"
            ),
            (b = setTimeout(function () {
              (d = !0),
                $(".open-video-hover").click(),
                ($("#hero-video").get(0).muted = !0),
                setTimeout(function () {
                  $("#hero-video").attr("controls", "true"),
                    $("#hero-video").attr(
                      "controlsList",
                      "nodownload noplaybackrate"
                    ),
                    $("#hero-video").attr("disablepictureinpicture", "false"),
                    $("#hero-video").attr("disablepictureinpicture", "false"),
                    $("#hero-video").get(0).play();
                }, 1e3);
            }, 5e3));
        },
        function () {
          d ||
            ($(".hero-play-overlay-black").css("transform", "translateY(100%)"),
            $(".hero-play-overlay-black").css(
              "transition",
              "transform 0s,-webkit-transform 0s"
            ),
            clearTimeout(b));
        }
      );
  });

jQuery(document).ready(function () {
  jQuery(".blog-post-rich a").each(function () {
    if (
      $(this).attr("href").startsWith("http") &&
      !$(this).attr("href").startsWith("https//www.flow.ninja")
    ) {
      $(this).attr("target", "_blank");
    }
  });
});
