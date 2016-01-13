import Dropdown from '../components/Dropdown'
import ConditionButton from '../components/ConditionButton'
import RuleBuilder from './RuleBuilder'
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import * as SegmentBuilderActions from '../actions/segmentbuilder'
import { bindActionCreators } from 'redux'


function mapStateToProps(state) {

    return {
        ruleGroups: state.RuleGroups,
        ruleTypes: state.ruleTypes
    };
}


function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(SegmentBuilderActions, dispatch)
    }
}


class SegmentBuilder extends Component {

    render() {

        const { ruleGroups, actions, ruleTypes } = this.props;

        return (

            <section className="container">

                {
                    ruleGroups.map((group, groupIndex) =>
                    {
                       return (
                            <div key={'groupIndex'+groupIndex} className="segment-container">
                                <div className="segment-group"> {

                                group.Rules.map((rule) =>

                                    <RuleBuilder key={rule.id} rule={rule} />

                                )
                            }
                                </div>
                                    <ConditionButton text="And" isHidden={group.Rules.length === 0} isDisabled={groupIndex !== ruleGroups.length - 1} handleClick={() => actions.addRuleGroup(groupIndex)} />
                            </div>
                        )
                    }
                )}

               <Dropdown items={ruleTypes} selectedId={ruleTypes[0].id} handleSelectionChanged={ (ruleType) => actions.addInitialRuleForGroup(ruleType.id, ruleGroups.length - 1) } isHidden = {ruleGroups[ruleGroups.length - 1].Rules.length !== 0} />


            </section>
        )
    }
}

SegmentBuilder.propTypes = {
    ruleGroups: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(SegmentBuilder);
