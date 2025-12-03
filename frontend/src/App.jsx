import {BrowserRouter, Routes, Route} from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import ProjectsPage from "./pages/ProjectsPage";
import NewProjectPage from "./pages/NewProjectPage";
import SetAPIKey from "./pages/SetAPIKey";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<AppLayout/>}>
          <Route path="/projects" element={<ProjectsPage/>}/>
          <Route path="/projects/new-project" element={<NewProjectPage/>}/>
          <Route path="/projects/:project-id/set-api-key" element={<SetAPIKey/>}/>
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App
