import React, { useEffect, useState } from 'react';

const DataAddForm = ({ setLoadedData, loadedData }) => {
  const [newUser, setNewUser] = useState({ address: {} });
  const [isNewUser, setIsNewUser] = useState(false);
  const [isDIsabled, setIsDisabled] = useState(true);

  useEffect(() => {
    let u = 0;
    setIsDisabled(true);
    document.querySelectorAll('.newUserInput').forEach((v) => {
      if (v.value.length) {
        u += 1;
        if (u === document.querySelectorAll('.newUserInput').length) {
          setIsDisabled(false);
        }
      }
    });
  }, [newUser]);

  const regEpxTest = () => {
    if (!/^.+@.+\..+$/g.test(newUser.email)) {
      alert('Please enter correct email format (Email format: mail@mail.com[.com])');
      return null;
    }
    if (!/^\(\d{3}\)\d{3}-\d{4}$/gm.test(newUser.phone)) {
      alert('Please enter correct phone format (Phone format: (123)456-7890)');
      return null;
    }
    if (!/^\d{4} [a-zA-Z]+ [a-zA-Z]{2}$/gm.test(newUser.address.streetAddress)) {
      alert('Please enter correct address format (Adress format: 123 Name St)');
      return null;
    }
    if (!/[a-zA-Z]{2}/.test(newUser.address.state)) {
      alert('Please enter correct state format (State name example: WI)');
      return null;
    }
    if (!/\d{5}/.test(newUser.address.zip)) {
      alert('Please enter correct zip format (ZIP code example: 12345)');
      return null;
    }
  };

  const handleClose = () => {
    setIsNewUser(false);
    setNewUser({ address: {} });
  };

  const addNew = () => {
    if (regEpxTest()) {
      setLoadedData([newUser, ...loadedData]);
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
              <label>ID (123)</label>
              <input
                title="ID example: 123"
                className="newUserInput"
                type="text"
                placeholder="Id"
                value={newUser.id || ''}
                onChange={(e) => setNewUser({ ...newUser, id: e.target.value.replace(/\D/g, '') })}
              />
            </div>
            <div className="dataAddForm-item">
              <label>Name (Ivan)</label>
              <input
                title="Name example: John"
                className="newUserInput"
                type="text"
                placeholder="Name"
                value={newUser.firstName || ''}
                onChange={(e) =>
                  setNewUser({
                    ...newUser,
                    firstName: e.target.value.replace(/[0-9а-яА-Я|\-\\<>?,.{} ]/g, ''),
                  })
                }
              />
            </div>
            <div className="dataAddForm-item">
              <label>Surname (Ivanov)</label>
              <input
                title="Surname example: Fedor"
                className="newUserInput"
                type="text"
                placeholder="Surname"
                value={newUser.lastName || ''}
                onChange={(e) =>
                  setNewUser({
                    ...newUser,
                    lastName: e.target.value.replace(/[0-9а-яА-Я|\-\\<>?,.\]{} ]/g, ''),
                  })
                }
              />
            </div>
            <div className="dataAddForm-item">
              <label>Email (mail@mail.com)</label>
              <input
                title="Email format: mail@mail.com[.com]"
                className="newUserInput"
                type="email"
                placeholder="Email"
                value={newUser.email || ''}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              />
            </div>
            <div className="dataAddForm-item">
              <label>Phone (123)456-7890</label>
              <input
                title="Phone format: (123)456-7890"
                className="newUserInput"
                type="tel"
                placeholder="Phone"
                value={newUser.phone || ''}
                onChange={(e) =>
                  setNewUser({
                    ...newUser,
                    phone: e.target.value.replace(/[^0-9()-]/g, ''),
                  })
                }
              />
            </div>
            <div className="dataAddForm-item">
              <label>Description (any)</label>
              <textarea
                title="Any description"
                className="newUserInput"
                type="text"
                placeholder="Description"
                value={newUser.description || ''}
                onChange={(e) => setNewUser({ ...newUser, description: e.target.value })}
              />
            </div>
            <div className="dataAddForm-item">
              <label>Address (1234 Any st)</label>
              <input
                title="Adress format: 123 Name St"
                className="newUserInput"
                type="text"
                placeholder="Address"
                value={newUser.address.streetAddress || ''}
                onChange={(e) =>
                  setNewUser({
                    ...newUser,
                    address: {
                      ...newUser.address,
                      streetAddress: e.target.value.replace(/[^a-zA-Z0-9 ]/g, ''),
                    },
                  })
                }
              />
            </div>
            <div className="dataAddForm-item">
              <label>City (any)</label>
              <input
                title="City name example: Illinois"
                className="newUserInput"
                type="text"
                placeholder="City"
                value={newUser.address.city || ''}
                onChange={(e) =>
                  setNewUser({
                    ...newUser,
                    address: {
                      ...newUser.address,
                      city: e.target.value.replace(/[\d ]/g, ''),
                    },
                  })
                }
              />
            </div>
            <div className="dataAddForm-item">
              <label>Province/State (NJ)</label>
              <input
                title="State name example: WI"
                className="newUserInput"
                type="text"
                placeholder="State"
                value={newUser.address.state || ''}
                onChange={(e) =>
                  setNewUser({
                    ...newUser,
                    address: {
                      ...newUser.address,
                      state: e.target.value.replace(/(?<=.{2})(.*)$/g, ''),
                    },
                  })
                }
              />
            </div>
            <div className="dataAddForm-item">
              <label>ZIP (12345)</label>
              <input
                title="ZIP code example: 12345"
                className="newUserInput"
                type="text"
                placeholder="ZIP Code"
                value={newUser.address.zip || ''}
                onChange={(e) =>
                  setNewUser({
                    ...newUser,
                    address: {
                      ...newUser.address,
                      zip: e.target.value.replace(/(?<=.{5})(.*)$/g, ''),
                    },
                  })
                }
              />
            </div>
          </div>
          <button className="dataAddForm-btn dataAddForm-btn-add" disabled={isDIsabled} onClick={() => addNew()}>
            Add
          </button>
        </>
      )}
    </div>
  );
};

export default DataAddForm;
