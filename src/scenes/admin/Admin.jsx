import PermissionUtils from "../../utils/PermissionUtils";

export const Admin = () => {
  return (
      <div>
        <button onClick={() => PermissionUtils.signOut()}>Sign Out</button>
        <button onClick={() => {
          PermissionUtils.getToken().then(res => console.log(`${res}`))
        }}>Get Token</button>
      </div>

    )
}