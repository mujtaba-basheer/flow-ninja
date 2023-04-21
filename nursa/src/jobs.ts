// @ts-nocheck

// Define a function to determine which state a point falls within
function getStateFromLatLng(latitude, longitude) {
  // Create a GeoJSON point object from the latitude and longitude
  const point = {
    type: "Point",
    coordinates: [longitude, latitude],
  };

  // Check each state boundary to see if the point falls within it
  for (let i = 0; i < stateBoundaries.features.length; i++) {
    const state = stateBoundaries.features[i];
    const polygon = state.geometry.coordinates;
    if (isPointInPolygon(point, polygon)) {
      return state.properties.NAME;
    }
  }

  // If the point is not within any state, return null
  return null;
}

// Define a function to check if a point falls within a polygon
function isPointInPolygon(point, polygon) {
  let isInside = false;
  const [x, y] = point.coordinates;
  for (let l = 0; l < polygon.length; l++) {
    for (let i = 0, j = polygon[l].length - 1; i < polygon[l].length; j = i++) {
      const [xi, yi] = polygon[l][i];
      const [xj, yj] = polygon[l][j];
      const intersect =
        yi > y != yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
      if (intersect) isInside = !isInside;
    }
  }
  return isInside;
}

const searchInputFacilty = document.getElementById("fac-filter");
const searchInputSpeciality = document.getElementById("specialty-filter");
const searchInputCity = document.getElementById("city-filter");
const searchInputState = document.getElementById("state-filter");
let timeoutId;
var dubTrigger = 0;

searchInputFacilty.addEventListener("input", async function () {
  const searchValue = this.value.toLowerCase();

  clearTimeout(timeoutId);
  timeoutId = setTimeout(async function () {
    let itemsFacility = document.querySelectorAll(".facility-checkbox-text");
    for (let i = 0; i < itemsFacility.length; i++) {
      const item = itemsFacility[i];
      const text = item.textContent.toLowerCase();
      if (text.includes(searchValue)) {
        item.parentElement.parentElement.style.display = "";
      } else {
        item.parentElement.parentElement.style.display = "none";
      }
    }
  }, 500);
});

searchInputSpeciality.addEventListener("input", async function () {
  const searchValue = this.value.toLowerCase();

  clearTimeout(timeoutId);
  timeoutId = setTimeout(async function () {
    let itemsSpeciality = document.querySelectorAll(
      ".speciality-checkbox-text"
    );
    for (let i = 0; i < itemsSpeciality.length; i++) {
      const item = itemsSpeciality[i];
      const text = item.textContent.toLowerCase();
      if (text.includes(searchValue)) {
        item.parentElement.parentElement.style.display = "";
      } else {
        item.parentElement.parentElement.style.display = "none";
      }
    }
  }, 500);
});

searchInputCity.addEventListener("input", async function () {
  const searchValue = this.value.toLowerCase();

  clearTimeout(timeoutId);
  timeoutId = setTimeout(async function () {
    let itemsCity = document.querySelectorAll(".city-checkbox-text");
    for (let i = 0; i < itemsCity.length; i++) {
      const item = itemsCity[i];
      const text = item.textContent.toLowerCase();
      if (text.includes(searchValue)) {
        item.parentElement.parentElement.style.display = "";
      } else {
        item.parentElement.parentElement.style.display = "none";
      }
    }
  }, 500);
});

searchInputState.addEventListener("input", async function () {
  const searchValue = this.value.toLowerCase();

  clearTimeout(timeoutId);
  timeoutId = setTimeout(async function () {
    let itemsState = document.querySelectorAll(".state-checkbox-text");
    for (let i = 0; i < itemsState.length; i++) {
      const item = itemsState[i];
      const text = item.textContent.toLowerCase();
      if (text.includes(searchValue)) {
        item.parentElement.parentElement.style.display = "";
      } else {
        item.parentElement.parentElement.style.display = "none";
      }
    }
  }, 500);
});

function distance(lat1, lon1, lat2, lon2, unit) {
  const R = unit === "K" ? 6371 : unit === "N" ? 3440.06 : 3958.8;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;
  return d;
}

function calcPosition(positon) {
  pos = positon.coords;
  for (let i = 0; i < lats.length; i++) {
    dist[i].innerText = distance(
      parseFloat(lats[i].innerText),
      parseFloat(longs[i].innerText),
      pos.latitude,
      pos.longitude,
      "M"
    ).toFixed(2);
  }
}

function showError(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      console.log("User denied the request for Geolocation.");
      break;
    case error.POSITION_UNAVAILABLE:
      console.log("Location information is unavailable.");
      break;
    case error.TIMEOUT:
      console.log("The request to get user location timed out.");
      break;
    case error.UNKNOWN_ERROR:
      console.log("An unknown error occurred.");
      break;
  }
}

var lats = document.querySelectorAll(".latitude");
var longs = document.querySelectorAll(".longitude");
var dist = document.querySelectorAll(".distance");
var pos;

var facilities = document.getElementById("facilities-list").childNodes;
var cities = document.getElementById("city-list").childNodes;
var states = document.getElementById("state-list").childNodes;
var specialty = document.getElementById("specialty-list").childNodes;
var licence = document.getElementById("licence-list").childNodes;
var input = document.getElementById("field");
var fakeSubmit = document.getElementById("fake-submit");

fakeSubmit.addEventListener("click", function (e) {
  let facilitiesText = "";
  facilities.forEach((item) => {
    if (item.firstChild.firstChild.nextSibling.checked) {
      facilitiesText +=
        item.firstChild.firstChild.nextSibling.nextSibling.innerText + ", ";
    }
  });
  if (facilitiesText !== "") {
    facilitiesText = facilitiesText.slice(0, -2);
  }

  let citiesText = "";
  cities.forEach((item) => {
    if (item.firstChild.firstChild.nextSibling.checked) {
      citiesText +=
        item.firstChild.firstChild.nextSibling.nextSibling.innerText + ", ";
    }
  });
  if (citiesText !== "") {
    citiesText = citiesText.slice(0, -2);
  }

  let statesText = "";
  states.forEach((item) => {
    if (item.firstChild.firstChild.nextSibling.checked) {
      statesText +=
        item.firstChild.firstChild.nextSibling.nextSibling.innerText + ", ";
    }
  });
  if (statesText !== "") {
    statesText = statesText.slice(0, -2);
  }

  let specialtyText = "";
  specialty.forEach((item) => {
    if (item.firstChild.firstChild.nextSibling.checked) {
      specialtyText +=
        item.firstChild.firstChild.nextSibling.nextSibling.innerText + ", ";
    }
  });
  if (specialtyText !== "") {
    specialtyText = specialtyText.slice(0, -2);
  }

  let licenceText = "";
  licence.forEach((item) => {
    if (item.firstChild.firstChild.nextSibling.checked) {
      licenceText +=
        item.firstChild.firstChild.nextSibling.nextSibling.innerText + ", ";
    }
  });
  if (licenceText !== "") {
    licenceText = licenceText.slice(0, -2);
  }

  document.getElementById("licence-empty").value = licenceText;
  document.getElementById("city-empty").value = citiesText;
  document.getElementById("state-empty").value = statesText;
  document.getElementById("facility-empty").value = facilitiesText;
  document.getElementById("speciality-empty").value = specialtyText;
  document.getElementById("input-empty").value = input.value;

  document.getElementById("submit").click();
});

//pagination feature

//load

var tagTemplate = document.getElementById("tag-template").cloneNode(true);
document.getElementById("tag-template").remove();
var nextButtons = document.querySelectorAll("[fn-load=custom-next-fetch]");
nextButtons = [...nextButtons];
var pageCountElem = document.querySelectorAll("[fn-load=page-count-fetch]");
var url = window.location.origin + window.location.pathname;
var emptyBlock = document.querySelector("[fn-filter=empty]");
var items = [];
var activeStates = [];
var activeCities = [];
var activeFacilities = [];
var checkedStates = [];
var checkedCities = [];
var checkedFacilities = [];
var activeLicence = [];
var activeSpecialty = [];
var shownCities = [];
var shownFacilities = [];
var shownJobs = [];
var activeTags = [];
var inputValue = [];
var boundLoaded = false;
var activeInputTag = "";
var activeSort = "";
var resetAll = document.querySelector("[fn-filter=reset]");
const emptyCity = document.querySelector(".empty-select-text.city");
const emptyFacility = document.querySelector(".empty-select-text.facility");
const showCity = document.querySelector(".show-select-list.city");
const showFacility = document.querySelector(".show-select-list.facility");
const arrayMap = {
  0: shownCities,
  1: shownFacilities,
  2: shownJobs,
};
var loadLists = document.querySelectorAll("[fn-load=load-filter-list]");
var tagWrapper = document.getElementById("filter-tag-wrapper");
var currentEvent;

function sortArray(attribute, array, isDescending) {
  array.sort((a, b) => {
    if (attribute.includes("date")) {
      const aSortValue = a.querySelector(`[fn-sort=${attribute}]`).innerText;
      const bSortValue = b.querySelector(`[fn-sort=${attribute}]`).innerText;

      const dateA = new Date(aSortValue);
      const dateB = new Date(bSortValue);

      return dateA - dateB;
    } else {
      const aSortValue = parseFloat(
        a.querySelector(`[fn-sort=${attribute}]`).innerText
      );
      const bSortValue = parseFloat(
        b.querySelector(`[fn-sort=${attribute}]`).innerText
      );
      return aSortValue - bSortValue;
    }
  });

  if (isDescending) {
    array.reverse();
  }

  return array;
}

function removeTag(e) {
  let ttr;
  if (e.classList.contains("fromField")) {
    ttr = e.innerText;
    let tagToRemove = activeTags.filter((string) => string == ttr);
    activeTags = activeTags.filter((string) => string !== ttr);
    if (tagToRemove.length !== 0 && currentEvent == "x click") {
      inputValue = "";
      activeInputTag = null;
      input.value = null;
    }
  } else {
    ttr = e.innerText;
    let tagToRemove = activeTags.filter((string) => string.innerText == ttr);
    activeTags = activeTags.filter((string) => string.innerText !== ttr);
    if (tagToRemove.length !== 0) {
      tagToRemove[0].click();
    }
  }
}

function updateTags() {
  document.querySelectorAll(".filter-tag").forEach((tag) => {
    tag.remove();
  });
  activeTags.forEach((tag) => {
    let tagClone = tagTemplate.cloneNode(true);
    if (typeof tag === "string") {
      tagClone.firstChild.innerText = tag;
      tagClone.classList.add("fromField");
      activeInputTag = tagClone;
    } else {
      tagClone.firstChild.innerText = tag.innerText;
    }
    if (tag !== "") {
      tagWrapper.appendChild(tagClone);
      tagClone.firstChild.nextSibling.addEventListener("click", (e) => {
        currentEvent = "x click";
        removeTag(tagClone);
        if (typeof tag === "string") {
          updateTags();
          jobsFilter();
        }
      });
    }
  });
}

function activeJobsFilter(arrays) {
  let count = 0;
  for (let i = 0; i < arrays.length; i++) {
    if (arrays[i].length > 0) {
      count++;
    }
  }
  return count;
}

function addShownJobs() {
  if (shownJobs.length !== 0) {
    emptyBlock.style.display = "none";
    for (let i = 0; i < shownJobs.length; i++) {
      loadLists[2].appendChild(shownJobs[i]);
    }
  } else {
    emptyBlock.style.display = "flex";
  }
}

function addAllJobs() {
  emptyBlock.style.display = "none";
  for (let i = 0; i < items[2].length; i++) {
    loadLists[2].appendChild(items[2][i]);
  }
}

function jobsPagination() {
  console.log("jobs need to be paginated");
}

function inputSearch(v) {
  inputValue = [];
  if (v !== "") {
    inputValue.push(v);
  }
  jobsFilter();
}

function jobsFilter() {
  loadLists[2].innerHTML = "";
  shownJobs = [];

  const activeFilters = new Set([
    ...activeStates,
    ...activeCities,
    ...activeFacilities,
    ...activeLicence,
    ...activeSpecialty,
    ...inputValue,
  ]);

  let count = activeJobsFilter([
    activeLicence,
    activeSpecialty,
    activeStates,
    activeCities,
    activeFacilities,
    inputValue,
  ]);

  items[2].forEach((item) => {
    let filterCount = 0;
    const filterTargets = item.querySelectorAll("[fn-filter-target]");
    filterTargets.forEach((t) => {
      const targetValue = t.innerText.toLowerCase();
      if (activeFilters.has(targetValue)) {
        filterCount++;
      } else {
        let tempFil = [...activeFilters];
        if (
          targetValue.includes(tempFil[tempFil.length - 1]) &&
          targetValue.length > 1
        ) {
          filterCount++;
        }
      }
    });
    if (filterCount >= count) {
      shownJobs.push(item);
    } else {
      const index = shownJobs.indexOf(item);
      if (index !== -1) {
        shownJobs.splice(index, 1);
      }
    }
  });

  if (!shownJobs.length && !count) {
    if (activeSort == "") {
      addAllJobs();
    } else {
      const isDescending = activeSort.includes("-desc");
      const sortAttribute = isDescending ? activeSort.slice(0, -5) : attribute;
      items[2] = sortArray(sortAttribute, items[2], isDescending);
      addAllJobs();
    }
  } else {
    if (activeSort == "") {
      addShownJobs();
    } else {
      const isDescending = activeSort.includes("-desc");
      const sortAttribute = isDescending ? activeSort.slice(0, -5) : attribute;
      shownJobs = sortArray(sortAttribute, shownJobs, isDescending);
      addShownJobs();
    }
  }
  updateTags();
  jobsPagination();
}

function noFilters() {
  items.forEach((arr, index) => {
    if (index !== 2) {
      loadLists[index].innerHTML = "";
      for (let i = 0; i < 1000; i++) {
        loadLists[index].appendChild(arr[i]);
      }
    } else {
      jobsFilter();
    }
  });
}

function addItems() {
  items.slice(0, 2).forEach((arr, index) => {
    const loadList = loadLists[index];
    const shownItems = index === 0 ? shownCities : shownFacilities;
    loadList.innerHTML = "";
    shownItems.forEach((a) => {
      loadList.appendChild(a);
    });
  });

  loadLists[2].innerHTML = "";
  jobsFilter();
}

function multiSelectCheck() {
  let multiFlag = 0;
  if (activeStates.length > 0) {
    multiFlag++;
  }
  if (activeCities.length > 0) {
    multiFlag++;
  }
  if (activeFacilities.length > 0) {
    multiFlag++;
  }
  if (multiFlag > 1) {
    return true;
  } else {
    return false;
  }
}

async function fnFilter() {
  //console.log("started fnFilter function");
  items.forEach((arr) => {
    arr.forEach((item) => {
      let filterFlag = 0;
      let anyFilterFlag = 0;
      const targetArray = arrayMap[items.indexOf(arr)];
      let filterTargets = item.querySelectorAll("[fn-filter-target]");
      const arrayName =
        items.indexOf(arr) === 0
          ? "shownCities"
          : items.indexOf(arr) === 1
          ? "shownFacilities"
          : "shownJobs";
      filterTargets.forEach((t) => {
        const targetValue = t.innerText.toLowerCase();
        if (
          activeStates.includes(targetValue) ||
          activeCities.includes(targetValue) ||
          activeFacilities.includes(targetValue)
        ) {
          filterFlag++;
        }
      });
      if (arrayName !== "shownJobs") {
        if (multiSelectCheck()) {
          if (filterFlag - 1 == items.indexOf(arr)) {
            window[arrayName].push(item);
          } else {
            window[arrayName] = window[arrayName].filter(
              (string) => string !== item
            );
          }
        } else {
          if (filterFlag !== 0) {
            window[arrayName].push(item);
          } else {
            window[arrayName] = window[arrayName].filter(
              (string) => string !== item
            );
          }
        }
      }
    });
  });
  addItems();
  //console.log("finished fnFilter function");
}

async function fnFiltersAdd(e) {
  const filterType = e.getAttribute("fn-filter-filter");
  const filterText = e.innerText.toLowerCase();
  const isChecked = e.firstChild.nextElementSibling.checked;

  if (!isChecked) {
    activeTags.push(e);
  } else {
    activeTags = activeTags.filter((tag) => tag !== e);
  }

  switch (filterType) {
    case "state":
      if (!isChecked) {
        activeStates.push(filterText);
      } else {
        activeStates = activeStates.filter((string) => string !== filterText);
      }
      break;
    case "city":
      if (!isChecked) {
        activeCities.push(filterText);
      } else {
        activeCities = activeCities.filter((string) => string !== filterText);
      }
      break;
    case "facility":
      if (!isChecked) {
        activeFacilities.push(filterText);
      } else {
        activeFacilities = activeFacilities.filter(
          (string) => string !== filterText
        );
      }
      break;
    default:
      break;
  }

  if (
    activeStates.length === 0 &&
    activeCities.length === 0 &&
    activeFacilities.length === 0
  ) {
    noFilters();
  } else {
    fnFilter();
  }

  if (activeStates.length == 0) {
    emptyCity.style.display = "block";
    emptyFacility.style.display = "block";
    showCity.style.display = "none";
    showFacility.style.display = "none";
  } else {
    emptyCity.style.display = "none";
    showCity.style.display = "block";
    if (activeCities.length == 0) {
      emptyFacility.style.display = "block";
      showFacility.style.display = "none";
    } else {
      emptyFacility.style.display = "none";
      showFacility.style.display = "block";
    }
  }

  // Reset double trigger fix
  dubTrigger = 1;
}

function allPromisesFinished() {
  document.querySelectorAll(".loaders").forEach((loader) => {
    loader.remove();
  });
  items.forEach((arr) => {
    arr.forEach((item) => {
      if (item.querySelector("[fn-filter-filter]")) {
        let filterCheckbox = item.querySelector("[fn-filter-filter]");
        filterCheckbox.addEventListener("click", () => {
          if (dubTrigger == 0) {
            fnFiltersAdd(filterCheckbox);
          } else {
            dubTrigger = 0;
          }
        });
      }
    });
  });

  if (!localStorage.getItem("items")) {
    localStorage.setItem("items", JSON.stringify(items));
  }
  console.log("All promises finished");
}

function fetchJobs() {
  var currentUrl = window.location.href;
  if (currentUrl.indexOf("_page") == -1) {
    nextButtons.forEach((item) => {
      var tempItems = [...item.parentElement.previousSibling.childNodes];
      let pageCount = parseInt(
        pageCountElem[nextButtons.indexOf(item)].innerText.split(" / ")[1]
      );
      let href = item.href.split("?")[1].split("_page")[0];
      const promises = [];

      for (let i = 2; i < pageCount + 1; i++) {
        const promise = fetch(`${url}?${href}_page=${i}`)
          .then((response) => {
            if (response.ok) {
              return response.text();
            } else {
              throw new Error("Response not OK");
            }
          })
          .then((data) => {
            var parser = new DOMParser();
            var doc = parser.parseFromString(data, "text/html");
            let tempList = doc.querySelectorAll("[fn-load=load-filter-list]");
            if (tempList[nextButtons.indexOf(item)]) {
              var newItems = [
                ...tempList[nextButtons.indexOf(item)].childNodes,
              ];
              tempItems = [...tempItems, ...newItems];

              // Store the fetched page in indexedDB
              const pageUrl = `${url}?${href}_page=${i}`;
              const pageContent = data;
              //storePageInDB(pageUrl, pageContent);
            } else {
              console.log("fetch error");
            }
          })
          .catch((error) => {
            console.log(error);
          });

        promises.push(promise);
      }
      Promise.all(promises).then(() => {
        items[parseInt(item.getAttribute("fn-load-place"))] = tempItems;
        console.log("items loaded");
        // Check if all promises are finished
        if (
          nextButtons.every(
            (button) => items[parseInt(button.getAttribute("fn-load-place"))]
          )
        ) {
          allPromisesFinished();
        }
      });
    });
  }
}

// function storePageInDB(url, content) {
//   const dbPromise = indexedDB.open("pagesDB", 1);

//   dbPromise.onupgradeneeded = function(event) {
//     const db = event.target.result;
//     db.createObjectStore("pages", { keyPath: "url" });
//   };

//   dbPromise.onsuccess = function(event) {
//     const db = event.target.result;
//     const tx = db.transaction("pages", "readwrite");
//     const store = tx.objectStore("pages");
//     const page = { url: url, content: content };
//     store.put(page);
//     tx.oncomplete = function() {
//       console.log(`Page ${url} stored in indexedDB`);
//     };
//   };

//   dbPromise.onerror = function(event) {
//     console.log("Error opening indexedDB");
//   };
// }

document.querySelectorAll(".state-checkbox").forEach((item) => {
  item.addEventListener("click", () => {
    if (dubTrigger == 0) {
      fnFiltersAdd(item);
    } else {
      dubTrigger = 0;
    }
  });
});

document.querySelectorAll(".licence-checkbox").forEach((item) => {
  item.addEventListener("click", () => {
    if (dubTrigger == 0) {
      if (!item.firstChild.nextElementSibling.checked) {
        activeLicence.push(item.innerText.toLowerCase());
        activeTags.push(item);
      } else {
        activeLicence = activeLicence.filter(
          (string) => string !== item.innerText.toLowerCase()
        );
        activeTags = activeTags.filter((tag) => tag !== item);
      }
      dubTrigger = 1;
      jobsFilter();
    } else {
      dubTrigger = 0;
    }
  });
});

document.querySelectorAll(".specialty-checkbox").forEach((item) => {
  item.addEventListener("click", () => {
    if (dubTrigger == 0) {
      if (!item.firstChild.nextElementSibling.checked) {
        activeSpecialty.push(item.innerText.toLowerCase());
        activeTags.push(item);
      } else {
        activeSpecialty = activeSpecialty.filter(
          (string) => string !== item.innerText.toLowerCase()
        );
        activeTags = activeTags.filter((tag) => tag !== item);
      }
      dubTrigger = 1;
      jobsFilter();
    } else {
      dubTrigger = 0;
    }
  });
});

var input = document.getElementById("field");
input.addEventListener("input", async function (event) {
  const searchValue = this.value.toLowerCase();
  currentEvent = "input";
  clearTimeout(timeoutId);
  timeoutId = setTimeout(async function () {
    //console.log(searchValue)
    if (activeInputTag) {
      removeTag(activeInputTag);
    }
    inputSearch(searchValue);
    activeTags.push(input.value);
    updateTags();
  }, 500);
});

window.addEventListener(
  "click",
  () => {
    fetchJobs();
  },
  { once: true }
);

document.querySelectorAll("[fn-geolocation=trigger]").forEach((item) => {
  item.addEventListener(
    "click",
    () => {
      navigator.geolocation.getCurrentPosition(calcPosition, showError);
      const script = document.createElement("script");
      script.src =
        "https://storage.googleapis.com/flow-ninja/nursa-states-coordinates.js";
      script.defer = true;
      document.body.appendChild(script);
      boundLoaded = true;
    },
    { once: true }
  );
});

//sorting

const sortButtons = document.querySelectorAll("[fn-sort-trigger]");
sortButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const attribute = button.getAttribute("fn-sort-trigger");
    const isDescending = attribute.includes("-desc");
    const sortAttribute = isDescending ? attribute.slice(0, -5) : attribute;
    activeSort = attribute;
    if (shownJobs.length == 0) {
      items[2] = sortArray(sortAttribute, items[2], isDescending);
      addAllJobs();
    } else {
      shownJobs = sortArray(sortAttribute, shownJobs, isDescending);
      addShownJobs();
    }

    //console.log(sortedArray);
  });
});

//empty state
emptyBlock.style.display = "none";

//reset all
resetAll.addEventListener("click", () => {
  activeTags.forEach((tag) => {
    if (typeof tag !== "string") {
      tag.click();
    } else {
      document
        .querySelector(".filter-tag.fromField")
        .firstChild.nextSibling.click();
    }
  });
});
