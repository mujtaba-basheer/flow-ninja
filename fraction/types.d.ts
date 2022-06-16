import gsap from "gsap";

export type CompareMap = {
  fraction: number;
  heloc: number;
  reverse_mortgage: number;
  regular_mortgage: number;
  he_investment: number;
  he_agreement: number;
};
export type Results = {
  rate: CompareMap;
  monthly_payment: CompareMap;
  cash_pocket: CompareMap;
  net_cost: CompareMap;
};
export type FormatType = {
  rate: "percent" | "currency";
  monthly_payment: "percent" | "currency";
  cash_pocket: "percent" | "currency";
  net_cost: "percent" | "currency";
};
export type MortgageTable = {
  month: number;
  principal: number;
  interest: number;
  payment: number;
  balance: number;
}[];

export type gsap = GSAP;
