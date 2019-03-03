import Pusher from "pusher-js"

export default function() {
  // const token = store.getters['auth/token'];
  // const token = app.$auth.getToken(storategy);

  window.Pusher = new Pusher("7c7e8a09165d3cfe3468", { cluster: "ap1" })
}
