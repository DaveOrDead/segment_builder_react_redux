import Button from '../components/Button'
import Dropdown from '../components/Dropdown'
import Textbox from '../components/Textbox'
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import * as SegmentBuilderActions from '../actions/segmentbuilder'
import { bindActionCreators } from 'redux'

class RuleBuilder extends Component {
    render() {

        const { ruleKey, rule, ruleTypes, ruleQualifiersForType, dispatch, actions } = this.props;

        return (
            <section>
                <Dropdown items={ruleTypes} selectedId={rule.ruleTypeId} handleSelectionChanged={ (ruleType) => actions.setRuleType(ruleKey, ruleType.Id) } />

                <Dropdown items={ruleQualifiersForType[rule.ruleTypeId]} selectedId={rule.ruleQualifierId} handleSelectionChanged={ (ruleQualifier) => actions.setRuleQualifier(ruleKey, ruleQualifier.Id) } />

               <Textbox value={rule.ruleCriteria} handleChange={(ruleCriteria) => actions.setRuleQualifier(ruleKey, ruleCriteria.Id) } />

                <Button text="Remove" handleClick={() => actions.removeRule(key)} />

            </section>
        )
    }
}

RuleBuilder.propTypes = {
    ruleKey: PropTypes.string.isRequired,
    rule: PropTypes.shape({
    ruleTypeId: PropTypes.string.isRequired,
    ruleQualifierId: PropTypes.string.isRequired,
    ruleCriteria: PropTypes.any.isRequired
    }).isRequired
};

function mapStateToProps(state) {
    return {
        ruleTypes: state.ruleTypes,
        ruleQualifiersForType: state.ruleQualifiersForType
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(SegmentBuilderActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RuleBuilder);
