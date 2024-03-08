import { useState } from "react";

import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import SearchChar from "../searchChar/SearchChar";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";

import decoration from '../../resources/img/vision.png';

const MainPage = () => {

    const [selectedChar, setChar] = useState(null);


    const onSelectedChar = (id) => {
        setChar(id);
    }
    
    return (
        <>
            <ErrorBoundary>
                <RandomChar/>
            </ErrorBoundary>
            <div className="content_wrap">
                <div className="char__content">
                    <ErrorBoundary> 
                        <CharList onSelectedChar={onSelectedChar}/>
                    </ErrorBoundary>                    
                </div>
                 <div className="char__content__side">
                    <ErrorBoundary>
                        <CharInfo charId={selectedChar}/>
                    </ErrorBoundary>
                    <ErrorBoundary>
                        <SearchChar/>
                    </ErrorBoundary>
                </div>
            </div>
            
            <img className="bg-decoration" src={decoration} alt="vision"/>
        </>
    )
}

export default MainPage;