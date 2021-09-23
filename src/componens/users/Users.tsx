import React from 'react';
import {userType} from "../../state/reducer/usersReducer";
type PropsType = {
    users:userType[]
}

const Users:React.FC<PropsType> = ({users}) => {

    return (
        <>
        {
            users.map(user =>{
                return (
                    <tr key={user.title}>
                        <th>{user.date}</th>
                        <th>{user.title}</th>
                        <th>{user.count}</th>
                        <th>{user.distance}</th>
                    </tr>
                )
            })
        }
        </>
    );
};

export default Users;
