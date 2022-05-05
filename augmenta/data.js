const fields = [
  { id: "Europe", label: "Region", slug: "region" },
  { id: "Europe-2", label: "Country", slug: "country" },
  {
    id: "AVG-price-for-fertilizer-e.g.-UREA-per-metric-tone",
    label: "AVG price for fertilizer (e.g. UREA) per metric tone",
    slug: "avgPriceFertiliser",
  },
  {
    id: "Europe-5",
    label: "The Way You Apply Nitrogen",
    slug: "nitrogenApply",
  },
  {
    id: "Example-email",
    label: "Email",
    slug: "email",
  },
];
const cropFields = [
  { id: "Europe-3", label: "Crop", slug: "crop" },
  { id: "hectares", label: "Total Cropped Area", slug: "totalArea" },
  { id: "AVG-Yield", label: "AVG Yield", slug: "avgYield" },
  {
    id: "Cost-per-hectare-for-product",
    label: "Cost/Hectare for Product",
    slug: "costPerHect",
  },
  {
    id: "AVG-amount-of-fertilizer-applief-after-planting",
    label: "AVG amount of Fertilizer Applied after Planting",
    slug: "avgFertiliser",
  },
  {
    id: "Europe-4",
    label: "Number of in-season Applications",
    slug: "numberApplications",
  },
  {
    id: "avg_selling_price",
    label: "AVG selling price per unit",
    slug: "avgSellingPrice",
  },
  {
    id: "avg_cost_of_product",
    label: "Avg cost of product per unit",
    slug: "avgCostOfProduct",
  },
  {
    id: "Europe-5",
    label: "The Way You Apply Nitrogen",
    slug: "nitrogenApply",
  },
];
const operations = [
  {
    "Select Units ": "Imperial (ac,bu/ac, units/ac lbs of lint etc)",
    "Select your operation": "N VRA",
    "Solid or Liquid product ": "Sprayer",
    "Product/Units": "gal/ac",
    "Cost/Unit": "$/ton",
    "Conversion Factor": 0.0056,
    "% Saving": 0.04,
    "efficiency increase": 0,
    Yield: 0.03,
    "Yearly improvement savings": 0.03,
    "service fee/ha": 3,
  },
  {
    "Select Units ": "Imperial (ac,bu/ac, units/ac lbs of lint etc)",
    "Select your operation": "PGR NVRA",
    "Solid or Liquid product ": "Sprayer",
    "Product/Units": "oz/ac",
    "Cost/Unit": "$/gal",
    "Conversion Factor": 0.0078125,
    "% Saving": 0.13,
    "efficiency increase": 0.05,
    Yield: 0.03,
    "Yearly improvement savings": 0.01,
    "service fee/ha": 2,
  },
  {
    "Select Units ": "Imperial (ac,bu/ac, units/ac lbs of lint etc)",
    "Select your operation": "HA NVRA",
    "Solid or Liquid product ": "Sprayer",
    "Product/Units": "oz/ac",
    "Cost/Unit": "$/gal",
    "Conversion Factor": 0.0078125,
    "% Saving": 0.1,
    "efficiency increase": 0.05,
    Yield: 0.03,
    "Yearly improvement savings": 0.01,
    "service fee/ha": 2,
  },
];

// module.exports = { fields, operations, cropFields };
