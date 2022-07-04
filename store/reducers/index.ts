import { cartsReducer, userReducer } from '../slices';

const reducer = {
  user: userReducer,
  carts: cartsReducer
};

export default reducer