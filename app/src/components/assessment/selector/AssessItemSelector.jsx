import React from 'react';
import PropTypes from 'prop-types';
import { Collapse } from 'antd';
import AbilityItem from './AssessAbilityItem';
import CSSModules from 'react-css-modules';
import styles from 'style/Assessment.scss';

const Panel = Collapse.Panel;

/**
 * 检核项选取组件
 * @param domains 检核领域map对象
 * @param abilities 检核能力项map对象
 * @param selectedItem 当前选中检核项编码
 * @param onSelect 检核项选中回调函数
 * @return {*}
 */
const AssessItemSelector = ({ domains = {}, abilities = {}, selectedItem, onSelect }) => {
  const customPanelStyle = {
    background: '#f9fafc',
    border: 0,
  };
  return (
    <div styleName={'ability-items'}>
      <Collapse bordered={false} defaultActiveKey={Object.keys(domains).map(val => '.$' + val)}>
        {Object.values(domains).map(_domain => (
          <Panel header={_domain.name} key={_domain.id} style={customPanelStyle}>
            {_domain.abilities.map(abilityId => {
              const ability = abilities[abilityId];
              return (
                ability && (
                  <AbilityItem
                    abilityName={ability.name}
                    selected={abilityId === selectedItem}
                    assessOption={ability.assessResult}
                    onSelect={() => onSelect(abilityId)}
                    key={`ab.${ability.id}`}
                  />
                )
              );
            })}
          </Panel>
        ))}
      </Collapse>
    </div>
  );
};

AssessItemSelector.propTypes = {
  domains: PropTypes.object,
  abilities: PropTypes.object,
  selectedItem: PropTypes.string,
  onSelect: PropTypes.func,
};
export default CSSModules(AssessItemSelector, styles);
