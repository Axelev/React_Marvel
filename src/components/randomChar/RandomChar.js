import { Component } from 'react';

import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

class RandomChar extends Component {

    state = {
        char : {},
        loading: true,
        error: false
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.updateChar();
        // this.timerId = setInterval(this.updateChar, 10000);
    }

    componentWillUnmount() {
        clearInterval(this.timerId);
    }

    onCharUpdate = () => {
        this.setState({
            loading: true
        })
        this.updateChar();

    }

    onCharLoaded = (char) => {
        this.setState({
            char, 
            loading: false});
    }

    onError = () => {
        this.setState({ 
            loading: false,
            error: true});
    }

    updateChar = () => {
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        this.marvelService
            .getCharacter(id)
            .then(this.onCharLoaded)
            .catch(this.onError);
    }

    descriptionCorrector = (text) => {
        if (!text) {
            return 'Description is missing'
        } else if (text.length > 60) {
            return text.slice(0, 60) + '...';
        } else return text;
    }

    render() {
        const {char, loading, error} = this.state;
        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? 
                        <View char={char} 
                              descriptionCorrector={this.descriptionCorrector}/> :
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
                            onClick={this.onCharUpdate}>
                        <div className="inner">try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
                </div>
            </div>
        )       
    }
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