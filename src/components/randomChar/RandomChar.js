import { useEffect, useState } from 'react';

import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

const RandomChar = (props) => {

    const [char, setChar] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    

    const marvelService =  new MarvelService();

    const updateChar = () => {
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        onCharLoading();
        marvelService
            .getCharacter(id)
            .then(onCharLoaded)
            .catch(onError);
    };

    useEffect(() => {
        updateChar();
        const timerId = setInterval(updateChar, 20000);

        return () => {
            clearInterval(timerId);
        }
    }, [])


    const onCharLoading = () => {
        setLoading(true);
    }

    const onCharLoaded = (char) => {
        setChar(char);
        setLoading(false);
    }

    const onError = () => {
        setLoading(false);
        setError(true);
    }

    
    const descriptionCorrector = (text) => {
        if (!text) {
            return 'Description is missing'
        } else if (text.length > 60) {
            return text.slice(0, 60) + '...';
        } else return text;
    }

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error) ? 
                    <View char={char} 
                    descriptionCorrector={descriptionCorrector}/> :
                    null;
    
    return (
        <div className="randomchar">
            {errorMessage}
            {spinner}
            {content}
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br/>
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button className="button button__main"
                        onClick={updateChar}>
                    <div className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
            </div>
        </div>
    )       
    
}

const View = ({char, descriptionCorrector}) => {
    const {name, description, thumbnail, homepage, wiki} = char;
    let imgClassName = 'randomchar__img';

    if (thumbnail.includes('image_not_available')) {
        imgClassName += '__not_found';
    }

    return (
        <div className="randomchar__block">
            <img src={thumbnail} alt="Random character" className={imgClassName}/>
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">{descriptionCorrector(description)}</p>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default RandomChar;