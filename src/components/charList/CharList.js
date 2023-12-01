import { Component } from 'react';
import CharListItem from '../charListItem/charListItem';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import MarvelService from '../../services/MarvelService';
import './charList.scss';


class CharList extends Component {
    state = {
        charList: [],
        loading: true,
        error: false,
        newItemLoading: false,
        offset: 200,
        charEnded: false
    }

    marvelService = new MarvelService();

    updateList = () => {
        this.onRequest();
    }

    onRequest = (offset) => {
        this.onCharListLoading();
        this.marvelService.getAllCharacters(offset)
            .then(this.listLoaded)
            .catch(this.onError)
    }

    onCharListLoading = () => {
        this.setState({
            newItemLoading: true
        })
    }
    
    onError = () => {
        this.setState({
            error: true,
            loading: false,
        })
    }

    listLoaded = (newCharList) => {
        let ended = false;
        if (newCharList < 9) {
            ended = true;
        }

        this.setState(({offset, charList}) => ({
            charList: [...charList, ...newCharList],
            loading: false,
            newItemLoading: false,
            offset: offset + 9,
            charEnded: ended
        }));
    }

    componentDidMount() {
        this.updateList();
    }

    renderItems = (arr) => {
        const items = arr.map(item => {
            return (
                <CharListItem 
                    name={item.name}
                    thumbnail={item.thumbnail}
                    key={item.id}
                    id={item.id}
                    onSelectedChar={this.props.onSelectedChar}/>
            )
        })

        return (
            <ul className="char__grid">
                {items}
            </ul>
        )
    }

    render() {

        const {charList, loading, error, offset, newItemLoading, charEnded} = this.state;
        const spinner = loading? <Spinner/> : null;
        const errorMessage = error? <ErrorMessage/> : null;
        const content = !error || loading ? this.renderItems(charList): null;



        return (
            <div className="char__list">
                {spinner}
                {errorMessage}
                {content}
                <button 
                    className="button button__main button__long"
                    disabled={newItemLoading}
                    style={{'display': charEnded ? 'none' : 'block'}}
                    onClick={() => this.onRequest(offset)}>
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
    
}

export default CharList;