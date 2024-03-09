import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelService from '../../services/MarvelService';


import './comicsList.scss';

const setContent = (process, Component, newItemLoading) => {
    switch(process) {
        case 'waiting':
            return <Spinner/>;
            break;
        case 'loading':
            return newItemLoading ? <Component/> : <Spinner/>;
            break;
        case 'confirmed':
            return <Component/>;
            break;
        case 'error':
            return <ErrorMessage/>;
            break;
        default:
            throw new Error('Unexpected procces state');
    }
}

const ComicsList = () => {
    
    const [comicsList, setComicList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(0);
    const [charEnded, setCharEnded] = useState(false);

    const {loading, error, getAllComics, process, setProcess} = useMarvelService();

    useEffect(() => {
        onRequest(offset, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getAllComics(offset)
        .then(listLoaded)
        .then(() => setProcess('confirmed'))  
    }

    const listLoaded = (newList) => {
        let ended = false;
        if (newList < 12) {
            ended = true;
        }

        setComicList((comicsList) => [...comicsList, ...newList]);
        setNewItemLoading(false);
        setOffset(offset => offset + 12);
        setCharEnded(ended);

    }


    function renderList(arr) {
        const items = arr.map((item) => {
            return (
                <li className="comics__item" key={item.id}>
                    <Link to={`/comics/${item.id}`}>
                        <img src={item.thumbnail} alt="x-men" className="comics__item-img"/>
                        <div className="comics__item-name">{item.title}</div>
                        <div className="comics__item-price">NOT AVAILABLE</div>
                    </Link>
                </li>
            );
        })
        return (
            <ul className="comics__grid">                
                {items}
            </ul>
        );
    }
    
    return (

        <div className="comics__list">
            {setContent(process, () => renderList(comicsList), newItemLoading)}
            <button className="button button__main button__long"
                    disabled={newItemLoading}
                    style={{'display': charEnded ? 'none' : 'block'}}
                    onClick={() => onRequest(offset)}>
                <div className="inner">load more</div>
            </button>
        </div>

    )
}

export default ComicsList;