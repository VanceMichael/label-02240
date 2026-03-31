import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useUserStore = defineStore('user-store', () => {
  const currentUser = ref(null)

  const isLoggedIn = computed(() => !!currentUser.value)

  // 模拟用户数据库（LocalStorage 持久化）
  const getUsers = () => {
    return JSON.parse(localStorage.getItem('gv_users') || '[]')
  }

  const saveUsers = (users) => {
    localStorage.setItem('gv_users', JSON.stringify(users))
  }

  const register = (username, password, phone) => {
    const users = getUsers()
    if (users.find(u => u.username === username)) {
      throw new Error('用户名已存在')
    }
    const newUser = {
      id: 'u_' + Date.now(),
      username,
      password,
      phone,
      avatar: '',
      createdAt: new Date().toISOString()
    }
    users.push(newUser)
    saveUsers(users)
    const { password: _, ...safeUser } = newUser
    currentUser.value = safeUser
    return safeUser
  }

  const login = (username, password) => {
    const users = getUsers()
    const user = users.find(u => u.username === username && u.password === password)
    if (!user) {
      throw new Error('用户名或密码错误')
    }
    const { password: _, ...safeUser } = user
    currentUser.value = safeUser
    return safeUser
  }

  const logout = () => {
    currentUser.value = null
  }

  const updateProfile = (data) => {
    if (!currentUser.value) return
    const users = getUsers()
    const idx = users.findIndex(u => u.id === currentUser.value.id)
    if (idx !== -1) {
      users[idx] = { ...users[idx], ...data }
      saveUsers(users)
      const { password: _, ...safeUser } = users[idx]
      currentUser.value = safeUser
    }
  }

  return { currentUser, isLoggedIn, register, login, logout, updateProfile }
}, {
  persist: true
})
