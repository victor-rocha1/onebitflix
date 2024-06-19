import * as React from 'react';
import ReactDOM from 'react-dom/client'
import App from './pages/index.tsx'
import '../styles/globals.scss'
import '../styles/colors.module.scss'
import "bootstrap/dist/css/bootstrap.min.css";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
