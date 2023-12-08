import { Component } from 'react/cjs/react.production.min';
import '../charList/charList.scss';


class CharListItem extends Component {
    



    render() {

        const {name, thumbnail, id, itemIndex, sendRef} = this.props;

        let imgStyle = {objectFit: 'cover'};
        if (thumbnail.includes('image_not_available')) {
            imgStyle = {objectFit: 'unset'};
        }

        return (
            <li className="char__item"
                tabIndex={0}
                ref={sendRef}
                onClick={() => {this.props.onSelectedChar(id);
                                this.props.focusOnItem(itemIndex)}}
                onKeyDown={(e) => {
                    if (e.key === ' ' || e.key === 'Enter') {
                        this.props.onSelectedChar(id);
                        this.props.focusOnItem(itemIndex)
                    }
                }}>
                <img src={thumbnail} alt="abyss" style={imgStyle}/>
                <div className="char__name">{name}</div>
            </li>
        )
        
    }
   
}

export default CharListItem;