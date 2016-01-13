import Textbox from '../components/Textbox'
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import * as SegmentBuilderActions from '../actions/segmentbuilder'
import { bindActionCreators } from 'redux'


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


class ValueControl extends Component {

    render() {

        const { rule, ruleTypes, ruleQualifiersForType, actions, valueControlType } = this.props;

        return (
                <span>
                    <Textbox value={rule.ruleCriteria} handleChange={(ruleCriteria) => actions.setRuleQualifier(rule.id, ruleCriteria.Id, 0) } isHidden={ valueControlType !== 'textField'} />
                    <input type="search" placeholder="I am a search!!!" hidden={ valueControlType !== 'vicinitySelector'} />
                </span>    
        )
    }
}

ValueControl.propTypes = {
    rule: PropTypes.shape({
        ruleTypeId: PropTypes.string.isRequired,
        ruleQualifierId: PropTypes.string,
        ruleCriteria: PropTypes.any
    }).isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(ValueControl);
