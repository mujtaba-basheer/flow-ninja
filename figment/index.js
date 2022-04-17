const protocolName = "audio";
const idMap = {
  marketCap: "#market-cap",
  marketData: "#price-usd",
  hideIfFails: "#hide-if-fails",
};
const getData = () => {
  const dataUrl = `https://data.messari.io/api/v1/assets/${protocolName}/metrics`;
  return new Promise((res, rej) => {
    fetch(dataUrl)
      .then((resp) => {
        if (resp.status === 200) return resp.json();
        else throw new Error(resp.statusText);
      })
      .then(
        ({
          data: {
            market_data: { price_usd },
            marketcap: { current_marketcap_usd },
          },
        }) => res({ marketData: price_usd, marketCap: current_marketcap_usd })
      )
      .catch((err) => rej(err));
  });
};
const numFormat0 = Intl.NumberFormat("en-US", {
  maximumFractionDigits: 0,
  minimumFractionDigits: 0,
});
const numFormat4 = Intl.NumberFormat("en-US", {
  maximumFractionDigits: 4,
  minimumFractionDigits: 4,
});

window.addEventListener("load", async () => {
  try {
    const { marketData, marketCap } = await getData();
    $(idMap.marketData).text("$" + numFormat4.format(marketData));
    $(idMap.marketCap).text("$" + numFormat0.format(marketCap));
  } catch (error) {
    console.error(error);
    $(idMap.hideIfFails).css("display", "none");
  }
});
