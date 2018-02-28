import React from 'react';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';
import styles from 'style/Assessment.scss';

/**
 * 检核项选取组件的子组件，检核能力项
 * @param abilityName 检核能力项名称
 * @param assessOption 检核选中选项值
 * @param selected 是否当前选中
 * @param onSelect 检核能力项点击选中回调
 * @return {*}
 */
const AssessAbilityItem = ({ abilityName, assessOption, selected, onSelect }) => {
  const supClass = {
    A: 'sup-a',
    B: 'sup-b',
    C: 'sup-c',
    D: 'sup-d',
  };
  return (
    <div styleName={selected ? 'ability-item selected' : 'ability-item'} onClick={onSelect}>
      <span>{abilityName}</span>
      {assessOption && <sup styleName={supClass[assessOption]}>{assessOption}</sup>}
    </div>
  );
};

AssessAbilityItem.propTypes = {
  abilityName: PropTypes.string,
  assessOption: PropTypes.oneOf(['A', 'B', 'C', 'D']),
  selected: PropTypes.bool,
  onSelect: PropTypes.func,
};
export default CSSModules(AssessAbilityItem, styles, { allowMultiple: true });
