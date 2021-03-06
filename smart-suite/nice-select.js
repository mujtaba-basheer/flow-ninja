var Webflow = Webflow || [];
Webflow.push(function () {
  !(function (e) {
    e.fn.niceSelect = function (t) {
      if ("string" == typeof t)
        return (
          "update" == t
            ? this.each(function () {
                var t = e(this),
                  l = e(this).next(".nice-select"),
                  c = l.hasClass("open");
                l.length && (l.remove(), s(t), c && t.next().trigger("click"));
              })
            : "destroy" == t
            ? (this.each(function () {
                var t = e(this),
                  s = e(this).next(".nice-select");
                s.length && (s.remove(), t.css("display", ""));
              }),
              0 == e(".nice-select").length && e(document).off(".nice_select"))
            : console.log('Method "' + t + '" does not exist.'),
          this
        );
      function s(t) {
        t.after(
          e("<div></div>")
            .addClass("nice-select")
            .addClass(t.attr("class") || "")
            .addClass(t.attr("disabled") ? "disabled" : "")
            .addClass(t.attr("multiple") ? "has-multiple" : "")
            .attr("tabindex", t.attr("disabled") ? null : "0")
            .html(
              t.attr("multiple")
                ? '<span class="multiple-options"></span><div class="nice-select-search-box"><input type="text" class="nice-select-search" placeholder="Search..."/></div><ul class="list"></ul>'
                : '<span class="current"></span><div class="list"><div class="nice-select-search-box"><input type="text" class="nice-select-search" placeholder="Search..."/></div><ul class="nice-inner-list"></ul></div>'
            )
        );
        var s = t.next(),
          l = t.find("option");
        if (t.attr("multiple")) {
          var c = t.find("option:selected"),
            n = "";
          c.each(function () {
            ($selected_option = e(this)),
              ($selected_text =
                $selected_option.data("display") || $selected_option.text()),
              $selected_option.val() &&
                (n += '<span class="current">' + $selected_text + "</span>");
          }),
            ($select_placeholder =
              t.data("js-placeholder") || t.attr("js-placeholder")),
            ($select_placeholder = $select_placeholder || "Select"),
            console.log($select_placeholder),
            (n = "" === n ? $select_placeholder : n),
            s.find(".multiple-options").html(n);
        } else {
          c = t.find("option:selected");
          s.find(".current").html(c.data("display") || c.text());
        }
        l.each(function (t) {
          var l = e(this),
            c = l.data("display");
          s.find("ul").append(
            e("<li></li>")
              .attr("data-value", l.val())
              .attr("data-display", c || null)
              .addClass(
                "option" +
                  (l.is(":selected") ? " selected" : "") +
                  (l.is(":disabled") ? " disabled" : "")
              )
              .html(l.text())
          );
        });
      }
      this.hide(),
        this.each(function () {
          var t = e(this);
          t.next().hasClass("nice-select") || s(t);
        }),
        e(document).off(".nice_select"),
        e(document).on("click.nice_select", ".nice-select", function (t) {
          var s = e(this);
          e(".nice-select").not(s).removeClass("open"),
            s.toggleClass("open"),
            s.hasClass("open")
              ? (s.find(".option"),
                s.find(".nice-select-search").val(""),
                s.find(".nice-select-search").focus(),
                s.find(".focus").removeClass("focus"),
                s.find(".selected").addClass("focus"),
                s.find("ul li").show())
              : s.focus();
        }),
        e(document).on("click", ".nice-select-search-box", function (e) {
          return e.stopPropagation(), !1;
        }),
        e(document).on("keyup.nice-select-search", ".nice-select", function () {
          var t = e(this),
            s = t.find(".nice-select-search").val(),
            l = t.find("ul li");
          if ("" == s) l.show();
          else if (t.hasClass("open")) {
            s = s.toLowerCase();
            var c = new RegExp(s);
            0 < l.length
              ? l.each(function () {
                  var t = e(this),
                    s = t.text().toLowerCase();
                  c.test(s) ? t.show() : t.hide();
                })
              : l.show();
          }
          t.find(".option"),
            t.find(".focus").removeClass("focus"),
            t.find(".selected").addClass("focus");
        }),
        e(document).on("click.nice_select", function (t) {
          0 === e(t.target).closest(".nice-select").length &&
            e(".nice-select").removeClass("open").find(".option");
        }),
        e(document).on(
          "click.nice_select",
          ".nice-select .option:not(.disabled)",
          function (t) {
            var s = e(this),
              l = s.closest(".nice-select");
            if (l.hasClass("has-multiple"))
              console.log("clicked", s),
                s.hasClass("selected")
                  ? s.removeClass("selected")
                  : s.addClass("selected"),
                ($selected_html = ""),
                ($selected_values = []),
                l.find(".selected").each(function () {
                  $selected_option = e(this);
                  var t =
                    $selected_option.data("display") || $selected_option.text();
                  ($selected_html += '<span class="current">' + t + "</span>"),
                    $selected_values.push($selected_option.data("value"));
                }),
                ($select_placeholder =
                  l.find("select").data("js-placeholder") ||
                  l.find("select").attr("js-placeholder")),
                console.log(l.find("select")),
                ($select_placeholder = $select_placeholder || "Select"),
                ($selected_html =
                  "" === $selected_html ? $select_placeholder : $selected_html),
                l.find(".multiple-options").html($selected_html),
                l.find("select").val($selected_values).trigger("change");
            else {
              s.closest(".nice-select").siblings("select").val(s.data("value"));
              l.find(".selected").removeClass("selected"),
                s.addClass("selected");
              var c = s.data("display") || s.text();
              l.find(".current").text(c),
                l.find("select").val(s.data("value")).trigger("change");
            }
          }
        ),
        e(document).on("keydown.nice_select", ".nice-select", function (t) {
          var s = e(this),
            l = e(s.find(".focus") || s.find(".list .option.selected"));
          if (32 == t.keyCode || 13 == t.keyCode)
            return (
              s.hasClass("open") ? l.trigger("click") : s.trigger("click"), !1
            );
          if (40 == t.keyCode) {
            if (s.hasClass("open")) {
              var c = l.nextAll(".option:not(.disabled)").first();
              c.length > 0 &&
                (s.find(".focus").removeClass("focus"), c.addClass("focus"));
            } else s.trigger("click");
            return !1;
          }
          if (38 == t.keyCode) {
            if (s.hasClass("open")) {
              var n = l.prevAll(".option:not(.disabled)").first();
              n.length > 0 &&
                (s.find(".focus").removeClass("focus"), n.addClass("focus"));
            } else s.trigger("click");
            return !1;
          }
          if (27 == t.keyCode) s.hasClass("open") && s.trigger("click");
          else if (9 == t.keyCode && s.hasClass("open")) return !1;
        });
      var l = document.createElement("a").style;
      return (
        (l.cssText = "pointer-events:auto"),
        "auto" !== l.pointerEvents && e("html").addClass("no-csspointerevents"),
        this
      );
    };
  })(jQuery),
    $(document).ready(function () {
      $("select").niceSelect(),
        $(".nice-select")
          .not(".country-input")
          .find(".nice-select-search-box")
          .remove();
    });
});
