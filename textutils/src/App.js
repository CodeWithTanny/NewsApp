import { useState } from 'react'; //imrs
import './App.css';
import About from './components/About';
import Alert from './components/Alert';
import Navbar from './components/Navbar';
import TextForm from './components/TextForm';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

function App() {
  const [mode, setMode] = useState('light'); // wheter the dark mode is enabled or not
  const [alert, setAlert] = useState(null); //ustate

  const showAlert = (message, type)=>{
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  }
  const toggleMode = ()=>{
    if(mode === 'light'){
      setMode('dark')
      document.body.style.backgroundColor = '#09063f';
      showAlert("Dark mode has been enabled", "success");
      // document.title = 'textUtils - Dark Mode';
    }
    else{
      setMode ('light')
      document.body.style.backgroundColor = 'white';
      showAlert("light mode has been enabled", "success");
      // document.title = 'textUtils - light Mode';
    }
  }
  return (
    <>
    <Router>
<Navbar title="TextUtils"  AboutText="About" mode={mode} toggleMode={toggleMode}/>
<Alert alert={alert}/>
<div className="container my-3">
<Routes>
<Route exact path="/about"  element={<About  mode={mode}/>}> 
      </Route>
      <Route exact path="/" element={<TextForm showAlert={showAlert} heading="Try TextUtils - word Counter, Character counter"mode={mode}/>}>
      </Route>
    </Routes>
</div>
</Router>
    </>
  );
}

export default App;