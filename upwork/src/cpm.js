window.addEventListener("load", (ev) => {
    const inputFieldIDs = ["cost", "cpm", "impression"];
    const state = {
        active: new Set(),
        disabled: null,
        values: {
            cost: null,
            cpm: null,
            impression: null,
        },
    };
    const formEl = document.querySelector("#wf-form-Conversion-Form");
    const resultEl = document.querySelector("div.calculator-results-wrapper");
    const resetBtn = document.getElementById("reset-button");
    const conversionEl = document.querySelector("div.conversion-rate-section");
    formEl.reset();
    const toggleText = (field) => {
        const textEl = document.querySelector("div.calc-info");
        if (field) {
            textEl.style.display = "block";
            document.getElementById("calcField").textContent = field;
        }
        else {
            textEl.style.display = "none";
        }
    };
    const resetForm = () => {
        formEl.reset();
        inputFieldIDs.forEach((id) => {
            const el = document.getElementById(id);
            el.classList.remove("disabled");
            el.setAttribute("required", "true");
            state.values[id] = null;
        });
        state.active.clear();
        state.disabled = null;
    };
    const onInput = (val, field) => {
        if (!val) {
            state.disabled = null;
            state.active.delete(field);
            state.values[field] = null;
        }
        else {
            if (!isNaN(Number(val))) {
                state.values[field] = Number(val);
            }
            state.active.add(field);
            if ([...state.active].length === 2) {
                let disabled = null;
                for (const id of inputFieldIDs) {
                    if (!state.active.has(id)) {
                        disabled = id;
                        break;
                    }
                }
                state.disabled = disabled;
            }
        }
        inputFieldIDs.forEach((id) => {
            const el = document.getElementById(id);
            if (state.disabled && state.disabled === id) {
                el.classList.add("disabled");
                el.removeAttribute("required");
                return;
            }
            el.classList.remove("disabled");
            el.setAttribute("required", "true");
        });
        toggleText(state.disabled);
    };
    inputFieldIDs.forEach((id) => {
        const el = document.getElementById(id);
        el.addEventListener("input", () => onInput(el.value, id));
    });
    formEl.addEventListener("submit", (ev) => {
        ev.preventDefault();
        ev.stopImmediatePropagation();
        ev.stopPropagation();
        let { cpm, cost, impression } = state.values;
        if (cpm === null) {
            cpm = (cost / impression) * 1000;
            state.values.cpm = cpm;
        }
        else if (cost === null) {
            cost = (cpm * impression) / 1000;
            state.values.cost = cost;
        }
        else if (impression === null) {
            impression = (cost / cpm) * 1000;
            state.values.impression = impression;
        }
        else
            return;
        formEl.style.display = "none";
        resultEl.style.display = "block";
        conversionEl.style.display = "flex";
        for (const id of inputFieldIDs) {
            document.getElementById(`${id}Result`).textContent =
                state.values[id].toFixed(2) + "";
        }
        resetForm();
    });
    resetBtn.addEventListener("click", () => {
        formEl.style.display = "grid";
        resultEl.style.display = "none";
    });
});
