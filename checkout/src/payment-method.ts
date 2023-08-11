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

  const populateDropdowns = async (selectionText: string) => {
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
                selectionEl.textContent = `${numSelected} ${selectionText}`;
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
      `https://${window.location.hostname}/payment-method/accept${
        qs.length ? "/?" : ""
      }${qs.join("&")}`
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
    let selectionText: string = "";

    // adding available countries filter options
    {
      const countriesMap = {
        "fr-fr": [
          "Afghanistan",
          "Afrique du Sud",
          "Albanie",
          "Algérie",
          "Allemagne",
          "Andorre",
          "Angola",
          "Anguilla",
          "Antigua-et-Barbuda",
          "Arabie Saoudite",
          "Argentine",
          "Arménie",
          "Aruba",
          "Australie",
          "Autriche",
          "Azerbaïdjan",
          "Bahamas",
          "Bahreïn",
          "Bangladesh",
          "Barbade",
          "Bélarus",
          "Belgique",
          "Belize",
          "Bénin",
          "Bermudes",
          "Bhoutan",
          "Bolivie",
          "Bosnie-Herzégovine",
          "Botswana",
          "Brésil",
          "Brunei",
          "Bulgarie",
          "Burkina Faso",
          "Burundi",
          "Cambodge",
          "Cameroun",
          "Canada",
          "Cap-Vert",
          "Chili",
          "Chine",
          "Chypre",
          "Cité du Vatican",
          "Colombie",
          "Comores",
          "Congo-Brazzaville",
          "Congo-Kinshasa",
          "Corée du Sud",
          "Costa Rica",
          "Côte d'Ivoire",
          "Croatie",
          "Curaçao",
          "Danemark",
          "Djibouti",
          "Dominique",
          "Égypte",
          "El Salvador",
          "Émirats arabes unis",
          "Émirats Arabes Unis",
          "Équateur",
          "Érythrée",
          "Espagne",
          "Estonie",
          "Eswatini",
          "États-Unis",
          "Éthiopie",
          "Falkland (îles)",
          "Féroé (îles)",
          "Fidji",
          "Finlande",
          "France",
          "Gabon",
          "Gambie",
          "Géorgie",
          "Ghana",
          "Gibraltar",
          "Grèce",
          "Grenade",
          "Groenland",
          "Guadeloupe",
          "Guatemala",
          "Guernesey",
          "Guinée",
          "Guinée équatoriale",
          "Guinée-Bissau",
          "Guyane",
          "Guyane française",
          "Haïti",
          "Honduras",
          "Hong Kong",
          "Hongrie",
          "Île Bouvet",
          "Île de Man",
          "Île Norfolk",
          "Îles Åland",
          "Îles Caïmans",
          "Îles Cook",
          "Îles Marshall",
          "Îles Pitcairn",
          "Îles Salomon",
          "Îles Turques et Caïques",
          "Îles Vierges britanniques",
          "Inde",
          "Indonésie",
          "Iraq",
          "Irlande",
          "Islande",
          "Israël",
          "Italie",
          "Jamaïque",
          "Japon",
          "Jersey",
          "Jordanie",
          "Kazakhstan",
          "Kenya",
          "Kirghizstan",
          "Kiribati",
          "Koweït",
          "Laos",
          "Lesotho",
          "Lettonie",
          "Libéria",
          "Liechtenstein",
          "Lituanie",
          "Luxembourg",
          "Macao",
          "Macédoine",
          "Madagascar",
          "Malaisie",
          "Malawi",
          "Maldives",
          "Mali",
          "Malte",
          "Maroc",
          "Martinique",
          "Maurice",
          "Mauritanie",
          "Mayotte",
          "Mexique",
          "Micronésie",
          "Moldavie",
          "Monaco",
          "Mongolie",
          "Monténégro",
          "Montserrat",
          "Mozambique",
          "Myanmar",
          "Namibie",
          "Nauru",
          "Népal",
          "Nicaragua",
          "Niger",
          "Nigeria",
          "Niué",
          "Norvège",
          "Nouvelle-Calédonie",
          "Oman",
          "Ouganda",
          "Pakistan",
          "Palau",
          "Panama",
          "Papouasie-Nouvelle-Guinée",
          "Paraguay",
          "Pays-Bas",
          "Pérou",
          "Philippines",
          "Pologne",
          "Polynésie française",
          "Porto Rico",
          "Portugal",
          "Qatar",
          "République dominicaine",
          "République tchèque",
          "Réunion",
          "Roumanie",
          "Royaume-Uni",
          "Russie",
          "Rwanda",
          "Saint-Christophe-et-Niévès",
          "Saint-Marin",
          "Saint-Pierre-et-Miquelon",
          "Saint-Vincent-et-les-Grenadines",
          "Sainte-Hélène",
          "Sainte-Lucie",
          "Samoa",
          "Samoa américaines",
          "Sao Tomé-et-Principe",
          "Sénégal",
          "Serbie",
          "Seychelles",
          "Sierra Leone",
          "Singapour",
          "Singapour.",
          "Slovaquie",
          "Slovénie",
          "Somalie",
          "Soudan du Sud",
          "Sri Lanka",
          "Suède",
          "Suisse",
          "Suriname",
          "Svalbard et Jan Mayen",
          "Tadjikistan",
          "Taïwan",
          "Tanzanie",
          "Thaïlande",
          "Timor oriental",
          "Togo",
          "Tonga",
          "Trinité-et-Tobago",
          "Tunisie",
          "Turkménistan",
          "Turquie",
          "Tuvalu",
          "Ukraine",
          "Uruguay",
          "Vanuatu",
          "Venezuela",
          "Viêt Nam",
          "Vietnam",
          "Wallis-et-Futuna",
          "Yémen",
          "Zambie",
          "Zimbabwe",
        ],
        "de-de": [
          "Afghanistan",
          "Ägypten",
          "Alandinseln",
          "Albanien",
          "Algerien",
          "Amerikanisch-Samoa",
          "Andorra",
          "Angola",
          "Anguilla",
          "Antigua & Barbuda",
          "Äquatorialguinea",
          "Argentinien",
          "Armenien",
          "Aruba",
          "Aserbaidschan",
          "Äthiopien",
          "Australien",
          "Bahamas",
          "Bahrain",
          "Bangladesch",
          "Barbados",
          "Belarus",
          "Belgien",
          "Belize",
          "Benin",
          "Bermuda",
          "Bhutan",
          "Bolivien",
          "Bosnien & Herzegowina",
          "Botswana",
          "Bouvetinsel",
          "Brasilien",
          "Britische Jungferninseln",
          "Britische Jungferninseln Herzegowina",
          "Brunei",
          "Bulgarien",
          "Burkina Faso",
          "Burundi",
          "Chile",
          "China",
          "Cookinseln",
          "Costa Rica",
          "Côte D'Ivoire",
          "Curaçao",
          "Dänemark",
          "Deutschland",
          "Dominica",
          "Dominikanische Republik",
          "Dschibuti",
          "Ecuador",
          "El Salvador",
          "Eritrea",
          "Estland",
          "eSwatini",
          "Falklandinseln",
          "Färöer Inseln",
          "Fidschi",
          "Finnland",
          "Frankreich",
          "Französisch-Guayana",
          "Französisch-Polynesien",
          "Gabun",
          "Gambia",
          "Georgien",
          "Ghana",
          "Gibraltar",
          "Grenada",
          "Griechenland",
          "Grönland",
          "Guadeloupe",
          "Guatemala",
          "Guernsey",
          "Guinea",
          "Guinea-Bissau",
          "Guyana",
          "Haiti",
          "Honduras",
          "Hongkong",
          "Indien",
          "Indonesien",
          "Irak",
          "Irland",
          "Island",
          "Isle of Man",
          "Israel",
          "Italien",
          "Jamaika",
          "Japan",
          "Jemen",
          "Jersey",
          "Jordanien",
          "Kaimaninseln",
          "Kaimaninseln Herzegowina",
          "Kambodscha",
          "Kamerun",
          "Kanada",
          "Kap Verde",
          "Kasachstan",
          "Katar",
          "Kenia",
          "Kirgisistan",
          "Kiribati",
          "Kolumbien",
          "Komoren",
          "Kongo-Brazzaville",
          "Kongo-Kinshasa",
          "Kroatien",
          "Kuwait",
          "Laos",
          "Lesotho",
          "Lettland",
          "Liberia",
          "Liechtenstein",
          "Litauen",
          "Luxemburg",
          "Macao",
          "Madagaskar",
          "Malawi",
          "Malaysia",
          "Malediven",
          "Mali",
          "Malta",
          "Marokko",
          "Marshallinseln",
          "Martinique",
          "Mauretanien",
          "Mauritius",
          "Mayotte",
          "Mazedonien",
          "Mexiko",
          "Mikronesien",
          "Moldawien",
          "Monaco",
          "Mongolei",
          "Montenegro",
          "Montserrat",
          "Mosambik",
          "Myanmar",
          "Namibia",
          "Nauru",
          "Nepal",
          "Neukaledonien",
          "Neuseeland",
          "Nicaragua",
          "Niederlande",
          "Niger",
          "Nigeria",
          "Niue",
          "Norfolkinsel",
          "Norwegen",
          "Oman",
          "Österreich",
          "Pakistan",
          "Palau",
          "Panama",
          "Papua-Neuguinea",
          "Paraguay",
          "Peru",
          "Philippinen",
          "Pitcairninseln",
          "Polen",
          "Portugal",
          "Puerto Rico",
          "Réunion",
          "Ruanda",
          "Rumänien",
          "Russland",
          "Salomonen",
          "Sambia",
          "Samoa",
          "San Marino",
          "São Tomé & Príncipe",
          "Saudi-Arabien",
          "Schweden",
          "Schweiz",
          "Senegal",
          "Serbien",
          "Seychellen",
          "Sierra Leone",
          "Simbabwe",
          "Singapur",
          "Slowakei",
          "Slowenien",
          "Somalia",
          "Spanien",
          "Sri Lanka",
          "St. Helena",
          "St. Kitts & Nevis",
          "St. Lucia",
          "St. Pierre & Miquelon",
          "St. Vincent & Grenadinen",
          "Südafrika",
          "Südkorea",
          "Südsudan",
          "Surinam",
          "Svalbard & Jan Mayen",
          "Swasiland",
          "Tadschikistan",
          "Taiwan",
          "Tansania",
          "Thailand",
          "Timor-Leste",
          "Togo",
          "Tonga",
          "Trinidad & Tobago",
          "Tschad",
          "Tschechische Republik",
          "Tunesien",
          "Türkei",
          "Turkmenistan",
          "Turks & Caicosinseln",
          "Turks- & Caicosinseln",
          "Tuvalu",
          "Tuvalu Caicosinseln",
          "Uganda",
          "Ukraine",
          "Ungarn",
          "Uruguay",
          "Vanuatu",
          "Vatikanstadt",
          "Venezuela",
          "Vereinigte Arabische Emirate",
          "Vereinigte Staaten",
          "Vereinigtes Königreich",
          "Vietnam",
          "Wallis und Futuna",
          "Zypern",
        ],
        "it-it": [
          "Afghanistan",
          "Albania",
          "Algeria",
          "Andorra",
          "Angola",
          "Anguilla",
          "Antigua & Barbuda",
          "Arabia Saudita",
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
          "Belgio",
          "Belize",
          "Benin",
          "Bermuda",
          "Bhutan",
          "Bielorussia",
          "Bolivia",
          "Bosnia ed Erzegovina",
          "Botswana",
          "Brasile",
          "Brunei",
          "Bulgaria",
          "Burkina Faso",
          "Burundi",
          "Cambogia",
          "Camerun",
          "Canada",
          "Capo Verde",
          "Ciad",
          "Cile",
          "Cina",
          "Cipro",
          "Città del Vaticano",
          "Colombia",
          "Comore",
          "Corea del Sud",
          "Costa d'Avorio",
          "Costa Rica",
          "Croazia",
          "Curaçao",
          "Danimarca",
          "Dominica",
          "Ecuador",
          "Egitto",
          "El Salvador",
          "Emirati Arabi Uniti",
          "Eritrea",
          "Estonia",
          "eSwatini",
          "Etiopia",
          "Figi",
          "Filippine",
          "Finlandia",
          "Francia",
          "Gabon",
          "Gambia",
          "Georgia",
          "Germania",
          "Ghana",
          "Giamaica",
          "Giappone",
          "Gibilterra",
          "Gibuti",
          "Giordania",
          "Grecia",
          "Grenada",
          "Groenlandia",
          "Guadalupa",
          "Guatemala",
          "Guernsey",
          "Guinea",
          "Guinea Equatoriale",
          "Guinea-Bissau",
          "Guyana",
          "Guyana Francese",
          "Haiti",
          "Honduras",
          "Hong Kong",
          "India",
          "Indonesia",
          "Iraq",
          "Irlanda",
          "Islanda",
          "Isola Bouvet",
          "Isola di Man",
          "Isole Aland",
          "Isole Cayman",
          "Isole Cook",
          "Isole Falkland",
          "Isole Faroe",
          "Isole Marshall",
          "Isole Pitcairn",
          "Isole Salomone",
          "Isole Turks & Caicos",
          "Isole Vergini Britanniche",
          "Israele",
          "Italia",
          "Jersey",
          "Kazakistan",
          "Kenya",
          "Kirghizistan",
          "Kiribati",
          "Kuwait",
          "La Riunione",
          "Laos",
          "Lesotho",
          "Lettonia",
          "Liberia",
          "Liechtenstein",
          "Lituania",
          "Lussemburgo",
          "Macao",
          "Macedonia",
          "Madagascar",
          "Malawi",
          "Maldive",
          "Malesia",
          "Mali",
          "Malta",
          "Marocco",
          "Martinica",
          "Mauritania",
          "Mauritius",
          "Mayotte",
          "Messico",
          "Micronesia",
          "Moldavia",
          "Moldova",
          "Monaco",
          "Mongolia",
          "Montenegro",
          "Montserrat",
          "Mozambico",
          "Myanmar",
          "Namibia",
          "Nauru",
          "Nepal",
          "Nicaragua",
          "Niger",
          "Nigeria",
          "Niue",
          "Norfolk Island",
          "Norvegia",
          "Nuova Caledonia",
          "Nuova Zelanda",
          "Oman",
          "Paesi Bassi",
          "Pakistan",
          "Palau",
          "Panama",
          "Papua Nuova Guinea",
          "Paraguay",
          "Perù",
          "Polinesia Francese",
          "Polonia",
          "Porto Rico",
          "Portogallo",
          "Principato di Monaco",
          "Qatar",
          "Regno Unito",
          "Repubblica Ceca",
          "Repubblica del Congo",
          "Repubblica Democratica del Congo",
          "Repubblica Dominicana",
          "Romania",
          "Ruanda",
          "Russia",
          "Samoa",
          "Samoa Americane",
          "San Marino",
          "São Tomé & Príncipe",
          "Senegal",
          "Serbia",
          "Seychelles",
          "Sierra Leone",
          "Singapore",
          "Slovacchia",
          "Slovenia",
          "Somalia",
          "Spagna",
          "Spagna.",
          "Sri Lanka",
          "St. Helena",
          "St. Kitts & Nevis",
          "St. Lucia",
          "St. Pierre & Miquelon",
          "St. Vincent e Grenadine",
          "Stati Uniti",
          "Sud Sudan",
          "Sudafrica",
          "Suriname",
          "Svalbard e Jan Mayen",
          "Svezia",
          "Svizzera",
          "Swaziland",
          "Tagikistan",
          "Taiwan",
          "Tanzania",
          "Thailandia",
          "Timor Est",
          "Togo",
          "Tonga",
          "Trinidad e Tobago",
          "Tunisia",
          "Turchia",
          "Turkmenistan",
          "Tuvalu",
          "Ucraina",
          "Uganda",
          "Ungheria",
          "Uruguay",
          "Vanuatu",
          "Venezuela",
          "Vietnam",
          "Vincent e Grenadine",
          "Wallis & Futuna",
          "Yemen",
          "Zambia",
          "Zimbabwe",
        ],
        "es-es": [
          "Afganistán",
          "Albania",
          "Alemania",
          "Andorra",
          "Angola",
          "Anguila",
          "Antigua y Barbuda",
          "Arabia Saudí",
          "Argelia",
          "Argentina",
          "Armenia",
          "Aruba",
          "Australia",
          "Austria",
          "Azerbaiyán",
          "Bahamas",
          "Bahrein",
          "Bangladesh",
          "Barbados",
          "Belarús",
          "Bélgica",
          "Belice",
          "Benín",
          "Benin",
          "Bermudas",
          "Bielorrusia",
          "Bolivia",
          "Bosnia y Herzegovina",
          "Botsuana",
          "Brasil",
          "Brunei",
          "Bulgaria",
          "Burkina Faso",
          "Burundi",
          "Bután",
          "Cabo Verde",
          "Camboya",
          "Camerún",
          "Canadá",
          "Chad",
          "Chile",
          "China",
          "Chipre",
          "Ciudad del Vaticano",
          "Colombia",
          "Comoras",
          "Comoros",
          "Congo-Brazzaville",
          "Congo-Kinshasa",
          "Corea del Sur",
          "Costa de Marfil",
          "Costa Rica",
          "Croacia",
          "Curaçao",
          "Dinamarca",
          "Djibouti",
          "Djibouti Dominica",
          "Dominica",
          "Ecuador",
          "Egipto",
          "El Salvador",
          "Emiratos Árabes Unidos",
          "Emiratos Árabes Unidos.",
          "Eritrea",
          "Eslovaquia",
          "Eslovenia",
          "España",
          "Estados Unidos",
          "Estonia",
          "eSwatini",
          "Etiopía",
          "Fiji",
          "Filipinas",
          "Finlandia",
          "Fiyi",
          "Francia",
          "Gabón",
          "Gambia",
          "Georgia",
          "Ghana",
          "Gibraltar",
          "Granada",
          "Grecia",
          "Groenlandia",
          "Guadalupe",
          "Guatemala",
          "Guayana Francesa",
          "Guernsey",
          "Guinea",
          "Guinea Ecuatorial",
          "Guinea-Bissau",
          "Guyana",
          "Haití",
          "Honduras",
          "Hong Kong",
          "Hungría",
          "India",
          "Indonesia",
          "Irak",
          "Irlanda",
          "Isla Bouvet",
          "Isla de Man",
          "Isla Norfolk",
          "Islandia",
          "Islas Aland",
          "Islas Caimán",
          "Islas Cook",
          "Islas Feroe",
          "Islas Malvinas",
          "Islas Marshall",
          "Islas Pitcairn",
          "Islas Salomón",
          "Islas Turcas y Caicos",
          "Islas Vírgenes Británicas",
          "Israel",
          "Italia",
          "Jamaica",
          "Japón",
          "Jersey",
          "Jordania",
          "Kazajstán",
          "Kenia",
          "Kirguistán",
          "Kiribati",
          "Kuwait",
          "Laos",
          "Lesoto",
          "Letonia",
          "Liberia",
          "Liechtenstein",
          "Lituania",
          "Luxemburgo",
          "Macao",
          "Macedonia",
          "Madagascar",
          "Malasia",
          "Malaui",
          "Malawi",
          "Maldivas",
          "Malí",
          "Malta",
          "Marruecos",
          "Martinica",
          "Mauricio",
          "Mauritania",
          "Mayotte",
          "México",
          "Micronesia",
          "Moldavia",
          "Mónaco",
          "Mongolia",
          "Montenegro",
          "Montserrat",
          "Mozambique",
          "Myanmar",
          "Namibia",
          "Nauru",
          "Nepal",
          "Nicaragua",
          "Níger",
          "Nigeria",
          "Niue",
          "Noruega",
          "Nueva Caledonia",
          "Nueva Zelanda",
          "Omán",
          "Países Bajos",
          "Pakistán",
          "Palaos",
          "Panamá",
          "Papúa Nueva Guinea",
          "Paraguay",
          "Perú",
          "Polinesia Francesa",
          "Polonia",
          "Portugal",
          "Puerto Rico",
          "Qatar",
          "Reino Unido",
          "República Checa",
          "República Dominicana",
          "Reunión",
          "Ruanda",
          "Rumanía",
          "Rusia",
          "Samoa",
          "Samoa Americana",
          "San Marino",
          "Santo Tomé y Príncipe",
          "Senegal",
          "Serbia",
          "Seychelles",
          "Sierra Leona",
          "Singapur",
          "Somalia",
          "Sri Lanka",
          "St. Helena",
          "St. Kitts & Nevis",
          "St. Lucia",
          "St. Pierre & Miquelon",
          "St. Vicente y Granadinas",
          "Suazilandia",
          "Sudáfrica",
          "Sudán del Sur",
          "Suecia",
          "Suiza",
          "Suiza y Mónaco",
          "Surinam",
          "Svalbard y Jan Mayen",
          "Tailandia",
          "Taiwán",
          "Tanzania",
          "Tayikistán",
          "Timor-Leste",
          "Togo",
          "Tonga",
          "Trinidad y Tobago",
          "Túnez",
          "Turkmenistán",
          "Turquía",
          "Tuvalu",
          "Ucrania",
          "Uganda",
          "Uruguay",
          "Vanuatu",
          "Venezuela",
          "Vietnam",
          "Wallis y Futuna",
          "Yemen",
          "Zambia",
          "Zimbabue",
        ],
        "ar-ae": [
          "أذربيجان",
          "أرمينيا",
          "أروبا",
          "أستراليا",
          "أفغانستان",
          "ألبانيا",
          "ألمانيا",
          "أنتيغوا وبربودا",
          "أندورا",
          "أنغولا",
          "أنغيلا",
          "أوروغواي",
          "أوغندا",
          "أوكرانيا",
          "أيرلندا",
          "أيسلندا",
          "إثيوبيا",
          "إريتريا",
          "إسبانيا",
          "إستونيا",
          "إسرائيل",
          "إكوادور",
          "إندونيسيا",
          "إيطاليا",
          "اسواتيني",
          "الأرجنتين",
          "الأردن",
          "الإكوادور",
          "الإمارات العربية المتحدة",
          "البحرين",
          "البرازيل",
          "البرتغال",
          "البوسنة والهرسك",
          "الجابون",
          "الجبل الأسود",
          "الجزائر",
          "الدنمارك",
          "الرأس الأخضر",
          "السلفادور",
          "السنغال",
          "السويد",
          "الصومال",
          "الصين",
          "العراق",
          "الغابون",
          "الفلبين",
          "الكاميرو",
          "الكاميرون",
          "الكونغو برازافيل",
          "الكونغو كينشاسا",
          "الكويت",
          "المجر",
          "المغرب",
          "المكسيك",
          "المملكة العربية السعودية",
          "المملكة المتحدة",
          "النرويج",
          "النمسا",
          "النيجر",
          "الهند",
          "الولايات المتحدة",
          "اليابان",
          "اليس وفوتونا",
          "اليمن",
          "اليونان",
          "بابوا غينيا الجديدة",
          "باراغواي",
          "باكستان",
          "بالاو",
          "بربادوس",
          "برمودا",
          "بروناي",
          "بلجيكا",
          "بلغاريا",
          "بليز",
          "بنغلاديش",
          "بنما",
          "بنين",
          "بوتان",
          "بوتسوانا",
          "بورتوريكو",
          "بوركينا فاسو",
          "بوروندي",
          "بولندا",
          "بوليفيا",
          "بولينيزيا الفرنسية",
          "بيرو",
          "بيلاروسيا",
          "تايلاند",
          "تايوان",
          "تركمانستان",
          "تركيا",
          "ترينيداد وتوباغو",
          "تشاد",
          "تشيلي",
          "تنزانيا",
          "توغو",
          "توفالو",
          "تونس",
          "تونغا",
          "تيمور الشرقية",
          "جامايكا",
          "جان ماين",
          "جبل طارق",
          "جرينلاند",
          "جزر آلاند",
          "جزر البهاما",
          "جزر القمر",
          "جزر المالديف",
          "جزر بيتكيرن",
          "جزر توركس وكايكوس",
          "جزر سليمان",
          "جزر فارو",
          "جزر فوكلاند",
          "جزر فيرجن البريطانية",
          "جزر كايمان",
          "جزر كوك",
          "جزر مارشال",
          "جزيرة بوفيت",
          "جزيرة مان",
          "جزيرة نورفولك",
          "جمهورية التشيك",
          "جمهورية الدومينيكان",
          "جنوب أفريقيا",
          "جنوب إفريقيا",
          "جنوب السودان",
          "جنوب كوريا",
          "جوادلوب",
          "جورجيا",
          "جويانا الفرنسية",
          "جيبوتي",
          "جيرسي",
          "دومينيكا",
          "رواندا",
          "روسيا",
          "رومانيا",
          "ريونيون",
          "زامبيا",
          "زيمبابوي",
          "ساموا",
          "ساموا الأمريكية",
          "سان مارينو",
          "سانت بيير وميكلون",
          "سانت فنسنت وجرينادينز",
          "سانت فنسنت وجرينادينز وسورينام",
          "سانت كيتس",
          "سانت كيتس ونيفيس",
          "سانت لوسيا",
          "سانت هيلانة",
          "ساو تومي وبرينسيبي",
          "سريلانكا",
          "سفالبارد",
          "سفالبارد وجان ماين",
          "سلطنة عمان",
          "سلوفاكيا",
          "سلوفينيا",
          "سنغافورة",
          "سوازيلاند",
          "سورينام",
          "سويسرا",
          "سيراليون",
          "سيشيل",
          "صربيا",
          "طاجيكستان",
          "عمان",
          "غامبيا",
          "غانا",
          "غرينادا",
          "غواتيمالا",
          "غيانا",
          "غيانا الفرنسية",
          "غيرنسي",
          "غينيا",
          "غينيا الاستوائية",
          "غينيا بيساو",
          "فانواتو",
          "فرنسا",
          "فنزويلا",
          "فنلندا",
          "فيتنام",
          "فيجي",
          "قبرص",
          "قطر",
          "قيرغيزستان",
          "كازاخستان",
          "كاليدونيا الجديدة",
          "كرواتيا",
          "كمبوديا",
          "كندا",
          "كوت ديفوار",
          "كوراكاو",
          "كوريا الجنوبية",
          "كوستاريكا",
          "كولومبيا",
          "كيريباتي",
          "كينيا",
          "لاتفيا",
          "لاوس",
          "لوكسمبورغ",
          "ليبيريا",
          "ليتوانيا",
          "ليختنشتاين",
          "ليسوتو",
          "مارتينيك",
          "ماكاو",
          "مالطا",
          "مالي",
          "ماليزيا",
          "مايوت",
          "مدغشقر",
          "مدينة الفاتيكان",
          "مصر",
          "مقدونيا",
          "ملاوي",
          "منغوليا",
          "موريتانيا",
          "موريشيوس",
          "موزمبيق",
          "مولدوفا",
          "موناكو",
          "مونتسيرات",
          "ميانمار",
          "ميكرونيزيا",
          "ناميبيا",
          "ناورو",
          "نيبال",
          "نيجيريا",
          "نيفيس وسانت لوسيا",
          "نيكاراغوا",
          "نيوزيلندا",
          "نيوي",
          "هايتي",
          "هندوراس",
          "هولندا",
          "هونج كونج",
          "هونغ كونغ",
        ],
        "ar-sa": [
          "أذربيجان",
          "أرمينيا",
          "أروبا",
          "أستراليا",
          "أفغانستان",
          "ألبانيا",
          "ألمانيا",
          "أنتيغوا وبربودا",
          "أندورا",
          "أنغولا",
          "أنغيلا",
          "أوروغواي",
          "أوغندا",
          "أوكرانيا",
          "أيرلندا",
          "أيسلندا",
          "إثيوبيا",
          "إريتريا",
          "إسبانيا",
          "إستونيا",
          "إسرائيل",
          "إكوادور",
          "إندونيسيا",
          "إيطاليا",
          "اسواتيني",
          "الأرجنتين",
          "الأردن",
          "الإكوادور",
          "الإمارات العربية المتحدة",
          "البحرين",
          "البرازيل",
          "البرتغال",
          "البوسنة والهرسك",
          "الجابون",
          "الجبل الأسود",
          "الجزائر",
          "الدنمارك",
          "الرأس الأخضر",
          "السلفادور",
          "السنغال",
          "السويد",
          "الصومال",
          "الصين",
          "العراق",
          "الغابون",
          "الفلبين",
          "الكاميرو",
          "الكاميرون",
          "الكونغو برازافيل",
          "الكونغو كينشاسا",
          "الكويت",
          "المجر",
          "المغرب",
          "المكسيك",
          "المملكة العربية السعودية",
          "المملكة المتحدة",
          "النرويج",
          "النمسا",
          "النيجر",
          "الهند",
          "الولايات المتحدة",
          "اليابان",
          "اليس وفوتونا",
          "اليمن",
          "اليونان",
          "بابوا غينيا الجديدة",
          "باراغواي",
          "باكستان",
          "بالاو",
          "بربادوس",
          "برمودا",
          "بروناي",
          "بلجيكا",
          "بلغاريا",
          "بليز",
          "بنغلاديش",
          "بنما",
          "بنين",
          "بوتان",
          "بوتسوانا",
          "بورتوريكو",
          "بوركينا فاسو",
          "بوروندي",
          "بولندا",
          "بوليفيا",
          "بولينيزيا الفرنسية",
          "بيرو",
          "بيلاروسيا",
          "تايلاند",
          "تايوان",
          "تركمانستان",
          "تركيا",
          "ترينيداد وتوباغو",
          "تشاد",
          "تشيلي",
          "تنزانيا",
          "توغو",
          "توفالو",
          "تونس",
          "تونغا",
          "تيمور الشرقية",
          "جامايكا",
          "جان ماين",
          "جبل طارق",
          "جرينلاند",
          "جزر آلاند",
          "جزر البهاما",
          "جزر القمر",
          "جزر المالديف",
          "جزر بيتكيرن",
          "جزر توركس وكايكوس",
          "جزر سليمان",
          "جزر فارو",
          "جزر فوكلاند",
          "جزر فيرجن البريطانية",
          "جزر كايمان",
          "جزر كوك",
          "جزر مارشال",
          "جزيرة بوفيت",
          "جزيرة مان",
          "جزيرة نورفولك",
          "جمهورية التشيك",
          "جمهورية الدومينيكان",
          "جنوب أفريقيا",
          "جنوب إفريقيا",
          "جنوب السودان",
          "جنوب كوريا",
          "جوادلوب",
          "جورجيا",
          "جويانا الفرنسية",
          "جيبوتي",
          "جيرسي",
          "دومينيكا",
          "رواندا",
          "روسيا",
          "رومانيا",
          "ريونيون",
          "زامبيا",
          "زيمبابوي",
          "ساموا",
          "ساموا الأمريكية",
          "سان مارينو",
          "سانت بيير وميكلون",
          "سانت فنسنت وجرينادينز",
          "سانت فنسنت وجرينادينز وسورينام",
          "سانت كيتس",
          "سانت كيتس ونيفيس",
          "سانت لوسيا",
          "سانت هيلانة",
          "ساو تومي وبرينسيبي",
          "سريلانكا",
          "سفالبارد",
          "سفالبارد وجان ماين",
          "سلطنة عمان",
          "سلوفاكيا",
          "سلوفينيا",
          "سنغافورة",
          "سوازيلاند",
          "سورينام",
          "سويسرا",
          "سيراليون",
          "سيشيل",
          "صربيا",
          "طاجيكستان",
          "عمان",
          "غامبيا",
          "غانا",
          "غرينادا",
          "غواتيمالا",
          "غيانا",
          "غيانا الفرنسية",
          "غيرنسي",
          "غينيا",
          "غينيا الاستوائية",
          "غينيا بيساو",
          "فانواتو",
          "فرنسا",
          "فنزويلا",
          "فنلندا",
          "فيتنام",
          "فيجي",
          "قبرص",
          "قطر",
          "قيرغيزستان",
          "كازاخستان",
          "كاليدونيا الجديدة",
          "كرواتيا",
          "كمبوديا",
          "كندا",
          "كوت ديفوار",
          "كوراكاو",
          "كوريا الجنوبية",
          "كوستاريكا",
          "كولومبيا",
          "كيريباتي",
          "كينيا",
          "لاتفيا",
          "لاوس",
          "لوكسمبورغ",
          "ليبيريا",
          "ليتوانيا",
          "ليختنشتاين",
          "ليسوتو",
          "مارتينيك",
          "ماكاو",
          "مالطا",
          "مالي",
          "ماليزيا",
          "مايوت",
          "مدغشقر",
          "مدينة الفاتيكان",
          "مصر",
          "مقدونيا",
          "ملاوي",
          "منغوليا",
          "موريتانيا",
          "موريشيوس",
          "موزمبيق",
          "مولدوفا",
          "موناكو",
          "مونتسيرات",
          "ميانمار",
          "ميكرونيزيا",
          "ناميبيا",
          "ناورو",
          "نيبال",
          "نيجيريا",
          "نيفيس وسانت لوسيا",
          "نيكاراغوا",
          "نيوزيلندا",
          "نيوي",
          "هايتي",
          "هندوراس",
          "هولندا",
          "هونج كونج",
          "هونغ كونغ",
        ],
        "pt-pt": [
          "Afeganistão",
          "África do Sul",
          "Albânia",
          "Alemanha",
          "Andorra",
          "Angola",
          "Anguila",
          "Antígua e Barbuda",
          "Arábia Saudita",
          "Argélia",
          "Argentina",
          "Arménia",
          "Aruba",
          "Austrália",
          "Áustria",
          "Azerbaijão",
          "Bahamas",
          "Bahrain",
          "Bangladesh",
          "Barbados",
          "Bélgica",
          "Belize",
          "Benim",
          "Benin",
          "Bermudas",
          "Bielorrússia",
          "Bielorússia",
          "Bolívia",
          "Bósnia & Herzegovina",
          "Bósnia e Herzegovina",
          "Botsuana",
          "Botswana",
          "Brasil",
          "Brunei",
          "Bulgária",
          "Burkina Faso",
          "Burundi",
          "Butão",
          "Cabo Verde",
          "Camarões",
          "Camboja",
          "Canadá",
          "Cazaquistão",
          "Chade",
          "Chile",
          "China",
          "Chipre",
          "Cidade do Vaticano",
          "Colômbia",
          "Comores",
          "Congo-Brazzaville",
          "Congo-Kinshasa",
          "Coreia do Sul",
          "Costa do Marfim",
          "Costa Rica",
          "Croácia",
          "Curaçau",
          "Dinamarca",
          "Dominica",
          "Domínica",
          "Egipto",
          "El Salvador",
          "Emirados Árabes Unidos",
          "Equador",
          "Eritreia",
          "Eslováquia",
          "Eslovénia",
          "Espanha",
          "Estados Unidos",
          "Estados Unidos da América",
          "Estónia",
          "eSwatini",
          "Etiópia",
          "Fiji",
          "Filipinas",
          "Finlândia",
          "França",
          "Gabão",
          "Gâmbia",
          "Gana",
          "Geórgia",
          "Gibraltar",
          "Granada",
          "Grécia",
          "Gronelândia",
          "Guadalupe",
          "Guatemala",
          "Guernsey",
          "Guiana",
          "Guiana Francesa",
          "Guiné",
          "Guiné Equatorial",
          "Guiné-Bissau",
          "Haiti",
          "Holanda",
          "Honduras",
          "Hong Kong",
          "Hungria",
          "Iémen",
          "Ilha Bouvet",
          "Ilha de Man",
          "Ilha Norfolk",
          "Ilhas Aland",
          "Ilhas Caimão",
          "Ilhas Cook",
          "Ilhas Faroé",
          "Ilhas Malvinas",
          "Ilhas Marshall",
          "Ilhas Pitcairn",
          "Ilhas Salomão",
          "Ilhas Turks & Caicos",
          "Ilhas Virgens Britânicas",
          "Índia",
          "Indonésia",
          "Iraque",
          "Irlanda",
          "Islândia",
          "Israel",
          "Itália",
          "Jamaica",
          "Japão",
          "Jersey",
          "Jibuti",
          "Jordânia",
          "Kiribati",
          "Kuwait",
          "Laos",
          "Lesoto",
          "Letónia",
          "Libéria",
          "Liechtenstein",
          "Lituânia",
          "Luxemburgo",
          "Macau",
          "Macedónia",
          "Madagáscar",
          "Malásia",
          "Malawi",
          "Maldivas",
          "Mali",
          "Malta",
          "Marrocos",
          "Martinica",
          "Maurícias",
          "Mauritânia",
          "Mayotte",
          "México",
          "Micronésia",
          "Moçambique",
          "Moldávia",
          "Mónaco",
          "Mongólia",
          "Monserrate",
          "Montenegro",
          "Myanmar",
          "Namíbia",
          "Nauru",
          "Nepal",
          "Nicarágua",
          "Níger",
          "Nigéria",
          "Niue",
          "Noruega",
          "Nova Caledónia",
          "Nova Zelândia",
          "Omã",
          "Países Baixos",
          "Palau",
          "Panamá",
          "Papua Nova Guiné",
          "Paquistão",
          "Paraguai",
          "Peru",
          "Polinésia Francesa",
          "Polónia",
          "Porto Rico",
          "Portugal",
          "Qatar",
          "Quénia",
          "Quirguizistão",
          "Reino Unido",
          "República Checa",
          "República Dominicana",
          "Reunião",
          "Roménia",
          "Ruanda",
          "Rússia",
          "Samoa",
          "Samoa Americana",
          "Santa Lúcia",
          "São Marino",
          "São Tomé e Príncipe",
          "São Tomé e Príncipe. Helena",
          "Seicheles",
          "Senegal",
          "Serra Leoa",
          "Sérvia",
          "Singapura",
          "Somália",
          "Sri Lanka",
          "St. Helena",
          "St. Kitts & Nevis",
          "St. Vincent & Grenadines",
          "Suazilândia",
          "Sudão do Sul",
          "Suécia",
          "Suíça",
          "Suriname",
          "Svalbard & Jan Mayen",
          "Tailândia",
          "Taiwan",
          "Tajiquistão",
          "Tanzânia",
          "Timor-Leste",
          "Togo",
          "Tonga",
          "Trinidad & Tobago",
          "Tunísia",
          "Turquemenistão",
          "Turquia",
          "Tuvalu",
          "Ucrânia",
          "Uganda",
          "Uruguai",
          "Vanuatu",
          "Venezuela",
          "Vietnã",
          "Vietname",
          "Wallis & Futuna",
          "Zâmbia",
          "Zimbabué",
        ],
        en: [
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
        ],
      };
      const selectionMap = {
        "fr-fr": "Sélectionné",
        "de-de": "Ausgewählt",
        "it-it": "Selezionato",
        "es-es": "Seleccionado",
        "ar-ae": "التفضيلات",
        "ar-sa": "التفضيلات",
        "pt-pt": "Seleccionado",
        en: "Selections",
      };
      let countries: string[] = [];
      const hiddenLangEl = document.getElementById(
        "hidden-page-language"
      ) as HTMLDivElement | null;
      if (hiddenLangEl) {
        const langCode = hiddenLangEl.textContent?.trim() as string;
        if (countriesMap[langCode]) {
          countries = countriesMap[langCode];
          selectionText = selectionMap[langCode];
        } else {
          countries = countriesMap["en"];
          selectionText = selectionMap["en"];
        }
      } else {
        countries = countriesMap["en"];
        selectionText = selectionMap["en"];
      }

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
    populateDropdowns(selectionText);
  }

  filterItems();
});
