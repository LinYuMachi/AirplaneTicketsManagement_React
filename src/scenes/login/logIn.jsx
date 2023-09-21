import React, { useState } from 'react';
import {Auth, Hub} from 'aws-amplify';
import PermissionUtils from "../../utils/PermissionUtils";

function LogIn() {
  const [username, setUsername] = useState('test2');
  const [password, setPassword] = useState('Abcdef123!');



  return (
      <div>
        <h2>Sign Up</h2>
        <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
        />
        <input
            type="password"
            placeholder="Password"
            value={username}
            onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={() => PermissionUtils.signup(username, password)}>Sign Up</button>
        <button onClick={() => PermissionUtils.signIn(username, password)}>Sign In</button>
        <button onClick={() => PermissionUtils.signout()}>Sign Out</button>
        <button onClick={() => {
          PermissionUtils.getToken().then(res => console.log(`${res}`))
        }}>Get Token</button>
      </div>
  );
}

export default LogIn;