import React from 'react';
import {userType} from "../../state/reducer/usersReducer";
import {useSelector} from "react-redux";
import {AppStateType} from "../../state";
import Preloader from "../preloader/Preloader";
import Users from "./Users";


const UsersContainer = () => {
    const users = useSelector<AppStateType, userType[]>(state =>state.users.users )
    const currentPage = useSelector<AppStateType, number>(state => state.users.currentPage)
    const pageSize = useSelector<AppStateType, number>(state => state.users.pageSize)
    if(!users.length) {
            return <Preloader/>
    }
     let currentUsers = [...users];
     currentUsers =  currentUsers.splice((currentPage-1)*pageSize,pageSize)
    return <Users users={currentUsers}/>
};

export default UsersContainer;
