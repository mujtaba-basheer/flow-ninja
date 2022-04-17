const validation = (values) => {
  const regexESNHex = /^[0-9a-fA-F]{8}$/; // Hex ESN (eight digit mixed case hex)
  const regexESNDec = /^[0-9]{11}$/; // Decimal ESN candidate (eleven decimal digits further validation is possible)
  const regexIMEINoCheckDec = /^[0-9]{14}$/; // Decimal IMEI with no check digit (fourteen digit decimal)
  const regexMEIDNoCheckHex = /^[0-9a-fA-F]{14}$/; // Hex MEID with no check digit (fourteen digit mixed case hex)
  const regexIMEIWithCheckDec = /^[0-9]{15}$/; // Decimal IMEI with check digit (fifteen digit decimal)
  const regexMEIDWithCheckHex = /^[0-9a-fA-F]{15}$/; // Hex MEID with with check digit (fifteen digit mixed case hex)
  const regexMEIDDec = /^[0-9]{18}$/; // Decimal MEID (eighteen digit decimal)
  if (values) {
    const cleanValues = values.replace(/[\s-]+/g, "");
    if (
      !(
        regexESNHex.test(cleanValues) ||
        regexESNDec.test(cleanValues) ||
        regexIMEINoCheckDec.test(cleanValues) ||
        regexMEIDNoCheckHex.test(cleanValues) ||
        regexIMEIWithCheckDec.test(cleanValues) ||
        regexMEIDWithCheckHex.test(cleanValues) ||
        regexMEIDDec.test(cleanValues)
      )
    ) {
      return "Invalid IMEI/MEID/ESN";
    }
  } else {
    return "You must enter an IMEI/MEID/ESN";
  }
  return "";
};

console.log(validation("111"));
