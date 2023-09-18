import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Dashboard from "./scenes/dashboard";
import Sidebar from "./scenes/global/Sidebar";
import Team from "./scenes/team";
// import Invoices from "./scenes/invoices";
import Tickets from "./scenes/tickets";
// import Bar from "./scenes/bar";
import Form from "./scenes/form";
import ApiClient from "./api/ApiClient";
import {ApiClientTest} from "./scenes/test/ApiClientTest";
import React from 'react';
import MockApiClient from "./api/MockApiClient";
import Flight from "./scenes/flight";
// import Line from "./scenes/line";
// import Pie from "./scenes/pie";
// import FAQ from "./scenes/faq";
// import Geography from "./scenes/geography";
// import Calendar from "./scenes/calendar";

export const ApiContext = React.createContext({});
const apiClient = process.env.REACT_APP_IS_MOCK === 'true' ? new MockApiClient() : new ApiClient();

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
                {/* <Route path="/invoices" element={<Invoices/>} /> */}
                {/* <Route path="/form" element={<Form/>} /> */}
                {/* <Route path="/bar" element={<Bar/>} /> */}
                {/* <Route path="/pie" element={<Pie/>} /> */}
                {/* <Route path="/line" element={<Line/>} /> */}
                {/* <Route path="/faq" element={<FAQ/>} /> */}
                {/* <Route path="/geography" element={<Geography/>} /> */}
                {/* <Route path="/calendar" element={<Calendar/>} /> */}
              </Routes>
            </main>
          </div>
        </ApiContext.Provider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
