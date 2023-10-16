export const ValidEmail = (email: string) => {
  const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRegex.test(email);
};

export const isEmpty = (input: string) => {
  return !input.trim().length;
};

export const isEngOnly = (input: string) => {
  const englishRegex = /^[a-zA-Z\s]*$/;
  return englishRegex.test(input);
};

export const isThaiOnly = (input: string) => {
  const thaiRegex = /^[ก-๛\s]*$/;
  return thaiRegex.test(input);
};

export const numOnly = (input: string) => {
  const numRegex = /^\d+$/;
  return numRegex.test(input);
}

export const validPhone = (input: string): [boolean, string] => {
  // Remove all non-digit characters from the input
  let cleanInput = input.replace(/\D/g, '');

  // Insert hyphens
  if (cleanInput.length > 6) {
    cleanInput = `${cleanInput.slice(0, 3)}-${cleanInput.slice(3, 6)}-${cleanInput.slice(6)}`;
  } else if (cleanInput.length > 3) {
    cleanInput = `${cleanInput.slice(0, 3)}-${cleanInput.slice(3)}`;
  }

  // Limit to 12 digits
  if(cleanInput.length > 12){
    cleanInput = cleanInput.slice(0, 12);
  }

  // Check the pattern
  const pattern = /^0\d{2}-\d{3}-\d{4}$/;
  const isValid = pattern.test(cleanInput);
  
  return [isValid, cleanInput];
};