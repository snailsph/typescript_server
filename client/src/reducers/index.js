import { ADD_TAB, REMOVE_TAB } from '../actions/type';
import { combineReducers} from 'redux';

//保存用户信息
const saveUserInfo = (state = {},action) => {
    return {...state,userInfo:action.userInfo}
}

const handleTabs = (state=[],action) => {
    switch (action.type) {
        case ADD_TAB:
            return state.push(action.tab);
        case REMOVE_TAB:
            let index = state.indexOf(action.tab);
            return state.splice(index,1);
        default:
            return {...state};
    }
}
//loading
const handleLoading = (state= false,action) =>{
    return !action.loading;
}

export default combineReducers({
    saveUserInfo,
    handleTabs,
    handleLoading
});