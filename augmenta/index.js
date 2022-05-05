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
    Crop: "Rapeseed",
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
    Crop: "Rapeseed",
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
    Crop: "Rapeseed",
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
    Crop: "Rapeseed",
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
    Crop: "Rapeseed",
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
    Crop: "Rapeseed",
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
    Crop: "Rapeseed",
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
    Crop: "Rapeseed",
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
    Crop: "Canola/Rapeseed",
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
    Crop: "Canola/Rapeseed",
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
    Crop: "Canola/Rapeseed",
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
    Crop: "Canola/Rapeseed",
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
    Crop: "Canola/Rapeseed",
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
    Crop: "Canola/Rapeseed",
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
    Crop: "Canola/Rapeseed",
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
    Crop: "Canola/Rapeseed",
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
    Crop: "Wheat (winter, spring, durum)",
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
    Crop: "Wheat (winter, spring, durum)",
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
    Crop: "Wheat (winter, spring, durum)",
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
    Crop: "Wheat (winter, spring, durum)",
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
    Crop: "Wheat (winter, spring, durum)",
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
    Crop: "Wheat (winter, spring, durum)",
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
    Crop: "Wheat (winter, spring, durum)",
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
    Crop: "Wheat (winter, spring, durum)",
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
    Crop: "Barley (malt)",
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
    Crop: "Barley (malt)",
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
    Crop: "Barley (malt)",
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
    Crop: "Barley (malt)",
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
    Crop: "Barley (malt)",
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
    Crop: "Barley (malt)",
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
    Crop: "Barley (malt)",
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
    Crop: "Barley (malt)",
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
    Crop: "Sorghum/milo",
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
    Crop: "Sorghum/milo",
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
    Crop: "Sorghum/milo",
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
    Crop: "Sorghum/milo",
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
    Crop: "Sorghum/milo",
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
    Crop: "Sorghum/milo",
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
    Crop: "Sorghum/milo",
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
    Crop: "Sorghum/milo",
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
    "Select Units": "Metric",
    "Select your operation": "N VRA",
    Crop: "Barley (feed)",
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
    Crop: "Barley (feed)",
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
    Crop: "Barley (feed)",
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
    Crop: "Barley (feed)",
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
    Crop: "Barley (feed)",
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
    Crop: "Barley (feed)",
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
    Crop: "Barley (feed)",
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
    Crop: "Barley (feed)",
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

const getCurrentSlide = () => {
  let currSlide = 0;
  document.querySelectorAll("div.w-slide").forEach((slideEl, index) => {
    const isHidden = slideEl.getAttribute("aria-hidden");
    if (!isHidden) currSlide = index;
  });
  return currSlide;
};

const isSlideValid = () => {
  const slideNo = getCurrentSlide();
  const nextBtn = document.querySelector("div.w-slider-arrow-right");
  const nextBtnV2 = document.querySelector("a.next-slide-button");

  const slideEl = document.querySelector(
    `div.w-slide[aria-label="${slideNo + 1} of 3"]`
  );
  let flag = true;
  const inputEls = slideEl.querySelectorAll("input, select");
  for (const inputEl of inputEls) {
    if (
      inputEl.classList.contains("hidden") ||
      inputEl.classList.contains("hiden")
    ) {
      continue;
    }

    if (!inputEl.checkValidity()) {
      // console.log(inputEl);
      flag = false;
      break;
    }
  }

  if (flag) {
    nextBtn.classList.remove("hiden");
    nextBtnV2.classList.remove("hiden");
  } else {
    nextBtn.classList.add("hiden");
    nextBtnV2.classList.add("hiden");
  }
};

// remove crop handler
const removeCrop = (ev) => {
  const noOfCrops = document.querySelectorAll(
    ".slide---brix:nth-of-type(2) .first-step-grid---brix"
  ).length;

  if (noOfCrops > 1) ev.target.parentElement.remove();
};

// add listeners to crop block
const instantiateCropBlock = (cropEl, cropGrid) => {
  // handling any form of input
  cropEl.querySelectorAll("input").forEach((inputEl) =>
    inputEl.addEventListener("input", function () {
      setTimeout(isSlideValid, 300);
    })
  );

  // handling crop change
  const cropSelector = cropEl.querySelector("#Crop");
  $(cropSelector).on("change", function (ev) {
    const unit = window.sessionStorage.getItem("unit");
    const crop = ev.target.value;

    const type1 = [
      "Sugarbeets",
      "Potatoes",
      "Clovers (Alfalfa, etc)",
      "Sugarcane",
      "Onion",
      "Grasses",
      "Spinach",
      "Grape",
    ];
    const isMetric = unit === "Metric";

    if (type1.includes(crop)) {
      $(
        isMetric
          ? cropEl.querySelector("input#AVG-Yield-Metric")
          : cropEl.querySelector("input#AVG-Yield-Imperial")
      ).attr(
        "placeholder",
        isMetric ? "metric tons per hectare" : "tons per acre"
      );
    } else if (crop === "Cotton") {
      $(
        isMetric
          ? cropEl.querySelector("input#AVG-Yield-Metric")
          : cropEl.querySelector("input#AVG-Yield-Imperial")
      ).attr("placeholder", isMetric ? "kg per hectare" : "tons per acre");
    } else {
      $(
        isMetric
          ? cropEl.querySelector("input#AVG-Yield-Metric")
          : cropEl.querySelector("input#AVG-Yield-Imperial")
      ).attr(
        "placeholder",
        isMetric ? "metric tons per hectare" : "bushels per acre"
      );
    }

    setTimeout(isSlideValid, 350);
  });

  // Handling Regulator Change
  const pgrDropdown = cropEl.querySelector("select#Growth-Regulator");
  $(pgrDropdown).on("change", function () {
    const isYes = $(this).val() === "Yes";
    const isMetric = window.sessionStorage.getItem("unit") === "Metric";
    const metricArray = ["avg_pgr_applied", "AVG-cost-of-PGR-per-unit-Euro"];
    const imperialArray = ["avg_pgr_applied-2", "AVG-cost-of-PGR-per-unit-USD"];

    if (isYes) {
      $(cropEl.querySelector("#Way-to-apply-nitrogen")).val("Sprayer");
      $(cropEl.querySelector("#regulator-block"))
        .removeClass("hidden")
        .attr("required", "true");
      $(cropEl.querySelector("#Number-Of-In-Season-Applications-PGR"))
        .removeClass("hidden")
        .attr("required", "true");

      if (isMetric) {
        metricArray.forEach((id) =>
          $(cropEl.querySelector("#" + id))
            .removeClass("hidden")
            .attr("required", "true")
        );
        imperialArray.forEach((id) =>
          $(cropEl.querySelector("#" + id))
            .addClass("hidden")
            .removeAttr("required")
        );
      } else {
        imperialArray.forEach((id) =>
          $(cropEl.querySelector("#" + id))
            .removeClass("hidden")
            .attr("required", "true")
        );
        metricArray.forEach((id) =>
          $(cropEl.querySelector("#" + id))
            .addClass("hidden")
            .removeAttr("required")
        );
      }
    } else {
      $(cropEl.querySelector("#regulator-block"))
        .addClass("hidden")
        .removeAttr("required");
      $(cropEl.querySelector("#Number-Of-In-Season-Applications-PGR"))
        .addClass("hidden")
        .removeAttr("required");
      [...metricArray, ...imperialArray].forEach((id) =>
        $(cropEl.querySelector(`#${id}`))
          .addClass("hidden")
          .removeAttr("required")
      );
    }

    setTimeout(isSlideValid, 350);
  });

  // Handling Harvest Aid Change
  const haDropdown = cropEl.querySelector("select#harvest-aid");
  $(haDropdown).on("change", function () {
    const isYes = $(this).val() === "Yes";
    const isMetric = window.sessionStorage.getItem("unit") === "Metric";
    const metricArray = ["avg-ha-metric", "AVG-cost-of-HA-per-unit-Euro"];
    const imperialArray = ["avg-ha-imperial", "AVG-cost-of-HA-per-unit-USD"];

    if (isYes) {
      $(cropEl.querySelector("#Way-to-apply-nitrogen")).val("Sprayer");
      $(cropEl.querySelector("#aid-block"))
        .removeClass("hidden")
        .attr("required", "true");
      $(cropEl.querySelector("#Number-Of-In-Season-Applications-HA"))
        .removeClass("hidden")
        .attr("required", "true");

      if (isMetric) {
        metricArray.forEach((id) =>
          $(cropEl.querySelector("#" + id))
            .removeClass("hidden")
            .attr("required", "true")
        );
        imperialArray.forEach((id) =>
          $(cropEl.querySelector("#" + id))
            .addClass("hidden")
            .removeAttr("required")
        );
      } else {
        imperialArray.forEach((id) =>
          $(cropEl.querySelector("#" + id))
            .removeClass("hidden")
            .attr("required", "true")
        );
        metricArray.forEach((id) =>
          $(cropEl.querySelector("#" + id))
            .addClass("hidden")
            .removeAttr("required")
        );
      }
    } else {
      $(cropEl.querySelector("#aid-block"))
        .addClass("hidden")
        .removeAttr("required");
      $(cropEl.querySelector("#Number-Of-In-Season-Applications-HA"))
        .addClass("hidden")
        .removeAttr("required");
      [...metricArray, ...imperialArray].forEach((id) =>
        $(cropEl.querySelector(`#${id}`))
          .addClass("hidden")
          .removeAttr("required")
      );
    }

    setTimeout(isSlideValid, 350);
  });

  // Handling application type change
  const nitroAppSelect = cropEl.querySelector("#Way-to-apply-nitrogen");
  $(nitroAppSelect).on("change", function (ev) {
    const appType = ev.target.value;

    if (appType === "Spreader") {
      $(cropEl.querySelector("#Growth-Regulator")).val("No");
      $(cropEl.querySelector("#Growth-Regulator")).trigger("change");
      $(cropEl.querySelector("#harvest-aid")).val("No");
      $(cropEl.querySelector("#harvest-aid")).trigger("change");
    }

    setTimeout(isSlideValid, 350);
  });

  if (cropGrid) {
    cropGrid.after(cropEl);
    $(pgrDropdown).val("No");
    $(pgrDropdown).trigger("change");
    $(haDropdown).val("No");
    $(haDropdown).trigger("change");
  }
};

const sendMail = (mailData) => {
  $("input.roi-btn").attr("value", "Please Wait...");
  return new Promise((res, rej) => {
    fetch("https://hook.integromat.com/l586cba2644k7nxe3epehibptxjlyt6k", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(mailData),
    })
      .then((resp) => {
        if (resp.status === 200) return resp.json();
        else throw new Error(resp.statusText);
      })
      .then((data) => {
        console.log(data);
        res(null);
      })
      .catch((error) => {
        console.error(error);
        rej(null);
      });
  });
};

const calc = async () => {
  const unit = sessionStorage.getItem("unit");
  const isMetric = unit === "Metric";

  const formData = { cropDetails: [] };
  const results = { first: {}, second: {}, third: {} };
  const mailData = {
    date: new Date().toISOString().substring(0, 10),
    email: $("#Example-email").val(),
    metric: $("select#Units").val(),
    region: $("#Region").val(),
    state: sessionStorage.getItem("state"),
    contact_email: "info@augmenta.ag",
    address:
      $("#Region").val() === "United States"
        ? "3309 Elm St Dallas Tx 75226"
        : "Irakliou 40, Metamorfosi 144 51, Greece",
    currency: $("select#Units").val() === "Metric" ? "Euros" : "USD",
  };
  for (let i = 0; i < 5; i++) {
    for (const year of ["first", "second", "third"]) {
      mailData[`crop${i + 1}_${year}_profitWithAUG`] = "NA";
      mailData[`crop${i + 1}_${year}_profitWithoutAUG`] = "NA";
      mailData[`crop${i + 1}_${year}_profitByAUG`] = "NA";
    }
  }

  const fields = [
    { id: "Region", label: "Region", slug: "region" },
    {
      id: "Example-email",
      label: "Email",
      slug: "email",
    },
  ];
  const cropFields = [
    { id: "Crop", label: "Crop", slug: "crop", isString: true },
    {
      id: isMetric ? "Total-Cropped-Area-Hectares" : "Total-Cropped-Area-Acres",
      label: "Total Cropped Area",
      slug: "totalArea",
    },
    {
      id: isMetric ? "AVG-Yield-Metric" : "AVG-Yield-Imperial",
      label: "AVG Yield",
      slug: "avgYield",
    },
    {
      id: isMetric
        ? "Cost-of-Production-per-Area-Euro"
        : "Cost-of-Production-per-Area-USD",
      label: "Cost/Hectare of Production",
      slug: "costPerHect",
    },
    {
      id: "avg_selling_price",
      label: "AVG selling price per unit",
      slug: "avgSellingPrice",
    },
    {
      id: isMetric
        ? "AVG-units-of-fertilizer-applied-after-planting-Metric"
        : "AVG-units-of-fertilizer-applied-after-planting-Imperial",
      label: "AVG units of fertilizer applied after planting",
      slug: "avgFertiliser",
    },
    {
      id: "Number-of-in-season-applications",
      label: "Number of in-season N applications",
      slug: "nitrogenApplicationsNum",
    },
    {
      id: "Way-to-apply-nitrogen",
      label: "The Way You Apply Nitrogen",
      slug: "nitrogenApply",
      isString: true,
    },
    {
      id: isMetric ? "avg_cost_of_product-eur" : "avg_cost_of_product-usd",
      label: "Avg cost of product per unit",
      slug: "avgCostOfProduct",
    },
    {
      id: "Growth-Regulator",
      label: "Will this field have plant growth regulator applied?",
      slug: "hasGrowthRegulator",
      isString: true,
    },
    {
      id: "harvest-aid",
      label: "Will this field have harvest aid applied?",
      slug: "hasHarvestAid",
      isString: true,
    },
  ];

  // getting values
  fields.forEach(({ id, slug }) => {
    formData[slug] = $(`#${id}`).val();
  });

  const standardCrops = new Set([
    "Corn/Maize",
    "Cotton",
    "Rapeseed/Canola",
    "Rapeseed",
    "Rice (Paddy)",
    "Soybeans",
    "Wheat (winter, spring, durum)",
    "Clovers (Alfalfa, etc)",
    "Barley (feed)",
    "Barley (malt)",
    "Grasses",
    "Sorghum/milo",
  ]);
  const cropGrids = document.querySelectorAll(
    ".slide---brix:nth-of-type(2) .first-step-grid---brix"
  );
  for (const cropGrid of cropGrids) {
    const cropData = {};
    cropFields.forEach(({ id, slug, isString }) => {
      cropData[slug] = isString
        ? $(cropGrid.querySelector(`#${id}`)).val()
        : Number($(cropGrid.querySelector(`#${id}`)).val());
    });
    cropData["crop"] = standardCrops.has(cropData["crop"])
      ? cropData["crop"]
      : "Other small grains";

    if (cropData["hasGrowthRegulator"] === "Yes") {
      cropData["hasGrowthRegulator"] = true;
      cropData["avgPgrApplied"] = isMetric
        ? Number($(cropGrid.querySelector("#avg_pgr_applied")).val())
        : Number($(cropGrid.querySelector("#avg_pgr_applied-2")).val());
      cropData["avgPgrCost"] = isMetric
        ? Number(
            $(cropGrid.querySelector("#AVG-cost-of-PGR-per-unit-Euro")).val()
          )
        : Number(
            $(cropGrid.querySelector("#AVG-cost-of-PGR-per-unit-USD")).val()
          );
      cropData["regulatorApplicationsNum"] = Number(
        $(cropGrid.querySelector("#Number-Of-In-Season-Applications-PGR")).val()
      );
    } else {
      cropData["hasGrowthRegulator"] = false;
    }

    if (cropData["hasHarvestAid"] === "Yes") {
      cropData["hasHarvestAid"] = true;
      cropData["avgHaApplied"] = isMetric
        ? Number($(cropGrid.querySelector("#avg-ha-metric")).val())
        : Number($(cropGrid.querySelector("#avg-ha-imperial")).val());
      cropData["avgHaCost"] = isMetric
        ? Number(
            $(cropGrid.querySelector("#AVG-cost-of-HA-per-unit-Euro")).val()
          )
        : Number(
            $(cropGrid.querySelector("#AVG-cost-of-HA-per-unit-USD")).val()
          );
      cropData["harvestApplicationsNum"] = Number(
        $(cropGrid.querySelector("#Number-Of-In-Season-Applications-HA")).val()
      );
    } else {
      cropData["hasHarvestAid"] = false;
    }

    formData.cropDetails.push({
      ...cropData,
      first: {},
      second: {},
      third: {},
    });
  }

  // CALCULATING RESULTS
  let s, s1, s2, s3;
  const years = ["first", "second", "third"];

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
              val["Solid or Liquid product"] === cropDetail["nitrogenApply"] &&
              val["Crop"] === cropDetail["crop"] &&
              val["Select your operation"] === "N VRA" &&
              val["Select Units"] === unit
          )["% Saving"] -
          operations.find(
            (val) =>
              val["Solid or Liquid product"] === cropDetail["nitrogenApply"] &&
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
            val["Crop"] === cropDetail["crop"] &&
            val["Select your operation"] === "HA VRA" &&
            val["Select Units"] === unit
        )["% Saving"]
      : 0;
    const pgrVraYearlySavings = cropDetail["hasGrowthRegulator"]
      ? operations.find((val) =>
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

      s *= operations.find(
        (val) =>
          val["Crop"] === cropDetail["crop"] &&
          val["Select your operation"] === "HA VRA" &&
          val["Select Units"] === unit
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
            val["Crop"] === cropDetail["crop"] &&
            val["Select your operation"] === "HA VRA" &&
            val["Select Units"] === unit
        )["% Saving"]
      : 0;
    const haVraImprovementSavings = cropDetail["hasHarvestAid"]
      ? operations.find(
          (val) =>
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
            val["Crop"] === cropDetail["crop"] &&
            val["Select your operation"] === "PGR VRA" &&
            val["Select Units"] === unit
        )["efficiency increase"]
      : 0;
    const haVraEfficieny = cropDetail["hasHarvestAid"]
      ? operations.find(
          (val) =>
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
  const hardWareFees = [15000, 0, 0];
  for (let k = 0; k < formData.cropDetails.length; k++) {
    const cropDetail = formData.cropDetails[k];
    const vraFees = cropDetail["totalArea"] * (unit === "Imperial" ? 2 : 5);

    for (let i = 0; i < years.length; i++) {
      const year = years[i];

      // Assigning fees
      cropDetail[year]["vraFees"] = vraFees;
      cropDetail[year]["hardWareFees"] = k === 0 ? hardWareFees[i] : 0;
      cropDetail[year]["payAUG"] = vraFees + (k === 0 ? hardWareFees[i] : 0);

      // Crop profit without AUG
      cropDetail[year]["profitWithoutAUG"] =
        cropDetail[year]["yieldWithoutAUG"] -
        cropDetail[year]["nCostWithoutAUG"] -
        cropDetail[year]["pgrWithoutAUG"] -
        cropDetail[year]["haWithoutAUG"] -
        cropDetail[year]["prodCostWithoutAUG"];

      // Crop profit with AUG
      cropDetail[year]["profitWithAUG"] =
        cropDetail[year]["yieldWithAUG"] -
        cropDetail[year]["nCostWithAUG"] -
        cropDetail[year]["pgrWithAUG"] -
        cropDetail[year]["haWithAUG"] -
        cropDetail[year]["prodCostWithAUG"] -
        cropDetail[year]["payAUG"];

      // Crop Profit added by AUG
      cropDetail[year]["profitByAUG"] =
        cropDetail[year]["profitWithAUG"] -
        cropDetail[year]["profitWithoutAUG"];

      // Assigning to mailData
      if (k < 5) {
        mailData[`crop${k + 1}_${year}_profitWithAUG`] =
          cropDetail[year]["profitWithAUG"];
        mailData[`crop${k + 1}_${year}_profitWithoutAUG`] =
          cropDetail[year]["profitWithoutAUG"];
        mailData[`crop${k + 1}_${year}_profitByAUG`] =
          cropDetail[year]["profitByAUG"];
      }
    }
  }

  // Calculating Yearly Fees paid to Augmenta (Total)
  for (const year of years) {
    results[year]["vraFees"] = 0;
    results[year]["hardWareFees"] = 0;
    results[year]["payAUG"] = 0;
  }
  for (const cropDetail of formData.cropDetails) {
    for (const year of years) {
      results[year]["vraFees"] += cropDetail[year]["vraFees"];
      results[year]["hardWareFees"] += cropDetail[year]["hardWareFees"];
      results[year]["payAUG"] += cropDetail[year]["payAUG"];
    }
  }
  for (const year of years) {
    mailData[`${year}_vraFees`] = results[year]["vraFees"];
    mailData[`${year}_hardWareFees`] = results[year]["hardWareFees"];
    mailData[`${year}_payAUG`] = results[year]["payAUG"];
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
    mailData[`${year}_profitWithoutAUG`] = results[year]["profitWithoutAUG"];

    results[year]["combinedProfit"] =
      results[year]["yieldWithAUG"] -
      results[year]["fertCostWithAUG"] -
      results[year]["prodCostWithAUG"];

    results[year]["yearlyGrandTotal"] =
      results[year]["combinedProfit"] - results[year]["payAUG"];
    mailData[`${year}_profitWithAUG`] = results[year]["yearlyGrandTotal"];

    results[year]["profitByAUG"] =
      results[year]["yearlyGrandTotal"] - results[year]["profitWithoutAUG"];
    mailData[`${year}_profitByAUG`] = results[year]["profitByAUG"];
  }

  // calculating total profit after 3 Years
  s = s1 = 0;
  for (const year of years) {
    s += results[year]["yearlyGrandTotal"];
    s1 += results[year]["profitByAUG"];
  }
  results["profitThreeYears"] = s;
  results["totalProfitByAUG"] = s1;

  // attaching email, currency
  results["email"] = formData["email"];
  results["currency"] = mailData["metric"] === "Metric" ? "EUR" : "USD";

  // console.log(JSON.stringify({ formData, mailData, results }, null, "  "));

  sessionStorage.setItem("roi-results", JSON.stringify(results));
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
    if (nonNumFields.includes(key) || isNaN(Number(mailData[key]))) return;
    else mailData[key] = "$" + nftd.format(mailData[key]);
  });

  try {
    await sendMail(mailData);
    $("input.roi-btn").attr("value", "Redirecting to Result Page...");
    setTimeout(() => (window.location.pathname = "/thank-you-page"), 500);
  } catch (error) {
    $("input.roi-btn").attr("value", "Get your ROI");
  }
};

window.addEventListener("load", () => {
  // declaring relevant elements
  const formEl = document.getElementById("wf-form-Multi-step-Form-Preview");
  const cropBtn = document.querySelector(".crop-button");
  const emailEl = document.getElementById("Example-email");
  const submitBtn = document.querySelector("input.roi-btn");
  const nextBtn = document.querySelector("div.w-slider-arrow-right");
  const nextBtnV2 = document.querySelector("a.next-slide-button");
  const prevBtn = document.querySelector("div.w-slider-arrow-left");

  // resetting form
  formEl.reset();

  // adding submit handler
  formEl.addEventListener("submit", (ev) => {
    ev.preventDefault();
    ev.stopImmediatePropagation();

    calc();
  });

  // checking individual slides
  isSlideValid();

  const checkCbFunc = (time) => setTimeout(isSlideValid, time);
  nextBtn.addEventListener("click", () => checkCbFunc(300));
  nextBtnV2.addEventListener("click", () => {
    $(nextBtn).trigger("click");
    checkCbFunc(300);
  });
  prevBtn.addEventListener("click", () => checkCbFunc(300));
  $("input, select").each(function () {
    $(this).on("input change", () => checkCbFunc(500));
  });

  // add-crop handler
  cropBtn.addEventListener("click", addCrop);

  // email input handler
  emailEl.addEventListener("keydown", function (ev) {
    if (ev.code === "Enter") {
      calc();
    }
  });

  const removeCropBtnTop = document.querySelector(
    ".slide---brix:nth-of-type(2) .first-step-grid---brix .remove-crop-btn"
  );
  const initialCrop = document.querySelector(
    ".slide---brix:nth-of-type(2) .first-step-grid---brix"
  );
  removeCropBtnTop.addEventListener("click", () => {
    if (
      document.querySelectorAll(
        ".slide---brix:nth-of-type(2) .first-step-grid---brix"
      ).length > 1
    )
      initialCrop.remove();
  });

  setTimeout(() => instantiateCropBlock(initialCrop), 500);

  submitBtn.addEventListener("click", () => {
    const inputFields = formEl.querySelectorAll("input:not(.hidden)");
    let flag = true;

    for (const inputField of inputFields) {
      if (!inputField.checkValidity()) {
        flag = false;
        break;
      }
    }

    if (flag) calc();
  });

  // Handling Region Change
  $("#Region").on("change", function () {
    $(".country-label").each(function () {
      $(this).addClass("hiden");
    });
    // $("div#units-field").removeClass("hiden");

    const region = $(this).val();
    const regionMap = {
      "United States": "US",
      "South America": "South-America",
      Europe: "Europe",
      CIS: "CIS",
      Africa: "Africa",
      Oceania: "Oceania",
    };

    Object.keys(regionMap).forEach((key) => {
      const countries = regionMap[key];
      if (countries) {
        if (key !== region) {
          $(`select#${countries}`).addClass("hiden");
          $(`select#${countries}`).removeAttr("required");
        } else {
          $(`select#${countries}`).removeClass("hiden");
          $(`select#${countries}`).attr("required", "required");

          if (region === "United States") {
            $("#state").removeClass("hiden");
          } else {
            $($(".country-label")[0]).removeClass("hiden");
          }
        }
      }
    });

    setTimeout(isSlideValid, 300);
  });

  // Handling State/Country Select
  $("select.country-selector").each(function () {
    $(this).on("change", function () {
      const country = $(this).val();

      if (country) {
        $("div#units-field").removeClass("hiden");
        sessionStorage.setItem("state", country);
      } else {
        $("div#units-field").addClass("hiden");
      }
    });
  });

  // Handling Units Change
  $("select#Units").on("change", function () {
    const unit = $(this).val();
    if (unit) {
      window.sessionStorage.setItem("unit", unit);

      const metricArr = [
        "Total-Cropped-Area-Hectares",
        "AVG-Yield-Metric",
        "avg_cost_of_product-eur",
        "AVG-amount-of-fertilizer-applief-after-planting",
        "Cost-of-Production-per-Area-Euro",
        "metric-fertilizer",
        "AVG-units-of-fertilizer-applied-after-planting-Metric",
      ];
      const imperialArr = [
        "Total-Cropped-Area-Acres",
        "AVG-Yield-Imperial",
        "avg_cost_of_product-usd",
        "AVG-Yield-Imperial",
        "lbs-acre-field",
        "Cost-of-Production-per-Area-USD",
        "imperial-fertilizer",
        "AVG-units-of-fertilizer-applied-after-planting-Imperial",
      ];
      const metricPgr = ["avg_pgr_applied", "AVG-cost-of-PGR-per-unit-Euro"];
      const imperialPgr = ["avg_pgr_applied-2", "AVG-cost-of-PGR-per-unit-USD"];

      const metricHa = ["avg-ha-metric", "AVG-cost-of-HA-per-unit-Euro"];
      const imperialHa = ["avg-ha-imperial", "AVG-cost-of-HA-per-unit-USD"];

      if (unit === "Metric") {
        imperialArr.forEach((id) =>
          $(`#${id}`).each(function () {
            $(this).addClass("hidden").removeAttr("required");
          })
        );
        metricArr.forEach((id) =>
          $(`#${id}`).each(function () {
            $(this).removeClass("hidden").attr("required", "true");
          })
        );
      } else if (unit === "Imperial") {
        metricArr.forEach((id) =>
          $(`#${id}`).each(function () {
            $(this).addClass("hidden").removeAttr("required");
          })
        );
        imperialArr.forEach((id) =>
          $(`#${id}`).each(function () {
            $(this).removeClass("hidden").attr("required", "true");
          })
        );
      }

      if ($("#Growth-Regulator").val() === "Yes") {
        if (unit === "Metric") {
          metricPgr.forEach((id) =>
            $(`#${id}`).each(function () {
              $(this).removeClass("hidden").attr("required", "true");
            })
          );
          imperialPgr.forEach((id) =>
            $(`#${id}`).each(function () {
              $(this).addClass("hidden").removeAttr("required");
            })
          );
        } else {
          imperialPgr.forEach((id) =>
            $(`#${id}`).each(function () {
              $(this).removeClass("hidden").attr("required", "true");
            })
          );
          metricPgr.forEach((id) =>
            $(`#${id}`).each(function () {
              $(this).addClass("hidden").removeAttr("required");
            })
          );
        }
      }
      if ($("#harvest-aid").val() === "Yes") {
        if (unit === "Metric") {
          metricHa.forEach((id) =>
            $(`#${id}`).each(function () {
              $(this).removeClass("hidden").attr("required", "true");
            })
          );
          imperialHa.forEach((id) =>
            $(`#${id}`).each(function () {
              $(this).addClass("hidden").removeAttr("required");
            })
          );
        } else {
          imperialHa.forEach((id) =>
            $(`#${id}`).each(function () {
              $(this).removeClass("hidden").attr("required", "true");
            })
          );
          metricHa.forEach((id) =>
            $(`#${id}`).each(function () {
              $(this).addClass("hidden").removeAttr("required");
            })
          );
        }
      }

      $("#Crop").each(function () {
        $(this).val("");
        $(this).trigger("change");
      });
    }
  });
});

// add crop
const addCrop = () => {
  const cropGrid = document.querySelector(
    ".slide---brix:nth-of-type(2) .first-step-grid---brix:last-of-type"
  );
  const newCropGrid = cropGrid.cloneNode(true);
  newCropGrid.querySelectorAll("input").forEach((el) => (el.value = ""));

  const removeCropBtn = newCropGrid.querySelector("a.remove-crop-btn");
  if (removeCropBtn)
    removeCropBtn.addEventListener("click", () => {
      if (
        document.querySelectorAll(
          ".slide---brix:nth-of-type(2) .first-step-grid---brix"
        ).length > 1
      ) {
        newCropGrid.remove();
        setTimeout(isSlideValid, 400);
      }
    });
  instantiateCropBlock(newCropGrid, cropGrid);

  setTimeout(isSlideValid, 400);
};
