import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import CharListItem from '../charListItem/charListItem';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import MarvelService from '../../services/MarvelService';
import './charList.scss';


const CharList = (props) => {

    const [charList, setCharlist] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(200);
    const [charEnded, setCharEnded] = useState(false);

    const marvelService = new MarvelService();    

    useEffect(() => {
        onRequest();
    }, []);

    const onRequest = (offset) => {
        onCharListLoading();
        marvelService.getAllCharacters(offset)
            .then(listLoaded)
            .catch(onError)
    }

    const onCharListLoading = () => {
        setNewItemLoading(true);
    }
    
    const onError = () => {
        setError(true);
        setLoading(false);
    }

    const listLoaded = (newCharList) => {
        let ended = false;
        if (newCharList < 9) {
            ended = true;
        }

        setCharlist((charList) => [...charList, ...newCharList]);
        setLoading(false);
        setNewItemLoading(false);
        setOffset(offset => offset + 9);
        setCharEnded(ended);

    }

    const itemRef = useRef([]);

    const focusOnItem = (id) => {
        itemRef.current.forEach(item => item.classList.remove('char__item_selected'));
        itemRef.current[id].classList.add('char__item_selected');
        itemRef.current[id].focus();
    }



    function renderItems(arr) {
        const items = arr.map((item, i) => {
            return (
                <CharListItem
                    name={item.name}
                    thumbnail={item.thumbnail}
                    sendRef={el => itemRef.current[i] = el}
                    key={item.id}
                    id={item.id}
                    onSelectedChar={props.onSelectedChar}
                    focusOnItem={focusOnItem}
                    itemIndex={i}/>
            )
        })

        return (
            <ul className="char__grid">
                {items}
            </ul>
        )
    }

    const spinner = loading? <Spinner/> : null;
    const errorMessage = error? <ErrorMessage/> : null;
    const content = !error || loading ? renderItems(charList): null;


    return (
        <div className="char__list">
            {spinner}
            {errorMessage}
            {content}
            <button 
                className="button button__main button__long"
                disabled={newItemLoading}
                style={{'display': charEnded ? 'none' : 'block'}}
                onClick={() => onRequest(offset)}>
                <div className="inner">load more</div>
            </button>
        </div>
    )   
}

CharList.propTypes = {
    onSelectedChar: PropTypes.func.isRequired
}


export default CharList;