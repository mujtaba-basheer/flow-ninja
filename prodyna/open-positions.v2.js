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
const renderFilterOptions = (options, filters) => {
    const formEl = document.getElementById("wf-form-Career-Form");
    if (formEl) {
        const roleEl = formEl.querySelector('input[name="Role"]');
        if (roleEl && (filters === null || filters === void 0 ? void 0 : filters.role))
            roleEl.value = filters.role;
        const countryEl = formEl.querySelector('select[name="field"]');
        if (countryEl) {
            // @ts-ignore
            $(countryEl).niceSelect("destroy");
            countryEl
                .querySelectorAll("option")
                .forEach((o, i) => i !== 0 && o.remove());
            options.country.forEach((x) => {
                const optionEl = document.createElement("option");
                optionEl.value = x;
                optionEl.text = x;
                countryEl.appendChild(optionEl);
            });
            // @ts-ignore
            $(countryEl).niceSelect();
            if (filters === null || filters === void 0 ? void 0 : filters.country) {
                countryEl.value = filters.country;
                // @ts-ignore
                $(countryEl).niceSelect("update");
            }
        }
        const officeEl = formEl.querySelector('select[name="field-2"]');
        if (officeEl) {
            // @ts-ignore
            $(officeEl).niceSelect("destroy");
            officeEl
                .querySelectorAll("option")
                .forEach((o, i) => i !== 0 && o.remove());
            options.office.forEach((x) => {
                const optionEl = document.createElement("option");
                optionEl.value = x;
                optionEl.text = x;
                officeEl.appendChild(optionEl);
            });
            // @ts-ignore
            $(officeEl).niceSelect();
            if (filters === null || filters === void 0 ? void 0 : filters.office)
                officeEl.value = filters.office;
            // @ts-ignore
            $(officeEl).niceSelect("update");
        }
        const careerPathEl = formEl.querySelector('select[name="field-3"]');
        if (careerPathEl) {
            // @ts-ignore
            $(careerPathEl).niceSelect("destroy");
            careerPathEl
                .querySelectorAll("option")
                .forEach((o, i) => i !== 0 && o.remove());
            options.career_path.forEach((x) => {
                const optionEl = document.createElement("option");
                optionEl.value = x;
                optionEl.text = x;
                careerPathEl.appendChild(optionEl);
            });
            // @ts-ignore
            $(careerPathEl).niceSelect();
            if (filters === null || filters === void 0 ? void 0 : filters.career_path)
                careerPathEl.value = filters.career_path;
            // @ts-ignore
            $(careerPathEl).niceSelect("update");
        }
    }
    window.history.pushState("", document.title, window.location.pathname);
};
const getFilterOptions = (jobs) => {
    const countryOptions = new Set();
    const officeOptions = new Set();
    const careerPathOptions = new Set();
    for (const job of jobs) {
        const { country, department, location } = job;
        if (!countryOptions.has(country))
            countryOptions.add(country);
        if (!officeOptions.has(location))
            officeOptions.add(location);
        if (!careerPathOptions.has(department))
            careerPathOptions.add(department);
    }
    return {
        country: Array.from(countryOptions),
        office: Array.from(officeOptions),
        career_path: Array.from(careerPathOptions),
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
        const role = sp.get("role"), country = sp.get("country"), office = sp.get("office"), career_path = sp.get("career_path");
        const state = {
            jobs: [],
            filters: {
                role: role ? decodeURIComponent(role) : "",
                country: country ? decodeURIComponent(country) : "",
                office: office ? decodeURIComponent(office) : "",
                career_path: career_path ? decodeURIComponent(career_path) : "",
            },
            lang: "en",
            filterOptions: {
                country: [],
                office: [],
                career_path: [],
            },
        };
        // @ts-ignore
        const weglot = (window.Weglot || {});
        const response = await getJobs();
        const { data: { eng, ger }, } = response;
        state.jobs = [...eng, ...ger];
        state.filterOptions = getFilterOptions(state.jobs);
        console.log({ filterOptions: state.filterOptions });
        state.lang = weglot.getCurrentLang();
        const loaderEl = document.querySelector("div#jobs-preloader");
        if (loaderEl)
            loaderEl.style.display = "none";
        renderFilterOptions(state.filterOptions, state.filters);
        // renderJobs(state.jobs);
        const applyFilters = () => {
            const { filters, jobs } = state;
            const filteredJobs = [];
            for (const job of jobs) {
                const { title, department, location, country } = job;
                let flag = true;
                if (filters.role) {
                    flag = title.toLowerCase().includes(filters.role.toLowerCase());
                }
                if (flag && filters.country) {
                    flag = country === filters.country;
                }
                if (flag && filters.office) {
                    flag = location === filters.office;
                }
                if (flag && filters.career_path) {
                    flag = department === filters.career_path;
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
                    country: "",
                    office: "",
                    career_path: "",
                };
                const roleEl = formEl.querySelector('input[name="Role"]');
                if (roleEl)
                    filters.role = roleEl.value;
                const countryEl = formEl.querySelector('select[name="field"]');
                if (countryEl)
                    filters.country = countryEl.value;
                const officeEl = formEl.querySelector('select[name="field-2"]');
                if (officeEl)
                    filters.office = officeEl.value;
                const careerPathEl = formEl.querySelector('select[name="field-3"]');
                if (careerPathEl)
                    filters.career_path = careerPathEl.value;
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
        const resetBtn = document.querySelector("button#reset-filter-job");
        if (resetBtn) {
            resetBtn.addEventListener("click", () => {
                const filters = {
                    role: "",
                    country: "",
                    office: "",
                    career_path: "",
                };
                state.filters = filters;
                renderFilterOptions(state.filterOptions);
                applyFilters();
            });
        }
    }
    catch (error) {
        console.error(error);
    }
});
