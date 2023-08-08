import CryptoJS from "crypto-js";

//  Encrypt Password
export const encryptPassword = async (password) => {
  const encryptPassword = CryptoJS.AES.encrypt(
    password,
    process.env.CRYPTO_JS_SEC_KEY
  ).toString();

  return encryptPassword;
};


//  Decrypt Password
export const decryptPassword = async (password, encryptedPassword) => {
  const originalPassword =await CryptoJS.AES.decrypt(
    encryptedPassword,
    process.env.CRYPTO_JS_SEC_KEY
  ).toString(CryptoJS.enc.Utf8);
  return originalPassword === password;
};
