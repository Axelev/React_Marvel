import { Component } from 'react';

import '../charList/charList.scss';


 class CharListItem extends Component{

    render() {
    
    const {name, thumbnail, id} = this.props;

    let imgStyle = {objectFit: 'cover'};
    if (thumbnail.includes('image_not_available')) {
        imgStyle = {objectFit: 'unset'};
    }   

    return (
        <li className="char__item"
            onClick={() => {this.props.onSelectedChar(id)}}>
            <img src={thumbnail} alt="abyss" style={imgStyle}/>
            <div className="char__name">{name}</div>
        </li>
    )
    }
}

export default CharListItem;