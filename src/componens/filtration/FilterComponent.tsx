import React, {useState} from 'react';
import styles from './filter.module.css'
import {useDispatch} from "react-redux";
import {filterByCount, filterByDistance, filterByTitle, setUsers} from "../../state/reducer/usersReducer";
import {usersFile} from "../../state/usersFile";

const FilterComponent = () => {
    const options = ['title', 'count', 'distance']
    const [selected, setSelected] = useState(options[0]) // по умолчанию первый будет title
    const [title, setTitle] = useState(''); // название
    const [maxCount, setMaxCount] = useState('');
    const [minCount, setMinCount] = useState('');
    const [count, setCount] = useState('');
    const [maxDistance, setMaxDistance] = useState('');
    const [minDistance, setMinDistance] = useState('');
    const [distance, setDistance] = useState('');
    const [reset, setReset] = useState(false);
    const [error, setError] = useState('');
    const dispatch = useDispatch();
    const getNameFilter = (option: string): string => {
        if (option === 'title') return 'Название';
        else if (option === 'count') return "Количество";
        else if (option === 'distance') return 'Расстояние';
        return 'Название';
    }
    const onClickHandler = () => {
        switch (selected) {
            case "title": {
                if (!title.length) {
                    setError("Вы не ввели данные");
                    setReset(true);
                    setTimeout(()=> setError(""), 2000)
                    return;
                }
                const tryTitle = title.trim();
                dispatch(filterByTitle(tryTitle))
                setReset(true);
                break;
            }
            case "count": {
                if (Number(minCount) >= Number(maxCount)) {
                    setError("Минимальное не может быть больше максимального");
                    setTimeout(()=> setError(""), 2000)
                    setReset(true);
                    return;
                }
                if (Number(minCount) < 0 && Number(maxCount) < 0) {
                    setError('Вы ввели отрицательные значения');
                    setTimeout(()=> setError(""), 2000)
                    setReset(true);
                    return;
                }
                dispatch(filterByCount(Number(maxCount), Number(count), Number(minCount)))
                setReset(true);
                break
            }
            case "distance": {
                if (Number(maxDistance) <= Number(minDistance)) {
                    setError("Минимальное не может быть больше максимального");
                    setReset(true);
                    setTimeout(()=> setError(""), 2000)
                    return;
                }
                if (Number(maxDistance) < 0 && Number(minDistance) < 0) {
                    setError('Вы ввели отрицательные значения');
                    setReset(true);
                    setTimeout(()=> setError(""), 2000)
                    return;
                }
                dispatch(filterByDistance(Number(maxDistance), Number(distance), Number(minDistance)))
                setReset(true);
                break
            }
        }
    }
    const resetFilters = () => {
        dispatch(setUsers(usersFile));
        setReset(false);
        setDistance('');
        setCount('');
        setTitle('');
        setMaxDistance('');
        setMinDistance('');
        setMaxCount('');
        setMinCount('');

    }
    const isDisabled: boolean = !title.length && ((!maxCount.length || !minCount.length) && !count.length) && ((!minDistance.length || !maxDistance.length) && !distance.length)

    return (
        <div className={styles.filter}>
            <select onChange={e => setSelected(e.currentTarget.value)}>
                {options.map(o => <option className={styles.option} key={o} value={o}>{getNameFilter(o)}</option>)}
            </select>
            {
                selected === "title" && <input
                    type="text"
                    placeholder={'Название'}
                    value={title}
                    onChange={e => setTitle(e.currentTarget.value)}
                />
            }
            {
                selected === 'count' && <>от <input
                    type="text"
                    placeholder={"Начало"}
                    value={minCount}
                    onChange={e => setMinCount(e.currentTarget.value)}
                />
                    до
                    <input
                        type="text"
                        placeholder={"Конец"}
                        value={maxCount}
                        onChange={e => setMaxCount(e.currentTarget.value)}
                    />
                    или
                    <input
                        type="text"
                        placeholder={"количество"}
                        value={count}
                        onChange={e => setCount(e.currentTarget.value)}
                    />
                </>
            }
            {
                selected === 'distance' && <>от <input
                    type="text"
                    placeholder={"Начало"}
                    value={minDistance}
                    onChange={e => setMinDistance(e.currentTarget.value)}
                />
                    до
                    <input
                        type="text"
                        placeholder={"Конец"}
                        value={maxDistance}
                        onChange={e => setMaxDistance(e.currentTarget.value)}
                    />
                    или
                    <input
                        type="text"
                        placeholder={"Расстояние"}
                        value={distance}
                        onChange={e => setDistance(e.currentTarget.value)}
                    />
                </>
            }
            <button disabled={isDisabled} onClick={() => onClickHandler()} className={styles.btn}> Фильтровать
                по <strong>{getNameFilter(selected)}</strong></button>
            {reset && <button onClick={() => resetFilters()}>Сбросить</button>}
            {error && <span className={styles.error}>{error}</span>}
        </div>
    );
};

export default FilterComponent;
