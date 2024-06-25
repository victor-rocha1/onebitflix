import * as React from 'react';
import ReactDOM from 'react-dom/client'
import '../styles/globals.scss'
import '../styles/colors.module.scss'
import "bootstrap/dist/css/bootstrap.min.css";
import HomenoAuth from '../pages/index.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HomenoAuth />
  </React.StrictMode>,
)
