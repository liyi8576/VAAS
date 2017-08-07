import React from 'react';
import PropTypes from 'prop-types';
import {Steps, Button} from 'antd';
import CSSModules from 'react-css-modules';
import styles from '../Occupation.scss'
import BasicInfo from './BasicInfo';
import AbilitySelect from './AbilitySelect';
import AssessScoreSet from './AssessScoreSet';
import OccupationInfo from '../OccupationInfo';

const Step = Steps.Step;

class CreateOccupationSteps extends React.Component {
  constructor(props) {
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
          <Step key="basicInfo" title="职业信息"/>
          <Step key="disabledInfo" title="所需能力设定"/>
          <Step key="backgroundInfo" title="检核标准设定"/>
          <Step key="finish" title="完成"/>
        </Steps>
        <div styleName="steps-content">
          {this.state.curStep === 0 &&
          <BasicInfo isCreate={this.props.isCreate}/>}
          {this.state.curStep === 1 &&
          <AbilitySelect isCreate={this.props.isCreate}/>}
          {this.state.curStep === 2 &&
          <AssessScoreSet isCreate={this.props.isCreate}/>}
          {this.state.curStep === 3 &&
          <OccupationInfo isCreate={this.props.isCreate}/>}
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

CreateOccupationSteps.propTypes = {
  isCreate: PropTypes.bool,
  closeCreateModal:PropTypes.func
};

CreateOccupationSteps.defaultProps = {
  isCreate: true,
};

export default CSSModules(CreateOccupationSteps,styles);
