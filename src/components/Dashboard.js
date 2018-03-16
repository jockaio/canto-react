import React, {Component} from 'react';
import Nav from './Nav';
import SearchTranslation from './SearchTranslation'
import './styling/Dashboard.css'

class Dashboard extends Component{
    render(){
        return (
        <div className="container">
            <Nav />
            <SearchTranslation /> 
        </div>
        );
    }
}

export default Dashboard;