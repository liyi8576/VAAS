import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Col, Row, Select, Switch, Card } from 'antd';
import CSSModules from 'react-css-modules';
import styles from '../Trainee.scss';

const FormItem = Form.Item;
const TextArea = Input.TextArea;
const Option = Select.Option;

class BackgroundInfo extends Component {
  constructor() {
    super();
    this.state = {
      haveTrained: false,
      isWorked: false,
    };
  }
  componentWillMount() {
    if (this.props.trainee) {
      this.setState({ haveTrained: this.props.trainee.haveTrained === 1 });
      this.setState({ isWorked: this.props.trainee.isWorked === 1 });
    }
  }

  componentDidMount() {
    this.props.setValidateFunc(() => {
      let fieldVals = null;
      this.props.form.validateFields(
        null,
        { first: true, force: true },
        (errors, values) => {
          if (errors === null) {
            fieldVals = values;
          }
        },
      );
      const { haveTrained, isWorked } = fieldVals;
      haveTrained && (fieldVals.haveTrained = haveTrained ? 1 : -1);
      isWorked && (fieldVals.isWorked = isWorked ? 1 : -1);
      return fieldVals;
    });
    this.props.setGetFieldValuesFunc(() => {
      const fieldVals = this.props.form.getFieldsValue();
      const { haveTrained, isWorked } = fieldVals;
      haveTrained && (fieldVals.haveTrained = haveTrained ? 1 : -1);
      isWorked && (fieldVals.isWorked = isWorked ? 1 : -1);
      return fieldVals;
    });
  }

  switchHaveTrained = checked => {
    this.setState({ haveTrained: checked });
  };

  switchIsWorked = checked => {
    this.setState({ isWorked: checked });
  };

  render_edu_his(getFieldDecorator) {
    return (
      <Card title="教育经历" bordered={false} noHovering="false">
        <FormItem
          label="教育程度"
          hasFeedback
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 6 }}
        >
          {getFieldDecorator('degree', {
            initialValue: this.props.trainee.degree,
            rules: [{ required: true, message: '请选择教育程度' }],
          })(
            <Select placeholder="请选择教育程度">
              {this.props.degreeTypeDic.map(dic =>
                <Option value={dic.value} key={`detd-${dic.value}`}>
                  {dic.name}
                </Option>,
              )}
            </Select>,
          )}
        </FormItem>
        <FormItem
          label="教育水平"
          hasFeedback
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 6 }}
        >
          {getFieldDecorator('educationLevel', {
            initialValue: this.props.trainee.educationLevel,
            rules: [{ required: true, message: '请选择教育水平' }],
          })(
            <Select placeholder="请选择教育水平">
              {this.props.educationLevelDic.map(dic =>
                <Option value={dic.value} key={`eld-${dic.value}`}>
                  {dic.name}
                </Option>,
              )}
            </Select>,
          )}
        </FormItem>
        <FormItem label="是否接收过职业训练" labelCol={{ span: 6 }}>
          {getFieldDecorator('haveTrained', {
            valuePropName: 'checked',
            initialValue: this.props.trainee.haveTrained === 1,
          })(<Switch onChange={this.switchHaveTrained} />)}
        </FormItem>
        {this.state.haveTrained &&
          <FormItem
            label="职业训练说明"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 12 }}
          >
            {getFieldDecorator('trainedIntro', {
              initialValue: this.props.trainee.trainedIntro,
            })(
              <TextArea
                placeholder="请填写职业训练说明"
                autosize={{ minRows: 2, maxRows: 3 }}
              />,
            )}
          </FormItem>}
      </Card>
    );
  }
  render_job_his(getFieldDecorator) {
    return (
      <Card title="工作经历" bordered={false} noHovering="false">
        <FormItem label="是否有工作经验" labelCol={{ span: 6 }}>
          {getFieldDecorator('isWorked', {
            valuePropName: 'checked',
            initialValue: this.props.trainee.isWorked === 1,
          })(<Switch onChange={this.switchIsWorked} />)}
        </FormItem>
        {this.state.isWorked &&
          <FormItem
            label="工作经验描述"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 12 }}
          >
            {getFieldDecorator('workedIntro', {
              initialValue: this.props.trainee.workedIntro,
            })(
              <TextArea
                placeholder="请填写工作经验描述"
                autosize={{ minRows: 2, maxRows: 3 }}
              />,
            )}
          </FormItem>}
        <FormItem
          label="期望从事的工作"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 12 }}
        >
          {getFieldDecorator('expectWork', {
            initialValue: this.props.trainee.expectWork,
          })(
            <TextArea
              placeholder="请填写期望从事的工作"
              autosize={{ minRows: 2, maxRows: 3 }}
            />,
          )}
        </FormItem>
      </Card>
    );
  }
  render_home_env(getFieldDecorator) {
    return (
      <Card title="家庭背景" bordered={false} noHovering="false">
        <Row>
          <Col span={8}>
            <FormItem
              label="父  亲"
              hasFeedback
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 14 }}
            >
              {getFieldDecorator('father', {
                initialValue: this.props.trainee.father,
              })(<Input />)}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem
              label="教育程度"
              hasFeedback
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 14 }}
            >
              {getFieldDecorator('fatherDegree', {
                initialValue: this.props.trainee.fatherDegree,
              })(
                <Select placeholder="请选择教育程度">
                  {this.props.degreeTypeDic.map(dic =>
                    <Option value={dic.value} key={`fdetd-${dic.value}`}>
                      {dic.name}
                    </Option>,
                  )}
                </Select>,
              )}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem
              label="职业"
              hasFeedback
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 14 }}
            >
              {getFieldDecorator('fatherJob', {
                initialValue: this.props.trainee.fatherJob,
              })(
                <Select placeholder="请选择父亲职业">
                  {this.props.jobTypeDic.map(dic =>
                    <Option value={dic.value} key={`fjtd-${dic.value}`}>
                      {dic.name}
                    </Option>,
                  )}
                </Select>,
              )}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={8}>
            <FormItem
              label="母  亲"
              hasFeedback
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 14 }}
            >
              {getFieldDecorator('mother', {
                initialValue: this.props.trainee.mother,
              })(<Input />)}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem
              label="教育程度"
              hasFeedback
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 14 }}
            >
              {getFieldDecorator('motherDegree', {
                initialValue: this.props.trainee.motherDegree,
              })(
                <Select placeholder="请选择教育程度">
                  {this.props.degreeTypeDic.map(dic =>
                    <Option value={dic.value} key={`mdetd-${dic.value}`}>
                      {dic.name}
                    </Option>,
                  )}
                </Select>,
              )}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem
              label="职业"
              hasFeedback
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 14 }}
            >
              {getFieldDecorator('motherJob', {
                initialValue: this.props.trainee.motherJob,
              })(
                <Select placeholder="请选择母亲职业">
                  {this.props.jobTypeDic.map(dic =>
                    <Option value={dic.value} key={`fjtd-${dic.value}`}>
                      {dic.name}
                    </Option>,
                  )}
                </Select>,
              )}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <FormItem
              label="父母期望"
              labelCol={{ span: 3 }}
              wrapperCol={{ span: 13 }}
            >
              {getFieldDecorator('parentExpect', {
                initialValue: this.props.trainee.parentExpect,
              })(
                <TextArea
                  placeholder="请填写父母期望"
                  autosize={{ minRows: 2, maxRows: 3 }}
                />,
              )}
            </FormItem>
          </Col>
        </Row>
      </Card>
    );
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form layout="horizontal" styleName="form-card">
        {this.render_edu_his(getFieldDecorator)}
        {this.render_job_his(getFieldDecorator)}
        {this.render_home_env(getFieldDecorator)}
      </Form>
    );
  }
}

BackgroundInfo.propTypes = {
  trainee: PropTypes.object,
  setValidateFunc: PropTypes.func,
  setGetFieldValuesFunc: PropTypes.func,
  degreeTypeDic: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      code: PropTypes.string,
    }),
  ),
  educationLevelDic: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      code: PropTypes.string,
    }),
  ),
  jobTypeDic: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      code: PropTypes.string,
    }),
  ),
};

export default Form.create()(CSSModules(BackgroundInfo, styles));
