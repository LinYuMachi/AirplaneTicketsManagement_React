import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Dashboard from "./scenes/dashboard";
import Sidebar from "./scenes/global/Sidebar";
import Team from "./scenes/team";
import Tickets from "./scenes/tickets";
import ApiClient from "./api/ApiClient";
import {ApiClientTest} from "./scenes/test/ApiClientTest";
import React from 'react';
import MockApiClient from "./api/MockApiClient";
import Flight from "./scenes/flight";
import {TestCreateFlight} from "./scenes/test/test-create-flight";
import {createContext} from "react";
import Signup from "./scenes/login/signup";
import aws_exports from './aws-exports';
import {Amplify} from "aws-amplify";

export const ApiContext = React.createContext({});
const apiClient = process.env.REACT_APP_IS_MOCK === 'true' ? new MockApiClient() : new ApiClient();
Amplify.configure(aws_exports);

function App() {
  const [theme, colorMode] = useMode();
  
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
                <Route path="/test" element={<ApiClientTest/>} />
                <Route path="/flights" element={<Flight/>} />
                <Route path="/flight/create" element={<TestCreateFlight/>} />
                <Route path="/signup" element={<Signup/>} />
              </Routes>
            </main>
          </div>
        </ApiContext.Provider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
