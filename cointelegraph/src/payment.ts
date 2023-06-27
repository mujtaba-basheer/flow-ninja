type FormDataT = {
  line_items: {
    price: string;
    quantity: number;
  }[];
  planValue: string;
  planType: string;
};
type FormAPIRespT = {
  url: string;
};

window.addEventListener("load", () => {
  let priceID = document.getElementById("price-id") as HTMLInputElement;
  let quantity = document.getElementById("quantity") as HTMLInputElement;
  quantity.value = "1";
  let free = document.getElementById("free") as HTMLInputElement;
  let pro = document.getElementById("pro") as HTMLInputElement;
  let premium = document.getElementById("premium") as HTMLInputElement;
  let teamPlan = document.getElementById("team") as HTMLInputElement;
  let individualPlan = document.getElementById(
    "individual"
  ) as HTMLInputElement;

  const buttonEl = document.getElementById("") as HTMLButtonElement;
  buttonEl.addEventListener("click", async () => {
    const formData: FormDataT = {
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
      const req = await fetch(
        "https://flow-ninja.slack.com/archives/D02DK50H59T/p1687176528252899",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (req.status === 200) {
        const res: Awaited<FormAPIRespT> = await req.json();
        window.location.href = res.url;
      }
    } catch (error) {
      console.error(error);
    }
  });
});
