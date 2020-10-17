import {combineReducers} from 'redux';

// Imports: Reducers
import userReducer from './user/reducer';

// Redux: Root Reducer
const RootReducer = combineReducers({
  user: userReducer,
});

// Exports
export default RootReducer;
