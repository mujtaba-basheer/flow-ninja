type AttributesT = {
  list: string[];
  set: Set<string>;
};
type ItemT = {
  all_regions: AttributesT;
  all_payment_types: AttributesT;
  all_consumer_countries: AttributesT;
  element: HTMLDivElement;
};
type DropdownValuesT = {
  selected: string[];
  unselected: string[];
  all: string[];
};
type DropdownStateT = {
  values: DropdownValuesT;
  isFirstRender: boolean;
};
type StateT = {
  items: ItemT[];
  filteredItems: ItemT[];
  filters: {
    [label: string]: string[];
  };
  dropdowns: {
    [label: string]: DropdownStateT;
  };
};

window.addEventListener("load", () => {
  const state: StateT = {
    items: [],
    filteredItems: [],
    filters: {
      regions: [],
      types: [],
      countries: [],
    },
    dropdowns: {
      regions: {
        values: {
          selected: [],
          unselected: [],
          all: [],
        },
        isFirstRender: true,
      },
      types: {
        values: {
          selected: [],
          unselected: [],
          all: [],
        },
        isFirstRender: true,
      },
      countries: {
        values: {
          selected: [],
          unselected: [],
          all: [],
        },
        isFirstRender: true,
      },
    },
  };

  const populateDropdowns = async () => {
    try {
      const applyObserver = (tag: string) => {
        const target = document.getElementById(`${tag}-list`);
        if (target) {
          const callback: MutationCallback = (mutations) => {
            for (const mutation of mutations) {
              const element = mutation.target as HTMLDivElement;
              const isOpen = element.classList.contains("w--open");
              if (!isOpen) renderOptions(tag);
            }
          };
          const options: MutationObserverInit = {
            attributeFilter: ["class"],
            childList: false,
          };
          const observer = new MutationObserver(callback);
          observer.observe(target, options);
        }
      };

      const onChange = (tag: string) => {
        const {
          values: { selected },
        } = state.dropdowns[tag] as DropdownStateT;
        state.filters[tag] = selected.map((s) => s.toLowerCase());
        const navEl = document.getElementById(`${tag}-list`) as HTMLElement;

        const numSelected = selected.length;

        try {
          const toggleWrapper = document.getElementById(
            `${tag}-toggle`
          ) as HTMLDivElement;
          const labelEl = toggleWrapper.querySelector<HTMLDivElement>(
            ".filter-toggle-text"
          );
          const selectionEl = toggleWrapper.querySelector<HTMLDivElement>(
            ".filter-selected-text"
          );

          if (labelEl && selectionEl) {
            switch (numSelected) {
              case 0: {
                labelEl.classList.remove("active-toggle");
                selectionEl.textContent = "";
                selectionEl.classList.remove("active");
                break;
              }
              case 1: {
                labelEl.classList.add("active-toggle");
                // selectionEl.textContent = selectedEls.item(0).textContent;
                selectionEl.textContent = selected[0];
                selectionEl.classList.add("active");
                break;
              }
              default: {
                labelEl.classList.add("active-toggle");
                selectionEl.textContent = `${numSelected} Selections`;
                selectionEl.classList.add("active");
                break;
              }
            }
          }

          filterItems();

          if (tag === "types") {
            const countriesToDisplay: Set<string> = new Set<string>();
            const types = state.filters[tag];
            if (types.length) {
              for (const item of state.items) {
                let hasType = false;
                for (const type of types) {
                  if (item.all_payment_types.set.has(type)) {
                    hasType = true;
                    break;
                  }
                }
                if (hasType) {
                  item.all_consumer_countries.list.forEach((c) =>
                    countriesToDisplay.add(c)
                  );
                }
              }

              state.dropdowns["countries"].values.unselected =
                Array.from(countriesToDisplay);
              renderOptions("countries");
            } else {
              state.dropdowns["countries"].values.unselected = [
                ...state.dropdowns["countries"].values.all,
              ];
              renderOptions("countries");
            }
          }
        } catch (error) {
          console.error(error);
        }
      };

      const renderOptions = (tag: string) => {
        const navEl = document.getElementById(`${tag}-list`) as HTMLElement;
        const { values } = state.dropdowns[tag] as DropdownStateT;

        const { selected, unselected, all } = values;

        navEl.querySelectorAll("a").forEach((aEl) => aEl.remove());

        for (let i = 0; i < all.length; i++) {
          const value = all[i];
          const itemEl = document.createElement("a");
          itemEl.className = "filter-dropdown-link w-inline-block";
          itemEl.href = "#";
          itemEl.tabIndex = i;

          {
            const textEl = document.createElement("div");
            textEl.textContent = value;

            const closeEl = document.createElement("div");
            closeEl.className = "filter-dropdown-link-close";
            closeEl.addEventListener("click", (ev) => {
              ev.preventDefault();
              ev.stopPropagation();

              const isActive = itemEl.classList.contains("active");
              if (isActive) {
                itemEl.classList.remove("active");
                closeEl.style.display = "none";

                const {
                  values: { selected, unselected },
                } = state.dropdowns[tag] as DropdownStateT;
                const i = selected.findIndex((x) => x === value);
                selected.splice(i, 1);
                unselected.push(value);
                unselected.sort((a, b) => a.localeCompare(b));
              }

              onChange(tag);
            });

            itemEl.appendChild(textEl);
            itemEl.appendChild(closeEl);
          }

          itemEl.addEventListener("click", (ev) => {
            ev.preventDefault();
            const isActive = itemEl.classList.contains("active");
            if (!isActive) {
              itemEl.classList.add("active");

              const {
                values: { selected, unselected },
              } = state.dropdowns[tag] as DropdownStateT;

              const i = unselected.findIndex((x) => x === value);
              unselected.splice(i, 1);
              selected.push(value);
              selected.sort((a, b) => a.localeCompare(b));

              const closeEl = itemEl.querySelector<HTMLDivElement>(
                ".filter-dropdown-link-close"
              );
              if (closeEl) closeEl.style.display = "block";
            }

            onChange(tag);
          });

          navEl.appendChild(itemEl);
          if (!unselected.find((x) => x === value)) {
            itemEl.style.display = "none";
          }
        }

        const activeListEl = navEl.querySelector<HTMLDivElement>(
          `#${tag}-active-filters`
        );
        if (activeListEl) {
          const makeItemVisible = (value: string) => {
            navEl.querySelectorAll("a").forEach((aEl) => {
              if (!activeListEl.contains(aEl) && aEl.textContent === value) {
                aEl.style.display = "";
              }
            });
          };

          if (selected.length) {
            activeListEl.style.display = "block";

            for (let i = 0; i < selected.length; i++) {
              const value = selected[i];
              const itemEl = document.createElement("a");
              itemEl.className = "filter-dropdown-link w-inline-block active";
              itemEl.href = "#";
              itemEl.tabIndex = i;
              {
                const textEl = document.createElement("div");
                textEl.textContent = value;

                const closeEl = document.createElement("div");
                closeEl.className = "filter-dropdown-link-close";
                closeEl.style.display = "block";

                closeEl.addEventListener("click", (ev) => {
                  ev.preventDefault();
                  ev.stopPropagation();

                  const {
                    values: { selected, unselected },
                  } = state.dropdowns[tag] as DropdownStateT;

                  const i = selected.findIndex((x) => x === value);
                  selected.splice(i, 1);
                  unselected.push(value);
                  unselected.sort((a, b) => a.localeCompare(b));

                  onChange(tag);

                  itemEl.classList.remove("active");
                  itemEl.style.display = "none";
                  makeItemVisible(value);
                  if (!activeListEl.querySelectorAll("a.active").length)
                    activeListEl.style.display = "none";
                });

                itemEl.appendChild(textEl);
                itemEl.appendChild(closeEl);
              }

              activeListEl.appendChild(itemEl);
            }
          } else {
            activeListEl.style.display = "none";
          }
        }

        if (state.dropdowns[tag].isFirstRender) {
          state.dropdowns[tag].isFirstRender = false;
          onChange(tag);
        }
      };

      for (const tag of ["regions", "countries", "types"]) {
        const listEl = document.getElementById(`${tag}-list`);
        if (listEl) {
          listEl.querySelectorAll("a").forEach((aEl) => aEl.remove());

          renderOptions(tag);
          applyObserver(tag);
        }
      }

      const clearAllBtn = document.getElementById("clear-all");
      if (clearAllBtn) {
        clearAllBtn.addEventListener("click", () => {
          for (const tag of ["regions", "types", "countries"]) {
            const { values } = state.dropdowns[tag];
            values.selected = [];
            values.unselected = [...values.all];

            state.filters[tag] = [];

            renderOptions(tag);
            onChange(tag);
          }
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const filterItems = () => {
    const { regions, countries, types } = state.filters;

    let showCount: number = 0;
    let isFiltersApplied: boolean = false;
    for (const item of state.items) {
      let shouldDisplay: boolean = true;

      if (regions.length) {
        let hasRegion: boolean = false;
        isFiltersApplied = true;
        for (const region of regions) {
          if (item.all_regions.set.has(region)) {
            hasRegion = true;
            break;
          }
        }

        shouldDisplay = hasRegion;
      }

      if (countries.length) {
        isFiltersApplied = true;

        if (shouldDisplay) {
          let hasCountry: boolean = false;
          for (const country of countries) {
            if (item.all_consumer_countries.set.has(country)) {
              hasCountry = true;
              break;
            }
          }

          shouldDisplay = hasCountry;
        }
      }

      if (types.length) {
        isFiltersApplied = true;

        if (shouldDisplay) {
          let hasType: boolean = false;
          for (const type of types) {
            if (item.all_payment_types.set.has(type)) {
              hasType = true;
              break;
            }
          }

          shouldDisplay = hasType;
        }
      }

      if (shouldDisplay) showCount++;
      item.element.style.display = shouldDisplay ? "block" : "none";
    }

    let qs: string[] = [];
    if (regions.length) {
      regions.forEach((x) => qs.push(`region=${encodeURIComponent(x)}`));
    }
    if (countries.length) {
      countries.forEach((x) =>
        qs.push(`consumerCountry=${encodeURIComponent(x)}`)
      );
    }
    if (types.length) {
      types.forEach((x) => qs.push(`paymentType=${encodeURIComponent(x)}`));
    }
    window.history.pushState(
      null,
      "",
      `https://${window.location.hostname}/payment-method/accept/?${qs.join(
        "&"
      )}`
    );

    // updating #items
    const numEl = document.getElementById(
      "number-of-methods"
    ) as HTMLSpanElement;
    if (numEl) numEl.textContent = showCount + "";

    const emptyState = document.querySelector<HTMLDivElement>(
      ".payments-empty-state"
    );
    if (emptyState) {
      emptyState.style.display = showCount ? "none" : "block";
    }

    const clearAllBtn = document.getElementById("clear-all");
    if (clearAllBtn) {
      clearAllBtn.style.display = isFiltersApplied ? "block" : "none";
    }
  };

  // Adding data to state
  {
    const sp = new URLSearchParams(window.location.search);

    // adding available regions and types filter options
    const tagQueryMap = {
      regions: "region",
      types: "paymentType",
      countries: "consumerCountry",
    };
    for (const tag of ["regions", "types"]) {
      const optionsContainer = document.getElementById(`${tag}-list`);
      if (optionsContainer) {
        const optionEls =
          optionsContainer.querySelectorAll<HTMLAnchorElement>("a");
        const options: string[] = [];
        optionEls.forEach((optionEl) => {
          if (optionEl.textContent) options.push(optionEl.textContent.trim());
        });

        const selectedFilters = sp.getAll(tagQueryMap[tag]);

        state.dropdowns[tag].values = {
          selected: options.filter((o) =>
            selectedFilters.includes(o.toLowerCase())
          ),
          unselected: options.filter(
            (o) => !selectedFilters.includes(o.toLowerCase())
          ),
          all: [...options],
        };

        state.filters[tag] = [...selectedFilters];
      }
    }

    // adding available countries filter options
    {
      const countries = [
        "Afghanistan",
        "Aland Islands",
        "Albania",
        "Algeria",
        "American Samoa",
        "Andorra",
        "Angola",
        "Anguilla",
        "Antigua & Barbuda",
        "Argentina",
        "Armenia",
        "Aruba",
        "Australia",
        "Austria",
        "Azerbaijan",
        "Bahamas",
        "Bahrain",
        "Bangladesh",
        "Barbados",
        "Belarus",
        "Belgium",
        "Belize",
        "Benin",
        "Bermuda",
        "Bhutan",
        "Bolivia",
        "Bosnia & Herzegovina",
        "Botswana",
        "Bouvet Island",
        "Brazil",
        "British Virgin Islands",
        "Brunei",
        "Bulgaria",
        "Burkina Faso",
        "Burundi",
        "Cambodia",
        "Cameroon",
        "Canada",
        "Cape Verde",
        "Cayman Islands",
        "Chad",
        "Chile",
        "China",
        "Colombia",
        "Comoros",
        "Congo-Brazzaville",
        "Congo-Kinshasa",
        "Cook Islands",
        "Costa Rica",
        "Côte D'Ivoire",
        "Croatia",
        "Curacao",
        "Cyprus",
        "Czech Republic",
        "Denmark",
        "Djibouti",
        "Dominica",
        "Dominican Republic",
        "Ecuador",
        "Egypt",
        "El Salvador",
        "Equatorial Guinea",
        "Eritrea",
        "Estonia",
        "eSwatini",
        "Ethiopia",
        "Falkland Islands",
        "Faroe Islands",
        "Fiji",
        "Finland",
        "France",
        "French Guiana",
        "French Polynesia",
        "Gabon",
        "Gambia",
        "Georgia",
        "Germany",
        "Ghana",
        "Gibraltar",
        "Greece",
        "Greenland",
        "Grenada",
        "Guadeloupe",
        "Guatemala",
        "Guernsey",
        "Guinea",
        "Guinea-Bissau",
        "Guyana",
        "Haiti",
        "Honduras",
        "Hong Kong",
        "Hungary",
        "Iceland",
        "India",
        "Indonesia",
        "Iraq",
        "Ireland",
        "Isle of Man",
        "Israel",
        "Italy",
        "Jamaica",
        "Japan",
        "Jersey",
        "Jordan",
        "Kazakhstan",
        "Kenya",
        "Kiribati",
        "Kuwait",
        "Kyrgyzstan",
        "Laos",
        "Latvia",
        "Lesotho",
        "Liberia",
        "Liechtenstein",
        "Lithuania",
        "Luxembourg",
        "Macao",
        "Macedonia",
        "Madagascar",
        "Malawi",
        "Malaysia",
        "Maldives",
        "Mali",
        "Malta",
        "Marshall Islands",
        "Martinique",
        "Mauritania",
        "Mauritius",
        "Mayotte",
        "Mexico",
        "Micronesia",
        "Moldova",
        "Monaco",
        "Mongolia",
        "Montenegro",
        "Montserrat",
        "Morocco",
        "Mozambique",
        "Myanmar",
        "Namibia",
        "Nauru",
        "Nepal",
        "Netherlands",
        "New Caledonia",
        "New Zealand",
        "Nicaragua",
        "Niger",
        "Nigeria",
        "Niue",
        "Norfolk Island",
        "Norway",
        "Oman",
        "Pakistan",
        "Palau",
        "Panama",
        "Papua New Guinea",
        "Paraguay",
        "Peru",
        "Philippines",
        "Pitcairn Islands",
        "Poland",
        "Portugal",
        "Puerto Rico",
        "Qatar",
        "Réunion",
        "Romania",
        "Russia",
        "Rwanda",
        "Samoa",
        "San Marino",
        "São Tomé & Príncipe",
        "Saudi Arabia",
        "Senegal",
        "Serbia",
        "Seychelles",
        "Sierra Leone",
        "Singapore",
        "Slovakia",
        "Slovenia",
        "Solomon Islands",
        "Somalia",
        "South Africa",
        "South Korea",
        "South Sudan",
        "Spain",
        "Sri Lanka",
        "St. Helena",
        "St. Kitts & Nevis",
        "St. Lucia",
        "St. Pierre & Miquelon",
        "St. Vincent & Grenadines",
        "Suriname",
        "Svalbard & Jan Mayen",
        "Swaziland",
        "Sweden",
        "Switzerland",
        "Taiwan",
        "Tajikistan",
        "Tanzania",
        "Thailand",
        "Timor-Leste",
        "Togo",
        "Tonga",
        "Trinidad & Tobago",
        "Tunisia",
        "Turkey",
        "Turkmenistan",
        "Turks & Caicos Islands",
        "Tuvalu",
        "Uganda",
        "Ukraine",
        "United Arab Emirates",
        "United Kingdom",
        "United States",
        "Uruguay",
        "Vanuatu",
        "Vatican City",
        "Venezuela",
        "Vietnam",
        "Wallis & Futuna",
        "Yemen",
        "Zambia",
        "Zimbabwe",
      ];

      const selectedFilters = sp.getAll(tagQueryMap["countries"]);

      state.dropdowns.countries.values = {
        selected: countries.filter((c) =>
          selectedFilters.includes(c.toLowerCase())
        ),
        unselected: countries.filter(
          (c) => !selectedFilters.includes(c.toLowerCase())
        ),
        all: [...countries],
      };
      state.filters.countries = [...selectedFilters];
    }

    // adding items
    const itemEls = document.querySelectorAll<HTMLDivElement>(
      "div.payments-list .payments-item"
    );
    const items: ItemT[] = [];

    for (let i = 0; i < itemEls.length; i++) {
      const itemEl = itemEls.item(i);

      const all_regions: AttributesT = {
        list: [],
        set: new Set(),
      };
      const regionEls = itemEl.querySelectorAll<HTMLDivElement>(
        "#region-wrapper > .w-dyn-item div"
      );
      const all: Set<string> = new Set();
      regionEls.forEach((regionEl) => {
        const region = regionEl.textContent;
        if (region) all.add(region);
      });
      all_regions.list = Array.from(all);
      all_regions.set = new Set(all_regions.list.map((t) => t.toLowerCase()));

      const all_consumer_countries: AttributesT = {
        list: [],
        set: new Set(),
      };
      const countriesEl = itemEl.querySelector<HTMLDivElement>(
        "div#consumer-countries-list"
      );
      if (countriesEl) {
        const all: Set<string> = new Set();
        const countriesText = countriesEl.textContent;
        if (countriesText) {
          const countries = countriesText.split(",").map((c) => c.trim());
          countries.forEach((c) => all.add(c));
        }

        all_consumer_countries.list = Array.from(all);
        all_consumer_countries.set = new Set(
          all_consumer_countries.list.map((t) => t.toLowerCase())
        );
      }

      const all_payment_types: AttributesT = {
        list: [],
        set: new Set(),
      };
      const typesEl = itemEl.querySelector<HTMLDivElement>("div#payment-type");
      if (typesEl) {
        const all: Set<string> = new Set();
        const typesText = typesEl.textContent;
        if (typesText) {
          const types = typesText.split(",").map((t) => t.trim());
          types.forEach((t) => all.add(t));
        }

        all_payment_types.list = Array.from(all);
        all_payment_types.set = new Set(
          all_payment_types.list.map((t) => t.toLowerCase())
        );
      }

      items.push({
        all_consumer_countries,
        all_regions,
        all_payment_types,
        element: itemEl,
      });
    }

    state.items = [...items];
    populateDropdowns();
  }

  filterItems();
});
