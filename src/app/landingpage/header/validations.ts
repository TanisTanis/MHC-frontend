const emailRegEx = /\S+@\S+\.\S+/;
const atCheck = /^[^\s@]+@[^\s@]+$/;

interface ValidationResponse {
  valid: boolean,
  errors: String[]
}

export function validateLogIn(email: string, password: string) {
  const validEmail = emailRegEx.test(email);
  const multipleAtCheck = atCheck.test(email);
  const passValid = password.length > 5;
  const allValid = validEmail && multipleAtCheck && passValid;
  return allValid;
}

export function validateRegister(email: string, password: string, firstName: string, lastName: string, phone: string) {
  const validEmail: boolean = emailRegEx.test(email);
  const multipleAtCheck: boolean = atCheck.test(email);
  const passValid: boolean = password.length > 5;
  const validName: boolean = (firstName !== '' && lastName !== '');
  const validPhone: boolean = validatePhoneNumber(phone);
  const allValid: boolean = validEmail && multipleAtCheck && passValid && validName && validPhone;

  const validationObj: ValidationResponse = {
    valid: allValid,
    errors: []
  }

  const errorMessages: String[] = ['Email is invalid', 'Email is invalid', 'Password is invalid', 'Please enter a valid name', 'Phone Number is invalid. Please enter without parenthesis or dashes'];

  const validations: boolean[] = [validEmail, multipleAtCheck, passValid, validName, validPhone];

  for (let i = 0; i < validations.length; i++) {
    if (!validations[i]) {
      if (validationObj.errors.indexOf(errorMessages[i]) === -1) {
        validationObj.errors.push(errorMessages[i]);
      }
    }
  }

  return validationObj;
}

function validatePhoneNumber(phone: string) {
  const phoneLengthValid = phone.length >= 10 && phone.length <= 11;
  return phoneLengthValid;
}