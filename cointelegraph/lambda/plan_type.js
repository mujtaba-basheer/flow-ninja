let plan_type = "free";
const price_id = $input.line_items[0].price;

switch (price_id) {
  case "price_1NJDA6Gal2fFYNo6FdfUUNmx":
  case "price_1NJDGJGal2fFYNo6B6xc9IwG": {
    plan_type = "pro";
    break;
  }
  case "price_1NJDC3Gal2fFYNo6HxiPrJy1":
  case "price_1NJDHhGal2fFYNo6X9r4G9Os": {
    plan_type = "premium";
    break;
  }
  default: {
    plan_type = "free";
    break;
  }
}

return plan_type;
