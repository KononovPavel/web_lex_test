import React, {useEffect, useState} from 'react';
import './App.css';
import {useDispatch} from "react-redux";
import {setUsers, sortByCount, sortByDistance, sortByTitle} from "./state/reducer/usersReducer";
import {usersFile} from "./state/usersFile";
import Paginator from "./componens/Paginator/Paginator";
import UsersContainer from "./componens/users/usersContainer";
import FilterComponent from "./componens/filtration/FilterComponent";


function App() {
    const [stepCount, setStepCount] = useState(true)
    const [stepTitle, setStepTitle] = useState(true)
    const [stepDistance, setStepDistance] = useState(true)
    const dispatch = useDispatch()
    useEffect(()=>{
    dispatch(setUsers(usersFile))
    }, [dispatch])

    const onClickHandler = (value:string)=>{
        switch (value) {
            case "title":{
                dispatch(sortByTitle(stepTitle))
                setStepTitle(!stepTitle);
                break;
            }
            case "count":{
                dispatch(sortByCount(stepCount))
                setStepCount(!stepCount)
                break
            }
            case "distance":{
                dispatch(sortByDistance(stepDistance))
                setStepDistance(!stepDistance)
                break
            }
        }
    }
  return (
    <div className={'container'}>
        <div className={'wrapper'}>
            <FilterComponent/>
        <table className={'table'}>
            <thead className={'thead'}>
            <tr>
                <th className={'thRow'}>Дата</th>
                <th className={'thRow'} onClick={()=>onClickHandler("title")}>Название {stepTitle ? <span>&#8593;</span> : <span>&#8595;</span> }</th>
                <th className={'thRow'} onClick={()=>onClickHandler("count")}>Количество {stepCount ? <span>&#8593;</span> : <span>&#8595;</span> }</th>
                <th className={'thRow'} onClick={()=>onClickHandler("distance")}>Расстояние {stepDistance ? <span>&#8593;</span> : <span>&#8595;</span> }</th>
            </tr>
            </thead>
            <tbody className={'tbody'}>
            <UsersContainer/>
            </tbody>
        </table>
            <Paginator/>
        </div>
    </div>
  );
}

export default App;
