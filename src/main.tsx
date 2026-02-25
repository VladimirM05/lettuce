import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { App } from './app/App'

import './app/styles/reset.scss'
import './app/styles/global.scss'
import './app/styles/fonts.scss'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
