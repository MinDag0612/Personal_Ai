import { createRoot } from 'react-dom/client'
import App from './app/App.jsx'

import "./shared/style/theme.css"
import "./shared/style/global.css";

import 'bootstrap/dist/css/bootstrap.min.css';

import { GoogleOAuthProvider } from '@react-oauth/google'

createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
    <App />
  </GoogleOAuthProvider>,
)
