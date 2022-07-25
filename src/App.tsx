import { ReactDnD } from './components/ReactDnD';

function App() {

  return (
    <div>
      Base Url: {process.env.REACT_APP_BASE_URL || "NOT FOUND"}
    </div>
  )
}

export default App
