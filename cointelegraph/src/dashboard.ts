interface Window {
  Wized: {
    request: {
      execute: (name: string) => Promise<null>;
    };
    data: {
      get: <T>(name: string) => Promise<T>;
      setVariable: (key: string, value: any) => Promise<null>;
      listen: (value: string, listener: Function) => void;
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
type UserData5T = {
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
    const { root, added } = await Wized.data.get<UserData5T>("r.5.d");

    // await Wized.data.setVariable("to_invite", "");
    const invitesWrapper = document.querySelector(
      ".dashboard-team-acc-wrapper"
    );
    if (invitesWrapper && root) {
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
    const monthlyTab = document.querySelector(
      `div.monthly-tabs[data-w-tab="Monthly "]`
    );
    const yearlyTab = document.querySelector(
      `div.yearly-tabs[data-w-tab="Yearly"]`
    );

    if (monthlyTab && yearlyTab) {
      const userData = await Wized.data.get<UserData3T>("r.3.d.result_1");
      if (userData) {
        const { subscription_period, plan_type } = userData;

        const monthlyCards = monthlyTab.querySelectorAll<HTMLAnchorElement>(
          "a.dashboard-settings-pricing-card"
        );
        const yearlyCards = yearlyTab.querySelectorAll<HTMLAnchorElement>(
          "a.dashboard-settings-pricing-card"
        );

        console.log(
          `%c${plan_type} ${subscription_period}`,
          "color: blue; background: yellow; text-transform: uppercase;"
        );
        switch (subscription_period) {
          case "yearly": {
            const yearlyTabLink = document.querySelector<HTMLAnchorElement>(
              `a.yearly-tab-link[data-w-tab="Yearly"]`
            );
            if (yearlyTabLink) $(yearlyTabLink).trigger("click");

            switch (plan_type) {
              case "free": {
                // free cards
                {
                  let freeCard = monthlyCards.item(0);
                  freeCard.classList.add("current");
                  let labelEl = freeCard.querySelector<HTMLDivElement>(
                    "div.plan-pill.current-plan .label-s"
                  );
                  if (labelEl) {
                    labelEl.textContent = "Current plan";
                  }

                  let newCard = freeCard.cloneNode(true);
                  freeCard.parentNode?.replaceChild(newCard, freeCard);

                  freeCard = yearlyCards.item(0);
                  freeCard.classList.add("current");
                  labelEl = freeCard.querySelector<HTMLDivElement>(
                    "div.plan-pill.current-plan .label-s"
                  );
                  if (labelEl) {
                    labelEl.textContent = "Current plan";
                  }

                  newCard = freeCard.cloneNode(true);
                  freeCard.parentNode?.replaceChild(newCard, freeCard);
                }

                // pro cards
                {
                  let proCard = monthlyCards.item(1);
                  proCard.classList.remove("current");
                  let labelEl = proCard.querySelector<HTMLDivElement>(
                    "div.plan-pill.current-plan .label-s"
                  );
                  if (labelEl) {
                    labelEl.textContent = "Upgrade plan";
                  }

                  let newCard = proCard.cloneNode(true);
                  proCard.parentNode?.replaceChild(newCard, proCard);

                  proCard = yearlyCards.item(1);
                  proCard.classList.remove("current");
                  labelEl = proCard.querySelector<HTMLDivElement>(
                    "div.plan-pill.current-plan .label-s"
                  );
                  if (labelEl) {
                    labelEl.textContent = "Upgrade plan";
                  }

                  newCard = proCard.cloneNode(true);
                  proCard.parentNode?.replaceChild(newCard, proCard);
                }

                // premium cards
                {
                  let premiumCard = monthlyCards.item(2);
                  premiumCard.classList.remove("current");
                  let labelEl = premiumCard.querySelector<HTMLDivElement>(
                    "div.plan-pill.current-plan .label-s"
                  );
                  if (labelEl) {
                    labelEl.textContent = "Upgrade plan";
                  }

                  let newCard = premiumCard.cloneNode(true);
                  premiumCard.parentNode?.replaceChild(newCard, premiumCard);

                  premiumCard = yearlyCards.item(2);
                  premiumCard.classList.remove("current");
                  labelEl = premiumCard.querySelector<HTMLDivElement>(
                    "div.plan-pill.current-plan .label-s"
                  );
                  if (labelEl) {
                    labelEl.textContent = "Upgrade plan";
                  }

                  newCard = premiumCard.cloneNode(true);
                  premiumCard.parentNode?.replaceChild(newCard, premiumCard);
                }

                // enterprise cards
                {
                  let enterpriseCard = monthlyCards.item(3);
                  enterpriseCard.classList.remove("current");
                  let labelEl = enterpriseCard.querySelector<HTMLDivElement>(
                    "div.plan-pill.current-plan .label-s"
                  );
                  if (labelEl) {
                    labelEl.textContent = "Contact us";
                  }

                  enterpriseCard = yearlyCards.item(3);
                  enterpriseCard.classList.remove("current");
                  labelEl = enterpriseCard.querySelector<HTMLDivElement>(
                    "div.plan-pill.current-plan .label-s"
                  );
                  if (labelEl) {
                    labelEl.textContent = "Contact us";
                  }
                }
                break;
              }
              case "pro": {
                // free cards
                {
                  let freeCard = monthlyCards.item(0);
                  freeCard.classList.remove("current");
                  let labelEl = freeCard.querySelector<HTMLDivElement>(
                    "div.plan-pill.current-plan .label-s"
                  );
                  if (labelEl) {
                    labelEl.textContent = "Downgrade plan";
                  }

                  freeCard = yearlyCards.item(0);
                  freeCard.classList.remove("current");
                  labelEl = freeCard.querySelector<HTMLDivElement>(
                    "div.plan-pill.current-plan .label-s"
                  );
                  if (labelEl) {
                    labelEl.textContent = "Downgrade plan";
                  }
                }

                // pro cards
                {
                  let proCard = monthlyCards.item(1);
                  proCard.classList.remove("current");
                  proCard.href = "#";
                  let labelEl = proCard.querySelector<HTMLDivElement>(
                    "div.plan-pill.current-plan .label-s"
                  );
                  if (labelEl) {
                    labelEl.textContent = "Downgrade plan";
                  }

                  proCard = yearlyCards.item(1);
                  proCard.classList.add("current");
                  proCard.href = "#";
                  labelEl = proCard.querySelector<HTMLDivElement>(
                    "div.plan-pill.current-plan .label-s"
                  );
                  if (labelEl) {
                    labelEl.textContent = "Current plan";
                  }

                  let newCard = proCard.cloneNode(true);
                  proCard.parentNode?.replaceChild(newCard, proCard);
                }

                // premium cards
                {
                  let premiumCard = monthlyCards.item(2);
                  premiumCard.classList.remove("current");
                  premiumCard.href = "#";
                  let labelEl = premiumCard.querySelector<HTMLDivElement>(
                    "div.plan-pill.current-plan .label-s"
                  );
                  if (labelEl) {
                    labelEl.textContent = "Upgrade plan";
                  }

                  premiumCard = yearlyCards.item(2);
                  premiumCard.classList.remove("current");
                  premiumCard.href = "#";
                  labelEl = premiumCard.querySelector<HTMLDivElement>(
                    "div.plan-pill.current-plan .label-s"
                  );
                  if (labelEl) {
                    labelEl.textContent = "Upgrade plan";
                  }
                }

                // enterprise cards
                {
                  let enterpriseCard = monthlyCards.item(3);
                  enterpriseCard.classList.remove("current");
                  let labelEl = enterpriseCard.querySelector<HTMLDivElement>(
                    "div.plan-pill.current-plan .label-s"
                  );
                  if (labelEl) {
                    labelEl.textContent = "Contact us";
                  }

                  enterpriseCard = yearlyCards.item(3);
                  enterpriseCard.classList.remove("current");
                  labelEl = enterpriseCard.querySelector<HTMLDivElement>(
                    "div.plan-pill.current-plan .label-s"
                  );
                  if (labelEl) {
                    labelEl.textContent = "Contact us";
                  }
                }
                break;
              }
              case "premium": {
                // free cards
                {
                  let freeCard = monthlyCards.item(0);
                  freeCard.classList.remove("current");
                  let labelEl = freeCard.querySelector<HTMLDivElement>(
                    "div.plan-pill.current-plan .label-s"
                  );
                  if (labelEl) {
                    labelEl.textContent = "Downgrade plan";
                  }

                  freeCard = yearlyCards.item(0);
                  freeCard.classList.remove("current");
                  labelEl = freeCard.querySelector<HTMLDivElement>(
                    "div.plan-pill.current-plan .label-s"
                  );
                  if (labelEl) {
                    labelEl.textContent = "Downgrade plan";
                  }
                }

                // pro cards
                {
                  let proCard = monthlyCards.item(1);
                  proCard.classList.remove("current");
                  proCard.href = "#";
                  let labelEl = proCard.querySelector<HTMLDivElement>(
                    "div.plan-pill.current-plan .label-s"
                  );
                  if (labelEl) {
                    labelEl.textContent = "Dwongrade plan";
                  }

                  proCard = yearlyCards.item(1);
                  proCard.classList.remove("current");
                  proCard.href = "#";
                  labelEl = proCard.querySelector<HTMLDivElement>(
                    "div.plan-pill.current-plan .label-s"
                  );
                  if (labelEl) {
                    labelEl.textContent = "Dwongrade plan";
                  }
                }

                // premium cards
                {
                  let premiumCard = monthlyCards.item(2);
                  premiumCard.classList.remove("current");
                  premiumCard.href = "#";
                  let labelEl = premiumCard.querySelector<HTMLDivElement>(
                    "div.plan-pill.current-plan .label-s"
                  );
                  if (labelEl) {
                    labelEl.textContent = "Downgrade plan";
                  }

                  premiumCard = yearlyCards.item(2);
                  premiumCard.classList.add("current");
                  premiumCard.href = "#";
                  labelEl = premiumCard.querySelector<HTMLDivElement>(
                    "div.plan-pill.current-plan .label-s"
                  );
                  if (labelEl) {
                    labelEl.textContent = "Current plan";
                  }

                  let newCard = premiumCard.cloneNode(true);
                  premiumCard.parentNode?.replaceChild(newCard, premiumCard);
                }

                // enterprise cards
                {
                  let enterpriseCard = monthlyCards.item(3);
                  enterpriseCard.classList.remove("current");
                  let labelEl = enterpriseCard.querySelector<HTMLDivElement>(
                    "div.plan-pill.current-plan .label-s"
                  );
                  if (labelEl) {
                    labelEl.textContent = "Contact us";
                  }

                  enterpriseCard = yearlyCards.item(3);
                  enterpriseCard.classList.remove("current");
                  labelEl = enterpriseCard.querySelector<HTMLDivElement>(
                    "div.plan-pill.current-plan .label-s"
                  );
                  if (labelEl) {
                    labelEl.textContent = "Contact us";
                  }
                }
                break;
              }
              case "enterprise": {
                // free cards
                {
                  let freeCard = monthlyCards.item(0);
                  freeCard.classList.remove("current");
                  let labelEl = freeCard.querySelector<HTMLDivElement>(
                    "div.plan-pill.current-plan .label-s"
                  );
                  if (labelEl) {
                    labelEl.textContent = "Downgrade plan";
                  }

                  freeCard = yearlyCards.item(0);
                  freeCard.classList.remove("current");
                  labelEl = freeCard.querySelector<HTMLDivElement>(
                    "div.plan-pill.current-plan .label-s"
                  );
                  if (labelEl) {
                    labelEl.textContent = "Downgrade plan";
                  }
                }

                // pro cards
                {
                  let proCard = monthlyCards.item(1);
                  proCard.classList.remove("current");
                  proCard.href = "#";
                  let labelEl = proCard.querySelector<HTMLDivElement>(
                    "div.plan-pill.current-plan .label-s"
                  );
                  if (labelEl) {
                    labelEl.textContent = "Dwongrade plan";
                  }

                  proCard = yearlyCards.item(1);
                  proCard.classList.remove("current");
                  proCard.href = "#";
                  labelEl = proCard.querySelector<HTMLDivElement>(
                    "div.plan-pill.current-plan .label-s"
                  );
                  if (labelEl) {
                    labelEl.textContent = "Dwongrade plan";
                  }
                }

                // premium cards
                {
                  let premiumCard = monthlyCards.item(2);
                  premiumCard.classList.remove("current");
                  premiumCard.href = "#";
                  let labelEl = premiumCard.querySelector<HTMLDivElement>(
                    "div.plan-pill.current-plan .label-s"
                  );
                  if (labelEl) {
                    labelEl.textContent = "Downgrade plan";
                  }

                  premiumCard = yearlyCards.item(2);
                  premiumCard.classList.remove("current");
                  premiumCard.href = "#";
                  labelEl = premiumCard.querySelector<HTMLDivElement>(
                    "div.plan-pill.current-plan .label-s"
                  );
                  if (labelEl) {
                    labelEl.textContent = "Downgrade plan";
                  }
                }

                // enterprise cards
                {
                  let enterpriseCard = monthlyCards.item(3);
                  enterpriseCard.classList.remove("current");
                  let labelEl = enterpriseCard.querySelector<HTMLDivElement>(
                    "div.plan-pill.current-plan .label-s"
                  );
                  if (labelEl) {
                    labelEl.textContent = "Contact us";
                  }

                  enterpriseCard = yearlyCards.item(3);
                  enterpriseCard.classList.add("current");
                  enterpriseCard.href = "#";
                  enterpriseCard.addEventListener("click", (ev) =>
                    ev.preventDefault()
                  );
                  labelEl = enterpriseCard.querySelector<HTMLDivElement>(
                    "div.plan-pill.current-plan .label-s"
                  );
                  if (labelEl) {
                    labelEl.textContent = "Current plan";
                  }
                }
                break;
              }
            }
            break;
          }
          default: {
            switch (plan_type) {
              case "free": {
                // free cards
                {
                  let freeCard = monthlyCards.item(0);
                  freeCard.classList.add("current");
                  let labelEl = freeCard.querySelector<HTMLDivElement>(
                    "div.plan-pill.current-plan .label-s"
                  );
                  if (labelEl) {
                    labelEl.textContent = "Current plan";
                  }

                  let newCard = freeCard.cloneNode(true);
                  freeCard.parentNode?.replaceChild(newCard, freeCard);

                  freeCard = yearlyCards.item(0);
                  freeCard.classList.add("current");
                  labelEl = freeCard.querySelector<HTMLDivElement>(
                    "div.plan-pill.current-plan .label-s"
                  );
                  if (labelEl) {
                    labelEl.textContent = "Current plan";
                  }

                  newCard = freeCard.cloneNode(true);
                  freeCard.parentNode?.replaceChild(newCard, freeCard);
                }

                // pro cards
                {
                  let proCard = monthlyCards.item(1);
                  proCard.classList.remove("current");
                  let labelEl = proCard.querySelector<HTMLDivElement>(
                    "div.plan-pill.current-plan .label-s"
                  );
                  if (labelEl) {
                    labelEl.textContent = "Upgrade plan";
                  }

                  let newCard = proCard.cloneNode(true);
                  proCard.parentNode?.replaceChild(newCard, proCard);

                  proCard = yearlyCards.item(1);
                  proCard.classList.remove("current");
                  labelEl = proCard.querySelector<HTMLDivElement>(
                    "div.plan-pill.current-plan .label-s"
                  );
                  if (labelEl) {
                    labelEl.textContent = "Upgrade plan";
                  }

                  newCard = proCard.cloneNode(true);
                  proCard.parentNode?.replaceChild(newCard, proCard);
                }

                // premium cards
                {
                  let premiumCard = monthlyCards.item(2);
                  premiumCard.classList.remove("current");
                  let labelEl = premiumCard.querySelector<HTMLDivElement>(
                    "div.plan-pill.current-plan .label-s"
                  );

                  if (labelEl) {
                    labelEl.textContent = "Upgrade plan";
                  }

                  let newCard = premiumCard.cloneNode(true);
                  premiumCard.parentNode?.replaceChild(newCard, premiumCard);

                  premiumCard = yearlyCards.item(2);
                  premiumCard.classList.remove("current");
                  labelEl = premiumCard.querySelector<HTMLDivElement>(
                    "div.plan-pill.current-plan .label-s"
                  );
                  if (labelEl) {
                    labelEl.textContent = "Upgrade plan";
                  }

                  newCard = premiumCard.cloneNode(true);
                  premiumCard.parentNode?.replaceChild(newCard, premiumCard);
                }

                // enterprise cards
                {
                  let enterpriseCard = monthlyCards.item(3);
                  enterpriseCard.classList.remove("current");
                  let labelEl = enterpriseCard.querySelector<HTMLDivElement>(
                    "div.plan-pill.current-plan .label-s"
                  );
                  if (labelEl) {
                    labelEl.textContent = "Contact us";
                  }

                  enterpriseCard = yearlyCards.item(3);
                  enterpriseCard.classList.remove("current");
                  labelEl = enterpriseCard.querySelector<HTMLDivElement>(
                    "div.plan-pill.current-plan .label-s"
                  );
                  if (labelEl) {
                    labelEl.textContent = "Contact us";
                  }
                }
                break;
              }
              case "pro": {
                // free cards
                {
                  let freeCard = monthlyCards.item(0);
                  freeCard.classList.remove("current");
                  let labelEl = freeCard.querySelector<HTMLDivElement>(
                    "div.plan-pill.current-plan .label-s"
                  );
                  if (labelEl) {
                    labelEl.textContent = "Downgrade plan";
                  }

                  freeCard = yearlyCards.item(0);
                  freeCard.classList.remove("current");
                  labelEl = freeCard.querySelector<HTMLDivElement>(
                    "div.plan-pill.current-plan .label-s"
                  );
                  if (labelEl) {
                    labelEl.textContent = "Downgrade plan";
                  }
                }

                // pro cards
                {
                  let proCard = monthlyCards.item(1);
                  proCard.classList.add("current");
                  proCard.href = "#";
                  let labelEl = proCard.querySelector<HTMLDivElement>(
                    "div.plan-pill.current-plan .label-s"
                  );
                  if (labelEl) {
                    labelEl.textContent = "Current plan";
                  }

                  let newCard = proCard.cloneNode(true);
                  proCard.parentNode?.replaceChild(newCard, proCard);

                  proCard = yearlyCards.item(1);
                  proCard.classList.remove("current");
                  proCard.href = "#";
                  labelEl = proCard.querySelector<HTMLDivElement>(
                    "div.plan-pill.current-plan .label-s"
                  );
                  if (labelEl) {
                    labelEl.textContent = "Upgrade plan";
                  }
                }

                // premium cards
                {
                  let premiumCard = monthlyCards.item(2);
                  premiumCard.classList.remove("current");
                  premiumCard.href = "#";
                  let labelEl = premiumCard.querySelector<HTMLDivElement>(
                    "div.plan-pill.current-plan .label-s"
                  );
                  if (labelEl) {
                    labelEl.textContent = "Upgrade plan";
                  }

                  premiumCard = yearlyCards.item(2);
                  premiumCard.classList.remove("current");
                  premiumCard.href = "#";
                  labelEl = premiumCard.querySelector<HTMLDivElement>(
                    "div.plan-pill.current-plan .label-s"
                  );
                  if (labelEl) {
                    labelEl.textContent = "Upgrade plan";
                  }
                }

                // enterprise cards
                {
                  let enterpriseCard = monthlyCards.item(3);
                  enterpriseCard.classList.remove("current");
                  let labelEl = enterpriseCard.querySelector<HTMLDivElement>(
                    "div.plan-pill.current-plan .label-s"
                  );
                  if (labelEl) {
                    labelEl.textContent = "Contact us";
                  }

                  enterpriseCard = yearlyCards.item(3);
                  enterpriseCard.classList.remove("current");
                  labelEl = enterpriseCard.querySelector<HTMLDivElement>(
                    "div.plan-pill.current-plan .label-s"
                  );
                  if (labelEl) {
                    labelEl.textContent = "Contact us";
                  }
                }
                break;
              }
              case "premium": {
                // free cards
                {
                  let freeCard = monthlyCards.item(0);
                  freeCard.classList.remove("current");
                  let labelEl = freeCard.querySelector<HTMLDivElement>(
                    "div.plan-pill.current-plan .label-s"
                  );
                  if (labelEl) {
                    labelEl.textContent = "Downgrade plan";
                  }

                  freeCard = yearlyCards.item(0);
                  freeCard.classList.remove("current");
                  labelEl = freeCard.querySelector<HTMLDivElement>(
                    "div.plan-pill.current-plan .label-s"
                  );
                  if (labelEl) {
                    labelEl.textContent = "Downgrade plan";
                  }
                }

                // pro cards
                {
                  let proCard = monthlyCards.item(1);
                  proCard.classList.remove("current");
                  proCard.href = "#";
                  let labelEl = proCard.querySelector<HTMLDivElement>(
                    "div.plan-pill.current-plan .label-s"
                  );
                  if (labelEl) {
                    labelEl.textContent = "Dwongrade plan";
                  }

                  proCard = yearlyCards.item(1);
                  proCard.classList.remove("current");
                  proCard.href = "#";
                  labelEl = proCard.querySelector<HTMLDivElement>(
                    "div.plan-pill.current-plan .label-s"
                  );
                  if (labelEl) {
                    labelEl.textContent = "Dwongrade plan";
                  }
                }

                // premium cards
                {
                  let premiumCard = monthlyCards.item(2);
                  premiumCard.classList.add("current");
                  premiumCard.href = "#";
                  let labelEl = premiumCard.querySelector<HTMLDivElement>(
                    "div.plan-pill.current-plan .label-s"
                  );
                  if (labelEl) {
                    labelEl.textContent = "Current plan";
                  }

                  let newCard = premiumCard.cloneNode(true);
                  premiumCard.parentNode?.replaceChild(newCard, premiumCard);

                  premiumCard = yearlyCards.item(2);
                  premiumCard.classList.remove("current");
                  premiumCard.href = "#";
                  labelEl = premiumCard.querySelector<HTMLDivElement>(
                    "div.plan-pill.current-plan .label-s"
                  );
                  if (labelEl) {
                    labelEl.textContent = "Upgrade plan";
                  }
                }

                // enterprise cards
                {
                  let enterpriseCard = monthlyCards.item(3);
                  enterpriseCard.classList.remove("current");
                  let labelEl = enterpriseCard.querySelector<HTMLDivElement>(
                    "div.plan-pill.current-plan .label-s"
                  );
                  if (labelEl) {
                    labelEl.textContent = "Contact us";
                  }

                  enterpriseCard = yearlyCards.item(3);
                  enterpriseCard.classList.remove("current");
                  labelEl = enterpriseCard.querySelector<HTMLDivElement>(
                    "div.plan-pill.current-plan .label-s"
                  );
                  if (labelEl) {
                    labelEl.textContent = "Contact us";
                  }
                }
                break;
              }
              case "enterprise": {
                // free cards
                {
                  let freeCard = monthlyCards.item(0);
                  freeCard.classList.remove("current");
                  let labelEl = freeCard.querySelector<HTMLDivElement>(
                    "div.plan-pill.current-plan .label-s"
                  );
                  if (labelEl) {
                    labelEl.textContent = "Downgrade plan";
                  }

                  freeCard = yearlyCards.item(0);
                  freeCard.classList.remove("current");
                  labelEl = freeCard.querySelector<HTMLDivElement>(
                    "div.plan-pill.current-plan .label-s"
                  );
                  if (labelEl) {
                    labelEl.textContent = "Downgrade plan";
                  }
                }

                // pro cards
                {
                  let proCard = monthlyCards.item(1);
                  proCard.classList.remove("current");
                  proCard.href = "#";
                  let labelEl = proCard.querySelector<HTMLDivElement>(
                    "div.plan-pill.current-plan .label-s"
                  );
                  if (labelEl) {
                    labelEl.textContent = "Dwongrade plan";
                  }

                  proCard = yearlyCards.item(1);
                  proCard.classList.remove("current");
                  proCard.href = "#";
                  labelEl = proCard.querySelector<HTMLDivElement>(
                    "div.plan-pill.current-plan .label-s"
                  );
                  if (labelEl) {
                    labelEl.textContent = "Dwongrade plan";
                  }
                }

                // premium cards
                {
                  let premiumCard = monthlyCards.item(2);
                  premiumCard.classList.remove("current");
                  premiumCard.href = "#";
                  let labelEl = premiumCard.querySelector<HTMLDivElement>(
                    "div.plan-pill.current-plan .label-s"
                  );
                  if (labelEl) {
                    labelEl.textContent = "Downgrade plan";
                  }

                  premiumCard = yearlyCards.item(2);
                  premiumCard.classList.remove("current");
                  premiumCard.href = "#";
                  labelEl = premiumCard.querySelector<HTMLDivElement>(
                    "div.plan-pill.current-plan .label-s"
                  );
                  if (labelEl) {
                    labelEl.textContent = "Downgrade plan";
                  }
                }

                // enterprise cards
                {
                  let enterpriseCard = monthlyCards.item(3);
                  enterpriseCard.classList.add("current");
                  enterpriseCard.href = "#";
                  enterpriseCard.addEventListener("click", (ev) =>
                    ev.preventDefault()
                  );
                  let labelEl = enterpriseCard.querySelector<HTMLDivElement>(
                    "div.plan-pill.current-plan .label-s"
                  );
                  if (labelEl) {
                    labelEl.textContent = "Current plan";
                  }

                  enterpriseCard = yearlyCards.item(3);
                  enterpriseCard.classList.remove("current");
                  labelEl = enterpriseCard.querySelector<HTMLDivElement>(
                    "div.plan-pill.current-plan .label-s"
                  );
                  if (labelEl) {
                    labelEl.textContent = "Contact us";
                  }
                }
                break;
              }
            }
            break;
          }
        }
      }
    }
  } catch (error) {
    console.error(error);
  }
};

window.addEventListener("load", wizedIn);
