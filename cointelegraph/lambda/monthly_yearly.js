let plan_duration = "yearly";
const price_id = $input.line_items[0].price;

switch (price_id) {
  case "price_1NJDA6Gal2fFYNo6FdfUUNmx":
  case "price_1NJDC3Gal2fFYNo6HxiPrJy1": {
    plan_duration = "monthly";
    break;
  }
}

return plan_duration;
