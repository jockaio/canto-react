import React, {Component} from 'react';
import {getFilteredSearchResult} from '../utils/translation-api'
import SearchInput from 'react-search-input'
import {isLoggedIn} from '../utils/AuthService';
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
    
    renderLoggedInView(){
        const filteredSearchResult = getFilteredSearchResult(this.state.searchTerm);
        return (
            <div>
                <SearchInput className="search-input" onChange={this.searchUpdated} />
                {filteredSearchResult.map(word => {
                    if(this.state.searchTerm !== ''){
                        return (
                            <div className="word-container col-sm-1" key={word.id}>
                                <div className="word-item">{word.item}</div>
                                <div className="word-romanization">{word.romanization}</div>
                                <div className="word-translation">{word.translation}</div>
                            </div>
                        )
                    } 
                })}
            </div>
        );
    }

    searchUpdated (term) {
        this.setState({searchTerm: term})
    }

    renderAnonymousView(){
       return (
            <div>
                <p>Log in/Sign up to be able to search translations.</p>
            </div>
       );
    }
    
    render (){
        if(isLoggedIn()){ 
            return this.renderLoggedInView() 
        }else{
            return this.renderAnonymousView()
        }
    }
}

export default SearchTranslation;