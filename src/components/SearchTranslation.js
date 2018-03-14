import React, {Component} from 'react';
import Search from 'react-search-box';

class SearchTranslation extends Component{
    constructor() {
        super();

        this.state = {
            data: []
        };
    }
    
    componentDidMount() {
        this.setState({
            data: [{name: 'hello'}, {name:'world'}]
        });
    }

    handleChange(value) {
        console.log(value);
    }

    render (){
        return (
            <div>
                <Search
                data={ this.state.data }
                onChange={ this.handleChange.bind(this) }
                placeholder="Search for a string..."
                class="search-class"
                searchKey="name"
              /> 
            </div>
        );
    }
}

export default SearchTranslation;