enum Actions {
    SET_USERS = "SET_USERS",
    SET_CURRENT_PAGE = "SET_CURRENT_PAGE",
    SORT_BY_TITLE = "SORT_BY_TITLE",
    SORT_BY_COUNT = "SORT_BY_COUNT",
    SORT_BY_DISTANCE = "SORT_BY_DISTANCE",
    FILTER_BY_TITLE = "FILTER_BY_TITLE",
    FILTER_BY_COUNT = 'FILTER_BY_COUNT',
    FILTER_BY_DISTANCE = 'FILTER_BY_DISTANCE',

}

export type userType = {
    date: string,
    title: string,
    count: number,
    distance: number
}

let initState = {
    users: [] as userType[],
    currentPage: 1,
    pageSize: 5,
    totalCount: 0,
}
export type initStateType = typeof initState
type setUsers = {
    type: Actions.SET_USERS,
    payload: userType[]
}
type setCurrentPage = {
    type: Actions.SET_CURRENT_PAGE,
    payload: number
}
type sortByTitle = {
    type: Actions.SORT_BY_TITLE,
    step: boolean
}
type sortByCount = {
    type: Actions.SORT_BY_COUNT,
    step: boolean
}
type sortByDistance = {
    type: Actions.SORT_BY_DISTANCE,
    step: boolean
}
type filterByTitle = {
    type: Actions.FILTER_BY_TITLE,
    title: string
}
type filterByCount = {
    type: Actions.FILTER_BY_COUNT,
    payload: {
        max: number,
        min: number,
        count: number // просто указать что ищем
    }
}
type filterByDistance = {
    type: Actions.FILTER_BY_DISTANCE,
    payload: {
        max: number,
        min: number,
        count: number // просто указать что ищем
    }
}
type actionType =
    setUsers
    | setCurrentPage
    | sortByTitle
    | sortByCount
    | sortByDistance
    | filterByTitle
    | filterByCount
    | filterByDistance

export const usersReducer = (state: initStateType = initState, action: actionType): initStateType => {
    switch (action.type) {
        case Actions.SET_USERS: {
            return {...state, users: action.payload, totalCount: action.payload.length}
        }
        case Actions.SET_CURRENT_PAGE: {
            return {...state, currentPage: action.payload}
        }
        case Actions.SORT_BY_COUNT: {
            if (action.step) {
                //в обратном порядке
                return {...state, users: [...state.users].sort((a, b) => a.count > b.count ? 1 : -1)}
            }
            return {...state, users: [...state.users].sort((a, b) => a.count > b.count ? -1 : 1)}
        }
        case Actions.SORT_BY_DISTANCE: {
            if (action.step) {
                return {...state, users: [...state.users].sort((a, b) => a.distance > b.distance ? 1 : -1)}
            }
            return {...state, users: [...state.users].sort((a, b) => a.distance > b.distance ? -1 : 1)}
        }
        case Actions.SORT_BY_TITLE: {
            if (action.step) {
                return {...state, users: [...state.users].sort((a, b) => a.title > b.title ? 1 : -1)}
            }
            return {...state, users: [...state.users].sort((a, b) => a.title > b.title ? -1 : 1)}
        }
        case Actions.FILTER_BY_TITLE: {
            return {...state, users: [...state.users].filter(user => user.title.toLowerCase().includes(action.title.toLowerCase()))}
        }
        case Actions.FILTER_BY_COUNT: {
            if (action.payload.count) return {
                ...state,
                users: [...state.users].filter(user => user.count === action.payload.count)
            }
            else {
                return {
                    ...state,
                    users: [...state.users].filter(user => user.count >= action.payload.min && user.count <= action.payload.max)
                }
            }
        }
        case Actions.FILTER_BY_DISTANCE: {
            if (action.payload.count) return {
                ...state,
                users: [...state.users].filter(user => user.distance === action.payload.count)
            }
            else {
                return {
                    ...state,
                    users: [...state.users].filter(user => user.distance >= action.payload.min && user.distance <= action.payload.max)
                }
            }
        }
        default: {
            return state
        }
    }
}

export const setUsers = (users: userType[]): setUsers => ({type: Actions.SET_USERS, payload: users})
export const setCurrentPage = (page: number): setCurrentPage => ({type: Actions.SET_CURRENT_PAGE, payload: page})
export const sortByCount = (step: boolean): sortByCount => ({type: Actions.SORT_BY_COUNT, step})
export const sortByTitle = (step: boolean): sortByTitle => ({type: Actions.SORT_BY_TITLE, step})
export const sortByDistance = (step: boolean): sortByDistance => ({type: Actions.SORT_BY_DISTANCE, step})
export const filterByTitle = (title: string): filterByTitle => ({title, type: Actions.FILTER_BY_TITLE})
export const filterByCount = (max: number, count: number, min: number): filterByCount => ({
    type: Actions.FILTER_BY_COUNT,
    payload: {count, max, min}
})
export const filterByDistance = (max: number, count: number, min: number): filterByDistance => ({
    type: Actions.FILTER_BY_DISTANCE,
    payload: {count, max, min}
})
