import React from 'react';
import PropTypes from 'prop-types';
import { Card, Alert } from 'antd';
import AssessmentOption from './AssessmentOption';
import CSSModules from 'react-css-modules';
import styles from 'style/Assessment.scss';

const AssessmentItem = ({ abilityOption = {} }) => {
  console.log(abilityOption);
  return (
    <Card
      title={null}
      bordered={false}
      noHovering="false"
      loading={false}
      bodyStyle={{ padding: '0' }}
    >
      <Alert message={abilityOption.description} type="warning" />
      <h4>
        检核方式: {abilityOption.assessMethod}
      </h4>
      <div styleName={'asm-options-box'}>
        {abilityOption.optionA &&
          <AssessmentOption title="A" body={abilityOption.optionA} />}
        {abilityOption.optionB &&
          <AssessmentOption title="B" body={abilityOption.optionB} />}
        {abilityOption.optionC &&
          <AssessmentOption title="C" body={abilityOption.optionC} />}
        {abilityOption.optionD &&
          <AssessmentOption title="D" body={abilityOption.optionD} />}
      </div>
    </Card>
  );
};

AssessmentItem.propTypes = {
  abilityOption: PropTypes.shape({
    description: PropTypes.string,
    assessMethod: PropTypes.string,
    optionA: PropTypes.string,
    optionB: PropTypes.string,
    optionC: PropTypes.string,
    optionD: PropTypes.string,
  }),
};
export default CSSModules(AssessmentItem, styles);
