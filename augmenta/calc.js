const { stirlingS2Dependencies } = require("mathjs");

const operations = [
  {
    "Select Units": "Metric",
    "Select your operation": "N VRA",
    Crop: "Corn/Maize",
    "Solid or Liquid product": "Spreader",
    "Product/Units": "(kg of N)/hectare",
    "Cost/Unit": "Cost/(kg of N)",
    "Conversion Factor": 0.001,
    "% Saving": 0.086,
    "efficiency increase": 0,
    Yield: 0.02,
    "Yearly improvement savings": 0.01,
    "service fee/ha": 4,
  },
  {
    "Select Units": "Metric",
    "Select your operation": "N VRA",
    Crop: "Corn/Maize",
    "Solid or Liquid product": "Sprayer",
    "Product/Units": "(kg of N)/hectare",
    "Cost/Unit": "Cost/(kg of N)",
    "Conversion Factor": 1,
    "% Saving": 0.086,
    "efficiency increase": 0,
    Yield: 0.02,
    "Yearly improvement savings": 0.01,
    "service fee/ha": 4,
  },
  {
    "Select Units": "Metric",
    "Select your operation": "PGR VRA",
    Crop: "Corn/Maize",
    "Solid or Liquid product": "Sprayer",
    "Product/Units": "ml/ha",
    "Cost/Unit": "$/l",
    "Conversion Factor": 0.001,
    "% Saving": 0.13,
    "efficiency increase": 0.05,
    Yield: 0.01,
    "Yearly improvement savings": 0.01,
    "service fee/ha": 1.5,
  },
  {
    "Select Units": "Metric",
    "Select your operation": "HA VRA",
    Crop: "Corn/Maize",
    "Solid or Liquid product": "Sprayer",
    "Product/Units": "ml/ha",
    "Cost/Unit": "$/l",
    "Conversion Factor": 0.001,
    "% Saving": 0.1,
    "efficiency increase": 0.05,
    Yield: 0.01,
    "Yearly improvement savings": 0.01,
    "service fee/ha": 1.5,
  },
  {
    "Select Units": "Imperial",
    "Select your operation": "N VRA",
    Crop: "Corn/Maize",
    "Solid or Liquid product": "Spreader",
    "Product/Units": "(lbs of N)/ac",
    "Cost/Unit": "$/(lb of N)",
    "Conversion Factor": 1,
    "% Saving": 0.086,
    "efficiency increase": 0,
    Yield: 0.02,
    "Yearly improvement savings": 0.01,
    "service fee/ha": 1.5,
  },
  {
    "Select Units": "Imperial",
    "Select your operation": "N VRA",
    Crop: "Corn/Maize",
    "Solid or Liquid product": "Sprayer",
    "Product/Units": "(lbs of N)/ac",
    "Cost/Unit": "$/(lb of N)",
    "Conversion Factor": 1,
    "% Saving": 0.086,
    "efficiency increase": 0,
    Yield: 0.02,
    "Yearly improvement savings": 0.01,
    "service fee/ha": 1.5,
  },
  {
    "Select Units": "Imperial",
    "Select your operation": "PGR VRA",
    Crop: "Corn/Maize",
    "Solid or Liquid product": "Sprayer",
    "Product/Units": "oz/ac",
    "Cost/Unit": "$/gal",
    "Conversion Factor": 0.0078125,
    "% Saving": 0.13,
    "efficiency increase": 0.05,
    Yield: 0.01,
    "Yearly improvement savings": 0.01,
    "service fee/ha": 1.5,
  },
  {
    "Select Units": "Imperial",
    "Select your operation": "HA VRA",
    Crop: "Corn/Maize",
    "Solid or Liquid product": "Sprayer",
    "Product/Units": "oz/ac",
    "Cost/Unit": "$/gal",
    "Conversion Factor": 0.0078125,
    "% Saving": 0.1,
    "efficiency increase": 0.05,
    Yield: 0.01,
    "Yearly improvement savings": 0.01,
    "service fee/ha": 1.5,
  },
  {
    "Select Units": "Metric",
    "Select your operation": "N VRA",
    Crop: "Cotton",
    "Solid or Liquid product": "Spreader",
    "Product/Units": "(kg of N)/hectare",
    "Cost/Unit": "Cost/(kg of N)",
    "Conversion Factor": 0.001,
    "% Saving": 0.097,
    "efficiency increase": 0,
    Yield: 0.03,
    "Yearly improvement savings": 0.01,
    "service fee/ha": 4,
  },
  {
    "Select Units": "Metric",
    "Select your operation": "N VRA",
    Crop: "Cotton",
    "Solid or Liquid product": "Sprayer",
    "Product/Units": "(kg of N)/hectare",
    "Cost/Unit": "Cost/(kg of N)",
    "Conversion Factor": 1,
    "% Saving": 0.082,
    "efficiency increase": 0,
    Yield: 0.03,
    "Yearly improvement savings": 0.01,
    "service fee/ha": 4,
  },
  {
    "Select Units": "Metric",
    "Select your operation": "PGR VRA",
    Crop: "Cotton",
    "Solid or Liquid product": "Sprayer",
    "Product/Units": "ml/ha",
    "Cost/Unit": "$/l",
    "Conversion Factor": 0.001,
    "% Saving": 0.16,
    "efficiency increase": 0.05,
    Yield: 0.03,
    "Yearly improvement savings": 0.01,
    "service fee/ha": 1.5,
  },
  {
    "Select Units": "Metric",
    "Select your operation": "HA VRA",
    Crop: "Cotton",
    "Solid or Liquid product": "Sprayer",
    "Product/Units": "ml/ha",
    "Cost/Unit": "$/l",
    "Conversion Factor": 0.001,
    "% Saving": 0.12,
    "efficiency increase": 0.05,
    Yield: 0.03,
    "Yearly improvement savings": 0.01,
    "service fee/ha": 1.5,
  },
  {
    "Select Units": "Imperial",
    "Select your operation": "N VRA",
    Crop: "Cotton",
    "Solid or Liquid product": "Spreader",
    "Product/Units": "(lbs of N)/ac",
    "Cost/Unit": "Cost/(lb of N)",
    "Conversion Factor": 1,
    "% Saving": 0.097,
    "efficiency increase": 0,
    Yield: 0.03,
    "Yearly improvement savings": 0.01,
    "service fee/ha": 1.5,
  },
  {
    "Select Units": "Imperial",
    "Select your operation": "N VRA",
    Crop: "Cotton",
    "Solid or Liquid product": "Sprayer",
    "Product/Units": "(lbs of N)/ac",
    "Cost/Unit": "Cost/(lb of N)",
    "Conversion Factor": 1,
    "% Saving": 0.082,
    "efficiency increase": 0,
    Yield: 0.03,
    "Yearly improvement savings": 0.01,
    "service fee/ha": 1.5,
  },
  {
    "Select Units": "Imperial",
    "Select your operation": "PGR VRA",
    Crop: "Cotton",
    "Solid or Liquid product": "Sprayer",
    "Product/Units": "oz/ac",
    "Cost/Unit": "$/gal",
    "Conversion Factor": 0.0078125,
    "% Saving": 0.16,
    "efficiency increase": 0.05,
    Yield: 0.03,
    "Yearly improvement savings": 0.01,
    "service fee/ha": 1.5,
  },
  {
    "Select Units": "Imperial",
    "Select your operation": "HA VRA",
    Crop: "Cotton",
    "Solid or Liquid product": "Sprayer",
    "Product/Units": "oz/ac",
    "Cost/Unit": "$/gal",
    "Conversion Factor": 0.0078125,
    "% Saving": 0.12,
    "efficiency increase": 0.05,
    Yield: 0.03,
    "Yearly improvement savings": 0.01,
    "service fee/ha": 1.5,
  },
  {
    "Select Units": "Metric",
    "Select your operation": "N VRA",
    Crop: "Rapeseed/Canola",
    "Solid or Liquid product": "Spreader",
    "Product/Units": "(kg of N)/hectare",
    "Cost/Unit": "Cost/(kg of N)",
    "Conversion Factor": 1,
    "% Saving": 0.084,
    "efficiency increase": 0,
    Yield: 0.03,
    "Yearly improvement savings": 0.01,
    "service fee/ha": 4,
  },
  {
    "Select Units": "Metric",
    "Select your operation": "N VRA",
    Crop: "Rapeseed/Canola",
    "Solid or Liquid product": "Sprayer",
    "Product/Units": "(kg of N)/hectare",
    "Cost/Unit": "Cost/(kg of N)",
    "Conversion Factor": 1,
    "% Saving": 0.084,
    "efficiency increase": 0,
    Yield: 0.03,
    "Yearly improvement savings": 0.01,
    "service fee/ha": 4,
  },
  {
    "Select Units": "Metric",
    "Select your operation": "PGR VRA",
    Crop: "Rapeseed/Canola",
    "Solid or Liquid product": "Sprayer",
    "Product/Units": "ml/ha",
    "Cost/Unit": "$/l",
    "Conversion Factor": 0.001,
    "% Saving": 0.15,
    "efficiency increase": 0.05,
    Yield: 0.01,
    "Yearly improvement savings": 0.01,
    "service fee/ha": 1.5,
  },
  {
    "Select Units": "Metric",
    "Select your operation": "HA VRA",
    Crop: "Rapeseed/Canola",
    "Solid or Liquid product": "Sprayer",
    "Product/Units": "ml/ha",
    "Cost/Unit": "$/l",
    "Conversion Factor": 0.001,
    "% Saving": "NA",
    "efficiency increase": 0,
    Yield: 0,
    "Yearly improvement savings": 0.01,
    "service fee/ha": 1.5,
  },
  {
    "Select Units": "Imperial",
    "Select your operation": "N VRA",
    Crop: "Rapeseed/Canola",
    "Solid or Liquid product": "Spreader",
    "Product/Units": "(lbs of N)/ac",
    "Cost/Unit": "Cost/(lb of N)",
    "Conversion Factor": 1,
    "% Saving": 0.084,
    "efficiency increase": 0,
    Yield: 0.03,
    "Yearly improvement savings": 0.01,
    "service fee/ha": 1.5,
  },
  {
    "Select Units": "Imperial",
    "Select your operation": "N VRA",
    Crop: "Rapeseed/Canola",
    "Solid or Liquid product": "Sprayer",
    "Product/Units": "(lbs of N)/ac",
    "Cost/Unit": "Cost/(lb of N)",
    "Conversion Factor": 1,
    "% Saving": 0.084,
    "efficiency increase": 0,
    Yield: 0.03,
    "Yearly improvement savings": 0.01,
    "service fee/ha": 1.5,
  },
  {
    "Select Units": "Imperial",
    "Select your operation": "PGR VRA",
    Crop: "Rapeseed/Canola",
    "Solid or Liquid product": "Sprayer",
    "Product/Units": "oz/ac",
    "Cost/Unit": "$/gal",
    "Conversion Factor": 0.0078125,
    "% Saving": 0.15,
    "efficiency increase": 0.05,
    Yield: 0.01,
    "Yearly improvement savings": 0.01,
    "service fee/ha": 1.5,
  },
  {
    "Select Units": "Imperial",
    "Select your operation": "HA VRA",
    Crop: "Rapeseed/Canola",
    "Solid or Liquid product": "Sprayer",
    "Product/Units": "oz/ac",
    "Cost/Unit": "$/gal",
    "Conversion Factor": 0.0078125,
    "% Saving": 0,
    "efficiency increase": 0,
    Yield: 0,
    "Yearly improvement savings": 0.01,
    "service fee/ha": 1.5,
  },
  {
    "Select Units": "Metric",
    "Select your operation": "N VRA",
    Crop: "Rice ",
    "Solid or Liquid product": "Spreader",
    "Product/Units": "(kg of N)/hectare",
    "Cost/Unit": "Cost/(kg of N)",
    "Conversion Factor": 1,
    "% Saving": 0.071,
    "efficiency increase": 0,
    Yield: 0.02,
    "Yearly improvement savings": 0.01,
    "service fee/ha": 4,
  },
  {
    "Select Units": "Metric",
    "Select your operation": "N VRA",
    Crop: "Rice ",
    "Solid or Liquid product": "Sprayer",
    "Product/Units": "(kg of N)/hectare",
    "Cost/Unit": "Cost/(kg of N)",
    "Conversion Factor": 1,
    "% Saving": 0.071,
    "efficiency increase": 0,
    Yield: 0.02,
    "Yearly improvement savings": 0.01,
    "service fee/ha": 4,
  },
  {
    "Select Units": "Metric",
    "Select your operation": "PGR VRA",
    Crop: "Rice ",
    "Solid or Liquid product": "Sprayer",
    "Product/Units": "ml/ha",
    "Cost/Unit": "$/l",
    "Conversion Factor": 0.001,
    "% Saving": 0,
    "efficiency increase": 0,
    Yield: 0,
    "Yearly improvement savings": 0.01,
    "service fee/ha": 1.5,
  },
  {
    "Select Units": "Metric",
    "Select your operation": "HA VRA",
    Crop: "Rice ",
    "Solid or Liquid product": "Sprayer",
    "Product/Units": "ml/ha",
    "Cost/Unit": "$/l",
    "Conversion Factor": 0.001,
    "% Saving": 0,
    "efficiency increase": 0,
    Yield: 0,
    "Yearly improvement savings": 0.01,
    "service fee/ha": 1.5,
  },
  {
    "Select Units": "Imperial",
    "Select your operation": "N VRA",
    Crop: "Rice ",
    "Solid or Liquid product": "Spreader",
    "Product/Units": "(lbs of N)/ac",
    "Cost/Unit": "Cost/(lb of N)",
    "Conversion Factor": 1,
    "% Saving": 0.071,
    "efficiency increase": 0,
    Yield: 0.02,
    "Yearly improvement savings": 0.01,
    "service fee/ha": 1.5,
  },
  {
    "Select Units": "Imperial",
    "Select your operation": "N VRA",
    Crop: "Rice ",
    "Solid or Liquid product": "Sprayer",
    "Product/Units": "(lbs of N)/ac",
    "Cost/Unit": "Cost/(lb of N)",
    "Conversion Factor": 1,
    "% Saving": 0.071,
    "efficiency increase": 0,
    Yield: 0.02,
    "Yearly improvement savings": 0.01,
    "service fee/ha": 1.5,
  },
  {
    "Select Units": "Imperial",
    "Select your operation": "PGR VRA",
    Crop: "Rice ",
    "Solid or Liquid product": "Sprayer",
    "Product/Units": "oz/ac",
    "Cost/Unit": "$/gal",
    "Conversion Factor": 0.0078125,
    "% Saving": 0,
    "efficiency increase": 0,
    Yield: 0,
    "Yearly improvement savings": 0.01,
    "service fee/ha": 1.5,
  },
  {
    "Select Units": "Imperial",
    "Select your operation": "HA VRA",
    Crop: "Rice ",
    "Solid or Liquid product": "Sprayer",
    "Product/Units": "oz/ac",
    "Cost/Unit": "$/gal",
    "Conversion Factor": 0.0078125,
    "% Saving": 0,
    "efficiency increase": 0,
    Yield: 0,
    "Yearly improvement savings": 0.01,
    "service fee/ha": 1.5,
  },
  {
    "Select Units": "Metric",
    "Select your operation": "N VRA",
    Crop: "Soybeans",
    "Solid or Liquid product": "Spreader",
    "Product/Units": "(kg of N)/hectare",
    "Cost/Unit": "Cost/(kg of N)",
    "Conversion Factor": 1,
    "% Saving": 0.07,
    "efficiency increase": 0,
    Yield: 0.02,
    "Yearly improvement savings": 0.01,
    "service fee/ha": 4,
  },
  {
    "Select Units": "Metric",
    "Select your operation": "N VRA",
    Crop: "Soybeans",
    "Solid or Liquid product": "Sprayer",
    "Product/Units": "(kg of N)/hectare",
    "Cost/Unit": "Cost/(kg of N)",
    "Conversion Factor": 1,
    "% Saving": 0.07,
    "efficiency increase": 0,
    Yield: 0.02,
    "Yearly improvement savings": 0.01,
    "service fee/ha": 4,
  },
  {
    "Select Units": "Metric",
    "Select your operation": "PGR VRA",
    Crop: "Soybeans",
    "Solid or Liquid product": "Sprayer",
    "Product/Units": "ml/ha",
    "Cost/Unit": "$/l",
    "Conversion Factor": 0.001,
    "% Saving": 0,
    "efficiency increase": 0,
    Yield: 0,
    "Yearly improvement savings": 0.01,
    "service fee/ha": 1.5,
  },
  {
    "Select Units": "Metric",
    "Select your operation": "HA VRA",
    Crop: "Soybeans",
    "Solid or Liquid product": "Sprayer",
    "Product/Units": "ml/ha",
    "Cost/Unit": "$/l",
    "Conversion Factor": 0.001,
    "% Saving": 0.07,
    "efficiency increase": 0.05,
    Yield: 0.01,
    "Yearly improvement savings": 0.01,
    "service fee/ha": 1.5,
  },
  {
    "Select Units": "Imperial",
    "Select your operation": "N VRA",
    Crop: "Soybeans",
    "Solid or Liquid product": "Spreader",
    "Product/Units": "(lbs of N)/ac",
    "Cost/Unit": "Cost/(lb of N)",
    "Conversion Factor": 1,
    "% Saving": 0.07,
    "efficiency increase": 0,
    Yield: 0.02,
    "Yearly improvement savings": 0.01,
    "service fee/ha": 1.5,
  },
  {
    "Select Units": "Imperial",
    "Select your operation": "N VRA",
    Crop: "Soybeans",
    "Solid or Liquid product": "Sprayer",
    "Product/Units": "(lbs of N)/ac",
    "Cost/Unit": "Cost/(lb of N)",
    "Conversion Factor": 1,
    "% Saving": 0.07,
    "efficiency increase": 0,
    Yield: 0.02,
    "Yearly improvement savings": 0.01,
    "service fee/ha": 1.5,
  },
  {
    "Select Units": "Imperial",
    "Select your operation": "PGR VRA",
    Crop: "Soybeans",
    "Solid or Liquid product": "Sprayer",
    "Product/Units": "oz/ac",
    "Cost/Unit": "$/gal",
    "Conversion Factor": 0.0078125,
    "% Saving": 0,
    "efficiency increase": 0,
    Yield: 0,
    "Yearly improvement savings": 0.01,
    "service fee/ha": 1.5,
  },
  {
    "Select Units": "Imperial",
    "Select your operation": "HA VRA",
    Crop: "Soybeans",
    "Solid or Liquid product": "Sprayer",
    "Product/Units": "oz/ac",
    "Cost/Unit": "$/gal",
    "Conversion Factor": 0.0078125,
    "% Saving": 0.07,
    "efficiency increase": 0.05,
    Yield: 0.01,
    "Yearly improvement savings": 0.01,
    "service fee/ha": 1.5,
  },
  {
    "Select Units": "Metric",
    "Select your operation": "N VRA",
    Crop: "Wheat ",
    "Solid or Liquid product": "Spreader",
    "Product/Units": "(kg of N)/hectare",
    "Cost/Unit": "Cost/(kg of N)",
    "Conversion Factor": 1,
    "% Saving": 0.069,
    "efficiency increase": 0,
    Yield: 0.03,
    "Yearly improvement savings": 0.01,
    "service fee/ha": 4,
  },
  {
    "Select Units": "Metric",
    "Select your operation": "N VRA",
    Crop: "Wheat ",
    "Solid or Liquid product": "Sprayer",
    "Product/Units": "(kg of N)/hectare",
    "Cost/Unit": "Cost/(kg of N)",
    "Conversion Factor": 1,
    "% Saving": 0.1,
    "efficiency increase": 0,
    Yield: 0.03,
    "Yearly improvement savings": 0.01,
    "service fee/ha": 4,
  },
  {
    "Select Units": "Metric",
    "Select your operation": "PGR VRA",
    Crop: "Wheat ",
    "Solid or Liquid product": "Sprayer",
    "Product/Units": "ml/ha",
    "Cost/Unit": "$/l",
    "Conversion Factor": 0.001,
    "% Saving": 0.13,
    "efficiency increase": 0.05,
    Yield: 0.02,
    "Yearly improvement savings": 0.01,
    "service fee/ha": 1.5,
  },
  {
    "Select Units": "Metric",
    "Select your operation": "HA VRA",
    Crop: "Wheat ",
    "Solid or Liquid product": "Sprayer",
    "Product/Units": "ml/ha",
    "Cost/Unit": "$/l",
    "Conversion Factor": 0.001,
    "% Saving": 0.1,
    "efficiency increase": 0.05,
    Yield: 0.02,
    "Yearly improvement savings": 0.01,
    "service fee/ha": 1.5,
  },
  {
    "Select Units": "Imperial",
    "Select your operation": "N VRA",
    Crop: "Wheat ",
    "Solid or Liquid product": "Spreader",
    "Product/Units": "(lbs of N)/ac",
    "Cost/Unit": "Cost/(lb of N)",
    "Conversion Factor": 1,
    "% Saving": 0.069,
    "efficiency increase": 0,
    Yield: 0.03,
    "Yearly improvement savings": 0.01,
    "service fee/ha": 1.5,
  },
  {
    "Select Units": "Imperial",
    "Select your operation": "N VRA",
    Crop: "Wheat ",
    "Solid or Liquid product": "Sprayer",
    "Product/Units": "(lbs of N)/ac",
    "Cost/Unit": "Cost/(lb of N)",
    "Conversion Factor": 1,
    "% Saving": 0.1,
    "efficiency increase": 0,
    Yield: 0.03,
    "Yearly improvement savings": 0.01,
    "service fee/ha": 1.5,
  },
  {
    "Select Units": "Imperial",
    "Select your operation": "PGR VRA",
    Crop: "Wheat ",
    "Solid or Liquid product": "Sprayer",
    "Product/Units": "oz/ac",
    "Cost/Unit": "$/gal",
    "Conversion Factor": 0.0078125,
    "% Saving": 0.13,
    "efficiency increase": 0.05,
    Yield: 0.02,
    "Yearly improvement savings": 0.01,
    "service fee/ha": 1.5,
  },
  {
    "Select Units": "Imperial",
    "Select your operation": "HA VRA",
    Crop: "Wheat ",
    "Solid or Liquid product": "Sprayer",
    "Product/Units": "oz/ac",
    "Cost/Unit": "$/gal",
    "Conversion Factor": 0.0078125,
    "% Saving": 0.1,
    "efficiency increase": 0.05,
    Yield: 0.02,
    "Yearly improvement savings": 0.01,
    "service fee/ha": 1.5,
  },
  {
    "Select Units": "Metric",
    "Select your operation": "N VRA",
    Crop: "Clovers",
    "Solid or Liquid product": "Spreader",
    "Product/Units": "(kg of N)/hectare",
    "Cost/Unit": "Cost/(kg of N)",
    "Conversion Factor": 1,
    "% Saving": 0.073,
    "efficiency increase": 0,
    Yield: 0.02,
    "Yearly improvement savings": 0.01,
    "service fee/ha": 4,
  },
  {
    "Select Units": "Metric",
    "Select your operation": "N VRA",
    Crop: "Clovers",
    "Solid or Liquid product": "Sprayer",
    "Product/Units": "(kg of N)/hectare",
    "Cost/Unit": "Cost/(kg of N)",
    "Conversion Factor": 1,
    "% Saving": 0.066,
    "efficiency increase": 0,
    Yield: 0.02,
    "Yearly improvement savings": 0.01,
    "service fee/ha": 4,
  },
  {
    "Select Units": "Metric",
    "Select your operation": "PGR VRA",
    Crop: "Clovers",
    "Solid or Liquid product": "Sprayer",
    "Product/Units": "ml/ha",
    "Cost/Unit": "$/l",
    "Conversion Factor": 0.001,
    "% Saving": 0,
    "efficiency increase": 0,
    Yield: 0,
    "Yearly improvement savings": 0.01,
    "service fee/ha": 1.5,
  },
  {
    "Select Units": "Metric",
    "Select your operation": "HA VRA",
    Crop: "Clovers",
    "Solid or Liquid product": "Sprayer",
    "Product/Units": "ml/ha",
    "Cost/Unit": "$/l",
    "Conversion Factor": 0.001,
    "% Saving": 0,
    "efficiency increase": 0,
    Yield: 0,
    "Yearly improvement savings": 0.01,
    "service fee/ha": 1.5,
  },
  {
    "Select Units": "Imperial",
    "Select your operation": "N VRA",
    Crop: "Clovers",
    "Solid or Liquid product": "Spreader",
    "Product/Units": "(lbs of N)/ac",
    "Cost/Unit": "Cost/(lb of N)",
    "Conversion Factor": 1,
    "% Saving": 0.073,
    "efficiency increase": 0,
    Yield: 0.02,
    "Yearly improvement savings": 0.01,
    "service fee/ha": 1.5,
  },
  {
    "Select Units": "Imperial",
    "Select your operation": "N VRA",
    Crop: "Clovers",
    "Solid or Liquid product": "Sprayer",
    "Product/Units": "(lbs of N)/ac",
    "Cost/Unit": "Cost/(lb of N)",
    "Conversion Factor": 1,
    "% Saving": 0.066,
    "efficiency increase": 0,
    Yield: 0.02,
    "Yearly improvement savings": 0.01,
    "service fee/ha": 1.5,
  },
  {
    "Select Units": "Imperial",
    "Select your operation": "PGR VRA",
    Crop: "Clovers",
    "Solid or Liquid product": "Sprayer",
    "Product/Units": "oz/ac",
    "Cost/Unit": "$/gal",
    "Conversion Factor": 0.0078125,
    "% Saving": 0,
    "efficiency increase": 0,
    Yield: 0,
    "Yearly improvement savings": 0.01,
    "service fee/ha": 1.5,
  },
  {
    "Select Units": "Imperial",
    "Select your operation": "HA VRA",
    Crop: "Clovers",
    "Solid or Liquid product": "Sprayer",
    "Product/Units": "oz/ac",
    "Cost/Unit": "$/gal",
    "Conversion Factor": 0.0078125,
    "% Saving": 0,
    "efficiency increase": 0,
    Yield: 0,
    "Yearly improvement savings": 0.01,
    "service fee/ha": 1.5,
  },
  {
    "Select Units": "Metric",
    "Select your operation": "N VRA",
    Crop: "Barley",
    "Solid or Liquid product": "Spreader",
    "Product/Units": "(kg of N)/hectare",
    "Cost/Unit": "Cost/(kg of N)",
    "Conversion Factor": 1,
    "% Saving": 0.089,
    "efficiency increase": 0,
    Yield: 0.02,
    "Yearly improvement savings": 0.01,
    "service fee/ha": 4,
  },
  {
    "Select Units": "Metric",
    "Select your operation": "N VRA",
    Crop: "Barley",
    "Solid or Liquid product": "Sprayer",
    "Product/Units": "(kg of N)/hectare",
    "Cost/Unit": "Cost/(kg of N)",
    "Conversion Factor": 1,
    "% Saving": 0.07,
    "efficiency increase": 0,
    Yield: 0.02,
    "Yearly improvement savings": 0.01,
    "service fee/ha": 4,
  },
  {
    "Select Units": "Metric",
    "Select your operation": "PGR VRA",
    Crop: "Barley",
    "Solid or Liquid product": "Sprayer",
    "Product/Units": "ml/ha",
    "Cost/Unit": "$/l",
    "Conversion Factor": 0.001,
    "% Saving": 0.13,
    "efficiency increase": 0.05,
    Yield: 0.02,
    "Yearly improvement savings": 0.01,
    "service fee/ha": 1.5,
  },
  {
    "Select Units": "Metric",
    "Select your operation": "HA VRA",
    Crop: "Barley",
    "Solid or Liquid product": "Sprayer",
    "Product/Units": "ml/ha",
    "Cost/Unit": "$/l",
    "Conversion Factor": 0.001,
    "% Saving": 0.1,
    "efficiency increase": 0.05,
    Yield: 0.01,
    "Yearly improvement savings": 0.01,
    "service fee/ha": 1.5,
  },
  {
    "Select Units": "Imperial",
    "Select your operation": "N VRA",
    Crop: "Barley",
    "Solid or Liquid product": "Spreader",
    "Product/Units": "(lbs of N)/ac",
    "Cost/Unit": "Cost/(lb of N)",
    "Conversion Factor": 1,
    "% Saving": 0.089,
    "efficiency increase": 0,
    Yield: 0.02,
    "Yearly improvement savings": 0.01,
    "service fee/ha": 1.5,
  },
  {
    "Select Units": "Imperial",
    "Select your operation": "N VRA",
    Crop: "Barley",
    "Solid or Liquid product": "Sprayer",
    "Product/Units": "(lbs of N)/ac",
    "Cost/Unit": "Cost/(lb of N)",
    "Conversion Factor": 1,
    "% Saving": 0.07,
    "efficiency increase": 0,
    Yield: 0.02,
    "Yearly improvement savings": 0.01,
    "service fee/ha": 1.5,
  },
  {
    "Select Units": "Imperial",
    "Select your operation": "PGR VRA",
    Crop: "Barley",
    "Solid or Liquid product": "Sprayer",
    "Product/Units": "oz/ac",
    "Cost/Unit": "$/gal",
    "Conversion Factor": 0.0078125,
    "% Saving": 0.13,
    "efficiency increase": 0.05,
    Yield: 0.02,
    "Yearly improvement savings": 0.01,
    "service fee/ha": 1.5,
  },
  {
    "Select Units": "Imperial",
    "Select your operation": "HA VRA",
    Crop: "Barley",
    "Solid or Liquid product": "Sprayer",
    "Product/Units": "oz/ac",
    "Cost/Unit": "$/gal",
    "Conversion Factor": 0.0078125,
    "% Saving": 0.1,
    "efficiency increase": 0.05,
    Yield: 0.01,
    "Yearly improvement savings": 0.01,
    "service fee/ha": 1.5,
  },
  {
    "Select Units": "Metric",
    "Select your operation": "N VRA",
    Crop: "Grasses",
    "Solid or Liquid product": "Spreader",
    "Product/Units": "(kg of N)/hectare",
    "Cost/Unit": "Cost/(kg of N)",
    "Conversion Factor": 1,
    "% Saving": 0.054,
    "efficiency increase": 0,
    Yield: 0.02,
    "Yearly improvement savings": 0.01,
    "service fee/ha": 4,
  },
  {
    "Select Units": "Metric",
    "Select your operation": "N VRA",
    Crop: "Grasses",
    "Solid or Liquid product": "Sprayer",
    "Product/Units": "(kg of N)/hectare",
    "Cost/Unit": "Cost/(kg of N)",
    "Conversion Factor": 1,
    "% Saving": 0.079,
    "efficiency increase": 0,
    Yield: 0.02,
    "Yearly improvement savings": 0.01,
    "service fee/ha": 4,
  },
  {
    "Select Units": "Metric",
    "Select your operation": "PGR VRA",
    Crop: "Grasses",
    "Solid or Liquid product": "Sprayer",
    "Product/Units": "ml/ha",
    "Cost/Unit": "$/l",
    "Conversion Factor": 0.001,
    "% Saving": 0.1,
    "efficiency increase": 0.1,
    Yield: 0.02,
    "Yearly improvement savings": 0.01,
    "service fee/ha": 1.5,
  },
  {
    "Select Units": "Metric",
    "Select your operation": "HA VRA",
    Crop: "Grasses",
    "Solid or Liquid product": "Sprayer",
    "Product/Units": "ml/ha",
    "Cost/Unit": "$/l",
    "Conversion Factor": 0.001,
    "% Saving": 0.1,
    "efficiency increase": 0.05,
    Yield: 0.01,
    "Yearly improvement savings": 0.01,
    "service fee/ha": 1.5,
  },
  {
    "Select Units": "Imperial",
    "Select your operation": "N VRA",
    Crop: "Grasses",
    "Solid or Liquid product": "Spreader",
    "Product/Units": "(lbs of N)/ac",
    "Cost/Unit": "Cost/(lb of N)",
    "Conversion Factor": 1,
    "% Saving": 0.054,
    "efficiency increase": 0,
    Yield: 0.02,
    "Yearly improvement savings": 0.01,
    "service fee/ha": 1.5,
  },
  {
    "Select Units": "Imperial",
    "Select your operation": "N VRA",
    Crop: "Grasses",
    "Solid or Liquid product": "Sprayer",
    "Product/Units": "(lbs of N)/ac",
    "Cost/Unit": "Cost/(lb of N)",
    "Conversion Factor": 1,
    "% Saving": 0.079,
    "efficiency increase": 0,
    Yield: 0.02,
    "Yearly improvement savings": 0.01,
    "service fee/ha": 1.5,
  },
  {
    "Select Units": "Imperial",
    "Select your operation": "PGR VRA",
    Crop: "Grasses",
    "Solid or Liquid product": "Sprayer",
    "Product/Units": "oz/ac",
    "Cost/Unit": "$/gal",
    "Conversion Factor": 0.0078125,
    "% Saving": 0.1,
    "efficiency increase": 0.1,
    Yield: 0.02,
    "Yearly improvement savings": 0.01,
    "service fee/ha": 1.5,
  },
  {
    "Select Units": "Imperial",
    "Select your operation": "HA VRA",
    Crop: "Grasses",
    "Solid or Liquid product": "Sprayer",
    "Product/Units": "oz/ac",
    "Cost/Unit": "$/gal",
    "Conversion Factor": 0.0078125,
    "% Saving": 0.1,
    "efficiency increase": 0.05,
    Yield: 0.01,
    "Yearly improvement savings": 0.01,
    "service fee/ha": 1.5,
  },
  {
    "Select Units": "Metric",
    "Select your operation": "N VRA",
    Crop: "Other small grains",
    "Solid or Liquid product": "Spreader",
    "Product/Units": "(kg of N)/hectare",
    "Cost/Unit": "Cost/(kg of N)",
    "Conversion Factor": 1,
    "% Saving": 0.076,
    "efficiency increase": 0,
    Yield: 0.02,
    "Yearly improvement savings": 0.01,
    "service fee/ha": 4,
  },
  {
    "Select Units": "Metric",
    "Select your operation": "N VRA",
    Crop: "Other small grains",
    "Solid or Liquid product": "Sprayer",
    "Product/Units": "(kg of N)/hectare",
    "Cost/Unit": "Cost/(kg of N)",
    "Conversion Factor": 1,
    "% Saving": 0.076,
    "efficiency increase": 0,
    Yield: 0.02,
    "Yearly improvement savings": 0.01,
    "service fee/ha": 4,
  },
  {
    "Select Units": "Metric",
    "Select your operation": "PGR VRA",
    Crop: "Other small grains",
    "Solid or Liquid product": "Sprayer",
    "Product/Units": "ml/ha",
    "Cost/Unit": "$/l",
    "Conversion Factor": 0.001,
    "% Saving": 0.1,
    "efficiency increase": 0.1,
    Yield: 0.02,
    "Yearly improvement savings": 0.01,
    "service fee/ha": 1.5,
  },
  {
    "Select Units": "Metric",
    "Select your operation": "HA VRA",
    Crop: "Other small grains",
    "Solid or Liquid product": "Sprayer",
    "Product/Units": "ml/ha",
    "Cost/Unit": "$/l",
    "Conversion Factor": 0.001,
    "% Saving": 0.1,
    "efficiency increase": 0.05,
    Yield: 0.01,
    "Yearly improvement savings": 0.01,
    "service fee/ha": 1.5,
  },
  {
    "Select Units": "Imperial",
    "Select your operation": "N VRA",
    Crop: "Other small grains",
    "Solid or Liquid product": "Spreader",
    "Product/Units": "(lbs of N)/ac",
    "Cost/Unit": "Cost/(lb of N)",
    "Conversion Factor": 1,
    "% Saving": 0.076,
    "efficiency increase": 0,
    Yield: 0.02,
    "Yearly improvement savings": 0.01,
    "service fee/ha": 1.5,
  },
  {
    "Select Units": "Imperial",
    "Select your operation": "N VRA",
    Crop: "Other small grains",
    "Solid or Liquid product": "Sprayer",
    "Product/Units": "(lbs of N)/ac",
    "Cost/Unit": "Cost/(lb of N)",
    "Conversion Factor": 1,
    "% Saving": 0.076,
    "efficiency increase": 0,
    Yield: 0.02,
    "Yearly improvement savings": 0.01,
    "service fee/ha": 1.5,
  },
  {
    "Select Units": "Imperial",
    "Select your operation": "PGR VRA",
    Crop: "Other small grains",
    "Solid or Liquid product": "Sprayer",
    "Product/Units": "oz/ac",
    "Cost/Unit": "$/gal",
    "Conversion Factor": 0.0078125,
    "% Saving": 0.1,
    "efficiency increase": 0.1,
    Yield: 0.02,
    "Yearly improvement savings": 0.01,
    "service fee/ha": 1.5,
  },
  {
    "Select Units": "Imperial",
    "Select your operation": "HA VRA",
    Crop: "Other small grains",
    "Solid or Liquid product": "Sprayer",
    "Product/Units": "oz/ac",
    "Cost/Unit": "$/gal",
    "Conversion Factor": 0.0078125,
    "% Saving": 0.1,
    "efficiency increase": 0.05,
    Yield: 0.01,
    "Yearly improvement savings": 0.01,
    "service fee/ha": 1.5,
  },
  {
    "Select Units": "Metric",
    "Select your operation": "N VRA",
    Crop: "Sorghum ",
    "Solid or Liquid product": "Spreader",
    "Product/Units": "(kg of N)/hectare",
    "Cost/Unit": "Cost/(kg of N)",
    "Conversion Factor": 1,
    "% Saving": 0.086,
    "efficiency increase": 0,
    Yield: 0.02,
    "Yearly improvement savings": 0.01,
    "service fee/ha": 4,
  },
  {
    "Select Units": "Metric",
    "Select your operation": "N VRA",
    Crop: "Sorghum ",
    "Solid or Liquid product": "Sprayer",
    "Product/Units": "(kg of N)/hectare",
    "Cost/Unit": "Cost/(kg of N)",
    "Conversion Factor": 1,
    "% Saving": 0.086,
    "efficiency increase": 0,
    Yield: 0.02,
    "Yearly improvement savings": 0.01,
    "service fee/ha": 4,
  },
  {
    "Select Units": "Metric",
    "Select your operation": "PGR VRA",
    Crop: "Sorghum ",
    "Solid or Liquid product": "Sprayer",
    "Product/Units": "ml/ha",
    "Cost/Unit": "$/l",
    "Conversion Factor": 0.001,
    "% Saving": 0.13,
    "efficiency increase": 0.05,
    Yield: 0.01,
    "Yearly improvement savings": 0.01,
    "service fee/ha": 1.5,
  },
  {
    "Select Units": "Metric",
    "Select your operation": "HA VRA",
    Crop: "Sorghum ",
    "Solid or Liquid product": "Sprayer",
    "Product/Units": "ml/ha",
    "Cost/Unit": "$/l",
    "Conversion Factor": 0.001,
    "% Saving": 0.1,
    "efficiency increase": 0.05,
    Yield: 0.01,
    "Yearly improvement savings": 0.01,
    "service fee/ha": 1.5,
  },
  {
    "Select Units": "Imperial",
    "Select your operation": "N VRA",
    Crop: "Sorghum ",
    "Solid or Liquid product": "Spreader",
    "Product/Units": "(lbs of N)/ac",
    "Cost/Unit": "Cost/(lb of N)",
    "Conversion Factor": 1,
    "% Saving": 0.086,
    "efficiency increase": 0,
    Yield: 0.02,
    "Yearly improvement savings": 0.01,
    "service fee/ha": 1.5,
  },
  {
    "Select Units": "Imperial",
    "Select your operation": "N VRA",
    Crop: "Sorghum ",
    "Solid or Liquid product": "Sprayer",
    "Product/Units": "(lbs of N)/ac",
    "Cost/Unit": "Cost/(lb of N)",
    "Conversion Factor": 1,
    "% Saving": 0.086,
    "efficiency increase": 0,
    Yield: 0.02,
    "Yearly improvement savings": 0.01,
    "service fee/ha": 1.5,
  },
  {
    "Select Units": "Imperial",
    "Select your operation": "PGR VRA",
    Crop: "Sorghum ",
    "Solid or Liquid product": "Sprayer",
    "Product/Units": "oz/ac",
    "Cost/Unit": "$/gal",
    "Conversion Factor": 0.0078125,
    "% Saving": 0.13,
    "efficiency increase": 0.05,
    Yield: 0.01,
    "Yearly improvement savings": 0.01,
    "service fee/ha": 1.5,
  },
  {
    "Select Units": "Imperial",
    "Select your operation": "HA VRA",
    Crop: "Sorghum ",
    "Solid or Liquid product": "Sprayer",
    "Product/Units": "oz/ac",
    "Cost/Unit": "$/gal",
    "Conversion Factor": 0.0078125,
    "% Saving": 0.1,
    "efficiency increase": 0.05,
    Yield: 0.01,
    "Yearly improvement savings": 0.01,
    "service fee/ha": 1.5,
  },
];
const nftd = Intl.NumberFormat("en-US", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
  currency: "USD",
});

const calc = async () => {
  const unit = "Metric";
  const isMetric = unit === "Metric";

  const formData = {
    cropDetails: [
      {
        crop: "Cotton",
        totalArea: 750,
        avgYield: 50,
        costPerHect: 5,
        avgSellingPrice: 6,
        avgFertiliser: 60,
        nitrogenApply: "Sprayer",
        nitrogenApplicationsNum: 1,
        avgCostOfProduct: 2,
        hasGrowthRegulator: true,
        avgPgrApplied: 10,
        avgPgrCost: 78,
        regulatorApplicationsNum: 1,
        hasHarvestAid: true,
        avgHaApplied: 79,
        avgHaCost: 80,
        harvestApplicationsNum: 2,
        first: {},
        second: {},
        third: {},
      },
    ],
  };
  const results = { first: {}, second: {}, third: {} };
  const mailData = {};

  // CALCULATING RESULTS
  let s, s1, s2, s3;
  const years = ["first", "second", "third"];

  try {
    // calculating Chemical Cost (without AUG)
    s = 0;
    for (const cropDetail of formData.cropDetails) {
      let p =
        1 *
        operations.find(
          (val) =>
            val["Solid or Liquid product"] === cropDetail["nitrogenApply"] &&
            val["Crop"] === cropDetail["crop"] &&
            val["Select your operation"] === "N VRA" &&
            val["Select Units"] === unit
        )["Conversion Factor"];
      for (const field of [
        "totalArea",
        "avgFertiliser",
        "avgCostOfProduct",
        "nitrogenApplicationsNum",
      ]) {
        p *= cropDetail[field];
      }
      s += p;

      for (const year of years) {
        cropDetail[year]["nCostWithoutAUG"] = p;
      }
    }

    for (const year of years) {
      results[year]["nCostWithoutAUG"] = s;
    }

    // calculating N Cost(with Augmenta Savings)
    s1 = s2 = s3 = 0;
    for (const cropDetail of formData.cropDetails) {
      for (let i = 0; i < years.length; i++) {
        const year = years[i];
        cropDetail[year]["nCostWithAUG"] =
          cropDetail[year]["nCostWithoutAUG"] *
          (1 -
            operations.find(
              (val) =>
                val["Solid or Liquid product"] ===
                  cropDetail["nitrogenApply"] &&
                val["Crop"] === cropDetail["crop"] &&
                val["Select your operation"] === "N VRA" &&
                val["Select Units"] === unit
            )["% Saving"] -
            operations.find(
              (val) =>
                val["Solid or Liquid product"] ===
                  cropDetail["nitrogenApply"] &&
                val["Crop"] === cropDetail["crop"] &&
                val["Select your operation"] === "N VRA" &&
                val["Select Units"] === unit
            )["Yearly improvement savings"] *
              (i + 1));

        switch (i) {
          case 0: {
            s1 += cropDetail[year]["nCostWithAUG"];
            break;
          }
          case 1: {
            s2 += cropDetail[year]["nCostWithAUG"];
            break;
          }
          case 2: {
            s3 += cropDetail[year]["nCostWithAUG"];
            break;
          }
        }
      }
    }
    results["first"]["nCostWithAUG"] = s1;
    results["second"]["nCostWithAUG"] = s2;
    results["third"]["nCostWithAUG"] = s3;

    // calculating PGR without Augmenta
    s1 = 0;
    for (const cropDetail of formData.cropDetails) {
      s = 1;
      if (cropDetail["hasGrowthRegulator"]) {
        for (const field of [
          "totalArea",
          "avgPgrApplied",
          "avgPgrCost",
          "regulatorApplicationsNum",
        ]) {
          s *= cropDetail[field];
        }

        s *= operations.find(
          (val) =>
            val["Solid or Liquid product"] === cropDetail["nitrogenApply"] &&
            val["Crop"] === cropDetail["crop"] &&
            val["Select your operation"] === "PGR VRA" &&
            val["Select Units"] === unit
        )["Conversion Factor"];
      } else s = 0;

      for (const year of years) {
        cropDetail[year]["pgrWithoutAUG"] = s;
      }
      s1 += s;
    }
    for (const year of years) {
      results[year]["pgrWithoutAUG"] = s1;
    }

    // calculating PGR with Augmenta
    s1 = s2 = s3 = 0;
    for (const cropDetail of formData.cropDetails) {
      const haVraSavings = cropDetail["hasHarvestAid"]
        ? operations.find(
            (val) =>
              val["Solid or Liquid product"] === cropDetail["nitrogenApply"] &&
              val["Crop"] === cropDetail["crop"] &&
              val["Select your operation"] === "HA VRA" &&
              val["Select Units"] === unit
          )["% Saving"]
        : 0;
      const pgrVraYearlySavings = cropDetail["hasGrowthRegulator"]
        ? operations.find((val) =>
            val["Solid or Liquid product"] === cropDetail["nitrogenApply"] &&
            val["Crop"] === cropDetail["crop"] &&
            val["Select your operation"] === "PGR VRA" &&
            val["Select Units"] === isMetric
              ? "Metric"
              : "Imperial"
          )["Yearly improvement savings"]
        : 0;

      for (let i = 0; i < years.length; i++) {
        const year = years[i];

        cropDetail[year]["pgrWithAUG"] =
          cropDetail[year]["pgrWithoutAUG"] *
          (1 - haVraSavings - pgrVraYearlySavings * [2, 1, 3][i]);

        switch (i) {
          case 0: {
            s1 += cropDetail[year]["pgrWithAUG"];
            break;
          }
          case 1: {
            s2 += cropDetail[year]["pgrWithAUG"];
            break;
          }
          case 2: {
            s3 += cropDetail[year]["pgrWithAUG"];
            break;
          }
        }
      }
    }
    results["first"]["pgrWithAUG"] = s1;
    results["second"]["pgrWithAUG"] = s2;
    results["third"]["pgrWithAUG"] = s3;

    // calculating HA without Augmenta
    s1 = 0;
    for (const cropDetail of formData.cropDetails) {
      s = 1;
      if (cropDetail["hasHarvestAid"]) {
        for (const field of [
          "totalArea",
          "avgHaApplied",
          "avgHaCost",
          "harvestApplicationsNum",
        ]) {
          s *= cropDetail[field];
        }

        s *= operations.find((val) =>
          val["Solid or Liquid product"] === cropDetail["nitrogenApply"] &&
          val["Crop"] === cropDetail["crop"] &&
          val["Select your operation"] === "HA VRA" &&
          val["Select Units"] === isMetric
            ? "Metric"
            : "Imperial"
        )["Conversion Factor"];
      } else {
        s = 0;
      }

      for (const year of years) {
        cropDetail[year]["haWithoutAUG"] = s;
      }
      s1 += s;
    }
    for (const year of years) {
      results[year]["haWithoutAUG"] = s1;
    }

    // calculating HA with Augmenta
    s1 = s2 = s3 = 0;
    for (const cropDetail of formData.cropDetails) {
      const haVraSavings = cropDetail["hasHarvestAid"]
        ? operations.find(
            (val) =>
              val["Solid or Liquid product"] === cropDetail["nitrogenApply"] &&
              val["Crop"] === cropDetail["crop"] &&
              val["Select your operation"] === "HA VRA" &&
              val["Select Units"] === unit
          )["% Saving"]
        : 0;
      const haVraImprovementSavings = cropDetail["hasHarvestAid"]
        ? operations.find(
            (val) =>
              val["Solid or Liquid product"] === cropDetail["nitrogenApply"] &&
              val["Crop"] === cropDetail["crop"] &&
              val["Select your operation"] === "HA VRA" &&
              val["Select Units"] === unit
          )["Yearly improvement savings"]
        : 0;

      for (let i = 0; i < years.length; i++) {
        const year = years[i];

        cropDetail[year]["haWithAUG"] =
          cropDetail[year]["haWithoutAUG"] *
          (1 - haVraSavings - haVraImprovementSavings * (i + 1));

        switch (i) {
          case 0: {
            s1 += cropDetail[year]["haWithAUG"];
            break;
          }
          case 1: {
            s2 += cropDetail[year]["haWithAUG"];
            break;
          }
          case 2: {
            s3 += cropDetail[year]["haWithAUG"];
            break;
          }
        }
      }
    }
    results["first"]["haWithAUG"] = s1;
    results["second"]["haWithAUG"] = s2;
    results["third"]["haWithAUG"] = s3;

    // Calculating Chemical cost without Augmenta
    for (const year of years) {
      results[year]["fertCostWithoutAUG"] = 0;
    }
    for (const year of years) {
      s =
        results[year]["nCostWithoutAUG"] +
        results[year]["pgrWithoutAUG"] +
        results[year]["haWithoutAUG"];
      results[year]["fertCostWithoutAUG"] += s;
    }
    years.forEach((year) => {
      mailData[`${year}_fertCostWithoutAUG`] =
        results[year]["fertCostWithoutAUG"];
    });

    // Calculating Chemical cost with Augmenta
    for (const year of years) {
      results[year]["fertCostWithAUG"] = 0;
    }
    for (const cropDetail of formData.cropDetails) {
      for (const year of years) {
        s =
          cropDetail[year]["nCostWithAUG"] +
          cropDetail[year]["pgrWithAUG"] +
          cropDetail[year]["haWithAUG"];
        results[year]["fertCostWithAUG"] += s;
      }
    }
    years.forEach((year) => {
      mailData[`${year}_fertCostWithAUG`] = results[year]["fertCostWithAUG"];
    });

    // calculating Yield Without Augmenta
    s = 0;
    for (const cropDetail of formData.cropDetails) {
      p = 1;
      for (const field of ["totalArea", "avgYield", "avgSellingPrice"]) {
        p *= cropDetail[field];
      }
      for (const year of years) {
        cropDetail[year]["yieldWithoutAUG"] = p;
      }

      s += p;
    }

    for (const year of years) {
      results[year]["yieldWithoutAUG"] = s;
    }
    years.forEach((year) => {
      mailData[`${year}_yieldWithoutAUG`] = s;
    });

    // calculating Yield With Augmenta
    s = 0;
    for (const cropDetail of formData.cropDetails) {
      s1 = 0;
      for (const year of years) {
        cropDetail[year]["yieldIncreaseNVRA"] =
          cropDetail[year]["yieldWithoutAUG"] *
          operations.find(
            (val) =>
              val["Solid or Liquid product"] === cropDetail["nitrogenApply"] &&
              val["Crop"] === cropDetail["crop"] &&
              val["Select your operation"] === "N VRA" &&
              val["Select Units"] === unit
          )["Yearly improvement savings"];
        cropDetail[year]["yieldIncreasePGR"] =
          cropDetail[year]["yieldWithoutAUG"] *
          (cropDetail["hasGrowthRegulator"]
            ? operations.find(
                (val) =>
                  val["Solid or Liquid product"] ===
                    cropDetail["nitrogenApply"] &&
                  val["Crop"] === cropDetail["crop"] &&
                  val["Select your operation"] === "PGR VRA" &&
                  val["Select Units"] === unit
              )["Yield"]
            : 0);
        cropDetail[year]["yieldIncreaseHA"] =
          cropDetail[year]["yieldWithoutAUG"] *
          (cropDetail["hasHarvestAid"]
            ? operations.find(
                (val) =>
                  val["Solid or Liquid product"] ===
                    cropDetail["nitrogenApply"] &&
                  val["Crop"] === cropDetail["crop"] &&
                  val["Select your operation"] === "HA VRA" &&
                  val["Select Units"] === unit
              )["Yield"]
            : 0);

        cropDetail[year]["yieldIncreaseWithAUG"] =
          cropDetail[year]["yieldIncreaseNVRA"] +
          cropDetail[year]["yieldIncreasePGR"] +
          cropDetail[year]["yieldIncreaseHA"];
        cropDetail[year]["yieldWithAUG"] =
          cropDetail[year]["yieldWithoutAUG"] +
          cropDetail[year]["yieldIncreaseWithAUG"];
        s1 = cropDetail[year]["yieldWithAUG"];
      }
      s += s1;
    }
    for (const year of years) {
      results[year]["yieldWithAUG"] = s;
    }
    years.forEach((year) => {
      mailData[`${year}_yieldWithAUG`] = s;
    });

    // calculating Production Cost (without Augmenta)
    s = s1 = 0;
    for (const cropDetail of formData.cropDetails) {
      s = cropDetail["totalArea"] * cropDetail["costPerHect"];
      for (const year of years) {
        cropDetail[year]["prodCostWithoutAUG"] = s;
      }
      s1 += s;
    }

    for (const year of years) {
      results[year]["prodCostWithoutAUG"] = s1;
    }
    years.forEach((year) => {
      mailData[`${year}_prodCostWithoutAUG`] = s1;
    });

    // Production Cost (with Augmenta)
    s1 = 0;
    for (const cropDetail of formData.cropDetails) {
      const nVraEfficieny = operations.find(
        (val) =>
          val["Solid or Liquid product"] === cropDetail["nitrogenApply"] &&
          val["Crop"] === cropDetail["crop"] &&
          val["Select your operation"] === "N VRA" &&
          val["Select Units"] === unit
      )["efficiency increase"];
      const pgrVraEfficieny = cropDetail["hasGrowthRegulator"]
        ? operations.find(
            (val) =>
              val["Solid or Liquid product"] === cropDetail["nitrogenApply"] &&
              val["Crop"] === cropDetail["crop"] &&
              val["Select your operation"] === "PGR VRA" &&
              val["Select Units"] === unit
          )["efficiency increase"]
        : 0;
      const haVraEfficieny = cropDetail["hasHarvestAid"]
        ? operations.find(
            (val) =>
              val["Solid or Liquid product"] === cropDetail["nitrogenApply"] &&
              val["Crop"] === cropDetail["crop"] &&
              val["Select your operation"] === "HA VRA" &&
              val["Select Units"] === unit
          )["efficiency increase"]
        : 0;

      for (const year of years) {
        cropDetail[year]["prodCostWithAUG"] =
          cropDetail[year]["prodCostWithoutAUG"] *
          (1 - nVraEfficieny - pgrVraEfficieny - haVraEfficieny);
        s = cropDetail[year]["prodCostWithAUG"];
      }

      s1 += s;
    }
    for (const year of years) {
      results[year]["prodCostWithAUG"] = s1;
    }
    years.forEach((year) => {
      mailData[`${year}_prodCostWithAUG`] = s1;
    });

    // Calculating Yearly Fees paid to Augmenta (Crop)
    const hardWareFees = [12000, 0, 0];
    for (const cropDetail of formData.cropDetails) {
      const nVraFees =
        cropDetail["totalArea"] *
        operations.find(
          (val) =>
            val["Solid or Liquid product"] === cropDetail["nitrogenApply"] &&
            val["Crop"] === cropDetail["crop"] &&
            val["Select your operation"] === "N VRA" &&
            val["Select Units"] === unit
        )["service fee/ha"];

      const pgrVraFees =
        cropDetail["totalArea"] *
        (cropDetail["hasGrowthRegulator"]
          ? operations.find(
              (val) =>
                val["Solid or Liquid product"] ===
                  cropDetail["nitrogenApply"] &&
                val["Crop"] === cropDetail["crop"] &&
                val["Select your operation"] === "PGR VRA" &&
                val["Select Units"] === unit
            )["service fee/ha"]
          : 0);

      const haVraFees =
        cropDetail["totalArea"] *
        (cropDetail["hasHarvestAid"]
          ? operations.find(
              (val) =>
                val["Solid or Liquid product"] ===
                  cropDetail["nitrogenApply"] &&
                val["Crop"] === cropDetail["crop"] &&
                val["Select your operation"] === "HA VRA" &&
                val["Select Units"] === unit
            )["service fee/ha"]
          : 0);

      for (let i = 0; i < years.length; i++) {
        const year = years[i];

        cropDetail[year]["nVraFees"] = nVraFees;
        cropDetail[year]["pgrVraFees"] = pgrVraFees;
        cropDetail[year]["haVraFees"] = haVraFees;
        cropDetail[year]["payAUG"] =
          nVraFees + pgrVraFees + haVraFees + hardWareFees[i];
      }
    }

    // Calculating Yearly Fees paid to Augmenta (Total)
    for (const year of years) {
      results[year]["nVraFees"] = 0;
      results[year]["pgrVraFees"] = 0;
      results[year]["haVraFees"] = 0;
      results[year]["payAUG"] = 0;
    }
    for (const cropDetail of formData.cropDetails) {
      for (const year of years) {
        results[year]["nVraFees"] += cropDetail[year]["nVraFees"];
        results[year]["pgrVraFees"] += cropDetail[year]["pgrVraFees"];
        results[year]["haVraFees"] += cropDetail[year]["haVraFees"];
        results[year]["payAUG"] += cropDetail[year]["payAUG"];
      }
    }

    // Calculating Profit Without & With Augmenta (Crop)
    s = 0;
    for (const cropDetail of formData.cropDetails) {
      s += cropDetail["totalArea"];
    }
    for (const year of years) {
      results[year]["profitWithoutAUG"] =
        results[year]["yieldWithoutAUG"] -
        results[year]["fertCostWithoutAUG"] -
        results[year]["prodCostWithoutAUG"];

      results[year]["combinedProfit"] =
        results[year]["yieldWithAUG"] -
        results[year]["fertCostWithAUG"] -
        results[year]["prodCostWithAUG"];

      results[year]["profitByAUG"] =
        results[year]["combinedProfit"] - results[year]["profitWithoutAUG"];
      mailData[`${year}_combinedProfit`] = results[year]["combinedProfit"];

      results[year]["yearlyGrandTotal"] =
        results[year]["combinedProfit"] - results[year]["payAUG"];

      results[year]["perHectProfit"] = results[year]["yearlyGrandTotal"] / s;
    }

    // calculating total profit after 3 Years
    s = 0;
    for (const year of years) {
      s += results[year]["yearlyGrandTotal"];
    }
    results["profitThreeYears"] = s;

    // calculating Average profit per hectare
    s = 0;
    for (const cropDetail of formData.cropDetails) {
      s += cropDetail["totalArea"];
    }
    results["avgProfitPerHect"] = results["profitThreeYears"] / 3 / s;

    console.log({
      results,
    });
  } catch (error) {
    console.error(error);
  }

  const nonNumFields = [
    "date",
    "email",
    "metric",
    "region",
    "state",
    "contact_email",
    "address",
    "currency",
  ];
  Object.keys(mailData).forEach((key) => {
    if (nonNumFields.includes(key)) return;
    else mailData[key] = "$" + nftd.format(mailData[key]);
  });
};

calc();
