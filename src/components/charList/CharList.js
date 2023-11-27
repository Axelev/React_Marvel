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
        error: false
    }

    marvelService = new MarvelService();

    updateList = () => {
        this.marvelService.getAllCharacters()
                          .then(this.listLoaded)
                          .catch(this.onError)
    }
    
    onError = () => {
        this.setState({
            error: true,
            loading: false,
        })
    }

    listLoaded = (charList) => {
        this.setState({
            charList,
            loading: false,
        });

        console.log(this.state.charList);
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
                    key={item.id}/>
            )
        })

        return (
            <ul className="char__grid">
                {items}
            </ul>
        )
    }

    render() {

        const {charList, loading, error} = this.state;
        const spinner = loading? <Spinner/> : null;
        const errorMessage = error? <ErrorMessage/> : null;
        const content = !error || loading ? this.renderItems(charList): null;



        return (
            <div className="char__list">
                {spinner}
                {errorMessage}
                {content}
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
    
}

export default CharList;