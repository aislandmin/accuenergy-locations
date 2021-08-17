import store from "./redux/store";
import { Provider } from "react-redux";
import Locations from "./views/locations";

function App() {
  return (
    <Provider store={store}>
      <Locations />
    </Provider>
  );
}

export default App;
