export default function({ store }) {
    // vuexのエラーをクリア
    store.dispatch('validation/clearErrors')
}