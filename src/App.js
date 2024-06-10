import { Switch, Route, Redirect } from "react-router-dom";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Main from "./components/layout/Main";
import "../node_modules/antd/dist/antd"
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";
import Reports from "./pages/Reports";
import AiSmartView from "./pages/AiSmartView";
import Dashboard from "./pages/Dashboard";
import MachinesParameter from "./pages/MachinesParameter";
import Camera from "./pages/Camera";
import Settings from "./pages/Settings";
import Organization from "./pages/Organisation";
import Plants from "./pages/Plants"
import Selectdashboard from "./pages/Select_dashboard";
import Login from "./pages/Auth/Login";
import ResetPassword from "./pages/Auth/ResetPassword";


const NotFound = ()=>{
  return(
  <>
  Not found
  </>
  )
}

function App() {



  return (
    <div className="App" >
      <Switch>
        <Route path="/resetPassword" exact component={ResetPassword} />
        <Route path="/login" exact component={Login} />
        <Main >
          <Route exact path="/dashboard-home" component={Dashboard} />
          <Route exact path="/reports" component={Reports} />
          <Route exact path="/ai-smart-view" component={AiSmartView} />
          <Route exact path="/machines-parameter" component={MachinesParameter} />
          <Route exact path="/camera" component={Camera} />
          <Route exact path="/settings" component={Settings} />
          <Route exact path="/organization" component={Organization} />
          <Route exact path="/Plants/:id" component={Plants} />
          <Route exact path="/Organization-Dashboard/:id" component={Selectdashboard} />
        </Main>
         <Route path="*" component={NotFound} />
      </Switch>
    </div>
  );
}

export default App;