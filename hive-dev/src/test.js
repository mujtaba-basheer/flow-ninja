const formEls = document.querySelectorAll("form#wf-form-Calculator");
for (const formEl of formEls) {
    let d = document.querySelector("[lang]").getAttribute("lang");
    formEl.querySelector("#language").value = d;
    let b = formEl.querySelectorAll("[required]");
    for (i = 0; i < b.length; i++)
        b[i].addEventListener("change", function (b) {
            let a = !0;
            (formEl.querySelectorAll("[required]").forEach(function (b) {
                if (a) {
                    if ("radio" === b.type) {
                        let c = !1;
                        formEl.querySelectorAll(`[name=${b.name}]`).forEach(function (a) {
                            a.checked && (c = !0);
                        }),
                            (a = c);
                        return;
                    }
                    if (!b.value) {
                        a = !1;
                        return;
                    }
                }
            }),
                a)
                ? formEl.querySelector(".quote-button").classList.remove("disabled")
                : formEl.querySelector(".quote-button").classList.add("disabled");
        });
    let e = $(formEl).find("#Picks-per-order");
    function f() {
        let a = e.val();
        console.log({ val: a }),
            formEl
                .querySelectorAll("img.order-image-box")
                .forEach((a) => (a.style.zIndex = "auto")),
            $(`img.box-${a}`).css("z-index", "1");
    }
    e.on("change", f),
        formEl.querySelectorAll(".order-picks-radio").forEach((a) => {
            a.nextSibling.addEventListener("click", function () {
                setTimeout(function () {
                    if (a.nextSibling.checked) {
                        let b = a.parentNode.lastChild.textContent;
                        formEl.querySelector("#picks-title").innerHTML = b;
                    }
                    else
                        formEl.querySelector("#picks-title").textContent("Picks per order");
                }, 100);
            });
        }),
        formEl.querySelectorAll(".platform-fulfill-checkbox").forEach((a) => {
            a.nextSibling.addEventListener("click", function () {
                setTimeout(function () {
                    if (a.nextSibling.checked) {
                        let b = document.createElement("div");
                        b.classList.add("country-tag-template");
                        let f = document.createElement("div"), c = document.createElement("img"), d = a.nextSibling.nextSibling.nextSibling.innerHTML, g = a.nextSibling.nextSibling.src, h = document.createTextNode(d), e = document.createElement("div");
                        b.setAttribute("id", d),
                            e.setAttribute("checkbox", d),
                            c.setAttribute("src", g),
                            c.classList.add("dropdown-country-label"),
                            formEl.querySelector("#platform-labels-wrap").appendChild(b),
                            b.appendChild(c),
                            b.appendChild(f),
                            b.appendChild(e).classList.add("close-toggle"),
                            f.appendChild(h),
                            formEl.querySelector(".platform-validator-radio").click(),
                            e.addEventListener("click", function () {
                                a.click();
                            });
                        let i = formEl.querySelector("#platform-labels-wrap").children
                            .length;
                        i >= 1 &&
                            (formEl.querySelector("#platform-dropdown-title").style.display =
                                "none");
                    }
                    else {
                        let j = a.nextSibling.nextSibling.nextSibling.innerHTML;
                        formEl.querySelector(`#${j}`).remove(),
                            formEl.querySelector("#platform-labels-wrap").children.length <
                                1 &&
                                (formEl.querySelector("#platform-dropdown-title").style.display = "block");
                    }
                }, 100);
            });
        }),
        formEl.querySelectorAll(".country-fulfill-checkbox").forEach((a) => {
            a.nextSibling.addEventListener("click", function () {
                setTimeout(function () {
                    if (a.nextSibling.checked) {
                        let b = document.createElement("div");
                        b.classList.add("country-tag-template");
                        let f = document.createElement("div"), c = document.createElement("img"), d = a.nextSibling.nextSibling.nextSibling.innerHTML, g = a.nextSibling.nextSibling.src, h = document.createTextNode(d), e = document.createElement("div");
                        b.setAttribute("id", d.replace(/\s/g, "-")),
                            e.setAttribute("checkbox", d),
                            c.setAttribute("src", g),
                            c.classList.add("dropdown-country-label"),
                            formEl.querySelector("#countries-labels-wrap").appendChild(b),
                            b.appendChild(c),
                            b.appendChild(f),
                            b.appendChild(e).classList.add("close-toggle"),
                            f.appendChild(h),
                            formEl.querySelector(".country-validator-radio").click(),
                            e.addEventListener("click", function () {
                                (a.checked = !1), $(a).next().trigger("click");
                            });
                        let i = formEl.querySelector("#countries-labels-wrap").children
                            .length;
                        i >= 1 &&
                            (formEl.querySelector("#countries-dropdown-title").style.display =
                                "none");
                    }
                    else {
                        let j = a.nextSibling.nextSibling.nextSibling.innerHTML;
                        formEl
                            .querySelectorAll(`#${j.replace(/\s/g, "-")}`)
                            .forEach((a) => a.remove()),
                            formEl.querySelector("#countries-labels-wrap").children.length <
                                1 &&
                                (formEl.querySelector("#countries-dropdown-title").style.display = "block");
                    }
                }, 100);
            });
        });
    let c = formEl.querySelector(".shipping-checkbox");
    c.nextSibling.addEventListener("change", function () {
        setTimeout(function () {
            if (c.nextSibling.checked) {
                let a = formEl.querySelector("#range-slider-input");
                var b = $(formEl).find("#range-slider-input");
                b.attr("step", "100"), b.attr("min", "100");
                let f = "100";
                a.value = f;
                let d = a.value, e = (100 * d) / 5e4 + "%";
                (formEl.querySelector("span.slide").style.width = e),
                    (formEl.querySelector("#range-handler").style.marginLeft = e),
                    (formEl.querySelector("#demo").textContent = d),
                    console.log(a.value);
            }
        }, 100);
    });
    let a = formEl.querySelector("#range-slider-input");
    (c.nextSibling.checked = formEl
        .querySelector(".shipping-checkbox")
        .classList.contains("w--redirected-checked")),
        $(formEl).find(".rSlider span").css("width", "0.2%"),
        $(formEl).find("#range-handler").css("margin-left", "0.2%"),
        (a.value = "100");
    let g = () => {
        (formEl.querySelector(".shipping-checkbox").nextSibling.checked = !1),
            formEl
                .querySelector(".shipping-checkbox")
                .classList.remove("w--redirected-checked");
    };
    a.addEventListener("change", function () {
        formEl.querySelector("#range-slider-input").value <= 100 ||
            setTimeout(g, 100);
    }),
        a.addEventListener("input", function () {
            a.value <= 100 && ((a.value = "100"), $(a).trigger("change"));
        }),
        g();
    var h = $(formEl).find("#range-slider-input").attr("value");
    $(formEl).find("#demo").html(h),
        $(formEl)
            .find("#range-slider-input")
            .on("input change", function () {
            $(formEl).find("#demo").html($(this).val());
            var e = (100 * $(this).val()) / 5e4;
            formEl.querySelector("#range-handler"),
                $(formEl)
                    .find(".slide")
                    .css("width", e + "%"),
                $(formEl)
                    .find("#range-handler")
                    .css("margin-left", e + "%");
            var b, d = $(formEl).find("#order-slider"), a = d.val(), c = 0;
            a <= 200
                ? ((b = 100), (c = 100))
                : a >= 200 && a <= 1999
                    ? ((b = 100), (c = 0))
                    : a >= 2e3 && a <= 4999
                        ? ((b = 500), (c = 0))
                        : a >= 5e3 && ((b = 5e3), (c = 0)),
                d.attr("step", b),
                d.attr("min", c);
        }),
        setTimeout(function () {
            let a = formEl.querySelectorAll(".single-country");
            formEl
                .querySelectorAll(".multiple-country input")
                .forEach((a) => (a.checked = !1)),
                formEl
                    .querySelectorAll(".single-country input")
                    .forEach((a) => (a.checked = !1)),
                a.forEach((a) => {
                    let b = a.textContent.replace(/\s+/g, "-").toLowerCase();
                    function c() {
                        formEl
                            .querySelector("#single-country")
                            .firstChild.classList.remove("germany", "italy", "france", "united-kingdom", "spain"),
                            formEl
                                .querySelector("#single-country")
                                .firstChild.classList.add(b),
                            formEl.querySelectorAll(".multiple-country").forEach((a) => {
                                (a.style.display = "flex"),
                                    a.classList.contains(b) && (a.style.display = "none");
                            });
                    }
                    a.classList.add(b), a.addEventListener("click", c);
                });
        }, 500);
    var j = document.querySelector("#range-slider-input").value, i = document.getElementById("I-M-New-Not-Shipping");
    var ll = document.getElementById("order-slider");
    i.addEventListener("change", function () {
        $(".custom-number").text(j),
            $(".fs-rangeslider_fill").css("width", "0px"),
            $(".fs-rangeslider_handle").css("left", "0px");
        ll.value = 100;
    });
    var o = document.getElementById("range-slider-input");
    o.addEventListener("change", function () {
        setTimeout(function () {
            var l = document.getElementById("range-slider-input").value;
            if (l > 0 && l <= 200) {
                this.value = 100;
                ll.value = this.value;
                document.querySelectorAll(".custom-number").forEach((customNumber) => {
                    customNumber.innerText = this.value;
                });
            }
            if (l > 100 && l <= 200) {
                this.value = 200;
                ll.value = this.value;
                document.querySelectorAll(".custom-number").forEach((customNumber) => {
                    customNumber.innerText = this.value;
                });
            }
            if (l > 200 && l <= 300) {
                this.value = 300;
                ll.value = this.value;
                document.querySelectorAll(".custom-number").forEach((customNumber) => {
                    customNumber.innerText = this.value;
                });
            }
            if (l > 300 && l <= 400) {
                this.value = 400;
                ll.value = this.value;
                document.querySelectorAll(".custom-number").forEach((customNumber) => {
                    customNumber.innerText = this.value;
                });
            }
            if (l > 400 && l <= 500) {
                this.value = 500;
                ll.value = this.value;
                document.querySelectorAll(".custom-number").forEach((customNumber) => {
                    customNumber.innerText = this.value;
                });
            }
            if (l > 500 && l <= 600) {
                this.value = 600;
                ll.value = this.value;
                document.querySelectorAll(".custom-number").forEach((customNumber) => {
                    customNumber.innerText = this.value;
                });
            }
            if (l > 600 && l <= 700) {
                this.value = 700;
                ll.value = this.value;
                document.querySelectorAll(".custom-number").forEach((customNumber) => {
                    customNumber.innerText = this.value;
                });
            }
            if (l > 700 && l <= 800) {
                this.value = 800;
                ll.value = this.value;
                document.querySelectorAll(".custom-number").forEach((customNumber) => {
                    customNumber.innerText = this.value;
                });
            }
            if (l > 800 && l <= 900) {
                this.value = 900;
                ll.value = this.value;
                document.querySelectorAll(".custom-number").forEach((customNumber) => {
                    customNumber.innerText = this.value;
                });
            }
            if (l > 900 && l <= 1000) {
                this.value = 1000;
                ll.value = this.value;
                document.querySelectorAll(".custom-number").forEach((customNumber) => {
                    customNumber.innerText = this.value;
                });
            }
            if (l > 1000 && l <= 1100) {
                this.value = 1100;
                ll.value = this.value;
                document.querySelectorAll(".custom-number").forEach((customNumber) => {
                    customNumber.innerText = this.value;
                });
            }
            if (l > 1100 && l <= 1200) {
                this.value = 1200;
                ll.value = this.value;
                document.querySelectorAll(".custom-number").forEach((customNumber) => {
                    customNumber.innerText = this.value;
                });
            }
            if (l > 1200 && l <= 1300) {
                this.value = 1300;
                ll.value = this.value;
                document.querySelectorAll(".custom-number").forEach((customNumber) => {
                    customNumber.innerText = this.value;
                });
            }
            if (l > 1300 && l <= 1400) {
                this.value = 1400;
                ll.value = this.value;
                document.querySelectorAll(".custom-number").forEach((customNumber) => {
                    customNumber.innerText = this.value;
                });
            }
            if (l > 1400 && l <= 1500) {
                this.value = 1500;
                ll.value = this.value;
                document.querySelectorAll(".custom-number").forEach((customNumber) => {
                    customNumber.innerText = this.value;
                });
            }
            if (l > 1500 && l <= 1600) {
                this.value = 1600;
                ll.value = this.value;
                document.querySelectorAll(".custom-number").forEach((customNumber) => {
                    customNumber.innerText = this.value;
                });
            }
            if (l > 1600 && l <= 1700) {
                this.value = 1700;
                ll.value = this.value;
                document.querySelectorAll(".custom-number").forEach((customNumber) => {
                    customNumber.innerText = this.value;
                });
            }
            if (l > 1700 && l <= 1800) {
                this.value = 1800;
                ll.value = this.value;
                document.querySelectorAll(".custom-number").forEach((customNumber) => {
                    customNumber.innerText = this.value;
                });
            }
            if (l > 1800 && l <= 1900) {
                this.value = 1900;
                ll.value = this.value;
                document.querySelectorAll(".custom-number").forEach((customNumber) => {
                    customNumber.innerText = this.value;
                });
            }
            if (l > 1900 && l <= 2000) {
                this.value = 2000;
                ll.value = this.value;
                document.querySelectorAll(".custom-number").forEach((customNumber) => {
                    customNumber.innerText = this.value;
                });
            }
            if (l > 2000 && l <= 2500) {
                this.value = 2500;
                ll.value = this.value;
                document.querySelectorAll(".custom-number").forEach((customNumber) => {
                    customNumber.innerText = this.value;
                });
            }
            if (l > 2500 && l <= 3000) {
                this.value = 3000;
                ll.value = this.value;
                document.querySelectorAll(".custom-number").forEach((customNumber) => {
                    customNumber.innerText = this.value;
                });
            }
            if (l > 3000 && l <= 3500) {
                this.value = 3500;
                ll.value = this.value;
                document.querySelectorAll(".custom-number").forEach((customNumber) => {
                    customNumber.innerText = this.value;
                });
            }
            if (l > 3500 && l <= 4000) {
                this.value = 4000;
                ll.value = this.value;
                document.querySelectorAll(".custom-number").forEach((customNumber) => {
                    customNumber.innerText = this.value;
                });
            }
            if (l > 4000 && l <= 4500) {
                this.value = 4500;
                ll.value = this.value;
                document.querySelectorAll(".custom-number").forEach((customNumber) => {
                    customNumber.innerText = this.value;
                });
            }
            if (l > 4500 && l <= 5000) {
                this.value = 5000;
                ll.value = this.value;
                document.querySelectorAll(".custom-number").forEach((customNumber) => {
                    customNumber.innerText = this.value;
                });
            }
            if (l > 5000 && l <= 10000) {
                this.value = 10000;
                ll.value = this.value;
                document.querySelectorAll(".custom-number").forEach((customNumber) => {
                    customNumber.innerText = this.value;
                });
            }
            if (l > 10000 && l <= 15000) {
                this.value = 15000;
                ll.value = this.value;
                document.querySelectorAll(".custom-number").forEach((customNumber) => {
                    customNumber.innerText = this.value;
                });
            }
            if (l > 15000 && l <= 20000) {
                this.value = 20000;
                ll.value = this.value;
                document.querySelectorAll(".custom-number").forEach((customNumber) => {
                    customNumber.innerText = this.value;
                });
            }
            if (l > 20000 && l <= 25000) {
                this.value = 25000;
                ll.value = this.value;
                document.querySelectorAll(".custom-number").forEach((customNumber) => {
                    customNumber.innerText = this.value;
                });
            }
            if (l > 25000 && l <= 30000) {
                this.value = 30000;
                ll.value = this.value;
                document.querySelectorAll(".custom-number").forEach((customNumber) => {
                    customNumber.innerText = this.value;
                });
            }
            if (l > 30000 && l <= 35000) {
                this.value = 35000;
                ll.value = this.value;
                document.querySelectorAll(".custom-number").forEach((customNumber) => {
                    customNumber.innerText = this.value;
                });
            }
            if (l > 35000 && l <= 40000) {
                this.value = 40000;
                ll.value = this.value;
                document.querySelectorAll(".custom-number").forEach((customNumber) => {
                    customNumber.innerText = this.value;
                });
            }
            if (l > 40000 && l <= 45000) {
                this.value = 45000;
                ll.value = this.value;
                document.querySelectorAll(".custom-number").forEach((customNumber) => {
                    customNumber.innerText = this.value;
                });
            }
            if (l > 45000 && l <= 50000) {
                this.value = 50000;
                ll.value = this.value;
                document.querySelectorAll(".custom-number").forEach((customNumber) => {
                    customNumber.innerText = this.value;
                });
            }
        }, 50);
    });
}
