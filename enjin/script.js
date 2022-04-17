const formatNum = new Intl.NumberFormat("en-IN", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const dotToEfiPercent = (amt = 0) => {
  let efi = 7.5;

  if (amt <= 20) efi = 7.5;
  else if (amt > 20 && amt <= 50) efi = 7.75;
  else if (amt > 50 && amt <= 100) efi = 8.0;
  else if (amt > 100 && amt <= 1000) efi = 8.25;
  else if (amt > 1000 && amt <= 10000) efi = 8.5;
  else if (amt > 10000 && amt <= 25000) efi = 8.75;
  else if (amt > 25000 && amt <= 50000) efi = 9.0;
  else if (amt > 50000 && amt <= 100000) efi = 9.25;
  else if (amt > 100000 && amt <= 250000) efi = 9.5;
  else if (amt > 250000) efi = 9.75;

  return efi;
};

const getEFI = async ({ curr, amt }) => {
  const getConversionRate = () => {
    return new Promise((res, rej) => {
      fetch("https://api.enjinx.io/v2/paraloan/rates", { method: "GET" })
        .then((resp) => {
          if (resp.status !== 200) return new Error("Error Fetching Rates");
          return resp.json();
        })
        .then((data) => {
          res(data);
        })
        .catch((error) => {
          console.error(error);
          rej(error);
        });
    });
  };

  try {
    const rates = await getConversionRate();
    let dot = 0;

    if (curr === "DOT") dot = amt;
    else if (curr === "ETH") dot = amt / rates["DOT/ETH"];
    else if (curr === "ENJ") dot = amt / rates["DOT/ENJ"];
    else if (curr === "USDC") dot = amt / rates["DOT/USD"];
    else if (curr === "USDT") dot = amt / rates["DOT/USD"];

    return {
      efy: dot * rates["DOT/EFI"],
      efi: dotToEfiPercent(dot),
    };
  } catch (error) {
    console.error(error);

    return {
      efy: 0,
      efi: dotToEfiPercent(0),
    };
  }
};

window.addEventListener("load", function () {
  const dropdownList = document.getElementById("w-dropdown-list-1");
  const dropdownOptions = dropdownList.querySelectorAll("div.enfiniti-choice");
  const dropdownPlaceholder = document.getElementById("dropdown-placeholder");
  const inputField = document.getElementById("amount-field");
  const rewardAmt = document.getElementById("reward-amount");
  const apyEFI = document.getElementById("apy");

  inputField.value = "";

  const calc = async () => {
    const amt = inputField.value;

    if (!isNaN(Number(amt))) {
      const { efy, efi } = await getEFI({
        curr: inputField.getAttribute("placeholder"),
        amt: Number(amt),
      });

      rewardAmt.textContent = formatNum.format(efy);
      apyEFI.textContent = formatNum.format(efi) + "%";
    }
  };

  dropdownOptions.forEach((dropdownOption) => {
    const curr = dropdownOption.getAttribute("id").split("-")[1].toUpperCase();
    dropdownOption.addEventListener("click", function () {
      dropdownPlaceholder.textContent = curr;
      inputField.setAttribute("placeholder", curr);

      calc();
    });
  });

  inputField.addEventListener("input", calc);
});
