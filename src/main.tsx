import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App'
import './components/global_styles.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
