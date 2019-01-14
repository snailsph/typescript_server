import { SAVE_USER_INFO, ADD_TAB, REMOVE_TAB, HANDLE_LOADING } from './type';
import { login } from '../api'

//用户信息
export const saveUserInfo = (userInfo) =>{
    return {
        type: SAVE_USER_INFO,
        userInfo
    }
}
//顶部tab操作
export const addTab = (tab) => {
    return {
        type: ADD_TAB,
        tab
    }
}
//顶部tab操作
export const removeTab = (tab) => {
    return {
        type: REMOVE_TAB,
        tab
    }
}
//loading 效果
export const handleLoading = (loading) => {
    return {
        type: HANDLE_LOADING,
        loading
    }
}

export const loginAction = (params) => dispath => {
    return login(params).then(res => {
        if(res.code == 200){
            dispath(saveUserInfo(res.data));
        }
        return Promise.resolve(res);
    })
}