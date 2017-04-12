import React from 'react';
import Friend from './Friend';

const FriendsList = ({friends})=>{
    const friendsList = friends.map(friend => <Friend key={friend.uid} friend={friend}/>);
    return(
        <div>
        {friendsList}
        </div>
    );
};

export default FriendsList;