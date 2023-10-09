export const isValidEmail = (email: string) => {
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(email);
  };
  
  export const isEmpty = (input: string) => {
    return input.trim() === "";
  };
  
  export const isEnglishOnly = (input: string) => {
    const englishRegex = /^[a-zA-Z\s]*$/;
    return englishRegex.test(input);
  };
  
  export const isThaiOnly = (input: string) => {
    const thaiRegex = /^[ก-ฮ\s]*$/;
    return thaiRegex.test(input);
  };

  export const validPhone = (input: string) => {
    const pattern = /^0[0-9]-{2}-[0-9]{3}-[0-9]{4}$/;
    return pattern.test(input);
  }