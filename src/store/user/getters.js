export default {
  loggedIn(state) {
    return state.isLoggedIn;
  },
  userDetails(state) {
    return state.userDetails;
  },
  userId(state) {
    return state.userDetails.id;
  }
};