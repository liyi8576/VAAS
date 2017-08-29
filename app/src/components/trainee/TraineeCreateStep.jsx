import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Steps, Button, Modal } from 'antd';
import moment from 'moment';
import CSSModules from 'react-css-modules';
import styles from './Trainee.scss';
import { BasicInfo, BackgroundInfo, DisabledInfo } from './steps';
import TraineeInfo from './TraineeInfo';

const Step = Steps.Step;

class TraineeCreateStep extends Component {
  constructor() {
    super();
    this.state = {
      curStep: 0,
      trainee: {},
    };
    this.validateStep = () => {};
    this.getFieldValues = () => {};
  }
  componentWillReceiveProps() {
    this.setState({
      trainee: this.props.trainee,
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
      onOk() {
        this.props.saveTrainee(this.state.trainee.id, this.state.trainee);
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
    const relationshipDic = [
      {
        name: '父子',
        value: '1',
      },
      {
        name: '母子',
        value: '2',
      },
    ];
    const disabledTypeDic = [
      {
        name: '听力残疾',
        value: '1',
      },
      {
        name: '肢体残疾',
        value: '2',
      },
      {
        name: '智力残疾',
        value: '3',
      },
    ];
    const disabledLevelDic = [
      {
        name: '一级',
        value: '1',
      },
      {
        name: '二级',
        value: '2',
      },
      {
        name: '三级',
        value: '3',
      },
    ];
    const degreeTypeDic = [
      {
        name: '学士',
        value: '1',
      },
      {
        name: '硕士',
        value: '2',
      },
    ];
    const educationLevelDic = [
      {
        name: '初中',
        value: '1',
      },
      {
        name: '高中',
        value: '2',
      },
    ];
    const jobTypeDic = [
      {
        name: '公务员',
        value: '1',
      },
      {
        name: '教师',
        value: '2',
      },
    ];
    const stepDics = [
      { relationshipDic },
      { disabledTypeDic, disabledLevelDic },
      { degreeTypeDic, educationLevelDic, jobTypeDic },
    ];
    const Comp = stepComps[step];
    const dics = stepDics[step];
    return (
      <div styleName="steps-content">
        <Comp
          trainee={this.state.trainee}
          setValidateFunc={validateFunc => (this.validateStep = validateFunc)}
          setGetFieldValuesFunc={getFieldValuesFunc =>
            (this.getFieldValues = getFieldValuesFunc)}
          {...dics}
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
          <Button key="confirm" type="primary" onClick={this.onSave}>
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

TraineeCreateStep.propTypes = {
  trainee: PropTypes.object,
  saveTrainee: PropTypes.func,
};

export default CSSModules(TraineeCreateStep, styles);
