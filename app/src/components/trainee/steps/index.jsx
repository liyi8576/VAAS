import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Steps,Button} from 'antd';
import BasicInfo from './BasicInfo';
import BackgroundInfo from './BackgroundInfo';
import DisabledInfo from './DisabledInfo';
import TraineeInfo from '../TraineeInfo';
import CSSModules from 'react-css-modules';
import styles from '../Trainee.scss'

const Step = Steps.Step;

class CreateTraineeSteps extends Component {
  constructor() {
    super();
    this.state = {
      curStep: 0,
    };
    this.nextStep = this.nextStep.bind(this);
    this.prevStep = this.prevStep.bind(this);
  }

  nextStep() {
    this.setState({curStep: this.state.curStep + 1});
  }

  prevStep() {
    this.setState({curStep: this.state.curStep - 1});
  }

  render() {
    return (
      <div>
        <Steps
          current={this.state.curStep}
          style={{
            backgroundColor: '#f7f7f7',
            padding: '10px',
            marginBottom: '15px',
          }}
        >
          <Step key="basicInfo" title="基本资料"/>
          <Step key="disabledInfo" title="障碍状况"/>
          <Step key="backgroundInfo" title="背景资料"/>
          <Step key="finish" title="完成"/>
        </Steps>
        <div styleName="steps-content">
          {this.state.curStep === 0 &&
          <BasicInfo isCreate={this.props.isCreate}/>}
          {this.state.curStep === 1 &&
          <DisabledInfo isCreate={this.props.isCreate}/>}
          {this.state.curStep === 2 &&
          <BackgroundInfo isCreate={this.props.isCreate}/>}
          {this.state.curStep === 3 &&
          <TraineeInfo isCreate={this.props.isCreate}/>}
        </div>
        <div className="ant-modal-footer">
          <Button
            key="cancel"
            size="large"
            onClick={this.props.closeCreateModal}
          >
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
            onClick={() => console.log('Processing complete!')}
          >
            确认保存
          </Button>}
        </div>
      </div>
    );
  }
}

CreateTraineeSteps.propTypes = {
  isCreate: PropTypes.bool,
};

export default CSSModules(CreateTraineeSteps,styles);
