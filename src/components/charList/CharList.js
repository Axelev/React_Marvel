/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef, useMemo } from 'react';
import PropTypes from 'prop-types';

import CharListItem from '../charListItem/charListItem';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './charList.scss';


const setContent = (process, Component, newItemLoading) => {
    switch(process) {
        case 'waiting':
            return <Spinner/>;
        case 'loading':
            return newItemLoading ? <Component/> : <Spinner/>;
        case 'confirmed':
            return <Component/>;
        case 'error':
            return <ErrorMessage/>;
        default:
            throw new Error('Unexpected procces state');
    }
}

const CharList = (props) => {

    const [charList, setCharlist] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(200);
    const [charEnded, setCharEnded] = useState(false);

    const {getAllCharacters, process, setProcess} = useMarvelService();    

    useEffect(() => {
        onRequest(offset, true);
    }, []);

    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);        
        getAllCharacters(offset)
            .then(listLoaded)
            .then(() => setProcess('confirmed'))
    }
    
    const listLoaded = (newCharList) => {
        let ended = false;
        if (newCharList < 9) {
            ended = true;
        }

        setCharlist((charList) => [...charList, ...newCharList]);
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
            <ul className="char__grid" >
                {items}
            </ul>

        )
    }

    const elements = useMemo (() => {
        return setContent(process, () => renderItems(charList), newItemLoading)
    }, [process]);

    return (
        <div className="char__list">
            {elements}
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