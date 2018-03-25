import React, {Component} from 'react';
import {getTranslation} from '../utils/translation-api'
import SearchInput, {createFilter} from 'react-search-input'
import {isLoggedIn} from '../utils/AuthService';
import './styling/SearchTranslation.css';

const KEYS_TO_FILTERS = ['item', 'romanization', 'translation']

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
        if(this.state.searchResult.length === 0){
            getTranslation().then((response) => {
                this.setState({
                    searchResult: response
                });
            })
        }
        const filteredSearchResult = this.state.searchResult.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS));
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
        // if(term.length > 0){
        //     getTranslation(term).then((response) => {
        //         this.setState({searchResult: response});
        //         console.log(this.searchResult);
        //     });
        // }else{
        //     this.setState({searchResult: []});            
        // }
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