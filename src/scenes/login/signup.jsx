import React, { useState } from 'react';
import {Auth, Hub} from 'aws-amplify';
import PermissionUtils from "../../utils/PermissionUtils";

function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');



  return (
      <div>
        <h2>Sign Up</h2>
        <input
            type="text"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
        />
        <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={() => PermissionUtils.signup(username, password)}>Sign Up</button>
        <button onClick={() => PermissionUtils.signIn(username, password)}>Sign In</button>
        <button onClick={() => {
          Auth.currentSession().then(res=>{
          let idToken = res.getIdToken()
          let jwt = idToken.getJwtToken()

          //You can print them to see the full objects
          console.log(`idToken: ${JSON.stringify(idToken)}`)
          console.log(`myJwt: ${jwt}`)
        })}}>Get Token</button>
      </div>
  );
}

export default Signup;