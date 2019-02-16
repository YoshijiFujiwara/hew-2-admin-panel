export default function({ $axios, store }) {
    // エラーハンドリング
    $axios.onError(error => {
        const code = parseInt(error.response && error.response.status)
        
        // console.log('SSSSSSSSS')
        // console.log(error.response.data)
        if (code > 299) {
            store.dispatch('validation/setErrors', error.response.data.error);
        }
        return Promise.reject(error);
    });

    $axios.onRequest(() => {
        store.dispatch('validation/clearErrors');
    });
}