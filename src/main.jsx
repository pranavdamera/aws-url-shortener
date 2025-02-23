import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import amplify_config from './amplifyconfiguration.json'
import { Amplify } from 'aws-amplify'
import {HeroUIProvider} from '@heroui/react'

Amplify.configure(amplify_config);
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HeroUIProvider>
      <App />
      </HeroUIProvider>
    </StrictMode>,
)
