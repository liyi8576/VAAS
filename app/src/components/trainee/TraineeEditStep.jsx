import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Steps, Button, Modal } from 'antd';
import moment from 'moment';
import CSSModules from 'react-css-modules';
import { BasicInfo, BackgroundInfo, DisabledInfo } from './steps';
import TraineeInfo from './TraineeInfo';
import styles from './Trainee.scss';

const Step = Steps.Step;

class TraineeEditStep extends Component {
  constructor() {
    super();
    this.state = {
      curStep: 0,
      saveLoading: false,
      trainee: {},
    };
    this.validateStep = () => {};
    this.getFieldValues = () => {};
  }
  componentWillMount() {
    this.setState({
      trainee: this.props.trainee,
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
      for (let field of Object.keys(fieldValue)) {
        let v = fieldValue[field];
        if (v instanceof moment) {
          fieldValue[field] = v.format('YYYY-MM-DD');
        }
      }
      this.setState({
        trainee: { ...this.state.trainee, ...fieldValue },
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
      title: '您确定要保存该学生信息么？',
      onOk: () => {
        this.setState({ saveLoading: true });
        this.props.onSaveTrainee(this.state.trainee);
      },
    });
  };

  renderSteps() {
    return (
      <Steps current={this.state.curStep} className="vas-steps-box">
        <Step key="basicInfo" title="基本资料" />
        <Step key="disabledInfo" title="障碍状况" />
        <Step key="backgroundInfo" title="背景资料" />
        <Step key="finish" title="完成" />
      </Steps>
    );
  }

  renderStepContent(step) {
    const stepComps = [BasicInfo, DisabledInfo, BackgroundInfo, TraineeInfo];
    const Comp = stepComps[step];
    return (
      <div styleName="steps-content">
        <Comp
          trainee={this.state.trainee}
          dicHelper={this.props.dicHelper}
          setValidateFunc={validateFunc => (this.validateStep = validateFunc)}
          setGetFieldValuesFunc={getFieldValuesFunc =>
            (this.getFieldValues = getFieldValuesFunc)}
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
        {this.state.curStep > 0 &&
          <Button key="prev" onClick={this.prevStep}>
            上一步
          </Button>}
        {this.state.curStep < 3 &&
          <Button key="next" type="primary" onClick={this.nextStep}>
            下一步
          </Button>}
        {this.state.curStep === 3 &&
          <Button
            key="confirm"
            type="primary"
            onClick={this.onSave}
            loading={this.state.saveLoading}
          >
            确认保存
          </Button>}
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

TraineeEditStep.propTypes = {
  trainee: PropTypes.object,
  dicHelper: PropTypes.shape({
    getDicName: PropTypes.func,
    getDicsByGroup: PropTypes.func,
  }),
  onSaveTrainee: PropTypes.func,
};

export default CSSModules(TraineeEditStep, styles);
