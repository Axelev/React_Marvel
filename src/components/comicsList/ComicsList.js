import './comicsList.scss';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelService from '../../services/MarvelService';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

const ComicsList = () => {
    
    const [comicsList, setComicList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(0);
    const [charEnded, setCharEnded] = useState(false);

    const {loading, error, getAllComics} = useMarvelService();

    useEffect(() => {
        onRequest(offset, true);
    },[]);

    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getAllComics(offset)
        .then(listLoaded)     
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

    const spinner = loading && !newItemLoading ? <Spinner/> : null;
    const errorMessage = error? <ErrorMessage/> : null;
    const content = !error || loading ? renderList(comicsList): null;

    
    return (

        <div className="comics__list">
            {spinner}
            {errorMessage}
            {content}
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