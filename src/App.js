import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import {Routes, Route, useNavigate} from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Dashboard from "./scenes/dashboard";
import Sidebar from "./scenes/global/Sidebar";
import Team from "./scenes/team";
import Tickets from "./scenes/tickets";
import ApiClient from "./api/ApiClient";
import {ApiClientTest} from "./scenes/test/ApiClientTest";
import React, {useEffect, useState} from 'react';
import MockApiClient from "./api/MockApiClient";
import Flight from "./scenes/flight";
import {TestCreateFlight} from "./scenes/test/test-create-flight";
import LogIn from "./scenes/login/logIn";
import aws_exports from './aws-exports';
import {Amplify, Auth} from "aws-amplify";
import PermissionUtils from "./utils/PermissionUtils";

export const ApiContext = React.createContext({});
const apiClient = process.env.REACT_APP_IS_MOCK === 'true' ? new MockApiClient() : new ApiClient();
Amplify.configure(aws_exports);

function RequireAuth({ children }) {
  const navigate = useNavigate();
  const [isAuth, setIsAuth] = useState(null);

  useEffect(() => {
    Auth.currentAuthenticatedUser()
        .then(() => setIsAuth(true))
        .catch(() => {
          PermissionUtils.navigateLogIn(navigate)
        })
  }, [])

  return isAuth && children;
}

function App() {
  const navigate = useNavigate();
  const [theme, colorMode] = useMode();

  PermissionUtils.listenPermissionEvents();
  
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <ApiContext.Provider value={apiClient}>
          <CssBaseline />
          <div className="app">
            <Sidebar />
            <main className="content">
              <Topbar />
              <Routes>
                <Route path="/" element={<Dashboard/>} />
                <Route path="/team" element={<Team/>} />
                <Route path="/tickets" element={<Tickets/>} />
                <Route path="/test" element={<RequireAuth><ApiClientTest/></RequireAuth>} />
                <Route path="/flights" element={<Flight/>} />
                <Route path="/flight/create" element={<TestCreateFlight/>} />
                <Route path="/login" element={<LogIn/>} />
              </Routes>
            </main>
          </div>
        </ApiContext.Provider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
