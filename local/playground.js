function isPasswordValid(pwd) {
  const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\S]{8,}$/;
  return passwordPattern.test(pwd);
}

console.log(isPasswordValid("Test12356"));
