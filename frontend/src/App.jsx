import {BrowserRouter, Routes, Route} from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import ProjectsPage from "./pages/ProjectsPage";
import NewProjectPage from "./pages/NewProjectPage";
import SetAPIKey from "./pages/SetAPIKey";
import ViewAPIKeys from "./pages/ViewAPIKeys";
import LogIn from "./pages/LoginPage";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<AppLayout/>}>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<LogIn/>}/>
          <Route path="/signup" element={<SignUp/>}/>
          <Route path="/projects" element={<ProjectsPage/>}/>
          <Route path="/projects/new-project" element={<NewProjectPage/>}/>
          <Route path="/projects/:project_id/set-api-key" element={<SetAPIKey/>}/>
          <Route path="/projects/:id/project-api-keys" element={<ViewAPIKeys basedOn={"project_id"}/>}/>
          <Route path="/projects/:project_id/dashboard" element={<Dashboard/>}/>
          <Route path="/:id/user-api-keys" element={<ViewAPIKeys basedOn={"user_id"}/>}/>
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App
