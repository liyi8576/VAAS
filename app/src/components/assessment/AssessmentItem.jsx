import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, Alert } from 'antd';
import AssessmentOption from './AssessmentOption';
import CSSModules from 'react-css-modules';
import styles from 'style/Assessment.scss';

class AssessmentItem extends Component {
  constructor(props) {
    super();
    this.state = {
      selectOption: null,
    };
  }
  checkedOption = option => {
    this.setState({
      selectOption: option,
    });
  };
  render() {
    const { abilityOption } = this.props;
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
            <AssessmentOption
              option="A"
              checked={this.state.selectOption === 'A'}
              body={abilityOption.optionA}
              onclick={this.checkedOption}
            />}
          {abilityOption.optionB &&
            <AssessmentOption
              option="B"
              checked={this.state.selectOption === 'B'}
              body={abilityOption.optionB}
              onclick={this.checkedOption}
            />}
          {abilityOption.optionC &&
            <AssessmentOption
              option="C"
              checked={this.state.selectOption === 'C'}
              body={abilityOption.optionC}
              onclick={this.checkedOption}
            />}
          {abilityOption.optionD &&
            <AssessmentOption
              option="D"
              checked={this.state.selectOption === 'D'}
              body={abilityOption.optionD}
              onclick={this.checkedOption}
            />}
        </div>
      </Card>
    );
  }
}

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
