export default function ({ store, redirect, route }) {
  
  // If we're trying to login, don't check auth
  if(route.path === '/login') return;

  // Get and set the token
  let token = JSON.parse(localStorage.getItem('budgetToken'))

  // Check token
  if(token) {
    store.commit('SET_TOKEN', token)
  } else {
    store.commit('CHANGE_STATUS', false)
    return redirect('/login')
  }

  // Test if current token is still valid
  fetch('http://localhost:1101/expenses', {headers: { 'x-access-token' : store.state.token }})
  .then(res => {
  
    // Set auth to false 
    if(res.status === 401) {
      store.commit('CHANGE_STATUS', false);
      return redirect('/login');
    }

    // Set auth to true
    store.commit('CHANGE_STATUS', true);
  

  })
  .catch(() => redirect('/login'))

}