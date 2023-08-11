interface Window {
  Wized: {
    request: {
      execute: (name: string) => Promise<null>;
    };
    data: {
      get: <T>(name: string) => Promise<T>;
      setVariable: (key: string, value: any) => Promise<null>;
    };
  };
}
type AddedUserT = {
  id: number;
  email: string;
  First_Name: string;
  Last_Name: string;
  groups_id: number;
};
type UserDataT = {
  root: {
    id: number;
    created_at: number;
    email: string;
    First_Name: string;
    Last_Name: string;
    invites_left: number;
    quantity: number;
    groups_id: number;
    subscription_period: "monthly" | "yearly";
  };
  added: AddedUserT[];
};

const wizedIn = async () => {
  const Wized = window.Wized;
  try {
    await Wized.request.execute("Get User Data");
    const { root, added } = await Wized.data.get<UserDataT>("r.5.d");

    // await Wized.data.setVariable("to_invite", "");
    const invitesWrapper = document.querySelector(
      ".dashboard-team-acc-wrapper"
    );
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
            if (addedUser) inviteBtn.style.display = "none";

            inviteBtn.addEventListener("click", async (ev) => {
              ev.preventDefault();
              try {
                const email = inputEl.value.trim();
                const body = JSON.stringify({ invited_user_email: email });
                const token = await Wized.data.get("c.token");
                const req = await fetch(
                  "https://xftf-jpdt-k3rz.n7c.xano.io/api:8kVBgN5r/invite",
                  {
                    method: "POST",
                    body,
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: `Bearer ${token}`,
                    },
                  }
                );
                if (req.status === 200) {
                  inviteBtn.style.display = "none";
                  deleteBtn.style.display = "";
                }
              } catch (error) {
                console.error(error);
              }
            });

            const deleteBtn = document.createElement("a");
            deleteBtn.className = "delete-button-small w-button";
            deleteBtn.href = "#";
            deleteBtn.textContent = "Remove";
            if (!addedUser) deleteBtn.style.display = "none";
            deleteBtn.addEventListener("click", async () => {
              try {
                const email = inputEl.value.trim();
                const token = await Wized.data.get("c.token");
                const req = await fetch(
                  "https://xftf-jpdt-k3rz.n7c.xano.io/api:8kVBgN5r/remove_user",
                  {
                    method: "POST",
                    body: JSON.stringify({ email }),
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: `Bearer ${token}`,
                    },
                  }
                );
                if (req.status === 200) {
                  inputEl.value = "";
                  deleteBtn.style.display = "none";
                  inviteBtn.style.display = "";
                }
              } catch (error) {
                console.error(error);
              }
            });

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
  } catch (error) {
    console.error(error);
  }

  // Plans card
  try {
    const { result_1 } = (await Wized.data.get("r.3.d")) as any;
    if (result_1.subscription_period === "yearly") {
      $(".pricin-main-tabs-menu a:last-child").trigger("click");
    }

    const addCurrentStyling = () => {
      $(".dashboard-settings-pricing-card").each(function () {
        const planStatusEl = this.querySelector(".plan-pill.current-plan div");
        if (planStatusEl) {
          const planStatus = (planStatusEl.textContent || "").toLowerCase();
          if (planStatus === "current plan") {
            this.classList.add("current");
          }
        }
      });
    };

    setTimeout(addCurrentStyling, 1000);
  } catch (error) {
    console.error(error);
  }
};

window.addEventListener("load", wizedIn);
