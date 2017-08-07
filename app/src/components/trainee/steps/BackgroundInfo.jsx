import React from 'react';
import PropTypes from 'prop-types';
import {
  Form,
  Input,
  DatePicker,
  Radio,
  Col,
  Row,
  Select,
  Switch,
  Card,
} from 'antd';
import CSSModules from 'react-css-modules';
import styles from '../Trainee.scss';

const FormItem = Form.Item;
const TextArea = Input.TextArea;
const Option = Select.Option;

class BackgroundInfo extends React.Component {
  state = {
    haveTrained: false,
    isWorked: false,
  };

  changeHaveTrained(checked) {
    this.setState({ haveTrained: checked });
  }

  changeIsWorked(checked) {
    this.setState({ isWorked: checked });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form layout="horizontal" styleName="form-card">
        <Card title="教育经历" bordered={false} noHovering="false">
          <FormItem
            label="教育程度"
            hasFeedback
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 6 }}
          >
            {getFieldDecorator('degree', {
              rules: [
                {
                  required: true,
                  message: '请选择教育程度',
                },
              ],
            })(<Select placeholder="请选择教育程度" />)}
          </FormItem>
          <FormItem
            label="教育水平"
            hasFeedback
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 6 }}
          >
            {getFieldDecorator('education_level', {
              rules: [
                {
                  required: true,
                  message: '请选择教育水平',
                },
              ],
            })(<Select placeholder="请选择教育水平" />)}
          </FormItem>
          <FormItem label="是否接收过职业训练" labelCol={{ span: 6 }}>
            <Switch
              defaultChecked={false}
              key="have_trained"
              onChange={checked => this.changeHaveTrained(checked)}
            />
          </FormItem>
          {this.state.haveTrained &&
            <FormItem
              label="职业训练说明"
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 12 }}
            >
              {getFieldDecorator('trained_intro', {})(
                <TextArea
                  placeholder="请填写职业训练说明"
                  autosize={{ minRows: 2, maxRows: 3 }}
                />,
              )}
            </FormItem>}
        </Card>
        <Card title="工作经历" bordered={false} noHovering="false">
          <FormItem label="是否有工作经验" labelCol={{ span: 6 }}>
            <Switch
              defaultChecked={false}
              key="is_worked"
              onChange={checked => this.changeIsWorked(checked)}
            />
          </FormItem>
          {this.state.isWorked &&
            <FormItem
              label="工作经验描述"
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 12 }}
            >
              {getFieldDecorator('worked_intro', {})(
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
            {getFieldDecorator('expect_work', {})(
              <TextArea
                placeholder="请填写期望从事的工作"
                autosize={{ minRows: 2, maxRows: 3 }}
              />,
            )}
          </FormItem>
        </Card>
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
                  rules: [
                    {
                      required: true,
                      message: '请输入父亲姓名',
                    },
                  ],
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
                {getFieldDecorator('father_degree', {})(
                  <Select placeholder="请选择教育程度" />,
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
                {getFieldDecorator('father_job', {})(
                  <Select placeholder="请选择父亲职业" />,
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
                  rules: [
                    {
                      required: true,
                      message: '请输入母亲姓名',
                    },
                  ],
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
                {getFieldDecorator('mother_degree', {})(
                  <Select placeholder="请选择教育程度" />,
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
                {getFieldDecorator('mother_job', {})(
                  <Select placeholder="请选择母亲职业" />,
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
                {getFieldDecorator('parent_expect', {})(
                  <TextArea
                    placeholder="请填写父母期望"
                    autosize={{ minRows: 2, maxRows: 3 }}
                  />,
                )}
              </FormItem>
            </Col>
          </Row>
        </Card>
      </Form>
    );
  }
}

BackgroundInfo.propTypes = {};

export default Form.create()(CSSModules(BackgroundInfo, styles));
