export const state = () => ({
    errors: {}
})

// getters
export  const getters = {
    errors(state) {
        return state.errors
    }
}

// mutators
export const mutations = {
    SET_VALIDATOIN_ERRORS(state, errors) {
        state.errors = errors
    }
}

// actions
export const actions = {
    setErrors({commit}, errors) {
        commit("SET_VALIDATOIN_ERRORS", errors)
    },
    clearErrors({commit}) {
        commit("SET_VALIDATOIN_ERRORS", {})
    }
}