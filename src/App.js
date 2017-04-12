import React, { Component } from 'react';
import VK from 'vk-openapi';
import FriendsList from './FriendsList';

class App extends Component {
  state = {
    user: {
      firstName: "",
      lastName: "",
      friends: []
    },
    loading: false
  }
  componentDidMount(){
    
    VK.init({
      apiId: 5977706
    });
    
    VK.Auth.getLoginStatus(response =>{
      
      if(response.status === 'connected'){
        const id = response.session.mid;
        const user = this.state.user;
        this.setState({
          loading: true
        });
        
        VK.Api.call('users.get', { id, fields: 'photo_50' }, response => {
          
          user.firstName = response.response[0].first_name;
          user.lastName = response.response[0].last_name;
          user.photo = response.response[0].photo_50;
          
          VK.Api.call('friends.get',{ order: 'random', count: 5, fields: 'photo_50' }, response => {
          user.friends = response.response;
          this.setState({
            user,
            loading: false
          });
        });
        });
      }
    });
  }
  
  login = ()=>{
    VK.Auth.login(response=>{
     
      if(response.session) {
        const user = this.state.user;
        user.firstName = response.session.user.first_name;
        user.lastName = response.session.user.last_name;
        const id = response.session.user.id;
        
        VK.Api.call('users.get', { id, fields: 'photo_50' }, response => {
          user.photo = response.response[0].photo_50;
          
          VK.Api.call('friends.get',{ order: 'random', count: 5, fields: 'photo_50' }, response => {
          user.friends = response.response;
          this.setState({
            user
          });
        });
        });
      }
    });
  }
  
  logout = () =>{
    VK.Auth.logout((response)=>{
      this.setState({
        user: {
          firstName: "",
          lastName: "",
          friends: []
        },
        loading: false
      });
    });
  }
  
  renderContent = () => {
    return this.state.loading ? 
    <div className="loader">Loading...</div> : 
    <div className="col-md-6 App col-md-offset-3">
      <FriendsList friends={this.state.user.friends} />
    </div>;
  }
  
  renderUser = () =>{
    return this.state.loading ?
    null :
    this.state.user.firstName ?
    <div className="dropdown">
      <button className="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
      <img className="profile-img" src={this.state.user.photo} alt="user"/> 
      {this.state.user.firstName}
      <span className="caret"></span>
      </button>
      <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
        <li><a onClick={this.logout}>Выйти</a></li>
      </ul>
    </div> :
    <a className="navlink" onClick={this.login}>Войти</a>;
  }
  
  render() {
    return (
      <div>
        <div id="navbar">
          <div className="col-md-8 col-md-offset-2">
            <p>VK friends</p>
            {this.renderUser()}
          </div>
        </div>
        <div className="container">
           {this.renderContent()}
        </div>
      </div>
    );
  }
}

export default App;
