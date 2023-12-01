class MarvelService {
    _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    _apikey = 'apikey=0fe688279b0f19bdd15d707e12386b22';
    _baseOffset = 200;

    getResource = async (url) => {
        let res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fecth ${url}, status: ${res.status}`);
        }

        return await res.json();
    }

    getAllCharacters = async (offset = this._baseOffset) => {
        const res = await this.getResource(`${this._apiBase}characters?limit=9&offset=${offset}&${this._apikey}`)
        return res.data.results.map(this._transformCharacter);
    }

    getCharacter = async (id) => {
        const res = await this.getResource(`${this._apiBase}characters/${id}?${this._apikey}`)
        return this._transformCharacter(res.data.results[0]);
    }

    _transformCharacter = (char) => {

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
    
}

export default MarvelService;