export const initialState = {

    ruleTypes: [
        { id: 'default', name: 'Define a rule based on...', isDisabled: true, isDefault: true},
        { id: 'email', name: 'Email Address'},
        { id: 'location', name: 'Location'}
    ],
    ruleQualifiersForType: {
        'email': [
            { id: 'contains', name: 'contains', isDefault: true, valueControlType: 'textField'},
            { id: 'DoesNotContain', name: 'does not contain' , valueControlType: 'textField'} ,
            { id: 'MatchesExactly', name: 'matches exactly', valueControlType: 'textField'},
            { id: 'DoesNotMatchExactly', name: 'does not match exactly', valueControlType: 'textField'},
            { id: 'StartsWith', name: 'starts with' , valueControlType: 'textField'} ,
            { id: 'DoesNotStartWith', name: 'does not start with', valueControlType: 'textField'},
            { id: 'EndsWith', name: 'ends with', valueControlType: 'textField' },
            { id: 'DoesNotEndWith', name: 'does not end with', valueControlType: 'textField' }
        ],
        'location': [
            { id: "IsKnown", name: "is known", isDefault: true, valueControlType: 'none' },
            { id: "IsNotKnown", name: "is not known", valueControlType: 'none' },
            { id: "IsNear", name: "is near", valueControlType: 'vicinitySelector' },
            { id: "IsIn", name: "is in", valueControlType: 'vicinitySelector' },
            { id: "IsNotIn", name: "is not in", valueControlType: 'vicinitySelector' }
        ]
    },
    rules: []
}