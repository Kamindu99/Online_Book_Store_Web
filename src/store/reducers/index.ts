// third-party
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// project import
import chat from './chat';
import calendar from './calendar';
import menu from './menu';
import snackbar from './snackbar';
import productReducer from './product';
import cartReducer from './cart';
import kanban from './kanban';
import invoice from './invoice';
import book from './book-master';

// ==============================|| COMBINE REDUCERS ||============================== //

const reducers = combineReducers({
  chat,
  calendar,
  menu,
  snackbar,
  cart: persistReducer(
    {
      key: 'cart',
      storage,
      keyPrefix: 'mantis-ts-'
    },
    cartReducer
  ),
  product: productReducer,
  kanban,
  invoice,
  book
});

export default reducers;
