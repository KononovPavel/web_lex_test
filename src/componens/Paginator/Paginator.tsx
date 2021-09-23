import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../state";
import styles from './paginator.module.css'
import {setCurrentPage} from "../../state/reducer/usersReducer";

const Paginator = () => {
    const totalCount = useSelector<AppStateType, number>(state => state.users.totalCount)
    const pageSize = useSelector<AppStateType, number>(state => state.users.pageSize)
    const currentPage = useSelector<AppStateType, number>(state => state.users.currentPage)
    const dispatch = useDispatch();
    let pagesCount = Math.ceil(totalCount / pageSize); // получение кол-ва страниц
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }
    const onClickHandler = (page:number) =>{
        dispatch(setCurrentPage(page))
    }
    return (
        <div className={styles.paginator}>
            {
                pages.map(page => {
                    return (
                        <span
                            key={page}
                            className={currentPage === page ? styles.selected : styles.notSelected}
                            onClick={() => onClickHandler(page)}
                        >{page}</span>
                    )
                })
            }
        </div>
    );
};

export default Paginator;
