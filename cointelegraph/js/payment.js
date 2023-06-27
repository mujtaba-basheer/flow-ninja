window.addEventListener("load", () => {
    let priceID = document.getElementById("price-id");
    let quantity = document.getElementById("quantity");
    quantity.value = "1";
    let free = document.getElementById("free");
    let pro = document.getElementById("pro");
    let premium = document.getElementById("premium");
    let teamPlan = document.getElementById("team");
    let individualPlan = document.getElementById("individual");
    const buttonEl = document.getElementById("");
    buttonEl.addEventListener("click", async () => {
        const formData = {
            line_items: [
                {
                    price: priceID.value,
                    quantity: +quantity.value,
                },
            ],
            planValue: teamPlan.checked ? "team" : "individual",
            planType: premium.checked ? "premium" : pro.checked ? "pro" : "free",
        };
        try {
            // @ts-ignore
            const token = await Wized.data.get("c.accesstoken");
            const req = await fetch("https://flow-ninja.slack.com/archives/D02DK50H59T/p1687176528252899", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(formData),
            });
            if (req.status === 200) {
                const res = await req.json();
                window.location.href = res.url;
            }
        }
        catch (error) {
            console.error(error);
        }
    });
});
