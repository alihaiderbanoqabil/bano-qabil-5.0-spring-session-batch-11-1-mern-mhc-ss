import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css'
import Ali from './App.jsx'
// import { App } from './App.jsx'
// import { App as Ali } from './App.jsx'

const root = document.getElementById('root');
// createRoot(root).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )


createRoot(root).render(<Ali />)
// createRoot(root).render(<App />)