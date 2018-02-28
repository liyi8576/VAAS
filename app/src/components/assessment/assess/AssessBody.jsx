import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';
import { Card, message } from 'antd';
import _ from 'lodash';
import AssessFooter from 'components/assessment/assess/AssessFooter';
import AssessSelector from 'components/assessment/selector/AssessSelector';
import AssessmentItemPage from 'containers/assessment/AssessmentItemPage';
import styles from 'style/Assessment.scss';

class AssessBody extends Component {
  static contextTypes = {
    router: PropTypes.object,
  };
  constructor(props, context) {
    super(props, context);
    this.state = {
      navSkip: true,
      autoNav: true,
      assessItem: null,
      assessResult: {},
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.isLoading === false) {
      if (nextProps.abilities !== this.props.abilities) {
        const unAssessItems = _.difference(
          Object.keys(nextProps.abilities),
          Object.keys(nextProps.assessResult)
        );
        this.setState({
          assessResult: nextProps.assessResult || {},
          assessItem: unAssessItems[0] || null,
        });
      }
    }
  }
  /**
   * 根据检核结果，补充能力项字典中能力项的检核结果属性
   * @return {Object}
   */
  fillAssessResult = () => {
    const assessResult = this.state.assessResult || {};
    return _.mapValues(this.props.abilities, function(item) {
      item['assessResult'] = assessResult && assessResult[item.id];
      return item;
    });
  };

  changeAssessItem = abilityId => {
    this.setState({
      assessItem: abilityId,
    });
  };
  getNavItems = () => {
    let assessAry = [];
    if (this.state.navSkip) {
      assessAry = _.difference(
        Object.keys(this.props.abilities || {}),
        Object.keys(this.state.assessResult || {})
      );
    } else {
      assessAry = Object.keys(this.props.abilities || {});
    }
    const index = _.indexOf(assessAry, this.state.assessItem);
    return {
      prev: index === 0 ? null : assessAry[index - 1],
      next: assessAry.length === index + 1 ? null : assessAry[index + 1],
    };
  };
  setSwitch = (type, val) => {
    this.setState({
      [type]: val,
    });
  };
  navAssessItem = itemId => {
    if (!itemId) return;
    if (this.state.autoNav === true && this.state.assessResult[this.state.assessItem]) {
      this.props.onSaveAssess(
        this.state.assessItem,
        this.state.assessResult[this.state.assessItem],
        this.getSaveCallback(itemId)
      );
    } else {
      this.setState({ assessItem: itemId });
    }
  };
  assessCheck = (abilityId, option) => {
    this.setState({
      assessResult: Object.assign({}, this.state.assessResult, { [abilityId]: option }),
    });
  };
  getSaveCallback = itemId => {
    const self = this;
    return function(flag, errorMsg) {
      if (flag === true) {
        self.setState({ assessItem: itemId });
      } else {
        message.error('保存评定结果出错! 错误信息：' + errorMsg);
      }
    };
  };
  backListPage = () => {
    this.context.router.history.push('/assessment');
  };
  render() {
    const abilities = this.fillAssessResult();
    const navItems = this.props.isLoading === false && this.getNavItems();
    return (
      <div>
        <Card
          title={null}
          styleName={'asm-content'}
          bordered={false}
          noHovering="false"
          loading={this.props.isLoading}
          bodyStyle={{ padding: '0', minHeight: '300px' }}
        >
          {this.props.isLoading === false && (
            <AssessSelector
              domains={this.props.domain}
              abilities={abilities}
              assessItem={this.state.assessItem}
              setSwitch={this.setSwitch}
              changeAssessItem={this.changeAssessItem}
            />
          )}
          {this.props.isLoading === false && (
            <AssessmentItemPage
              abilityId={this.state.assessItem}
              accessOption={this.state.assessResult[this.state.assessItem] || null}
              onAssessCheck={this.assessCheck}
            />
          )}
        </Card>
        {this.props.isLoading === false ? (
          <AssessFooter
            loading={false}
            prevItem={navItems.prev}
            nextItem={navItems.next}
            handleNav={this.navAssessItem}
            handleBack={this.backListPage}
            saving={this.props.saving}
          />
        ) : (
          <AssessFooter loading />
        )}
      </div>
    );
  }
}
AssessBody.propTypes = {
  isLoading: PropTypes.bool, //是否加载完毕
  saving: PropTypes.bool,
  abilities: PropTypes.object, //检核能力项字典
  domain: PropTypes.object, //检核能力领域字典
  assessResult: PropTypes.object, //检核结果
  traineeId: PropTypes.string, //检核学员编码
  onSaveAssess: PropTypes.func,
};
export default CSSModules(AssessBody, styles);
