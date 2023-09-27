import { Routing } from './Component/Routing';
import { Provider } from 'react-redux';
import { Store } from './Component/Store';

function App() {
  return (
    <div className="App">
      <Provider store={Store}>
        <Routing/>
      </Provider> 
    </div>
  );
}

export default App;
