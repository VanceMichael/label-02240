<template>
  <div class="login-page">
    <div class="login-bg">
      <div class="bg-orb bg-orb-1"></div>
      <div class="bg-orb bg-orb-2"></div>
      <div class="bg-grid"></div>
    </div>
    <div class="login-card">
      <div class="login-header">
        <div class="logo-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="24" height="24">
            <polygon points="12,2 22,8.5 22,15.5 12,22 2,15.5 2,8.5" />
            <polygon points="12,6 18,9.5 18,14.5 12,18 6,14.5 6,9.5" />
          </svg>
        </div>
        <h2>{{ isRegister ? '创建账号' : '欢迎回来' }}</h2>
        <p>{{ isRegister ? '加入 GameVault 开始交易' : '登录你的 GameVault 账号' }}</p>
      </div>

      <el-form ref="formRef" :model="form" :rules="rules" label-position="top" @submit.prevent="handleSubmit">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username" placeholder="请输入用户名" size="large" />
        </el-form-item>

        <el-form-item v-if="isRegister" label="手机号" prop="phone">
          <el-input v-model="form.phone" placeholder="请输入手机号" size="large" />
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" type="password" placeholder="请输入密码" size="large" show-password />
        </el-form-item>

        <el-form-item v-if="isRegister" label="确认密码" prop="confirmPassword">
          <el-input v-model="form.confirmPassword" type="password" placeholder="请再次输入密码" size="large" show-password />
        </el-form-item>

        <button type="button" class="submit-btn" :disabled="loading" @click="handleSubmit">
          {{ loading ? '处理中...' : (isRegister ? '注册' : '登录') }}
        </button>
      </el-form>

      <div class="login-footer">
        <span>{{ isRegister ? '已有账号？' : '还没有账号？' }}</span>
        <button class="switch-btn" @click="isRegister = !isRegister">
          {{ isRegister ? '去登录' : '立即注册' }}
        </button>
      </div>


    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { ElMessage } from 'element-plus'

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()

const isRegister = ref(false)
const loading = ref(false)
const formRef = ref(null)

const form = reactive({ username: '', phone: '', password: '', confirmPassword: '' })

const validateConfirm = (rule, value, callback) => {
  value !== form.password ? callback(new Error('两次输入的密码不一致')) : callback()
}

const rules = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }, { min: 2, max: 20, message: '2-20 个字符', trigger: 'blur' }],
  phone: [{ required: true, message: '请输入手机号', trigger: 'blur' }, { pattern: /^1[3-9]\d{9}$/, message: '格式不正确', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }, { min: 6, message: '至少 6 个字符', trigger: 'blur' }],
  confirmPassword: [{ required: true, message: '请确认密码', trigger: 'blur' }, { validator: validateConfirm, trigger: 'blur' }]
}



const handleSubmit = async () => {
  if (!formRef.value) return
  const valid = await formRef.value.validate().catch(() => false)
  if (!valid) return
  loading.value = true
  try {
    await new Promise(r => setTimeout(r, 500))
    if (isRegister.value) { userStore.register(form.username, form.password, form.phone); ElMessage.success('注册成功') }
    else { userStore.login(form.username, form.password); ElMessage.success('登录成功') }
    router.push(route.query.redirect || '/')
  } catch (err) { ElMessage.error(err.message) }
  finally { loading.value = false }
}
</script>

<style lang="scss" scoped>
.login-page {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 72px);
  padding: 48px 24px;
  position: relative;
}

.login-bg {
  position: absolute;
  inset: 0;
  overflow: hidden;

  .bg-grid {
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(var(--color-primary-rgb), 0.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(var(--color-primary-rgb), 0.04) 1px, transparent 1px);
    background-size: 50px 50px;
    mask-image: radial-gradient(ellipse at center, black 20%, transparent 70%);
  }

  .bg-orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(100px);
  }

  .bg-orb-1 {
    width: 500px;
    height: 500px;
    background: rgba(var(--color-primary-rgb), 0.08);
    top: -150px;
    right: 10%;
  }

  .bg-orb-2 {
    width: 400px;
    height: 400px;
    background: rgba(var(--color-accent-rgb), 0.06);
    bottom: -100px;
    left: 10%;
  }
}

.login-card {
  width: 100%;
  max-width: 400px;
  padding: 36px;
  background: var(--color-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  position: relative;
  z-index: 1;
  box-shadow: 0 0 40px rgba(0,0,0,0.3);
}

.login-header {
  text-align: center;
  margin-bottom: 28px;

  .logo-icon {
    display: inline-flex;
    width: 48px;
    height: 48px;
    border-radius: 14px;
    background: linear-gradient(135deg, var(--color-primary), var(--color-primary-light));
    color: #0A0E17;
    align-items: center;
    justify-content: center;
    margin-bottom: 14px;
    box-shadow: 0 0 20px rgba(var(--color-primary-rgb), 0.3);
  }

  h2 {
    font-family: var(--font-display);
    font-size: 20px;
    font-weight: 700;
    color: var(--color-text);
    margin-bottom: 6px;
    letter-spacing: 1px;
  }

  p {
    font-size: 13px;
    color: var(--color-text-muted);
  }
}

.submit-btn {
  width: 100%;
  padding: 12px;
  border: none;
  border-radius: var(--radius-sm);
  background: linear-gradient(135deg, var(--color-primary), var(--color-primary-light));
  color: #0A0E17;
  font-size: 15px;
  font-weight: 700;
  font-family: var(--font-body);
  cursor: pointer;
  transition: all 0.25s;
  margin-top: 8px;

  &:hover {
    box-shadow: 0 0 24px rgba(var(--color-primary-rgb), 0.4);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
}

.login-footer {
  text-align: center;
  margin-top: 18px;
  font-size: 13px;
  color: var(--color-text-muted);

  .switch-btn {
    background: none;
    border: none;
    color: var(--color-primary);
    font-size: 13px;
    font-weight: 600;
    font-family: var(--font-body);
    cursor: pointer;

    &:hover { text-decoration: underline; }
  }
}


</style>
