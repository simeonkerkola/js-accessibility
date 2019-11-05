import React, { useState, useRef, useEffect } from 'react';

import './dropdown.scss';

const Dropdown = ({ activatorText, items = [] }) => {
  const activatorRef = useRef(null);
  const listRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // set focus on the first lists item
      listRef.current.querySelector('a').focus();

      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  const handleClick = e => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = e => {
    if (
      listRef.current.contains(e.target) ||
      activatorRef.current.contains(e.target)
    ) {
      return;
    }
    setIsOpen(false);
  };

  const handleKeyUp = e => {
    if (e.key === 'Escape' && isOpen) setIsOpen(false);
  };

  return (
    <div className="dropdown-wrap">
      <button
        aria-haspopup="true"
        aria-controls="dropdown1"
        ref={activatorRef}
        className="dropdown-activator"
        onClick={handleClick}
        onKeyUp={handleKeyUp}
      >
        button
      </button>
      <ul
        id="dropdown1"
        ref={listRef}
        className={`dropdown-itemList ${isOpen ? 'active' : ''}`}
      >
        {items.map((item, index) => {
          return (
            <li key={index}>
              <a href={item.url}>{item.text}</a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default Dropdown;
