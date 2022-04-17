const formatNum = new Intl.NumberFormat("en-IN", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const dotToEfi = (amt = 0) => {
  let efiPercent = 7.5;

  if (amt < 20) efiPercent = 7.5;
  else if (amt >= 20 && amt < 50) efiPercent = 7.75;
  else if (amt >= 50 && amt < 100) efiPercent = 8.0;
  else if (amt >= 100 && amt < 1000) efiPercent = 8.25;
  else if (amt >= 1000 && amt < 10000) efiPercent = 8.5;
  else if (amt >= 10000 && amt < 25000) efiPercent = 8.75;
  else if (amt >= 25000 && amt < 50000) efiPercent = 9.0;
  else if (amt >= 50000 && amt < 100000) efiPercent = 9.25;
  else if (amt >= 100000 && amt < 250000) efiPercent = 9.5;
  else if (amt >= 250000) efiPercent = 9.75;

  return amt * efiPercent;
};

window.addEventListener("load", function () {
  const inputField = document.getElementById("amount-field");
  const rewardAmt = document.getElementById("reward-amount");

  inputField.value = "";

  const calc = async () => {
    const amt = inputField.value;

    if (!isNaN(Number(amt))) {
      const efi = dotToEfi(Number(amt));
      rewardAmt.textContent = formatNum.format(efi);
    } else rewardAmt.textContent = "NA";
  };

  inputField.addEventListener("input", calc);
});
