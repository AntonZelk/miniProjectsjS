class Validator {
  isEmail(email) {
    return /^([a-zA-z\d_.\-]+@[a-z]+\.[a-z]{2,3})$/.test(email);
  }
  isDomain(domain) {
    return /^([a-z_.\-]+\.[a-z]{2,3})$/.test(domain);
  }
  isDate(date) {
    return /^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/.test(
      date
    );
  }
  isPhone(fhone) {
    return /^(\+375)\((29|25|44|33)\)\s(\d{3})-(\d{2})-(\d{2})$/.test(fhone);
  }
}

let validator = new Validator();
console.log(validator.isEmail("phphtm-loll@mail.4df"));
console.log(validator.isDomain("phphtml123.by"));
console.log(validator.isDate("32.01.2020"));
console.log(validator.isPhone("+375(44) 817-68-92"));
