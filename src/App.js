import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Dashboard from "./scenes/dashboard";
import Sidebar from "./scenes/global/Sidebar";
import Team from "./scenes/team";
import Tickets from "./scenes/tickets";
import {CreateFlight} from "./scenes/flight/create-flight";
import ApiClient from "./api/ApiClient";
import {createContext} from "react";

export const ApiContext = createContext({});
const apiClient = new ApiClient();

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
                <Route path="/flight/create" element={<CreateFlight/>} />
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
