import { createRoot } from 'react-dom/client'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from "./context/AuthContext";
import './App.css';
createRoot(document.getElementById('root')).render(
<BrowserRouter basename='/midify'>
  <AuthProvider>
      <App />
  </AuthProvider>
</BrowserRouter>,
)