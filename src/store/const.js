export const FB_TOKEN = process.env.REACT_APP_FIREBASE_KEY
export const SIGN_UP_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${FB_TOKEN}`
export const SIGN_IN_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${FB_TOKEN}`