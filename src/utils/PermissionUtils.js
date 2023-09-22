import {Auth, Hub} from "aws-amplify";

export default class PermissionUtils {
  static async signIn(username, password) {
    try {
      const user = await Auth.signIn(username, password);
      console.log('Sign-in successful');
    } catch (error) {
      console.log('error signing in', error);
    }
  }

  static async signup(username, password) {
    try {
      await Auth.signUp({
        username,
        password,
      });
      console.log('Sign-up successful');
    } catch (error) {
      console.error('Error signing up:', error);
    }
  }

  static async signout() {
    try {
      await Auth.signOut();
    } catch (error) {
      console.log('error signing out: ', error);
    }
  }

  static async getToken() {
      return Auth.currentSession()
          .then(res => res.getIdToken().getJwtToken())
          .catch(() => PermissionUtils.redirectLogIn());
  }

  static navigateLogIn(navigate) {
    navigate("/login")
  }

  static redirectLogIn() {
    window.location.href = "http://localhost:3000/login";
  }

  static navigateHomePage(navigate) {
    navigate("/test")
  }

  static redirectHomePage() {
    window.location.href = "http://localhost:3000/test";
  }

  static listenPermissionEvents(setUsername = undefined) {
    Hub.listen('auth', ({ payload }) => {
      const { event } = payload;
      console.log(event);
      if (event === 'signIn' || event === 'autoSignIn') {
        if (setUsername !== undefined) this.getUsername().then(username => setUsername(username))
        PermissionUtils.redirectHomePage();
      } else if (event === 'signOut') {
        PermissionUtils.redirectLogIn();
      }
    })
  }

  static async getUsername() {
    return Auth.currentAuthenticatedUser().then(user => user.username)
        .catch(error => {
          // Handle errors if the user is not authenticated
          console.error('Error fetching user:', error);
          return ""
        });
  }
}