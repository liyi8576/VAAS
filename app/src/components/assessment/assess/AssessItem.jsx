import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, Alert } from 'antd';
import AssessItemOption from './AssessItemOption';
import CSSModules from 'react-css-modules';
import styles from 'style/Assessment.scss';

/**
 * 检核项组件
 */
class AssessItem extends Component {
  constructor(props) {
    super();
    this.state = {
      selectOption: null,
    };
  }
  componentDidMount() {
    this.setState({
      selectOption: this.props.accessOption || null,
    });
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.selectOption !== this.props.accessOption) {
      this.setState({
        selectOption: nextProps.accessOption || null,
      });
    }
  }
  selectOption = option => {
    this.setState({
      selectOption: option,
    });
    this.props.onChecked(option);
  };
  render() {
    let { abilityDetail, loading } = this.props;
    abilityDetail = abilityDetail || {};
    return (
      <Card
        title={null}
        bordered={false}
        noHovering="false"
        loading={loading}
        bodyStyle={{ padding: '0', minHeight: '300px' }}
      >
        <Alert message={abilityDetail.description} type="info" showIcon />
        <h4>检核方式: {abilityDetail.assessMethod}</h4>
        <div styleName={'asm-options-box'}>
          {abilityDetail.optionA && (
            <AssessItemOption
              option="A"
              checked={'A' === (this.state.selectOption || '')}
              content={abilityDetail.optionA}
              onSelect={this.selectOption}
            />
          )}
          {abilityDetail.optionB && (
            <AssessItemOption
              option="B"
              checked={'B' === (this.state.selectOption || '')}
              content={abilityDetail.optionB}
              onSelect={this.selectOption}
            />
          )}
          {abilityDetail.optionC && (
            <AssessItemOption
              option="C"
              checked={'C' === (this.state.selectOption || '')}
              content={abilityDetail.optionC}
              onSelect={this.selectOption}
            />
          )}
          {abilityDetail.optionD && (
            <AssessItemOption
              option="D"
              checked={'D' === (this.state.selectOption || '')}
              content={abilityDetail.optionD}
              onSelect={this.selectOption}
            />
          )}
        </div>
      </Card>
    );
  }
}

AssessItem.propTypes = {
  loading: PropTypes.bool,
  abilityDetail: PropTypes.shape({
    description: PropTypes.string,
    assessMethod: PropTypes.string,
    optionA: PropTypes.string,
    optionB: PropTypes.string,
    optionC: PropTypes.string,
    optionD: PropTypes.string,
  }),
  accessOption: PropTypes.string,
  onChecked: PropTypes.func,
};
export default CSSModules(AssessItem, styles);
