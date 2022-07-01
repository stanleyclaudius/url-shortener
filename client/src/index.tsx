import ReactDOM from 'react-dom/client'
import App from './App'
import DataProvider from './redux/store';
import './index.css'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <DataProvider>
    <App />
  </DataProvider>
)