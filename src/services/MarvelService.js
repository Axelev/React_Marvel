import { useHttp } from "../hooks/http.hook";


const useMarvelService = () => {
    const {loading, request, error, clearError, process, setProcess} = useHttp();


    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _apikey = 'apikey=0fe688279b0f19bdd15d707e12386b22';
    const _baseOffset = 200;
    
    
    const getCharacterByName = async (name) => {
		const res = await request(`${_apiBase}characters?name=${name}&${_apikey}`);
		return res.data.results.map(_transformCharacter);
	};


    const getAllCharacters = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apikey}`)
        return res.data.results.map(_transformCharacter);
    }

    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?${_apikey}`)
        return _transformCharacter(res.data.results[0]);
    }

    const getAllComics = async (offset) => {
        const res = await request(`${_apiBase}comics?limit=12&offset=${offset}&${_apikey}`)
        return res.data.results.map(_transformComics);
    }

    const getComic = async (id) => {
		const res = await request(`${_apiBase}comics/${id}?${_apikey}`);
		return _transformComics(res.data.results[0]);
	};

    const _transformCharacter = (char) => {

        return {
            id: char.id,
            name: char.name,
            description: char.description,
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items
        }
    }

    const _transformComics = (comics) => {

        return {
            id: comics.id,
            title: comics.title,
            description: comics.description || "There is no description",
            thumbnail: comics.thumbnail.path + '.' + comics.thumbnail.extension,
            pageCount: comics.pageCount
				? `${comics.pageCount} p.`
				: "No information about the number of pages",
            language: comics.textObjects[0]?.language || "en-us",
            price: comics.prices[0].price
				? `${comics.prices[0].price}$`
				: "not available",        
        }
    }
    
    return {loading, 
            error, 
            process,
            setProcess, 
            getCharacterByName, 
            getAllCharacters, 
            getCharacter, 
            clearError, 
            getAllComics, 
            getComic};
}

export default useMarvelService;