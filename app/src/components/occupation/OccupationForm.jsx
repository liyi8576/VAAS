import React from 'react';
import PropTypes from 'prop-types';
import {
  Form,
  Input,
  Col,
  Row,
  Select,
  Card,
  Checkbox,
  Table,
  Button,
} from 'antd';
import CSSModules from 'react-css-modules';
import styles from './Occupation.scss';

const FormItem = Form.Item;
const TextArea = Input.TextArea;
const Option = Select.Option;
const CheckboxGroup = Checkbox.Group;
class OccupationForm extends React.Component {
  render() {
    const { getFieldDecorator } = this.props.form;
    const options = [
      { label: '需自行处理交通问题', value: 'traffic' },
      { label: '需自行处理吃饭问题', value: 'eat' },
      { label: '需自行处理住宿问题', value: 'lodge' },
    ];
    const columns = [
      {
        title: '能力编号',
        dataIndex: 'id',
        key: 'id',
        width: '25%',
      },
      { title: '能力', dataIndex: 'ability', key: 'ability', width: '45%' },
      {
        title: '检核标准',
        dataIndex: 'criterion_score',
        key: 'criterion_score',
        width: '30%',
      },
    ];
    return (
      <Form layout="horizontal" styleName="form">
        <FormItem
          label="职业名称"
          hasFeedback
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 10 }}
        >
          {getFieldDecorator('name', {
            rules: [
              {
                required: true,
                message: '请输入职业名称',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="职业描述" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
          {getFieldDecorator('description', {})(
            <TextArea
              placeholder="请填写职业描述"
              autosize={{ minRows: 2, maxRows: 3 }}
            />,
          )}
        </FormItem>
        <Card
          title={<span>职业所需<span styleName="necessary">必要</span>能力</span>}
          extra={<a href="#">添加必要能力</a>}
          bordered
          noHovering="false"
        >
          <FormItem wrapperCol={{ span: 24 }}>
            {getFieldDecorator('require', {})(
              <CheckboxGroup options={options} />,
            )}
          </FormItem>
          <Table
            bordered={false}
            simple
            rowKey={record => record.id}
            columns={columns}
          />
        </Card>
        <Card
          title={<span>职业所需<span styleName="secondary">次要</span>能力</span>}
          extra={<a href="#">添加次要能力</a>}
          bordered
          noHovering="false"
        >
          <Table
            bordered={false}
            simple
            rowKey={record => record.id}
            columns={columns}
          />
        </Card>
      </Form>
    );
  }
}

OccupationForm.propTypes = {
  isCreate: PropTypes.func,
};

export default Form.create()(CSSModules(OccupationForm, styles));
