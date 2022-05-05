const maps = {
  download: "mac-download",
  list: "mac-dropdown-list",
  toggle: "mac-toggle",
  dropdown: "mac-dropdown",
  hash: "machash",
  data: {
    Prod: {
      version: "5.6.8.0",
      downloadUrls: {
        macos:
          "https://upwork-usw2-desktopapp.upwork.com/binaries/v5_6_8_0_836f43f6f6be4149/Upwork.dmg",
      },
      compatibility: {
        recommended: "Works on OS X 10.11 and higher.",
        supported:
          "Upwork provides support for OS X 10.14 and all later versions.",
      },
    },
    Beta: {
      version: "5.6.8.0",
      downloadUrls: {
        macos:
          "https://upwork-usw2-desktopapp.upwork.com/binaries/v5_6_8_0_836f43f6f6be4149/Upwork.dmg",
      },
      compatibility: {
        recommended: "Works on OS X 10.11 and higher.",
        supported:
          "Upwork provides support for OS X 10.14 and all later versions.",
      },
    },
    Alpha: {
      version: "5.6.8.0",
      downloadUrls: {
        macos:
          "https://upwork-usw2-desktopapp.upwork.com/binaries/v5_6_8_0_836f43f6f6be4149/Upwork.dmg",
      },
      compatibility: {
        recommended: "Works on OS X 10.11 and higher.",
        supported:
          "Upwork provides support for OS X 10.14 and all later versions.",
      },
    },
    Pre_Alpha: {
      version: "5.6.8.0",
      downloadUrls: {
        macos:
          "https://upwork-usw2-desktopapp.upwork.com/binaries/v5_6_8_0_836f43f6f6be4149/Upwork.dmg",
      },
      compatibility: {
        recommended: "Works on OS X 10.11 and higher.",
        supported:
          "Upwork provides support for OS X 10.14 and all later versions.",
      },
    },
    UTA_Test: {
      version: "5.6.8.0",
      downloadUrls: {
        macos:
          "https://upwork-usw2-desktopapp.upwork.com/binaries/v5_6_8_0_836f43f6f6be4149/Upwork.dmg",
      },
      compatibility: {
        recommended: "Works on OS X 10.11 and higher.",
        supported:
          "Upwork provides support for OS X 10.14 and all later versions.",
      },
    },
    UTA_5_2: {
      version: "5.2.3.771",
      downloadUrls: {
        macos:
          "https://upwork-usw2-desktopapp.upwork.com/binaries/v5_2_3_771_okk32anbjc976nah/Upwork.dmg",
      },
      compatibility: {
        recommended: "Works on OS X 10.11 and higher.",
        supported:
          "Upwork provides support for OS X 10.14 and all later versions.",
      },
    },
  },
};

const checkLogin = () => {
  fetch("/i/api/logged-in/")
    .then((r) => r.json())
    .then((data) => {
      if (data) {
        // User is logged in, change buttons here
        $(".logged-in").css("display", "block");
        $(".logged-out").css("display", "none");
      } else {
        $(".logged-in").css("display", "none");
        $(".logged-out").css("display", "block");
      }
    });
};

const isDigit = (letter) => {
  return letter.length === 1 && letter.match(/[0-9]/i);
};

const transformVersion = (str = "") => {
  let res = str
    .split("-")
    .map((bit) =>
      isDigit(bit[0])
        ? bit.toUpperCase()
        : bit.length > 1
        ? bit[0].toUpperCase() + bit.substring(1)
        : bit.toUpperCase()
    )
    .join("-");

  res = res.replace("Macos", "MacOS");

  return res;
};

const sha256 = async (message) => {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return hashHex;
};

const getDropdownList = () => {
  return new Promise(async (res, rej) => {
    const { data } = maps;

    const downloadUrls = [];
    for (const version of ["Prod", "Beta"]) {
      for (const key of Object.keys(data[version]["downloadUrls"])) {
        const downloadLink = data[version]["downloadUrls"][key];
        downloadUrls.push({
          version:
            transformVersion(key) +
            (version !== "Prod" ? ` - Beta Version` : ""),
          link: downloadLink,
          sha256: "SHA256: " + (await sha256(downloadLink)),
        });
      }
    }

    res(downloadUrls);
  });
};

window.addEventListener("load", async () => {
  checkLogin();

  try {
    // fetching dropdown items
    const dropdownList = await getDropdownList();
    const dropdownEl = document.getElementById(maps["dropdown"]);
    const toggleEl = document.getElementById(maps["toggle"]);
    const selectEl = document.getElementById(maps["list"]);

    for (const dropdownOption of dropdownList) {
      const { version, link, sha256 } = dropdownOption;

      const optionEl = document.createElement("a");
      optionEl.classList.add("dropdown-download-link");
      optionEl.classList.add("w-dropdown-link");
      optionEl.setAttribute("href", "#");
      optionEl.setAttribute("tabindex", "0");
      optionEl.textContent = version;

      optionEl.addEventListener("click", () => {
        $(`#${maps["download"]}`).attr("href", link);

        dropdownEl.style.removeProperty("z-index");
        selectEl.classList.remove("w--open");
        document.getElementById(maps["hash"]).textContent = sha256;
        toggleEl.classList.remove("w--open");
        toggleEl.setAttribute("aria-expanded", "false");
        toggleEl.querySelector(
          `#${maps["toggle"]} div:last-child`
        ).textContent = version;
      });

      selectEl.append(optionEl);
    }
  } catch (error) {
    console.error(error);
  }
});
