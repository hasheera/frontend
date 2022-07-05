import { cartsReducer, shopsReducer, userReducer } from '../slices';

const reducer = {
  user: userReducer,
  carts: cartsReducer,
  shops: shopsReducer
};

export default reducer