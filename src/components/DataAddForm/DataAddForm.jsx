import React, { useEffect, useState } from 'react';

const DataAddForm = ({ setLoadedData, loadedData }) => {
  const [newUserObject, setNewUserObject] = useState({ address: {} });
  const [isNewUser, setIsNewUser] = useState(false);
  const [isDIsabled, setIsDisabled] = useState(true);

  useEffect(() => {
    let u = 0;
    setIsDisabled(true);
    document.querySelectorAll('.newUserInput').forEach((v, k) => {
      if (v.value.length !== 0) {
        u += 1;
        if (u === document.querySelectorAll('.newUserInput').length) {
          setIsDisabled(false);
        }
      }
    });
  }, [newUserObject]);

  const regEpxTest = () => {
    if (!/^.+@.+\..+$/g.test(newUserObject.email)) {
      alert('Please enter correct email format (Email format: mail@mail.com[.com])');
      return null;
    }
    if (!/^\(\d{3}\)\d{3}-\d{4}$/gm.test(newUserObject.phone)) {
      alert('Please enter correct phone format (Phone format: (123)456-7890)');
      return null;
    }
    if (!/^\d{4} [a-zA-Z]+ [a-zA-Z]{2}$/gm.test(newUserObject.address.streetAddress)) {
      alert('Please enter correct address format (Adress format: 123 Name St)');
      return null;
    }
    if (!/[a-zA-Z]{2}/.test(newUserObject.address.state)) {
      alert('Please enter correct state format (State name example: WI)');
      return null;
    }
    if (!/\d{5}/.test(newUserObject.address.zip)) {
      alert('Please enter correct zip format (ZIP code example: 12345)');
      return null;
    }
  };

  const handleClose = () => {
    setIsNewUser(false);
    setNewUserObject({ address: {} });
  };

  const addNew = () => {
    if (regEpxTest() !== null) {
      setLoadedData([newUserObject, ...loadedData]);
      handleClose();
    }
  };

  return (
    <div>
      <button className="dataAddForm-btn" onClick={() => setIsNewUser(true)}>
        Add new user
      </button>
      {isNewUser && (
        <button className="dataAddForm-btn" onClick={() => handleClose()}>
          Close
        </button>
      )}
      {isNewUser && (
        <>
          <div className="dataAddForm">
            <div className="dataAddForm-item">
              <label>ID</label>
              <input
                title="ID example: 123"
                className="newUserInput"
                type="text"
                placeholder="Id"
                value={newUserObject.id || ''}
                onChange={(e) =>
                  setNewUserObject({ ...newUserObject, id: e.target.value.replace(/\D/g, '') })
                }
              />
            </div>
            <div className="dataAddForm-item">
              <label>Name</label>
              <input
                title="Name example: John"
                className="newUserInput"
                type="text"
                placeholder="Name"
                value={newUserObject.firstName || ''}
                onChange={(e) =>
                  setNewUserObject({
                    ...newUserObject,
                    firstName: e.target.value.replace(/[0-9а-яА-Я|\-\\<>?,.{} ]/g, ''),
                  })
                }
              />
            </div>
            <div className="dataAddForm-item">
              <label>Surname</label>
              <input
                title="Surname example: Fedor"
                className="newUserInput"
                type="text"
                placeholder="Surname"
                value={newUserObject.lastName || ''}
                onChange={(e) =>
                  setNewUserObject({
                    ...newUserObject,
                    lastName: e.target.value.replace(/[0-9а-яА-Я|\-\\<>?,.\]{} ]/g, ''),
                  })
                }
              />
            </div>
            <div className="dataAddForm-item">
              <label>Email</label>
              <input
                title="Email format: mail@mail.com[.com]"
                className="newUserInput"
                type="email"
                placeholder="Email"
                value={newUserObject.email || ''}
                onChange={(e) => setNewUserObject({ ...newUserObject, email: e.target.value })}
              />
            </div>
            <div className="dataAddForm-item">
              <label>Phone</label>
              <input
                title="Phone format: (123)456-7890"
                className="newUserInput"
                type="tel"
                placeholder="Phone"
                value={newUserObject.phone || ''}
                onChange={(e) =>
                  setNewUserObject({
                    ...newUserObject,
                    phone: e.target.value.replace(/[^0-9()-]/g, ''),
                  })
                }
              />
            </div>
            <div className="dataAddForm-item">
              <label>Description</label>
              <textarea
                title="Any description"
                className="newUserInput"
                type="text"
                placeholder="Description"
                value={newUserObject.description || ''}
                onChange={(e) =>
                  setNewUserObject({ ...newUserObject, description: e.target.value })
                }
              />
            </div>
            <div className="dataAddForm-item">
              <label>Address</label>
              <input
                title="Adress format: 123 Name St"
                className="newUserInput"
                type="text"
                placeholder="Address"
                value={newUserObject.address.streetAddress || ''}
                onChange={(e) =>
                  setNewUserObject({
                    ...newUserObject,
                    address: {
                      ...newUserObject.address,
                      streetAddress: e.target.value.replace(/[^a-zA-Z0-9 ]/g, ''),
                    },
                  })
                }
              />
            </div>
            <div className="dataAddForm-item">
              <label>City</label>
              <input
                title="City name example: Illinois"
                className="newUserInput"
                type="text"
                placeholder="City"
                value={newUserObject.address.city || ''}
                onChange={(e) =>
                  setNewUserObject({
                    ...newUserObject,
                    address: {
                      ...newUserObject.address,
                      city: e.target.value.replace(/[\d ]/g, ''),
                    },
                  })
                }
              />
            </div>
            <div className="dataAddForm-item">
              <label>State</label>
              <input
                title="State name example: WI"
                className="newUserInput"
                type="text"
                placeholder="State"
                value={newUserObject.address.state || ''}
                onChange={(e) =>
                  setNewUserObject({
                    ...newUserObject,
                    address: {
                      ...newUserObject.address,
                      state: e.target.value.replace(/(?<=.{2})(.*)$/g, ''),
                    },
                  })
                }
              />
            </div>
            <div className="dataAddForm-item">
              <label>ZIP</label>
              <input
                title="ZIP code example: 12345"
                className="newUserInput"
                type="text"
                placeholder="ZIP Code"
                value={newUserObject.address.zip || ''}
                onChange={(e) =>
                  setNewUserObject({
                    ...newUserObject,
                    address: {
                      ...newUserObject.address,
                      zip: e.target.value.replace(/(?<=.{5})(.*)$/g, ''),
                    },
                  })
                }
              />
            </div>
          </div>
          <button
            className="dataAddForm-btn dataAddForm-btn-add"
            disabled={isDIsabled}
            onClick={() => addNew()}
          >
            Add
          </button>
        </>
      )}
    </div>
  );
};

export default DataAddForm;
