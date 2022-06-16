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
  ],
  nftd = Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    currency: "USD",
  }),
  getCurrentSlide = () => {
    let e = 0;
    return (
      document.querySelectorAll("div.w-slide").forEach((r, i) => {
        r.getAttribute("aria-hidden") || (e = i);
      }),
      e
    );
  },
  isSlideValid = () => {
    const e = getCurrentSlide(),
      r = document.querySelector("div.w-slider-arrow-right"),
      i = document.querySelector("a.next-slide-button");
    let o = !0;
    const t = document
      .querySelector(`div.w-slide[aria-label="${e + 1} of 3"]`)
      .querySelectorAll("input, select");
    for (const e of t)
      if (
        !e.classList.contains("hidden") &&
        !e.classList.contains("hiden") &&
        !e.checkValidity()
      ) {
        o = !1;
        break;
      }
    o
      ? (r.classList.remove("hiden"), i.classList.remove("hiden"))
      : (r.classList.add("hiden"), i.classList.add("hiden"));
  },
  removeCrop = (e) => {
    1 <
      document.querySelectorAll(
        ".slide---brix:nth-of-type(2) .first-step-grid---brix"
      ).length && e.target.parentElement.remove();
  },
  instantiateCropBlock = (e, r) => {
    e.querySelectorAll("input").forEach((e) =>
      e.addEventListener("input", function () {
        setTimeout(isSlideValid, 300);
      })
    );
    const i = e.querySelector("#Crop");
    $(i).on("change", function (r) {
      const i = window.sessionStorage.getItem("unit"),
        o = r.target.value,
        t = "Metric" === i;
      [
        "Sugarbeets",
        "Potatoes",
        "Clovers (Alfalfa, etc)",
        "Sugarcane",
        "Onion",
        "Grasses",
        "Spinach",
        "Grape",
      ].includes(o)
        ? $(
            t
              ? e.querySelector("input#AVG-Yield-Metric")
              : e.querySelector("input#AVG-Yield-Imperial")
          ).attr("placeholder", t ? "metric tons per hectare" : "tons per acre")
        : "Cotton" === o
        ? $(
            t
              ? e.querySelector("input#AVG-Yield-Metric")
              : e.querySelector("input#AVG-Yield-Imperial")
          ).attr("placeholder", t ? "kg per hectare" : "tons per acre")
        : $(
            t
              ? e.querySelector("input#AVG-Yield-Metric")
              : e.querySelector("input#AVG-Yield-Imperial")
          ).attr(
            "placeholder",
            t ? "metric tons per hectare" : "bushels per acre"
          ),
        setTimeout(isSlideValid, 350);
    });
    const o = e.querySelector("select#Growth-Regulator");
    $(o).on("change", function () {
      const r = "Yes" === $(this).val(),
        i = "Metric" === window.sessionStorage.getItem("unit"),
        o = ["avg_pgr_applied", "AVG-cost-of-PGR-per-unit-Euro"],
        t = ["avg_pgr_applied-2", "AVG-cost-of-PGR-per-unit-USD"];
      r
        ? ($(e.querySelector("#Way-to-apply-nitrogen")).val("Sprayer"),
          $(e.querySelector("#regulator-block"))
            .removeClass("hidden")
            .attr("required", "true"),
          $(e.querySelector("#Number-Of-In-Season-Applications-PGR"))
            .removeClass("hidden")
            .attr("required", "true"),
          i
            ? (o.forEach((r) =>
                $(e.querySelector("#" + r))
                  .removeClass("hidden")
                  .attr("required", "true")
              ),
              t.forEach((r) =>
                $(e.querySelector("#" + r))
                  .addClass("hidden")
                  .removeAttr("required")
              ))
            : (t.forEach((r) =>
                $(e.querySelector("#" + r))
                  .removeClass("hidden")
                  .attr("required", "true")
              ),
              o.forEach((r) =>
                $(e.querySelector("#" + r))
                  .addClass("hidden")
                  .removeAttr("required")
              )))
        : ($(e.querySelector("#regulator-block"))
            .addClass("hidden")
            .removeAttr("required"),
          $(e.querySelector("#Number-Of-In-Season-Applications-PGR"))
            .addClass("hidden")
            .removeAttr("required"),
          [...o, ...t].forEach((r) =>
            $(e.querySelector(`#${r}`))
              .addClass("hidden")
              .removeAttr("required")
          )),
        setTimeout(isSlideValid, 350);
    });
    const t = e.querySelector("select#harvest-aid");
    $(t).on("change", function () {
      const r = "Yes" === $(this).val(),
        i = "Metric" === window.sessionStorage.getItem("unit"),
        o = ["avg-ha-metric", "AVG-cost-of-HA-per-unit-Euro"],
        t = ["avg-ha-imperial", "AVG-cost-of-HA-per-unit-USD"];
      r
        ? ($(e.querySelector("#Way-to-apply-nitrogen")).val("Sprayer"),
          $(e.querySelector("#aid-block"))
            .removeClass("hidden")
            .attr("required", "true"),
          $(e.querySelector("#Number-Of-In-Season-Applications-HA"))
            .removeClass("hidden")
            .attr("required", "true"),
          i
            ? (o.forEach((r) =>
                $(e.querySelector("#" + r))
                  .removeClass("hidden")
                  .attr("required", "true")
              ),
              t.forEach((r) =>
                $(e.querySelector("#" + r))
                  .addClass("hidden")
                  .removeAttr("required")
              ))
            : (t.forEach((r) =>
                $(e.querySelector("#" + r))
                  .removeClass("hidden")
                  .attr("required", "true")
              ),
              o.forEach((r) =>
                $(e.querySelector("#" + r))
                  .addClass("hidden")
                  .removeAttr("required")
              )))
        : ($(e.querySelector("#aid-block"))
            .addClass("hidden")
            .removeAttr("required"),
          $(e.querySelector("#Number-Of-In-Season-Applications-HA"))
            .addClass("hidden")
            .removeAttr("required"),
          [...o, ...t].forEach((r) =>
            $(e.querySelector(`#${r}`))
              .addClass("hidden")
              .removeAttr("required")
          )),
        setTimeout(isSlideValid, 350);
    });
    const a = e.querySelector("#Way-to-apply-nitrogen");
    $(a).on("change", function (r) {
      "Spreader" === r.target.value &&
        ($(e.querySelector("#Growth-Regulator")).val("No"),
        $(e.querySelector("#Growth-Regulator")).trigger("change"),
        $(e.querySelector("#harvest-aid")).val("No"),
        $(e.querySelector("#harvest-aid")).trigger("change")),
        setTimeout(isSlideValid, 350);
    }),
      r &&
        (r.after(e),
        $(o).val("No"),
        $(o).trigger("change"),
        $(t).val("No"),
        $(t).trigger("change"));
  },
  sendMail = (e) => (
    $("input.roi-btn").attr("value", "Please Wait..."),
    new Promise((r, i) => {
      fetch("https://hook.eu1.make.com/htjw2twkesysg78bedcvz8yy8yn6a257", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(e),
      })
        .then((e) => {
          if (200 === e.status) return e.json();
          throw new Error(e.statusText);
        })
        .then((e) => {
          console.log(e), r(null);
        })
        .catch((e) => {
          console.error(e), i(null);
        });
    })
  ),
  calc = async () => {
    const e = sessionStorage.getItem("unit"),
      r = "Metric" === e,
      i = { cropDetails: [] },
      o = { first: {}, second: {}, third: {} },
      t = {
        date: new Date().toISOString().substring(0, 10),
        email: $("#Example-email").val(),
        metric: $("select#Units").val(),
        region: $("#Region").val(),
        state: sessionStorage.getItem("state"),
        contact_email: "info@augmenta.ag",
        address:
          "United States" === $("#Region").val()
            ? "3309 Elm St Dallas Tx 75226"
            : "Irakliou 40, Metamorfosi 144 51, Greece",
        currency: "Metric" === $("select#Units").val() ? "Euros" : "USD",
      };
    for (let e = 0; 5 > e; e++)
      for (const r of ["first", "second", "third"])
        (t[`crop${e + 1}_${r}_profitWithAUG`] = "NA"),
          (t[`crop${e + 1}_${r}_profitWithoutAUG`] = "NA"),
          (t[`crop${e + 1}_${r}_profitByAUG`] = "NA");
    const a = [
      { id: "Crop", label: "Crop", slug: "crop", isString: !0 },
      {
        id: r ? "Total-Cropped-Area-Hectares" : "Total-Cropped-Area-Acres",
        label: "Total Cropped Area",
        slug: "totalArea",
      },
      {
        id: r ? "AVG-Yield-Metric" : "AVG-Yield-Imperial",
        label: "AVG Yield",
        slug: "avgYield",
      },
      {
        id: r
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
        id: r
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
        isString: !0,
      },
      {
        id: r ? "avg_cost_of_product-eur" : "avg_cost_of_product-usd",
        label: "Avg cost of product per unit",
        slug: "avgCostOfProduct",
      },
      {
        id: "Growth-Regulator",
        label: "Will this field have plant growth regulator applied?",
        slug: "hasGrowthRegulator",
        isString: !0,
      },
      {
        id: "harvest-aid",
        label: "Will this field have harvest aid applied?",
        slug: "hasHarvestAid",
        isString: !0,
      },
    ];
    [
      { id: "Region", label: "Region", slug: "region" },
      { id: "Example-email", label: "Email", slug: "email" },
    ].forEach(({ id: e, slug: r }) => {
      i[r] = $(`#${e}`).val();
    });
    const n = new Set([
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
      ]),
      c = document.querySelectorAll(
        ".slide---brix:nth-of-type(2) .first-step-grid---brix"
      );
    for (const e of c) {
      const o = {};
      a.forEach(({ id: r, slug: i, isString: t }) => {
        o[i] = t
          ? $(e.querySelector(`#${r}`)).val()
          : +$(e.querySelector(`#${r}`)).val();
      }),
        (o.crop = n.has(o.crop) ? o.crop : "Other small grains"),
        "Yes" === o.hasGrowthRegulator
          ? ((o.hasGrowthRegulator = !0),
            (o.avgPgrApplied = r
              ? +$(e.querySelector("#avg_pgr_applied")).val()
              : +$(e.querySelector("#avg_pgr_applied-2")).val()),
            (o.avgPgrCost = r
              ? +$(e.querySelector("#AVG-cost-of-PGR-per-unit-Euro")).val()
              : +$(e.querySelector("#AVG-cost-of-PGR-per-unit-USD")).val()),
            (o.regulatorApplicationsNum = +$(
              e.querySelector("#Number-Of-In-Season-Applications-PGR")
            ).val()))
          : (o.hasGrowthRegulator = !1),
        "Yes" === o.hasHarvestAid
          ? ((o.hasHarvestAid = !0),
            (o.avgHaApplied = r
              ? +$(e.querySelector("#avg-ha-metric")).val()
              : +$(e.querySelector("#avg-ha-imperial")).val()),
            (o.avgHaCost = r
              ? +$(e.querySelector("#AVG-cost-of-HA-per-unit-Euro")).val()
              : +$(e.querySelector("#AVG-cost-of-HA-per-unit-USD")).val()),
            (o.harvestApplicationsNum = +$(
              e.querySelector("#Number-Of-In-Season-Applications-HA")
            ).val()))
          : (o.hasHarvestAid = !1),
        i.cropDetails.push({ ...o, first: {}, second: {}, third: {} });
    }
    let s, l, d, u;
    const f = ["first", "second", "third"];
    s = 0;
    for (const r of i.cropDetails) {
      let i =
        1 *
        operations.find(
          (i) =>
            i["Solid or Liquid product"] === r.nitrogenApply &&
            i.Crop === r.crop &&
            "N VRA" === i["Select your operation"] &&
            i["Select Units"] === e
        )["Conversion Factor"];
      for (const e of [
        "totalArea",
        "avgFertiliser",
        "avgCostOfProduct",
        "nitrogenApplicationsNum",
      ])
        i *= r[e];
      s += i;
      for (const e of f) r[e].nCostWithoutAUG = i;
    }
    for (const e of f) o[e].nCostWithoutAUG = s;
    l = d = u = 0;
    for (const r of i.cropDetails)
      for (let i = 0; i < f.length; i++) {
        const o = f[i];
        switch (
          ((r[o].nCostWithAUG =
            r[o].nCostWithoutAUG *
            (1 -
              operations.find(
                (i) =>
                  i["Solid or Liquid product"] === r.nitrogenApply &&
                  i.Crop === r.crop &&
                  "N VRA" === i["Select your operation"] &&
                  i["Select Units"] === e
              )["% Saving"] -
              operations.find(
                (i) =>
                  i["Solid or Liquid product"] === r.nitrogenApply &&
                  i.Crop === r.crop &&
                  "N VRA" === i["Select your operation"] &&
                  i["Select Units"] === e
              )["Yearly improvement savings"] *
                (i + 1))),
          i)
        ) {
          case 0:
            l += r[o].nCostWithAUG;
            break;
          case 1:
            d += r[o].nCostWithAUG;
            break;
          case 2:
            u += r[o].nCostWithAUG;
        }
      }
    (o.first.nCostWithAUG = l),
      (o.second.nCostWithAUG = d),
      (o.third.nCostWithAUG = u),
      (l = 0);
    for (const r of i.cropDetails) {
      if (((s = 1), r.hasGrowthRegulator)) {
        for (const e of [
          "totalArea",
          "avgPgrApplied",
          "avgPgrCost",
          "regulatorApplicationsNum",
        ])
          s *= r[e];
        s *= operations.find(
          (i) =>
            i.Crop === r.crop &&
            "PGR VRA" === i["Select your operation"] &&
            i["Select Units"] === e
        )["Conversion Factor"];
      } else s = 0;
      for (const e of f) r[e].pgrWithoutAUG = s;
      l += s;
    }
    for (const e of f) o[e].pgrWithoutAUG = l;
    l = d = u = 0;
    for (const o of i.cropDetails) {
      const i = o.hasHarvestAid
          ? operations.find(
              (r) =>
                r.Crop === o.crop &&
                "HA VRA" === r["Select your operation"] &&
                r["Select Units"] === e
            )["% Saving"]
          : 0,
        t = o.hasGrowthRegulator
          ? operations.find((e) =>
              e.Crop === o.crop &&
              "PGR VRA" === e["Select your operation"] &&
              e["Select Units"] === r
                ? "Metric"
                : "Imperial"
            )["Yearly improvement savings"]
          : 0;
      for (let e = 0; e < f.length; e++) {
        const r = f[e];
        switch (
          ((o[r].pgrWithAUG = o[r].pgrWithoutAUG * (1 - i - t * [2, 1, 3][e])),
          e)
        ) {
          case 0:
            l += o[r].pgrWithAUG;
            break;
          case 1:
            d += o[r].pgrWithAUG;
            break;
          case 2:
            u += o[r].pgrWithAUG;
        }
      }
    }
    (o.first.pgrWithAUG = l),
      (o.second.pgrWithAUG = d),
      (o.third.pgrWithAUG = u),
      (l = 0);
    for (const r of i.cropDetails) {
      if (((s = 1), r.hasHarvestAid)) {
        for (const e of [
          "totalArea",
          "avgHaApplied",
          "avgHaCost",
          "harvestApplicationsNum",
        ])
          s *= r[e];
        s *= operations.find(
          (i) =>
            i.Crop === r.crop &&
            "HA VRA" === i["Select your operation"] &&
            i["Select Units"] === e
        )["Conversion Factor"];
      } else s = 0;
      for (const e of f) r[e].haWithoutAUG = s;
      l += s;
    }
    for (const e of f) o[e].haWithoutAUG = l;
    l = d = u = 0;
    for (const r of i.cropDetails) {
      const i = r.hasHarvestAid
          ? operations.find(
              (i) =>
                i.Crop === r.crop &&
                "HA VRA" === i["Select your operation"] &&
                i["Select Units"] === e
            )["% Saving"]
          : 0,
        o = r.hasHarvestAid
          ? operations.find(
              (i) =>
                i.Crop === r.crop &&
                "HA VRA" === i["Select your operation"] &&
                i["Select Units"] === e
            )["Yearly improvement savings"]
          : 0;
      for (let e = 0; e < f.length; e++) {
        const t = f[e];
        switch (
          ((r[t].haWithAUG = r[t].haWithoutAUG * (1 - i - o * (e + 1))), e)
        ) {
          case 0:
            l += r[t].haWithAUG;
            break;
          case 1:
            d += r[t].haWithAUG;
            break;
          case 2:
            u += r[t].haWithAUG;
        }
      }
    }
    (o.first.haWithAUG = l), (o.second.haWithAUG = d), (o.third.haWithAUG = u);
    for (const e of f) o[e].fertCostWithoutAUG = 0;
    for (const e of f)
      (s = o[e].nCostWithoutAUG + o[e].pgrWithoutAUG + o[e].haWithoutAUG),
        (o[e].fertCostWithoutAUG += s);
    f.forEach((e) => {
      t[`${e}_fertCostWithoutAUG`] = o[e].fertCostWithoutAUG;
    });
    for (const e of f) o[e].fertCostWithAUG = 0;
    for (const e of i.cropDetails)
      for (const r of f)
        (s = e[r].nCostWithAUG + e[r].pgrWithAUG + e[r].haWithAUG),
          (o[r].fertCostWithAUG += s);
    f.forEach((e) => {
      t[`${e}_fertCostWithAUG`] = o[e].fertCostWithAUG;
    }),
      (s = 0);
    for (const e of i.cropDetails) {
      p = 1;
      for (const r of ["totalArea", "avgYield", "avgSellingPrice"]) p *= e[r];
      for (const r of f) e[r].yieldWithoutAUG = p;
      s += p;
    }
    for (const e of f) o[e].yieldWithoutAUG = s;
    f.forEach((e) => {
      t[`${e}_yieldWithoutAUG`] = s;
    }),
      (s = 0);
    for (const r of i.cropDetails) {
      l = 0;
      for (const i of f)
        (r[i].yieldIncreaseNVRA =
          r[i].yieldWithoutAUG *
          operations.find(
            (i) =>
              i["Solid or Liquid product"] === r.nitrogenApply &&
              i.Crop === r.crop &&
              "N VRA" === i["Select your operation"] &&
              i["Select Units"] === e
          )["Yearly improvement savings"]),
          (r[i].yieldIncreasePGR =
            r[i].yieldWithoutAUG *
            (r.hasGrowthRegulator
              ? operations.find(
                  (i) =>
                    i.Crop === r.crop &&
                    "PGR VRA" === i["Select your operation"] &&
                    i["Select Units"] === e
                ).Yield
              : 0)),
          (r[i].yieldIncreaseHA =
            r[i].yieldWithoutAUG *
            (r.hasHarvestAid
              ? operations.find(
                  (i) =>
                    i.Crop === r.crop &&
                    "HA VRA" === i["Select your operation"] &&
                    i["Select Units"] === e
                ).Yield
              : 0)),
          (r[i].yieldIncreaseWithAUG =
            r[i].yieldIncreaseNVRA +
            r[i].yieldIncreasePGR +
            r[i].yieldIncreaseHA),
          (r[i].yieldWithAUG =
            r[i].yieldWithoutAUG + r[i].yieldIncreaseWithAUG),
          (l = r[i].yieldWithAUG);
      s += l;
    }
    for (const e of f) o[e].yieldWithAUG = s;
    f.forEach((e) => {
      t[`${e}_yieldWithAUG`] = s;
    }),
      (s = l = 0);
    for (const e of i.cropDetails) {
      s = e.totalArea * e.costPerHect;
      for (const r of f) e[r].prodCostWithoutAUG = s;
      l += s;
    }
    for (const e of f) o[e].prodCostWithoutAUG = l;
    f.forEach((e) => {
      t[`${e}_prodCostWithoutAUG`] = l;
    }),
      (l = 0);
    for (const r of i.cropDetails) {
      const i = operations.find(
          (i) =>
            i["Solid or Liquid product"] === r.nitrogenApply &&
            i.Crop === r.crop &&
            "N VRA" === i["Select your operation"] &&
            i["Select Units"] === e
        )["efficiency increase"],
        o = r.hasGrowthRegulator
          ? operations.find(
              (i) =>
                i.Crop === r.crop &&
                "PGR VRA" === i["Select your operation"] &&
                i["Select Units"] === e
            )["efficiency increase"]
          : 0,
        t = r.hasHarvestAid
          ? operations.find(
              (i) =>
                i.Crop === r.crop &&
                "HA VRA" === i["Select your operation"] &&
                i["Select Units"] === e
            )["efficiency increase"]
          : 0;
      for (const e of f)
        (r[e].prodCostWithAUG = r[e].prodCostWithoutAUG * (1 - i - o - t)),
          (s = r[e].prodCostWithAUG);
      l += s;
    }
    for (const e of f) o[e].prodCostWithAUG = l;
    f.forEach((e) => {
      t[`${e}_prodCostWithAUG`] = l;
    });
    const S = [15e3, 0, 0];
    for (let r = 0; r < i.cropDetails.length; r++) {
      const o = i.cropDetails[r],
        a = o.totalArea * ("Imperial" === e ? 2 : 5);
      for (let e = 0; e < f.length; e++) {
        const i = f[e];
        (o[i].vraFees = a),
          (o[i].hardWareFees = 0 === r ? S[e] : 0),
          (o[i].payAUG = a + (0 === r ? S[e] : 0)),
          (o[i].profitWithoutAUG =
            o[i].yieldWithoutAUG -
            o[i].nCostWithoutAUG -
            o[i].pgrWithoutAUG -
            o[i].haWithoutAUG -
            o[i].prodCostWithoutAUG),
          (o[i].profitWithAUG =
            o[i].yieldWithAUG -
            o[i].nCostWithAUG -
            o[i].pgrWithAUG -
            o[i].haWithAUG -
            o[i].prodCostWithAUG -
            o[i].payAUG),
          (o[i].profitByAUG = o[i].profitWithAUG - o[i].profitWithoutAUG),
          5 > r &&
            ((t[`crop${r + 1}_${i}_profitWithAUG`] = o[i].profitWithAUG),
            (t[`crop${r + 1}_${i}_profitWithoutAUG`] = o[i].profitWithoutAUG),
            (t[`crop${r + 1}_${i}_profitByAUG`] = o[i].profitByAUG));
      }
    }
    for (const e of f)
      (o[e].vraFees = 0), (o[e].hardWareFees = 0), (o[e].payAUG = 0);
    for (const e of i.cropDetails)
      for (const r of f)
        (o[r].vraFees += e[r].vraFees),
          (o[r].hardWareFees += e[r].hardWareFees),
          (o[r].payAUG += e[r].payAUG);
    for (const e of f)
      (t[`${e}_vraFees`] = o[e].vraFees),
        (t[`${e}_hardWareFees`] = o[e].hardWareFees),
        (t[`${e}_payAUG`] = o[e].payAUG);
    s = 0;
    for (const e of i.cropDetails) s += e.totalArea;
    for (const e of f)
      (o[e].profitWithoutAUG =
        o[e].yieldWithoutAUG -
        o[e].fertCostWithoutAUG -
        o[e].prodCostWithoutAUG),
        (t[`${e}_profitWithoutAUG`] = o[e].profitWithoutAUG),
        (o[e].combinedProfit =
          o[e].yieldWithAUG - o[e].fertCostWithAUG - o[e].prodCostWithAUG),
        (o[e].yearlyGrandTotal = o[e].combinedProfit - o[e].payAUG),
        (t[`${e}_profitWithAUG`] = o[e].yearlyGrandTotal),
        (o[e].profitByAUG = o[e].yearlyGrandTotal - o[e].profitWithoutAUG),
        (t[`${e}_profitByAUG`] = o[e].profitByAUG);
    s = l = 0;
    for (const e of f) (s += o[e].yearlyGrandTotal), (l += o[e].profitByAUG);
    (o.profitThreeYears = s),
      (o.totalProfitByAUG = l),
      (o.email = i.email),
      (o.currency = "Metric" === t.metric ? "EUR" : "USD"),
      sessionStorage.setItem("roi-results", JSON.stringify(o));
    const v = [
      "date",
      "email",
      "metric",
      "region",
      "state",
      "contact_email",
      "address",
      "currency",
    ];
    Object.keys(t).forEach((e) => {
      v.includes(e) || isNaN(+t[e]) || (t[e] = "$" + nftd.format(t[e]));
    });
    try {
      await sendMail(t),
        $("input.roi-btn").attr("value", "Redirecting to Result Page..."),
        setTimeout(() => (window.location.pathname = "/thank-you-page"), 500);
    } catch (e) {
      $("input.roi-btn").attr("value", "Get your ROI");
    }
  };
window.addEventListener("load", () => {
  const e = document.getElementById("wf-form-Multi-step-Form-Preview"),
    r = document.querySelector(".crop-button"),
    i = document.getElementById("Example-email"),
    o = document.querySelector("input.roi-btn"),
    t = document.querySelector("div.w-slider-arrow-right"),
    a = document.querySelector("a.next-slide-button"),
    n = document.querySelector("div.w-slider-arrow-left");
  e.reset(),
    e.addEventListener("submit", (e) => {
      e.preventDefault(), e.stopImmediatePropagation();
      // calc();
    }),
    isSlideValid();
  const c = (e) => setTimeout(isSlideValid, e);
  t.addEventListener("click", () => c(300)),
    a.addEventListener("click", () => {
      $(t).trigger("click"), c(300);
    }),
    n.addEventListener("click", () => c(300)),
    $("input, select").each(function () {
      $(this).on("input change", () => c(500));
    }),
    r.addEventListener("click", addCrop);
  // i.addEventListener("keydown", function (e) {
  //   console.log("ev: pressed enter");
  //   "Enter" === e.code && calc();
  // });
  const s = document.querySelector(
      ".slide---brix:nth-of-type(2) .first-step-grid---brix .remove-crop-btn"
    ),
    l = document.querySelector(
      ".slide---brix:nth-of-type(2) .first-step-grid---brix"
    );
  s.addEventListener("click", () => {
    1 <
      document.querySelectorAll(
        ".slide---brix:nth-of-type(2) .first-step-grid---brix"
      ).length && l.remove();
  }),
    setTimeout(() => instantiateCropBlock(l), 500),
    o.addEventListener("click", () => {
      const r = e.querySelectorAll("input:not(.hidden)");
      let i = !0;
      for (const e of r)
        if (!e.checkValidity()) {
          i = !1;
          break;
        }
      i && calc();
    }),
    $("#Region").on("change", function () {
      $(".country-label").each(function () {
        $(this).addClass("hiden");
      });
      const e = $(this).val(),
        r = {
          "United States": "US",
          "North and Central America": "North-and-Central-America",
          "South America": "South-America",
          Europe: "Europe",
          Canada: "Canada",
          CIS: "CIS",
          Africa: "Africa",
          Oceania: "Oceania",
          Asia: "Asia",
        },
        i = ["United States", "North and Central America", "Canada"];
      Object.keys(r).forEach((o) => {
        const t = r[o];
        t &&
          (o === e
            ? ($(`select#${t}`).removeClass("hiden"),
              $(`select#${t}`).attr("required", "required"),
              i.includes(e)
                ? $("#state").removeClass("hiden")
                : $($(".country-label")[0]).removeClass("hiden"))
            : ($(`select#${t}`).addClass("hiden"),
              $(`select#${t}`).removeAttr("required")));
      }),
        setTimeout(isSlideValid, 300);
    }),
    $("select.country-selector").each(function () {
      $(this).on("change", function () {
        const e = $(this).val();
        e
          ? ($("div#units-field").removeClass("hiden"),
            sessionStorage.setItem("state", e))
          : $("div#units-field").addClass("hiden");
      });
    }),
    $("select#Units").on("change", function () {
      const e = $(this).val();
      if (e) {
        window.sessionStorage.setItem("unit", e);
        const r = [
            "Total-Cropped-Area-Hectares",
            "AVG-Yield-Metric",
            "avg_cost_of_product-eur",
            "AVG-amount-of-fertilizer-applief-after-planting",
            "Cost-of-Production-per-Area-Euro",
            "metric-fertilizer",
            "AVG-units-of-fertilizer-applied-after-planting-Metric",
          ],
          i = [
            "Total-Cropped-Area-Acres",
            "AVG-Yield-Imperial",
            "avg_cost_of_product-usd",
            "AVG-Yield-Imperial",
            "lbs-acre-field",
            "Cost-of-Production-per-Area-USD",
            "imperial-fertilizer",
            "AVG-units-of-fertilizer-applied-after-planting-Imperial",
          ],
          o = ["avg_pgr_applied", "AVG-cost-of-PGR-per-unit-Euro"],
          t = ["avg_pgr_applied-2", "AVG-cost-of-PGR-per-unit-USD"],
          a = ["avg-ha-metric", "AVG-cost-of-HA-per-unit-Euro"],
          n = ["avg-ha-imperial", "AVG-cost-of-HA-per-unit-USD"];
        "Metric" === e
          ? (i.forEach((e) =>
              $(`#${e}`).each(function () {
                $(this).addClass("hidden").removeAttr("required");
              })
            ),
            r.forEach((e) =>
              $(`#${e}`).each(function () {
                $(this).removeClass("hidden").attr("required", "true");
              })
            ))
          : "Imperial" === e &&
            (r.forEach((e) =>
              $(`#${e}`).each(function () {
                $(this).addClass("hidden").removeAttr("required");
              })
            ),
            i.forEach((e) =>
              $(`#${e}`).each(function () {
                $(this).removeClass("hidden").attr("required", "true");
              })
            )),
          "Yes" === $("#Growth-Regulator").val() &&
            ("Metric" === e
              ? (o.forEach((e) =>
                  $(`#${e}`).each(function () {
                    $(this).removeClass("hidden").attr("required", "true");
                  })
                ),
                t.forEach((e) =>
                  $(`#${e}`).each(function () {
                    $(this).addClass("hidden").removeAttr("required");
                  })
                ))
              : (t.forEach((e) =>
                  $(`#${e}`).each(function () {
                    $(this).removeClass("hidden").attr("required", "true");
                  })
                ),
                o.forEach((e) =>
                  $(`#${e}`).each(function () {
                    $(this).addClass("hidden").removeAttr("required");
                  })
                ))),
          "Yes" === $("#harvest-aid").val() &&
            ("Metric" === e
              ? (a.forEach((e) =>
                  $(`#${e}`).each(function () {
                    $(this).removeClass("hidden").attr("required", "true");
                  })
                ),
                n.forEach((e) =>
                  $(`#${e}`).each(function () {
                    $(this).addClass("hidden").removeAttr("required");
                  })
                ))
              : (n.forEach((e) =>
                  $(`#${e}`).each(function () {
                    $(this).removeClass("hidden").attr("required", "true");
                  })
                ),
                a.forEach((e) =>
                  $(`#${e}`).each(function () {
                    $(this).addClass("hidden").removeAttr("required");
                  })
                ))),
          $("#Crop").each(function () {
            $(this).val(""), $(this).trigger("change");
          });
      }
    });
});
const addCrop = () => {
  const e = document.querySelector(
      ".slide---brix:nth-of-type(2) .first-step-grid---brix:last-of-type"
    ),
    r = e.cloneNode(!0);
  r.querySelectorAll("input").forEach((e) => (e.value = ""));
  const i = r.querySelector("a.remove-crop-btn");
  i &&
    i.addEventListener("click", () => {
      1 <
        document.querySelectorAll(
          ".slide---brix:nth-of-type(2) .first-step-grid---brix"
        ).length && (r.remove(), setTimeout(isSlideValid, 400));
    }),
    instantiateCropBlock(r, e),
    setTimeout(isSlideValid, 400);
};
