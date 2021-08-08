const emailRegEx: RegExp = /\S+@\S+\.\S+/;
const atCheck: RegExp = /^[^\s@]+@[^\s@]+$/;

export interface ValidationResponse {
  valid: boolean;
  errors: String[];
}

export function validateEmail(email: string): boolean {
  const validEmail: boolean = emailRegEx.test(email);
  const multipleAtCheck: boolean = atCheck.test(email);
  return multipleAtCheck && validEmail;
}

export function validatePassword(password: string): boolean {
  const lengthValid = password.length >= 10;
  return lengthValid;
}

export function validatePhoneNumber(phone: string): boolean {
  const phoneLengthValid: boolean = phone.length >= 10;
  return phoneLengthValid;
}

export function validateLogIn(
  email: string,
  password: string
): ValidationResponse {
  const emailValid: boolean = validateEmail(email);
  const passValid: boolean = validatePassword(password);
  const allValid: boolean = emailValid && passValid;

  const validationObj: ValidationResponse = {
    valid: allValid,
    errors: [],
  };

  const validations: boolean[] = [emailValid, passValid];

  const errorMessages: String[] = ['Email is invalid', 'Password is invalid'];

  if (!allValid) {
    for (let i = 0; i < validations.length; i++) {
      if (!validations[i]) {
        validationObj.errors.push(errorMessages[i]);
      }
    }
  }
  return validationObj;
}

export function validateRegister(
  email: string,
  password: string,
  confirmPassword: string,
  firstName: string,
  lastName: string,
  phone: string
): ValidationResponse {
  const emailValid: boolean = validateEmail(email);
  const passValid: boolean = validatePassword(password);
  const passwordsEqual: boolean = password === confirmPassword;
  const validName: boolean = firstName !== '' && lastName !== '';
  const validPhone: boolean = validatePhoneNumber(phone);
  const allValid: boolean =
    emailValid && passValid && passwordsEqual && validName && validPhone;

  const validationObj: ValidationResponse = {
    valid: allValid,
    errors: [],
  };

  const errorMessages: String[] = [
    'Email is invalid',
    'Password is invalid',
    'Passwords do not match',
    'Please enter a valid name',
    'Phone Number is invalid. Please enter without parenthesis or dashes',
  ];

  const validations: boolean[] = [
    emailValid,
    passValid,
    passwordsEqual,
    validName,
    validPhone,
  ];

  if (!allValid) {
    for (let i = 0; i < validations.length; i++) {
      if (!validations[i]) {
        validationObj.errors.push(errorMessages[i]);
      }
    }
  }

  return validationObj;
}
