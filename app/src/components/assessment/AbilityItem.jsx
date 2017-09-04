import React from 'react';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';
import styles from 'style/Assessment.scss';

const AbilityItem = ({ name, option }) => {
  const supClass = {
    A: 'sup-a',
    B: 'sup-b',
    C: 'sup-c',
    D: 'sup-d',
  };
  return (
    <div styleName={'ability-item'}>
      <span>
        {name}
      </span>
      {option &&
        <sup styleName={supClass[option]}>
          {option}
        </sup>}
    </div>
  );
};

AbilityItem.propTypes = {
  name: PropTypes.string,
  option: PropTypes.oneOf(['A', 'B', 'C', 'D']),
};
export default CSSModules(AbilityItem, styles);
