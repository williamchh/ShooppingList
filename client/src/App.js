import './App.css';
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js'
import { useEffect } from 'react'
import ShoppingList from './components/shopping/ShoppingList'

import { Provider } from 'react-redux'
import store from './store'
import AddBtn from './components/layout/AddBtn'
import AddLogModal from './components/shopping/AddShoppingItemModal'

const App = () => {
  useEffect(() => {
    // init materialize JS
    M.AutoInit();
  })
  return (
    <Provider store={store}>
      <h1>Will's List</h1>
      <ShoppingList />
      <AddLogModal />
      <AddBtn />
    </Provider>
  );
}

export default App;
