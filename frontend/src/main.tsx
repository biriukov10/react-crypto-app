import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import React from 'react'

const root: HTMLElement | null = document.getElementById('root')

createRoot(root!).render(<App />)
