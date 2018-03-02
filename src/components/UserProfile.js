import React, { Component } from 'react';
import { Panel, ControlLabel, Glyphicon } from 'react-bootstrap';
import {getProfile} from '../utils/AuthService';
import Nav from './Nav';
import './styling/UserProfile.css';

class Profile extends Component {
    componentWillMount() {
        this.setState({ profile: {} });
            getProfile((err, profile) => {
            this.setState({ profile });
        });
    }
    
  render() {
    const { profile } = this.state;
    return (
      <div className="container">
        <Nav />
        <div className="profile-area">
          <h1>{profile.name}</h1>
          <Panel header="Profile">
            <img src={profile.picture} alt="profile" />
            <div>
              <ControlLabel><Glyphicon glyph="user" /> Nickname</ControlLabel>
              <h3>{profile.nickname}</h3>
            </div>
            <pre>{JSON.stringify(profile, null, 2)}</pre>
          </Panel>
        </div>
      </div>
    );
  }
}

export default Profile;