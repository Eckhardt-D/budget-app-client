export default function ({ $axios, store }) {
  $axios.onRequest(config => {
    config.headers.common['x-access-token'] = store.state.token;
  })
}