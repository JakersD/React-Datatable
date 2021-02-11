import React from 'react';
import OutsideTracker from './OutsideTracker';

const Dropdown = ({ currentUser, setOpen, setCurrentUser }) => {
  return (
    <OutsideTracker setOpen={setOpen} setCurrentUser={setCurrentUser} ClassName="dropdown-userInfo">
      <div>
        <h3 className="userInfo-header">
          <p>
            User:{' '}
            <b>
              {currentUser.firstName} {currentUser.lastName}
            </b>
          </p>
        </h3>
        <p className="userInfo-description">Description:</p>
        <textarea cols="30" rows="7" value={currentUser.description} readOnly></textarea>
      </div>
      <div>
        <p className="userInfo-address">
          Residence address: <b>{currentUser.address.streetAddress}</b>
        </p>
        <p className="userInfo-city">
          City: <b>{currentUser.address.city}</b>
        </p>
        <p className="userInfo-state">
          Province/State: <b>{currentUser.address.state}</b>
        </p>
        <p className="userInfo-zip">
          Zip: <b>{currentUser.address.zip}</b>
        </p>
      </div>
    </OutsideTracker>
  );
};

export default Dropdown;
