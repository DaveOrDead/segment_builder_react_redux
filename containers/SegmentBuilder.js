import Dropdown from '../components/Dropdown'
import Button from '../components/Button'
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
        let element;

        if(ruleGroups.length == 1 && ruleGroups[0].Rules.length === 0) {

            element = (
                <Dropdown items={ruleTypes} defaultValue={ruleTypes[0].id} handleSelectionChanged={ (ruleType) => actions.addInitialRule(ruleType.id, 0) } />
                )
            }

        return (

            <section className="container">
                
                {   
                    ruleGroups.map((group) => 
                    {
                       return (
                            <div key={group} className="group-container"> {
                            
                                group.Rules.map((rule) => 
                            
                                    <RuleBuilder key={rule.id} rule={rule} />
                                
                                )
                            }
                            </div>
                        )
                    }
                )}

               { element }


            </section>
        )
    }
}

SegmentBuilder.propTypes = {
    ruleGroups: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(SegmentBuilder);
