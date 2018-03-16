import React, {Component} from 'react';
import {getTranslation} from '../utils/translation-api'
import SearchInput, {createFilter} from 'react-search-input'
import './styling/SearchTranslation.css';

class SearchTranslation extends Component{
    constructor() {
        super();
        this.state = {
            searchTerm: '',
            searchResult: []
        };
        this.searchUpdated = this.searchUpdated.bind(this)
    }
    
    
    render (){
        const filteredSearchResult = this.state.searchResult;
        return (
            <div>
                <SearchInput className="search-input" onChange={this.searchUpdated} />
                {filteredSearchResult.map(word => {
                    return (
                        <div className="word-container" key={word.id}>
                            <div className="word-item">{word.item}</div>
                            <div className="word-romanization">{word.romanization}</div>
                            <div className="word-translation">{word.translation}</div>
                        </div>
                    )
                })}
            </div>
        );
    }

    searchUpdated (term) {
        if(term.length > 0){
            getTranslation(term).then((response) => {
                this.setState({searchResult: response});
                console.log(this.searchResult);
            });
        }else{
            this.setState({searchResult: []});            
        }
        this.setState({searchTerm: term})
    }
}

export default SearchTranslation;