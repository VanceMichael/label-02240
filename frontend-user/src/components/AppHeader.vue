<template>
  <header class="app-header">
    <div class="header-inner container">
      <router-link to="/" class="logo">
        <div class="logo-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20">
            <polygon points="12,2 22,8.5 22,15.5 12,22 2,15.5 2,8.5" />
            <polygon points="12,6 18,9.5 18,14.5 12,18 6,14.5 6,9.5" />
          </svg>
        </div>
        <span class="logo-text">GAMEVAULT</span>
      </router-link>

      <nav class="nav-links">
        <router-link to="/" class="nav-item" active-class="active" :class="{ active: $route.path === '/' }">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="16" height="16"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/></svg>
          首页
        </router-link>
        <router-link to="/list" class="nav-item" active-class="active">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="16" height="16"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>
          全部账号
        </router-link>
        <router-link to="/publish" class="nav-item" active-class="active">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="16" height="16"><path d="M12 5v14M5 12h14"/></svg>
          发布
        </router-link>
      </nav>

      <div class="header-search">
        <div class="search-wrapper">
          <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
          <input
            v-model="searchKeyword"
            placeholder="搜索游戏账号..."
            @keyup.enter="handleSearch"
          />
        </div>
      </div>

      <div class="header-actions">
        <template v-if="userStore.isLoggedIn">
          <div class="user-menu-wrap" ref="menuWrapRef">
            <div class="user-avatar-btn" @click="toggleMenu">
              <div class="avatar-ring">
                <el-avatar :size="32" :style="{ background: 'linear-gradient(135deg, #00F0FF, #7B61FF)', color: '#0A0E17', fontWeight: 700 }">
                  {{ userStore.currentUser?.username?.charAt(0)?.toUpperCase() }}
                </el-avatar>
              </div>
              <span class="username">{{ userStore.currentUser?.username }}</span>
              <svg class="chevron" :class="{ open: menuVisible }" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><path d="M6 9l6 6 6-6"/></svg>
            </div>

            <Transition name="dropdown">
              <div v-if="menuVisible" class="user-dropdown">
                <div class="dropdown-header">
                  <div class="avatar-ring-sm">
                    <el-avatar :size="36" :style="{ background: 'linear-gradient(135deg, #00F0FF, #7B61FF)', color: '#0A0E17', fontWeight: 700 }">
                      {{ userStore.currentUser?.username?.charAt(0)?.toUpperCase() }}
                    </el-avatar>
                  </div>
                  <div class="dropdown-user-info">
                    <span class="dropdown-username">{{ userStore.currentUser?.username }}</span>
                    <span class="dropdown-role">普通用户</span>
                  </div>
                </div>
                <div class="dropdown-divider"></div>
                <div class="dropdown-item" @click="goTo('/profile')">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="16" height="16"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                  <span>个人中心</span>
                </div>
                <div class="dropdown-item" @click="goTo('/publish')">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="16" height="16"><path d="M12 5v14M5 12h14"/></svg>
                  <span>发布账号</span>
                </div>
                <div class="dropdown-divider"></div>
                <div class="dropdown-item danger" @click="handleLogout">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="16" height="16"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"/></svg>
                  <span>退出登录</span>
                </div>
              </div>
            </Transition>
          </div>
        </template>
        <template v-else>
          <button class="login-btn" @click="$router.push('/login')">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="16" height="16"><path d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4M10 17l5-5-5-5M15 12H3"/></svg>
            登录
          </button>
        </template>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { ElMessage } from 'element-plus'

const router = useRouter()
const userStore = useUserStore()
const searchKeyword = ref('')
const menuVisible = ref(false)
const menuWrapRef = ref(null)

const handleSearch = () => {
  const kw = searchKeyword.value.trim()
  if (!kw) return
  router.push({ name: 'Search', query: { q: kw } })
}

const toggleMenu = () => {
  menuVisible.value = !menuVisible.value
}

const closeMenu = (e) => {
  if (menuWrapRef.value && !menuWrapRef.value.contains(e.target)) {
    menuVisible.value = false
  }
}

const goTo = (path) => {
  menuVisible.value = false
  router.push(path)
}

const handleLogout = () => {
  menuVisible.value = false
  userStore.logout()
  ElMessage.success('已退出登录')
  router.push('/')
}

onMounted(() => {
  document.addEventListener('click', closeMenu)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', closeMenu)
})
</script>

<style lang="scss" scoped>
.app-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  height: 72px;
  width: 100%;
  background: rgba(10, 14, 23, 0.85);
  backdrop-filter: blur(20px) saturate(1.2);
  border-bottom: 1px solid rgba(var(--color-primary-rgb), 0.1);
}

.header-inner {
  height: 100%;
  display: flex;
  align-items: center;
  gap: 28px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  flex-shrink: 0;

  .logo-icon {
    width: 38px;
    height: 38px;
    border-radius: 10px;
    background: linear-gradient(135deg, var(--color-primary), var(--color-primary-light));
    color: #0A0E17;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 0 16px rgba(var(--color-primary-rgb), 0.3);
  }

  .logo-text {
    font-family: var(--font-display);
    font-size: 17px;
    font-weight: 800;
    letter-spacing: 2px;
    background: linear-gradient(135deg, var(--color-primary), var(--color-primary-light));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}

.nav-links {
  display: flex;
  gap: 4px;

  .nav-item {
    padding: 7px 14px;
    border-radius: var(--radius-sm);
    font-size: 13px;
    color: var(--color-text-secondary);
    transition: all 0.25s;
    display: flex;
    align-items: center;
    gap: 6px;

    &:hover {
      color: var(--color-primary);
      background: rgba(var(--color-primary-rgb), 0.08);
    }

    &.active {
      color: var(--color-primary);
      font-weight: 600;
      background: rgba(var(--color-primary-rgb), 0.12);
    }
  }
}

.header-search {
  flex: 1;
  max-width: 320px;

  .search-wrapper {
    position: relative;
    display: flex;
    align-items: center;

    .search-icon {
      position: absolute;
      left: 14px;
      color: var(--color-text-muted);
      pointer-events: none;
    }

    input {
      width: 100%;
      height: 38px;
      padding: 0 16px 0 40px;
      border: 1px solid var(--color-border);
      border-radius: 20px;
      background: rgba(var(--color-primary-rgb), 0.04);
      color: var(--color-text);
      font-size: 13px;
      font-family: var(--font-body);
      outline: none;
      transition: all 0.3s;

      &::placeholder { color: var(--color-text-muted); }

      &:focus {
        border-color: rgba(var(--color-primary-rgb), 0.4);
        background: rgba(var(--color-primary-rgb), 0.06);
        box-shadow: 0 0 16px rgba(var(--color-primary-rgb), 0.1);
      }
    }
  }
}

.header-actions {
  flex-shrink: 0;
}

.login-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 20px;
  border: 1px solid var(--color-primary);
  border-radius: var(--radius-sm);
  background: transparent;
  color: var(--color-primary);
  font-size: 13px;
  font-weight: 600;
  font-family: var(--font-body);
  cursor: pointer;
  transition: all 0.25s;

  &:hover {
    background: rgba(var(--color-primary-rgb), 0.1);
    box-shadow: 0 0 16px rgba(var(--color-primary-rgb), 0.2);
  }
}

// 自定义用户菜单
.user-menu-wrap {
  position: relative;
}

.user-avatar-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: var(--radius-sm);
  transition: background 0.25s;
  user-select: none;

  &:hover {
    background: rgba(var(--color-primary-rgb), 0.08);
  }

  .avatar-ring {
    padding: 2px;
    border-radius: 50%;
    background: linear-gradient(135deg, var(--color-primary), var(--color-primary-light));
  }

  .username {
    font-size: 13px;
    font-weight: 500;
    color: var(--color-text);
  }

  .chevron {
    color: var(--color-text-muted);
    transition: transform 0.25s;

    &.open {
      transform: rotate(180deg);
    }
  }
}

.user-dropdown {
  position: absolute;
  top: calc(100% + 10px);
  right: 0;
  width: 220px;
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-md);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.5);
  padding: 8px;
  z-index: 2000;

  // 箭头
  &::before {
    content: '';
    position: absolute;
    top: -6px;
    right: 24px;
    width: 12px;
    height: 12px;
    background: var(--color-bg-elevated);
    border: 1px solid var(--color-border-light);
    border-bottom: none;
    border-right: none;
    transform: rotate(45deg);
  }
}

.dropdown-header {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px;

  .avatar-ring-sm {
    padding: 2px;
    border-radius: 50%;
    background: linear-gradient(135deg, var(--color-primary), var(--color-primary-light));
    flex-shrink: 0;
  }

  .dropdown-user-info {
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  .dropdown-username {
    font-size: 14px;
    font-weight: 600;
    color: var(--color-text);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .dropdown-role {
    font-size: 11px;
    color: var(--color-text-muted);
    margin-top: 2px;
  }
}

.dropdown-divider {
  height: 1px;
  background: var(--color-border);
  margin: 6px 0;
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 9px 10px;
  border-radius: 8px;
  font-size: 13px;
  color: var(--color-text-secondary);
  cursor: pointer;
  transition: all 0.2s;

  svg {
    flex-shrink: 0;
  }

  &:hover {
    background: rgba(var(--color-primary-rgb), 0.1);
    color: var(--color-primary);
  }

  &.danger {
    color: var(--color-danger);

    &:hover {
      background: rgba(255, 71, 87, 0.1);
      color: var(--color-danger);
    }
  }
}

// 下拉动画
.dropdown-enter-active {
  transition: all 0.2s ease-out;
}
.dropdown-leave-active {
  transition: all 0.15s ease-in;
}
.dropdown-enter-from {
  opacity: 0;
  transform: translateY(-8px) scale(0.96);
}
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-4px) scale(0.98);
}
</style>
