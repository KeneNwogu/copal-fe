import { defineStore } from 'pinia'

interface User {
    id: string
    firstName: string
    lastName: string
    email: string
    profilePicture: string
}

interface UserState {
    user: User | null
    token: string | null
}

export const useUserStore = defineStore('user', {
    persist: true,
    state: (): UserState => ({
        user: null,
        token: null
    }),

    getters: {
        isAuthenticated: (state) => !!state.token,
        fullName: (state) => state.user ? `${state.user.firstName} ${state.user.lastName}` : ''
    },

    actions: {
        setUser(user: User) {
            this.user = user
        },
        setToken(token: string) {
            this.token = token
        },
        clearUserData() {
            this.user = null
            this.token = null
        }
    }
})