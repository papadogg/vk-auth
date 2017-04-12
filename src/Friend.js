import React from 'react';

const Friend = ({friend})=>{
    return(
        <div className="media friend">
          <div className="media-left">
            <img className="media-object" src={friend.photo_50} alt="friend"/>
          </div>
          <div className="media-body">
            <h4 className="media-heading">{friend.first_name} {friend.last_name}</h4>
          </div>
        </div>
    );
};

export default Friend;