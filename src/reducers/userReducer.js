let initialState = {
    token : null,
    isDeck: []
}



export default (state = initialState, action) => {
    switch (action.type) {
        case 'STORE_TOKEN':
            return {
                ...state,
                token: action.token
            }
        default:
            return state;


        case 'DECK_ENTRY':
            return {
                ...state,
                isDeck: action.isDeck
            }

    }
}