export function storeToken (token){
    return{
        type : 'STORE_TOKEN',
        token
    }
}

export function deckentry (isDeck){
    return{
        type: 'DECK_ENTRY',
        isDeck
    }
}