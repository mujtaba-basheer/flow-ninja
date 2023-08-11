window.addEventListener("load", async () => {
    var _a;
    const state = {
        jobs: [],
        filteredJobs: [],
        filters: {
            locations: [],
            teams: [],
            input: "",
        },
        dropdowns: {
            locations: {
                isFirstRender: true,
                values: {
                    selected: [],
                    unselected: [],
                    all: [],
                },
            },
            teams: {
                isFirstRender: true,
                values: {
                    selected: [],
                    unselected: [],
                    all: [],
                },
            },
        },
    };
    const renderJobs = () => {
        try {
            const jobsContainer = document.querySelector("div.careers-job-list");
            const emptyState = document.querySelector("div.careers-empty-state");
            const tableLabels = document.getElementById("table-labels");
            if (jobsContainer) {
                // clearing previous rendering
                jobsContainer.querySelectorAll("a").forEach((aEl) => aEl.remove());
                // rendering jobs
                for (const job of state.filteredJobs) {
                    const rootEl = document.createElement("a");
                    rootEl.id = job.id;
                    rootEl.className = "careers-table-item w-inline-block";
                    rootEl.href = job.url;
                    rootEl.target = "_blank";
                    {
                        const nameEl = document.createElement("div");
                        nameEl.textContent = job.title;
                        const teamEl = document.createElement("div");
                        teamEl.className = "font-weight-300";
                        teamEl.textContent = job.team;
                        const locationEl = document.createElement("div");
                        locationEl.className = "font-weight-300";
                        locationEl.style.justifySelf = "end";
                        locationEl.textContent = job.location;
                        rootEl.appendChild(nameEl);
                        rootEl.appendChild(teamEl);
                        rootEl.appendChild(locationEl);
                    }
                    jobsContainer.appendChild(rootEl);
                }
                // updating #jobs
                const numEl = document.getElementById("number-of-jobs");
                if (numEl)
                    numEl.textContent = state.filteredJobs.length + "";
                if (emptyState) {
                    if (state.filteredJobs.length) {
                        emptyState.style.display = "none";
                        tableLabels.style.display = "grid";
                    }
                    else {
                        emptyState.style.display = "block";
                        tableLabels.style.display = "none";
                    }
                }
            }
        }
        catch (error) {
            console.error(error);
        }
    };
    const filterJobs = () => {
        let filteredJobs = [...state.jobs];
        const { locations, teams, input } = state.filters;
        filteredJobs = filteredJobs.filter((job) => {
            if (locations.length && !locations.includes(job.location))
                return false;
            if (teams.length && !teams.includes(job.team))
                return false;
            return job.title.toLowerCase().includes(input.toLowerCase());
        });
        let qs = [];
        if (locations.length) {
            locations.forEach((x) => qs.push(`location=${x}`));
        }
        if (teams.length) {
            teams.forEach((x) => qs.push(`team=${x}`));
        }
        if (input)
            qs.push(`search=${input}`);
        window.history.pushState(null, "", `https://${window.location.hostname}/careers${qs.length ? "/?" : ""}${qs.join("&")}`);
        state.filteredJobs = filteredJobs;
    };
    const populateDropdowns = async (selectionText) => {
        try {
            const sp = new URLSearchParams(window.location.search);
            const jobs = state.jobs;
            const applyObserver = (target, tag) => {
                const callback = (mutations) => {
                    for (const mutation of mutations) {
                        const element = mutation.target;
                        const isOpen = element.classList.contains("w--open");
                        if (!isOpen)
                            renderOptions(tag);
                    }
                };
                const options = {
                    attributeFilter: ["class"],
                    childList: false,
                };
                const observer = new MutationObserver(callback);
                observer.observe(target, options);
            };
            const onChange = (tag) => {
                const { values: { selected }, } = state.dropdowns[tag];
                state.filters[tag] = selected;
                const navEl = document.getElementById(`${tag}-list`);
                const selectedEls = navEl.querySelectorAll("a.active");
                const numSelected = selected.length;
                try {
                    const toggleWrapper = document.getElementById(`${tag}-toggle`);
                    const labelEl = toggleWrapper.querySelector(".filter-toggle-text");
                    const selectionEl = toggleWrapper.querySelector(".filter-selected-text");
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
                                selectionEl.textContent = selected[0];
                                // selectionEl.textContent = selectedEls.item(0).textContent;
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
                    filterJobs();
                    renderJobs();
                }
                catch (error) {
                    console.error(error);
                }
            };
            const renderOptions = (tag) => {
                const { values } = state.dropdowns[tag];
                const navEl = document.getElementById(`${tag}-list`);
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
                                const { values: { selected, unselected }, } = state.dropdowns[tag];
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
                            const { values: { selected, unselected }, } = state.dropdowns[tag];
                            const i = unselected.findIndex((x) => x === value);
                            unselected.splice(i, 1);
                            selected.push(value);
                            selected.sort((a, b) => a.localeCompare(b));
                            const closeEl = itemEl.querySelector(".filter-dropdown-link-close");
                            if (closeEl)
                                closeEl.style.display = "block";
                        }
                        onChange(tag);
                    });
                    navEl.appendChild(itemEl);
                    if (!unselected.find((x) => x === value)) {
                        itemEl.style.display = "none";
                    }
                }
                const activeListEl = navEl.querySelector(`#${tag}-active-filters`);
                if (activeListEl) {
                    const makeItemVisible = (value) => {
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
                                    const { values: { selected, unselected }, } = state.dropdowns[tag];
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
                    }
                    else {
                        activeListEl.style.display = "none";
                    }
                }
                if (state.dropdowns[tag].isFirstRender) {
                    state.dropdowns[tag].isFirstRender = false;
                    onChange(tag);
                }
            };
            const locations = new Set();
            const teams = new Set();
            for (const job of jobs) {
                const { location, team } = job;
                locations.add(location);
                teams.add(team);
            }
            // populating locations dropdown
            const locationsList = Array.from(locations);
            locationsList.sort((a, b) => a.localeCompare(b));
            const selectedLocations = sp.getAll("location");
            state.dropdowns.locations.values = {
                selected: [...selectedLocations],
                unselected: locationsList.filter((l) => !selectedLocations.includes(l)),
                all: [...locationsList],
            };
            {
                const listEl = document.getElementById("locations-list");
                if (listEl) {
                    listEl.querySelectorAll("a").forEach((aEl) => aEl.remove());
                    renderOptions("locations");
                    applyObserver(listEl, "locations");
                }
            }
            // populating teams dropdown
            const teamsList = Array.from(teams);
            teamsList.sort((a, b) => a.localeCompare(b));
            const selectedTeams = sp.getAll("team");
            state.dropdowns.teams.values = {
                selected: [...selectedTeams],
                unselected: teamsList.filter((t) => !selectedTeams.includes(t)),
                all: [...teamsList],
            };
            {
                const listEl = document.getElementById("teams-list");
                if (listEl) {
                    listEl.querySelectorAll("a").forEach((aEl) => aEl.remove());
                    renderOptions("teams");
                    applyObserver(listEl, "teams");
                }
            }
        }
        catch (error) {
            console.error(error);
        }
    };
    // Adding data to state
    {
        const sp = new URLSearchParams(window.location.search);
        const selectedLocations = sp.getAll("location");
        state.filters.locations = [...selectedLocations];
        const selectedTeams = sp.getAll("team");
        state.filters.teams = [...selectedTeams];
        const defaultInput = sp.get("search");
        if (defaultInput) {
            state.filters.input = defaultInput;
            const inputEl = document.getElementById("careers-search");
            if (inputEl)
                inputEl.value = defaultInput;
        }
    }
    const jobsContainer = document.querySelector("div.careers-job-list");
    if (jobsContainer) {
        // fetching jobs
        let selectionText = "";
        try {
            const req = await fetch(" https://0a50cfhnal.execute-api.us-east-1.amazonaws.com/sandbox/jobs");
            const res = await req.json();
            if (res.status) {
                const jobs = res.data;
                jobs.sort((a, b) => a.title.localeCompare(b.title));
                state.jobs = jobs;
                state.filteredJobs = jobs;
                renderJobs();
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
                const hiddenLangEl = document.getElementById("hidden-page-language");
                if (hiddenLangEl) {
                    const langCode = (_a = hiddenLangEl.textContent) === null || _a === void 0 ? void 0 : _a.trim();
                    if (selectionMap[langCode]) {
                        selectionText = selectionMap[langCode];
                    }
                    else {
                        selectionText = selectionMap["en"];
                    }
                }
                else {
                    selectionText = selectionMap["en"];
                }
                populateDropdowns(selectionText);
            }
            else
                throw new Error(res.msg);
        }
        catch (error) {
            console.error(error);
        }
        const inputEl = document.getElementById("careers-search");
        if (inputEl) {
            inputEl.addEventListener("input", () => {
                const value = inputEl.value.trim();
                state.filters.input = value;
                filterJobs();
                renderJobs();
            });
        }
    }
});
