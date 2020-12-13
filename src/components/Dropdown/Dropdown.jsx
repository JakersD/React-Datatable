import React from 'react';
import OutsideTracker from './OutsideTracker';

const Dropdown = ({ currentUser, setOpen, setCurrentUser }) => {
  return (
    <OutsideTracker setOpen={setOpen} setCurrentUser={setCurrentUser} ClassName="dropdown-userInfo">
      <div>
        <h3 className="userInfo-header">
          <p>Выбран пользователь:</p>
          <b>
            {currentUser.firstName} {currentUser.lastName}
          </b>
        </h3>
        <p className="userInfo-description">Описание:</p>
        <textarea cols="30" rows="10" value={currentUser.description} readOnly></textarea>
      </div>
      <div>
        <p className="userInfo-address">
          Адрес проживания: <b>{currentUser.address.streetAddress}</b>
        </p>
        <p className="userInfo-city">
          Город: <b>{currentUser.address.city}</b>
        </p>
        <p className="userInfo-state">
          Провинция/штат: <b>{currentUser.address.state}</b>
        </p>
        <p className="userInfo-zip">
          Индекс: <b>{currentUser.address.zip}</b>
        </p>
      </div>
    </OutsideTracker>
  );
};

export default Dropdown;
