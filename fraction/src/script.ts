type CompareMap = {
  fraction: number;
  heloc: number;
  reverse_mortgage: number;
  regular_mortgage: number;
  he_investment: number;
  he_agreement: number;
};
type Results = {
  rate: CompareMap;
  monthly_payment: CompareMap;
  cash_pocket: CompareMap;
  net_cost: CompareMap;
};
type FormatType = {
  rate: "percent" | "currency";
  monthly_payment: "percent" | "currency";
  cash_pocket: "percent" | "currency";
  net_cost: "percent" | "currency";
};
type MortgageTable = {
  month: number;
  principal: number;
  interest: number;
  payment: number;
  balance: number;
}[];

const formatNum = (val: number, style: "currency" | "percent") => {
  return new Intl.NumberFormat("en", {
    style,
    currency: "USD",
    maximumFractionDigits: style === "currency" ? 0 : 2,
    minimumFractionDigits: style === "currency" ? 0 : 2,
  }).format(val);
};

const PMT = (
  rate: number,
  nper: number,
  pv: number,
  fv?: number,
  type?: 0 | 1
) => {
  /*
   * rate   - interest rate per month
   * nper   - number of periods (months)
   * pv   - present value
   * fv   - future value
   * type - when the payments are due:
   *        0: end of the period, e.g. end of month (default)
   *        1: beginning of period
   */
  let pmt: number, pvif: number;

  fv || (fv = 0);
  type || (type = 0);

  if (rate === 0) return -(pv + fv) / nper;

  pvif = Math.pow(1 + rate, nper);
  pmt = (-rate * (pv * pvif + fv)) / (pvif - 1);

  if (type === 1) pmt /= 1 + rate;

  return pmt;
};

const PV = (
  rate: number,
  nper: number,
  pmt: number,
  fv?: number,
  type?: 0 | 1
) => {
  /*
   * rate   - interest rate per month
   * nper   - number of periods (months)
   * pv   - present value
   * fv   - future value
   * type - when the payments are due:
   *        0: end of the period, e.g. end of month (default)
   *        1: beginning of period
   */
  let pv: number;

  fv || (fv = 0);
  type || (type = 0);

  if (rate === 0) return fv - pmt * nper;

  const exp = Math.pow(1 + rate, nper);
  pv = -((fv + (pmt * (1 + rate * type) * (exp - 1)) / rate) / exp);

  return pv;
};

const original_value = 1_000_000;
const loan_amt = 100_000;
const appreciation = 0.04;
const term = 5;

const constants = {
  MIN_RATE: 0.0374,
  MAX_RATE: 0.0938,
  DISCOUNT_RATE: 0.01,
  FEES: 0.025,
  HELOC_FEES: 0.025,
  HE_INV_DISCOUNT: 0.1,
  HE_INV_MULTIPLE: 3.5,
  HE_AGR_MULTIPLE: 1.5,
  HE_AGR_FEES: 0.0399,
  REG_MORT_FEES: 0.02,
  REG_MORT_RATE: 0.0368,
  REV_MORT_RATE: 0.055,
  REV_MORT_FEES: 0.025,
};
const formatMap: FormatType = {
  rate: "percent",
  monthly_payment: "currency",
  cash_pocket: "currency",
  net_cost: "percent",
};

const principal = loan_amt * (1 + constants.REG_MORT_FEES);
const payment = -PMT(constants.REG_MORT_RATE / 12, 30 * 12, loan_amt, 0);
const mortgages: MortgageTable = [
  {
    month: 0,
    principal,
    interest: 0,
    payment: 0,
    balance: principal,
  },
];
for (let i = 1; i <= 60; i++) {
  const { balance: prev_balance } = mortgages[i - 1];
  const interest = prev_balance * (constants.REG_MORT_RATE / 12);
  const balance = prev_balance - (payment - interest);

  mortgages.push({
    month: i,
    principal,
    interest,
    payment,
    balance,
  });
}

const results: Results = {
  rate: {
    fraction: 0,
    heloc: 0.04,
    reverse_mortgage: constants.REV_MORT_RATE,
    regular_mortgage: constants.REG_MORT_RATE,
    he_investment: 0,
    he_agreement: 0,
  },
  monthly_payment: {
    fraction: 0,
    heloc: 0,
    reverse_mortgage: 0,
    regular_mortgage: 0,
    he_investment: 0,
    he_agreement: 0,
  },
  cash_pocket: {
    fraction: 0,
    heloc: 0,
    reverse_mortgage: 0,
    regular_mortgage: 0,
    he_investment: 0,
    he_agreement: 0,
  },
  net_cost: {
    fraction: 0,
    heloc: 0,
    reverse_mortgage: 0,
    regular_mortgage: 0,
    he_investment: 0,
    he_agreement: 0,
  },
};

// calculating rate

if (appreciation < constants.MIN_RATE) {
  results.rate.fraction = constants.MIN_RATE;
} else if (appreciation > constants.MAX_RATE) {
  results.rate.fraction = constants.MAX_RATE;
} else {
  results.rate.fraction = appreciation;
}

results.rate.he_investment =
  Math.pow(
    ((original_value * Math.pow(1 + appreciation, term) -
      original_value * (1 - constants.HE_INV_DISCOUNT)) *
      (constants.HE_INV_MULTIPLE * (loan_amt / original_value)) +
      loan_amt) /
      loan_amt,
    0.2
  ) - 1;

results.rate.he_agreement =
  Math.pow(
    (original_value *
      Math.pow(1 + appreciation, term) *
      ((loan_amt / original_value) * constants.HE_AGR_MULTIPLE)) /
      loan_amt,
    0.2
  ) - 1;

// calculating monthly payments

results.monthly_payment.heloc = loan_amt * (results.rate.heloc / 12);

results.monthly_payment.regular_mortgage = mortgages[1].payment;

// calculating cash out of pocket

results.cash_pocket.fraction = -PV(
  constants.DISCOUNT_RATE,
  term,
  0,
  loan_amt * (1 + constants.FEES) * appreciation * term + loan_amt
);

results.cash_pocket.heloc = PV(
  constants.DISCOUNT_RATE,
  term,
  -loan_amt * (1 + constants.HELOC_FEES) * appreciation,
  -loan_amt
);

results.cash_pocket.reverse_mortgage = -PV(
  constants.DISCOUNT_RATE,
  term,
  0,
  loan_amt *
    (1 + constants.REV_MORT_FEES) *
    Math.pow(1 + constants.REV_MORT_RATE, term)
);

results.cash_pocket.regular_mortgage = -PV(
  constants.DISCOUNT_RATE / 12,
  term * 12,
  payment,
  mortgages[term * 12].balance
);

results.cash_pocket.he_investment = -PV(
  constants.DISCOUNT_RATE,
  term,
  0,
  (original_value * Math.pow(1 + appreciation, term) -
    original_value * (1 - constants.HE_INV_DISCOUNT)) *
    ((loan_amt / original_value) * constants.HE_INV_MULTIPLE) +
    loan_amt
);

results.cash_pocket.he_agreement = -PV(
  constants.DISCOUNT_RATE,
  term,
  0,
  original_value *
    Math.pow(1 + appreciation, term) *
    ((loan_amt / original_value) * constants.HE_AGR_MULTIPLE) +
    constants.HE_AGR_FEES * loan_amt
);

// calculating net cost

results.net_cost.fraction =
  Math.pow(
    (loan_amt * (1 + constants.FEES) * appreciation * term + loan_amt) /
      loan_amt,
    1 / term
  ) - 1;

results.net_cost.heloc =
  Math.pow(
    (loan_amt * (1 + constants.HELOC_FEES) * appreciation * 5 +
      loan_amt * (1 + constants.HELOC_FEES)) /
      loan_amt,
    1 / term
  ) - 1;

results.net_cost.reverse_mortgage =
  Math.pow(
    (loan_amt *
      (1 + constants.REV_MORT_FEES) *
      Math.pow(1 + constants.REV_MORT_RATE, term)) /
      loan_amt,
    1 / term
  ) - 1;

results.net_cost.regular_mortgage =
  Math.pow(
    (mortgages[term * 12].balance + payment * term * 12) / loan_amt,
    1 / term
  ) - 1;

results.net_cost.he_investment =
  Math.pow(
    ((original_value * Math.pow(1 + appreciation, term) -
      original_value * (1 - constants.HE_INV_DISCOUNT)) *
      ((loan_amt / original_value) * constants.HE_INV_MULTIPLE) +
      loan_amt) /
      loan_amt,
    1 / term
  ) - 1;

results.net_cost.he_agreement =
  Math.pow(
    (original_value *
      Math.pow(1 + appreciation, term) *
      ((loan_amt / original_value) * constants.HE_AGR_MULTIPLE) +
      constants.HE_AGR_FEES * loan_amt) /
      loan_amt,
    1 / term
  ) - 1;

for (const field of Object.keys(formatMap)) {
  for (const key of Object.keys(results[field])) {
    const formatted_val = formatNum(results[field][key], formatMap[field]);
    results[field][key] = formatted_val;
  }
}

console.log(results);
