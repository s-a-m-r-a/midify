import { createRoot } from 'react-dom/client'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from './context/ThemeContext.jsx';
import './App.css';
createRoot(document.getElementById('root')).render(
<BrowserRouter>
  <AuthProvider>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </AuthProvider>
</BrowserRouter>
)