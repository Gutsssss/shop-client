import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { PrimeReactProvider } from 'primereact/api';
import { Provider } from 'react-redux'
import { setupStore } from './store/store.ts';

const store = setupStore()
createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
    <PrimeReactProvider>
    <BrowserRouter>
    <App />
    </BrowserRouter>
    </PrimeReactProvider>
    </Provider>
)
