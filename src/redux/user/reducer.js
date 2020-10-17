import {LOGIN, LOGOUT} from './types';

const initialState = {
  User: null,
};

const reducer = (state = initialState, action) => {
  console.log(action);

  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        User: action.payload,
      };
    case LOGOUT:
      return {
        ...state,
        User: null,
      };
    default:
      return state;
  }
};

export default reducer;
