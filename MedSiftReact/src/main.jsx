//This is our main frontend file that injects all of our ReactJS code into our html file. 
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import './main.css';
import App from './App.jsx';
import { GoogleOAuthProvider } from '@react-oauth/google';
const clientId = "646008093964-8dbu8hgar6kiccuumk2lvhopauhi5sp6.apps.googleusercontent.com";
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <GoogleOAuthProvider clientId={clientId}>
      <App />
    </GoogleOAuthProvider>
  </BrowserRouter>
)
