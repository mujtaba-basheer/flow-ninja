const minPackages = 0;
const maxPackages = 30000;
const power = 6;
const minStarter = 99;
const minPro = 399;
const dollarMultiple = 1.1;
const sdeMultiple = 0.25;
const feedbackMultiple = 0.35;

const transform = (value) =>
  Math.round(
    ((Math.exp((power * value) / maxPackages) - 1) / (Math.exp(power) - 1)) *
      maxPackages
  );

const reverse = (value) =>
  (1 / power) *
  Math.log(((Math.exp(power) - 1) * value) / maxPackages + 1) *
  maxPackages;

console.log(reverse(1000));
console.log(transform(13341));
