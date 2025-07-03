import { NavigationPanel } from "./Layout/NavigationPanel"
import { PrimeReactProvider } from 'primereact/api';
function App() {

  return (
    <>
    <PrimeReactProvider >
      <NavigationPanel/>
      </PrimeReactProvider>
    </>
  )
}

export default App
