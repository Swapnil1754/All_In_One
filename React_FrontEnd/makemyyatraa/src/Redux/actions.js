export const updateLoginToken = (newValue) => ({
    type: 'UPDATE_LOGIN_TOKEN',
    payload: newValue,
});
export const updateIsOwner = (newValue) => ({
    type: 'UPDATE_IS_OWNER',
    payload: newValue,
});