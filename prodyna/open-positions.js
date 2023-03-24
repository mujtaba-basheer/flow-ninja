const getJobs = () => {
    return new Promise((res, rej) => {
        fetch("https://6b9d3y1jhj.execute-api.us-east-1.amazonaws.com/prod/jobs", {
            method: "GET",
        })
            .then((resp) => resp.json())
            .then(res)
            .catch(rej);
    });
};
const renderJobs = (jobs) => {
    const containerEl = document.querySelector(".container > .open-positions-wrapper");
    const emptyEl = document.querySelector("div#no-results");
    if (containerEl) {
        // removing jobs
        containerEl.querySelectorAll("div#job-link").forEach((x) => x.remove());
        containerEl
            .querySelectorAll("div.open-position-link")
            .forEach((x) => x.remove());
        // rendering jobs
        for (let i = jobs.length - 1; i >= 0; i--) {
            const { branch, department, location, title } = jobs[i];
            const jobEl = document.createElement("div");
            jobEl.className = "open-position-link w-inline-block";
            {
                const jobDiv = document.createElement("div");
                jobDiv.className = "column";
                {
                    const jobTitle = document.createElement("h3");
                    jobTitle.className = "margin-bot-xs";
                    jobTitle.textContent = title;
                    const jobDetails = document.createElement("div");
                    jobDetails.className = "position-details-wrap";
                    {
                        const branchEl = document.createElement("div");
                        branchEl.className = "bold-text";
                        branchEl.textContent = branch;
                        const departmentEl = document.createElement("div");
                        departmentEl.textContent = department;
                        const locationEl = document.createElement("div");
                        locationEl.textContent = location;
                        jobDetails.appendChild(branchEl);
                        jobDetails.appendChild(departmentEl);
                        jobDetails.appendChild(locationEl);
                    }
                    jobDiv.appendChild(jobTitle);
                    jobDiv.appendChild(jobDetails);
                }
                const imgEl = document.createElement("img");
                imgEl.className = "benefits-dropdown-icon";
                imgEl.src =
                    "https://assets-global.website-files.com/6267a1f7a8182aa6e6312ff3/6321ec3b48e94304a0437292_chevron_right.svg";
                imgEl.loading = "lazy";
                imgEl.alt = "";
                jobEl.appendChild(jobDiv);
                jobEl.appendChild(imgEl);
            }
            jobEl.addEventListener("click", () => openJobPopup(jobs[i]));
            containerEl.appendChild(jobEl);
        }
    }
    if (emptyEl) {
        emptyEl.style.display = jobs.length > 0 ? "none" : "block";
    }
};
const renderFilterOptions = (options) => {
    const formEl = document.getElementById("wf-form-Career-Form");
    if (formEl) {
        const entryLevelEl = formEl.querySelector('select[name="field"]');
        if (entryLevelEl) {
            // @ts-ignore
            $(entryLevelEl).niceSelect("destroy");
            entryLevelEl
                .querySelectorAll("option")
                .forEach((o, i) => i !== 0 && o.remove());
            options.entryLevel.forEach((x) => {
                const optionEl = document.createElement("option");
                optionEl.value = x;
                optionEl.text = x;
                entryLevelEl.appendChild(optionEl);
            });
            // @ts-ignore
            $(entryLevelEl).niceSelect();
        }
        const departmentEl = formEl.querySelector('select[name="field-2"]');
        if (departmentEl) {
            // @ts-ignore
            $(departmentEl).niceSelect("destroy");
            departmentEl
                .querySelectorAll("option")
                .forEach((o, i) => i !== 0 && o.remove());
            options.department.forEach((x) => {
                const optionEl = document.createElement("option");
                optionEl.value = x;
                optionEl.text = x;
                departmentEl.appendChild(optionEl);
            });
            // @ts-ignore
            $(departmentEl).niceSelect();
        }
        const locationEl = formEl.querySelector('select[name="field-3"]');
        if (locationEl) {
            // @ts-ignore
            $(locationEl).niceSelect("destroy");
            locationEl
                .querySelectorAll("option")
                .forEach((o, i) => i !== 0 && o.remove());
            options.location.forEach((x) => {
                const optionEl = document.createElement("option");
                optionEl.value = x;
                optionEl.text = x;
                locationEl.appendChild(optionEl);
            });
            // @ts-ignore
            $(locationEl).niceSelect();
        }
    }
};
const getFilterOptions = (jobs) => {
    const entryLevelOptions = new Set();
    const departmentOptions = new Set();
    const locationOptions = new Set();
    for (const job of jobs) {
        const { level, department, location } = job;
        if (!entryLevelOptions.has(level))
            entryLevelOptions.add(level);
        if (!departmentOptions.has(department))
            departmentOptions.add(department);
        if (!locationOptions.has(location))
            locationOptions.add(location);
    }
    return {
        entryLevel: Array.from(entryLevelOptions),
        department: Array.from(departmentOptions),
        location: Array.from(locationOptions),
    };
};
const openJobPopup = (job) => {
    const cleanText = (str) => {
        let s = str;
        s = s
            .replace(/&lt;/g, "<")
            .replace(/&gt;/g, ">")
            .replace(/&nbsp;/g, " ")
            .replace(/&amp;/g, "&");
        return s;
    };
    const popupEl = document.querySelector("div.job-description-popup");
    if (popupEl) {
        document.body.style.overflow = "hidden";
        popupEl.style.display = "flex";
        $(popupEl).animate({
            opacity: "1",
        });
        const { title, url, text: { description, tasksTitle, tasks, profileTitle, profile, benefitsTitle, benefits, }, } = job;
        const titleEl = popupEl.querySelector("h3#job-name");
        if (titleEl)
            titleEl.textContent = title;
        const richtextEl = popupEl.querySelector("div.job-description.w-richtext");
        if (richtextEl) {
            richtextEl.querySelectorAll("p, h4").forEach((x) => x.remove());
            if (description) {
                const pEl = document.createElement("p");
                pEl.innerHTML = cleanText(description);
                richtextEl.appendChild(pEl);
            }
            if (tasksTitle) {
                const h4El = document.createElement("h4");
                h4El.textContent = tasksTitle;
                richtextEl.appendChild(h4El);
            }
            if (tasks) {
                const pEl = document.createElement("p");
                pEl.innerHTML = cleanText(tasks);
                richtextEl.appendChild(pEl);
            }
            if (profileTitle) {
                const h4El = document.createElement("h4");
                h4El.textContent = profileTitle;
                richtextEl.appendChild(h4El);
            }
            if (profile) {
                const pEl = document.createElement("p");
                pEl.innerHTML = cleanText(profile);
                richtextEl.appendChild(pEl);
            }
            if (benefitsTitle) {
                const h4El = document.createElement("h4");
                h4El.textContent = benefitsTitle;
                richtextEl.appendChild(h4El);
            }
            if (benefits) {
                const pEl = document.createElement("p");
                pEl.innerHTML = cleanText(benefits);
                richtextEl.appendChild(pEl);
            }
        }
        const linkEl = popupEl.querySelector("a#apply-link");
        if (linkEl) {
            linkEl.href = url;
            linkEl.target = "_blank";
        }
    }
};
window.addEventListener("load", async () => {
    try {
        const sp = new URLSearchParams(window.location.search);
        const role = sp.get("role"), entryLevel = sp.get("entryLevel"), department = sp.get("department"), location = sp.get("location");
        const state = {
            jobs: {
                eng: [],
                ger: [],
            },
            filters: {
                role: role ? decodeURIComponent(role) : "",
                entryLevel: entryLevel ? decodeURIComponent(entryLevel) : "",
                department: department ? decodeURIComponent(department) : "",
                location: location ? decodeURIComponent(location) : "",
            },
            lang: "en",
            filterOptions: {
                eng: {
                    entryLevel: [],
                    department: [],
                    location: [],
                },
                ger: {
                    entryLevel: [],
                    department: [],
                    location: [],
                },
            },
        };
        // @ts-ignore
        const weglot = (window.Weglot || {});
        const response = await getJobs();
        const { data: { eng, ger }, } = response;
        state.jobs.eng = eng;
        state.jobs.ger = ger;
        state.filterOptions.eng = getFilterOptions(eng);
        state.filterOptions.ger = getFilterOptions(ger);
        state.lang = weglot.getCurrentLang();
        const loaderEl = document.querySelector("div#jobs-preloader");
        if (loaderEl)
            loaderEl.style.display = "none";
        renderFilterOptions(state.filterOptions[state.lang === "de" ? "ger" : "eng"]);
        const applyFilters = () => {
            const { filters, lang } = state;
            const jobs = state.jobs[lang === "de" ? "ger" : "eng"];
            const filteredJobs = [];
            for (const job of jobs) {
                const { title, level, department, location } = job;
                let flag = true;
                if (filters.role) {
                    flag = title.toLowerCase().includes(filters.role.toLowerCase());
                }
                if (flag && filters.entryLevel) {
                    flag = level === filters.entryLevel;
                }
                if (flag && filters.department) {
                    flag = department === filters.department;
                }
                if (flag && filters.location) {
                    flag = location === filters.location;
                }
                if (flag)
                    filteredJobs.push(job);
            }
            renderJobs(filteredJobs);
        };
        applyFilters();
        const formEl = document.getElementById("wf-form-Career-Form");
        if (formEl) {
            const onSumbit = () => {
                const filters = {
                    role: "",
                    entryLevel: "",
                    department: "",
                    location: "",
                };
                const roleEl = formEl.querySelector('input[name="Role"]');
                if (roleEl)
                    filters.role = roleEl.value;
                const entryLevelEl = formEl.querySelector('select[name="field"]');
                if (entryLevelEl)
                    filters.entryLevel = entryLevelEl.value;
                const departmentEl = formEl.querySelector('select[name="field-2"]');
                if (departmentEl)
                    filters.department = departmentEl.value;
                const locationEl = formEl.querySelector('select[name="field-3"]');
                if (locationEl)
                    filters.location = locationEl.value;
                state.filters = filters;
                console.log(filters);
                applyFilters();
            };
            formEl.addEventListener("submit", (ev) => {
                ev.preventDefault();
                ev.stopImmediatePropagation();
                onSumbit();
            });
        }
        weglot.on("languageChanged", (newLang, prevLang) => {
            // @ts-ignore
            state.lang = newLang;
            renderJobs(state.jobs[newLang === "de" ? "ger" : "eng"]);
            renderFilterOptions(state.filterOptions[newLang === "de" ? "ger" : "eng"]);
            state.filters = {
                role: "",
                entryLevel: "",
                department: "",
                location: "",
            };
        });
        const resetBtn = document.querySelector("button#reset-filter-job");
        if (resetBtn) {
            resetBtn.addEventListener("click", () => {
                const filters = {
                    role: "",
                    entryLevel: "",
                    department: "",
                    location: "",
                };
                state.filters = filters;
                renderFilterOptions(state.filterOptions[state.lang === "de" ? "ger" : "eng"]);
                applyFilters();
            });
        }
    }
    catch (error) {
        console.error(error);
    }
});
