import { createStore } from 'redux';
// import { createStore, applyMiddleware } from 'redux';
import reducer from '../reducer';
import { connect } from 'react-redux';
// import { composeWithDevTools } from 'redux-devtools-extension'


export let deal = connect(
    state => ({ state,
        price() {
            return state.lesson.reduce((res,item) => res + +item.price,0)
                .toFixed(2);
        }

     }),
    dispatch => ({ dispatch })
)


 export default createStore(
     reducer,
    //  composeWithDevTools(applyMiddleware)
     );