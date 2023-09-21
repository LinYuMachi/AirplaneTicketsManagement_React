import {Auth} from "aws-amplify";

export default class PermissionUtils {
  static async signIn(username, password) {
    try {
      const user = await Auth.signIn(username, password);
      console.log(user);
    } catch (error) {
      console.log('error signing in', error);
    }
  }

  static async signup(username, password) {
    try {
      await Auth.signUp({
        username,
        password,
        autoSignIn: {
          enabled: true,
        }
      });
      console.log('Sign-up successful');
    } catch (error) {
      console.error('Error signing up:', error);
    }
  }
}