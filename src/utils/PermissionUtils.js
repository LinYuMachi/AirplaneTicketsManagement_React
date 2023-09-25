import {Auth, Hub} from "aws-amplify";

export default class PermissionUtils {
  static parseError(errorName) {
    let errorMessage;
    switch (errorName) {
      case 'UserNotFoundException':
        errorMessage = '用户不存在。请检查用户名。';
        break;
      case 'NotAuthorizedException':
        errorMessage = '密码错误。请重试。';
        break;
      case 'PasswordResetRequiredException':
        errorMessage = '请重置密码。';
        break;
      case 'UserNotConfirmedException':
        errorMessage = '注册未确认。请联系管理员。';
        break;
      case 'CodeMismatchException':
        errorMessage = '确认码错误。请重试。';
        break;
      case 'ExpiredCodeException':
        errorMessage = '确认码过期。请在发送确认码。';
        break;
      case 'InvalidParameterException':
        errorMessage = '无效输入。请确认用户名和密码。';
        break;
      case 'InvalidPasswordException':
        errorMessage = '密码不符合标准。请修改密码。';
        break;
      case 'TooManyFailedAttemptsException':
        errorMessage = '失败次数过多。请等待并重试。';
        break;
      case 'TooManyRequestsException':
        errorMessage = '请求次数到达上限。请等待并重试';
        break;
      case 'LimitExceededException':
        errorMessage = '用户池已满。请联系管理员。';
        break;
      case 'UsernameExistsException':
        errorMessage = '用户名已存在。请输入别的用户名。';
        break;
      default:
        errorMessage = '未知错误。请联系管理员。';
    }
    return errorMessage;
}
  static async signIn(username, password) {
    await Auth.signIn(username, password);
  }

  static async signUp(username, password, name, phone) {
    const currentUser = await this.getUsername();
    await Auth.signUp({
      username,
      password,
      attributes: {
        name: name,
        "custom:phone": phone,
        "custom:parentAccount": currentUser
      },
    });
  }

  static async signOut() {
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
    navigate("/signin")
  }

  static redirectLogIn() {
    window.location.href = "http://localhost:3000/signin";
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