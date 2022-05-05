const data = {
  first: {
    chemCostWithoutAUG: 17718.75,
    fertCostWithAUG: 15415.31,
    yieldWithoutAUG: 173052,
    yieldWithAUG: 178243.56,
    prodCostWithoutAUG: 107655,
    prodCostWithAUG: 99465.18,
    combinedProfit: 15684.82,
    payAUG: 12300,
    yearlyGrandTotal: 3384.82,
    perHectProfit: 20.51,
  },
  second: {
    chemCostWithoutAUG: 17718.75,
    fertCostWithAUG: 15238.13,
    yieldWithoutAUG: 173052,
    yieldWithAUG: 178243.56,
    prodCostWithoutAUG: 107655,
    prodCostWithAUG: 99465.18,
    combinedProfit: 15862.01,
    payAUG: 300,
    yearlyGrandTotal: 15562.01,
    perHectProfit: 94.32,
  },
  third: {
    chemCostWithoutAUG: 17718.75,
    fertCostWithAUG: 15060.94,
    yieldWithoutAUG: 173052,
    yieldWithAUG: 178243.56,
    prodCostWithoutAUG: 107655,
    prodCostWithAUG: 99465.18,
    combinedProfit: 16039.19,
    payAUG: 300,
    yearlyGrandTotal: 15739.19,
    perHectProfit: 95.39,
  },
  profitThreeYears: 34686.02,
  avgProfitPerHect: 70.07,
};

const fields = [
  { field: "Chemical Cost (without AUG)", key: "chemCostWithoutAUG" },
  {
    field: "Fertilization Cost(with Augmenta Savings)",
    key: "chemCostWithoutAUG",
  },
  { field: "Yield (Yield without Augmenta)", key: "yieldWithoutAUG" },
  { field: "Yield (With Augmenta extra yield)", key: "yieldWithAUG" },
  { field: "Production Cost (without Augmenta)", key: "prodCostWithoutAUG" },
  { field: "Production Cost (with Augmenta)", key: "prodCostWithAUG" },
  { field: "Combined Profit (with Augmenta)", key: "combinedProfit" },
  { field: "You pay Augmenta", key: "payAUG" },
  { field: "Yearly Grand Total (For Farmer)", key: "yearlyGrandTotal" },
  { field: "Per hectare profit", key: "perHectProfit" },
];

const style = `style="border: solid 1px black"`;
let tableHtml = `
<h1>Results</h1>
</br>
<table ${style}>
    <thead>
        <tr ${style}>
            <th ${style}>Field Name</th>
            <th ${style}>1<sup>st</sup> year</th>
            <th ${style}>2<sup>nd</sup> year</th>
            <th ${style}>1<sup>rd</sup> year</th>
        </tr>
    </thead>

    <tbody>
        ${fields
          .map(({ field, key }) => {
            return `
                <tr ${style}>
                    <td ${style}>${field}</td>
                    ${["first", "second", "third"]
                      .map(
                        (year) =>
                          `<td ${style}>$ ${data[year][key].toFixed(2)}</td>`
                      )
                      .reduce((prev, curr) => prev + curr, "")}
                </tr>
            `;
          })
          .reduce((prev, curr) => prev + curr, "")}
    </tbody>
</table>
</br></br>

Total profit after 3 years: $ ${data["profitThreeYears"].toFixed(2)} </br>
Average profit per hectare: $ ${data["avgProfitPerHect"].toFixed(2)}
`;

console.log(tableHtml);

/*
// sending results
  // fetch(
  //   "https://z4a5anrf90.execute-api.ap-south-1.amazonaws.com/prod/send-roi-results",
  //   {
  //     method: "POST",
  //     body: JSON.stringify(results),
  //   }
  // )
  //   .then((res) => {
  //     if (res.status !== 200) return new Error("Oops! Error Sending Mail");
  //     else return res.json();
  //   })
  //   .then((res) => {
  //     alert("Check Your Mail!");
  //   })
  //   .catch((err) => alert(err.message));
  */
