const sessionStoragePlugin = store => {
    store.subscribe((mutation, state) => {
      // Assuming the mutation for setting the token is named 'SET_TOKEN'
      if (mutation.type === 'setUserToken') {
        sessionStorage.setItem('userToken', state.userToken);
      }
    });
  };
  
export default sessionStoragePlugin;