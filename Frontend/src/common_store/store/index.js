import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "../reducers/index";
import { forbiddenWordsMiddleware } from "../middleware/index";
import { loadState, saveState} from "../middleware/index";

// const store = createStore(rootReducer,
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
    
const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const persistedState = loadState();
const store = createStore(
    rootReducer,
    persistedState
    ,storeEnhancers(applyMiddleware(forbiddenWordsMiddleware))
);
    
store.subscribe(() => {
    saveState(store.getState());
})
    
export default store;