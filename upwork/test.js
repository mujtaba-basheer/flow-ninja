function separateComma(val) {
  var sign = 1;
  if (val < 0) {
    sign = -1;
    val = -val;
  }

  let num = val.toString().includes(".")
    ? val.toString().split(".")[0]
    : val.toString();
  let len = num.toString().length;
  let result = "";
  let count = 1;

  for (let i = len - 1; i >= 0; i--) {
    result = num.toString()[i] + result;
    if (count % 3 === 0 && count !== 0 && i !== 0) {
      result = "," + result;
    }
    count++;
  }

  if (val.toString().includes(".")) {
    result = result + "." + val.toString().split(".")[1];
  }

  return sign < 0 ? "-" + result : result;
}
function formatInput(val = "") {
  let int = "",
    deci = "";
  if (val.includes(".")) {
    [int, deci] = val.split(".");
    deci = "." + (deci.length > 2 ? deci.substring(0, 2) : deci);
  } else {
    int = val;
  }
  let temp = int;
  int = "";
  console.log({ int, temp });
  const acceptedChars = /[0-9,]/g;
  for (let i = 0; i < temp.length; i++) {
    const char = temp.charAt(i);
    if (acceptedChars.test(char)) int += char;
  }
  if (int === "") int = "0";
  int = separateComma(int);

  return int + deci;
}
function removeCommas(val = "") {
  return val.replace(/,/g, "").replace(/[a-zA-Z]/g, "");
}

console.log(formatInput(process.argv[2]));
