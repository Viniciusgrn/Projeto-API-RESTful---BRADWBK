import { defineStore } from 'pinia'

interface UserState {
  name: string
  loggedIn: boolean
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    name: '',
    loggedIn: false
  }),
  actions: {
    login(name: string) {
      this.name = name
      this.loggedIn = true
    },
    logout() {
      this.name = ''
      this.loggedIn = false
    }
  }
})
