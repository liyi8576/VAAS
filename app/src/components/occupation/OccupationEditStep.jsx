import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Steps, Button, Modal } from 'antd';
import { BasicInfo, AbilitySelect, AssessScoreSet } from './steps';
import OccupationInfo from './OccupationInfo';
import CSSModules from 'react-css-modules';
import styles from 'style/Occupation.scss';

const Step = Steps.Step;

class OccupationEditStep extends Component {
  constructor() {
    super();
    this.state = {
      curStep: 0,
      saveLoading: false,
      occupation: {},
    };
    this.validateStep = () => {};
    this.getFieldValues = () => {};
  }
  componentWillMount() {
    this.setState({
      occupation: this.props.occupation,
      saveLoading: this.props.saveLoading,
    });
  }

  componentWillUnmount() {
    this.validateStep = null;
    this.getFieldValues = null;
  }
  changeStep(isNext) {
    const fieldValue = isNext ? this.validateStep() : this.getFieldValues();
    if (fieldValue) {
      this.setState({
        occupation: {
          ...this.state.occupation,
          ...fieldValue,
        },
        curStep: isNext ? this.state.curStep + 1 : this.state.curStep - 1,
      });
    }
  }

  nextStep = () => {
    this.changeStep(true);
  };

  prevStep = () => {
    this.changeStep(false);
  };

  onSave = () => {
    Modal.confirm({
      title: '您确定要保存该职业信息么？',
      onOk: () => {
        this.setState({ saveLoading: true });
        this.props.onSaveOccupation(this.state.occupation);
      },
    });
  };

  renderSteps() {
    return (
      <Steps current={this.state.curStep} className="vas-steps-box">
        <Step key="basicInfo" title="职业信息" />
        <Step key="abilitySelect" title="所需能力设定" />
        <Step key="assessScoreSet" title="检核标准设定" />
        <Step key="finish" title="完成" />
      </Steps>
    );
  }

  renderStepContent(step) {
    const stepComps = [BasicInfo, AbilitySelect, AssessScoreSet, OccupationInfo];
    const Comp = stepComps[step];
    return (
      <div styleName="steps-content">
        <Comp
          occupation={this.state.occupation}
          ability={this.props.ability}
          setValidateFunc={validateFunc => (this.validateStep = validateFunc)}
          setGetFieldValuesFunc={getFieldValuesFunc => (this.getFieldValues = getFieldValuesFunc)}
        />
      </div>
    );
  }

  renderStepFuncs() {
    return (
      <div className="ant-modal-footer">
        <Button key="cancel" onClick={this.props.onCancel}>
          取消
        </Button>
        {this.state.curStep > 0 && (
          <Button key="prev" onClick={this.prevStep}>
            上一步
          </Button>
        )}
        {this.state.curStep < 3 && (
          <Button key="next" type="primary" onClick={this.nextStep}>
            下一步
          </Button>
        )}
        {this.state.curStep === 3 && (
          <Button
            key="confirm"
            type="primary"
            onClick={this.onSave}
            loading={this.state.saveLoading}
          >
            确认保存
          </Button>
        )}
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.renderSteps()}
        {this.renderStepContent(this.state.curStep)}
        {this.renderStepFuncs()}
      </div>
    );
  }
}

OccupationEditStep.propTypes = {
  occupation: PropTypes.object,
  ability: PropTypes.object,
  onSaveOccupation: PropTypes.func,
};

export default CSSModules(OccupationEditStep, styles);
