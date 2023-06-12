const wizedIn = async () => {
    try {
        const Wized = window.Wized;
        await Wized.request.execute("Get User Data");
        const { root, added } = await Wized.data.get("r.5.d");
        // await Wized.data.setVariable("to_invite", "");
        const invitesWrapper = document.querySelector(".dashboard-team-acc-wrapper");
        if (invitesWrapper) {
            const { quantity } = root;
            for (let i = 1; i <= quantity; i++) {
                const inviteEl = document.createElement("div");
                inviteEl.className = "column full-width";
                const addedUser = added[i - 1];
                {
                    const labelEl = document.createElement("label");
                    labelEl.className = "text-m margin-bot-xs text-neutral-100";
                    labelEl.htmlFor = `team-user-${i}`;
                    labelEl.textContent = `Email (User ${i})`;
                    const inputWrapper = document.createElement("div");
                    inputWrapper.className = "dashboard-team-new-user-wrapper";
                    {
                        const inputEl = document.createElement("input");
                        inputEl.id = `team-user-${i}`;
                        inputEl.className = "input max-412 w-input";
                        inputEl.type = "email";
                        inputEl.maxLength = 256;
                        inputEl.name = `team-user-${i}`;
                        inputEl.setAttribute("data-name", `team-user-${i}`);
                        inputEl.setAttribute("wized", `addTeamMember${i}`);
                        inputEl.required = true;
                        {
                            if (addedUser) {
                                inputEl.value = addedUser.email;
                            }
                        }
                        const inviteBtn = document.createElement("a");
                        inviteBtn.className = "button-outlined-small white w-button";
                        inviteBtn.href = "#";
                        inviteBtn.textContent = "Invite";
                        if (addedUser)
                            inviteBtn.style.display = "none";
                        inviteBtn.addEventListener("click", async (ev) => {
                            ev.preventDefault();
                            // await Wized.data.setVariable("to_invite", inputEl.value);
                        });
                        const deleteBtn = document.createElement("a");
                        deleteBtn.className = "delete-button-small w-button";
                        deleteBtn.href = "#";
                        deleteBtn.textContent = "Remove";
                        if (!addedUser)
                            deleteBtn.style.display = "none";
                        inputWrapper.appendChild(inputEl);
                        inputWrapper.appendChild(inviteBtn);
                        inputWrapper.appendChild(deleteBtn);
                    }
                    inviteEl.appendChild(labelEl);
                    inviteEl.appendChild(inputWrapper);
                }
                invitesWrapper.appendChild(inviteEl);
            }
        }
    }
    catch (error) {
        console.error(error);
    }
};
wizedIn();
