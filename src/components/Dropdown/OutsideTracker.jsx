import React, { useEffect, useRef } from 'react';

const useOutsideTracker = (ref, setOpen, setCurrentUser) => {
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
        setCurrentUser({});
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref]);
};

const OutsideTracker = ({ children, setOpen, setCurrentUser, ClassName }) => {
  const wrapperRef = useRef(null);
  useOutsideTracker(wrapperRef, setOpen, setCurrentUser);
  return (
    <div ref={wrapperRef} className={ClassName}>
      {children}
    </div>
  );
};

export default OutsideTracker;
