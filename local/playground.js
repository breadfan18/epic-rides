function emailPatternCheck(email) {
  const emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  return emailPattern.test(email);
}

console.log(emailPatternCheck("test@test.org"));
