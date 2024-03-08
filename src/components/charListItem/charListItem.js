
import '../charList/charList.scss';


const CharListItem = (props) => {

    const {name, thumbnail, id, itemIndex, sendRef} = props;

    let imgStyle = {objectFit: 'cover'};
    if (thumbnail.includes('image_not_available')) {
        imgStyle = {objectFit: 'unset'};
    }



    return (  
        <li className="char__item"
            tabIndex={0}
            ref={sendRef}
            onClick={() => {props.onSelectedChar(id);
                            props.focusOnItem(itemIndex)}}
            onKeyDown={(e) => {
                if (e.key === ' ' || e.key === 'Enter') {
                    props.onSelectedChar(id);
                    props.focusOnItem(itemIndex)
                }
            }}>
            <img src={thumbnail} alt="abyss" style={imgStyle}/>
            <div className="char__name">{name}</div>
        </li>                 
    )  
}

export default CharListItem;