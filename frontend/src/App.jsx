import {BrowserRouter, Routes, Route} from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import ProjectsPage from "./pages/ProjectsPage";
import NewProjectPage from "./pages/NewProjectPage";
import SetAPIKey from "./pages/SetAPIKey";
import ViewAPIKeys from "./pages/ViewAPIKeys";
import LogIn from "./pages/LoginPage";
import SignUp from "./pages/SignUp";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<AppLayout/>}>
          <Route path="/login" element={<LogIn/>}/>
          <Route path="/signup" element={<SignUp/>}/>
          <Route path="/projects" element={<ProjectsPage/>}/>
          <Route path="/projects/new-project" element={<NewProjectPage/>}/>
          <Route path="/projects/:project-id/set-api-key" element={<SetAPIKey/>}/>
          <Route path="/api-keys" element={<ViewAPIKeys/>}/>
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App
