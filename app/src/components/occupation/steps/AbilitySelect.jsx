import React from 'react';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';
import styles from '../Occupation.scss';
import {
  Form,
  Card,
  Checkbox,
  Tooltip,
  Row,
  Col,
  Collapse,
} from 'antd';

const FormItem = Form.Item;
const CheckboxGroup = Checkbox.Group;
const Panel = Collapse.Panel;
const AbilitySelect = ({}) => {
  const options = [
    {label: '需自行处理交通问题', value: 'traffic'},
    {label: '需自行处理吃饭问题', value: 'eat'},
    {label: '需自行处理住宿问题', value: 'lodge'},
  ];
  const ary = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  return (
    <Row styleName="ability-sel">
      <Col span={14}>
        <CheckboxGroup style={{float: 'left'}}>
          <Tooltip
            placement="bottom"
            title={
              <span>
                  选择此项时，以下为必要能力:<br/>C22
                </span>
            }
          >
            <Checkbox value="deal_traffic_by_oneself">需自行处理交通问题</Checkbox>
          </Tooltip>
          <Tooltip
            placement="bottom"
            title={
              <span>
                  选择此项时，以下为必要能力:<br/>C1.C16.C17.C18
                </span>
            }
          >
            <Checkbox value="deal_eat_by_oneself">需自行处理吃饭问题</Checkbox>
          </Tooltip>
          <Tooltip
            placement="bottom"
            title={
              <span>
                  选择此项时，以下为必要能力:<br/>C2.C3.C11.C16.C17.C18.C29
                </span>
            }
          >
            <Checkbox value="deal_lodge_by_oneself">需自行处理住宿问题</Checkbox>
          </Tooltip>
        </CheckboxGroup>
        <Collapse defaultActiveKey={['1001']}>
          <Panel header="工作人格领域" key="1001">
            <ul styleName="options-items">
              {
                ary.map((val) => <li key={'1-'+val} title={'测试'}>测试{val}</li>)
              }
            </ul>
          </Panel>
          <Panel header="职业能力领域" key="1002">
            <ul styleName="options-items">
              {
                ary.map((val) => <li key={'2-'+val}>测试{val}</li>)
              }
            </ul>
          </Panel>
          <Panel header="社区独立能力领域" key="1003">
            <ul styleName="options-items">
              {
                ary.map((val) => <li key={'3-'+val}>测试{val}</li>)
              }
            </ul>
          </Panel>
        </Collapse>
      </Col>
      <Col span={10} styleName="selected">
        <Card
          title={
            <span>
              已选(<span styleName="necessary">必要</span>)技能):
            </span>
          }
          bordered={false}
          noHovering="false"
        >
          <ul styleName="selected-items">
            <li title="a10">
              <div>出席测试测试</div>
              <span/>
            </li>
          </ul>
        </Card>
        <Card
          title={
            <span>
              已选(<span styleName="secondary">次要</span>)技能:
            </span>
          }
          bordered={false}
          noHovering="false"
        >
          <ul styleName="selected-items">
            <li title="a10">
              <div>出席</div>
              <span/>
            </li>
            <li title="a10">
              <div>出席测试测试</div>
              <span/>
            </li>
          </ul>
        </Card>
      </Col>
    </Row>
  );
};
AbilitySelect.PropTypes = {};
AbilitySelect.defaultProps = {};
export default CSSModules(AbilitySelect, styles);
