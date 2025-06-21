const InputValidator = (value: string) => {
  const valueTrim = value.trim();
  const regex = /[^가-힣a-zA-Z0-9 ]/g;

  if (!valueTrim) {
    // 빈 문자열 검사
    return false;
  } else if (regex.test(valueTrim)) {
    // 특수문자 및 공백 검사
    return false;
  } else if (valueTrim.length < 1 || valueTrim.length > 50) {
    // 글자 수 검사
    return false;
  } else {
    return true;
  }
};

export default InputValidator;
