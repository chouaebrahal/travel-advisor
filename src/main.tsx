import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import '@fontsource/josefin-sans/400.css'; // Regular
import '@fontsource/josefin-sans/600.css'; // Semi-bold
import '@fontsource/josefin-sans/700.css'; // Bold
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
