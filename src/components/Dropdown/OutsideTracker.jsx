import React, { useEffect, useRef } from 'react';

function useOutsideTracker(ref, setOpen, setCurrentUser) {
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
  }, [ref]);
}

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
