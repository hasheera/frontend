import { cartsReducer, dashboardReducer, shopsReducer, userReducer } from '../slices';

const reducer = {
  user: userReducer,
  carts: cartsReducer,
  shops: shopsReducer,
  dashboard: dashboardReducer
};

export default reducer