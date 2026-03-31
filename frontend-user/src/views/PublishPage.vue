<template>
  <div class="publish-page">
    <div class="container">
      <div class="page-header">
        <h1 class="section-title">发布游戏账号</h1>
        <p class="page-desc">填写账号信息，发布到平台进行交易</p>
      </div>

      <div class="publish-form-card">
        <el-form ref="formRef" :model="form" :rules="rules" label-width="100px" label-position="right" size="large">
          <el-form-item label="账号标题" prop="title">
            <el-input v-model="form.title" placeholder="例如：钻石段位满皮肤号" maxlength="50" show-word-limit />
          </el-form-item>

          <el-form-item label="游戏类型" prop="gameType">
            <el-select v-model="form.gameType" placeholder="请选择游戏" style="width: 100%">
              <el-option v-for="(info, key) in GAME_TYPES" :key="key" :label="`${info.icon} ${info.label}`" :value="key" />
            </el-select>
          </el-form-item>

          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="区服" prop="server">
                <el-input v-model="form.server" placeholder="例如：电信一区" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="等级" prop="level">
                <el-input-number v-model="form.level" :min="1" :max="999" style="width: 100%" />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="售价 (¥)" prop="price">
                <el-input-number v-model="form.price" :min="1" :max="99999" :precision="0" style="width: 100%" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="原价 (¥)">
                <el-input-number v-model="form.originalPrice" :min="0" :max="99999" :precision="0" style="width: 100%" />
              </el-form-item>
            </el-col>
          </el-row>

          <el-form-item label="账号描述" prop="description">
            <el-input v-model="form.description" type="textarea" :rows="5" placeholder="详细描述账号信息" maxlength="500" show-word-limit />
          </el-form-item>

          <el-form-item label="账号亮点">
            <div class="highlights-input">
              <span class="hl-tag" v-for="(tag, idx) in form.highlights" :key="idx">
                {{ tag }}
                <button class="hl-close" @click="form.highlights.splice(idx, 1)">×</button>
              </span>
              <input
                v-if="highlightInputVisible"
                ref="highlightInputRef"
                v-model="highlightInputValue"
                class="hl-input"
                @keyup.enter="addHighlight"
                @blur="addHighlight"
              />
              <button v-else class="hl-add-btn" @click="showHighlightInput">+ 添加亮点</button>
            </div>
          </el-form-item>

          <el-form-item>
            <button type="button" class="publish-btn" :disabled="submitting" @click="handleSubmit">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12"/></svg>
              {{ submitting ? '发布中...' : '发布账号' }}
            </button>
            <button type="button" class="cancel-btn" @click="$router.back()">取消</button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { useItemStore } from '@/stores/item'
import { useUserStore } from '@/stores/user'
import { GAME_TYPES } from '@/constants'
import { ElMessage } from 'element-plus'

const router = useRouter()
const itemStore = useItemStore()
const userStore = useUserStore()

const formRef = ref(null)
const submitting = ref(false)
const highlightInputVisible = ref(false)
const highlightInputValue = ref('')
const highlightInputRef = ref(null)

const form = reactive({ title: '', gameType: '', server: '', level: 1, price: 100, originalPrice: 0, description: '', highlights: [] })

const rules = {
  title: [{ required: true, message: '请输入标题', trigger: 'blur' }, { min: 4, max: 50, message: '4-50 个字符', trigger: 'blur' }],
  gameType: [{ required: true, message: '请选择游戏', trigger: 'change' }],
  server: [{ required: true, message: '请输入区服', trigger: 'blur' }],
  level: [{ required: true, message: '请输入等级', trigger: 'change' }],
  price: [{ required: true, message: '请输入售价', trigger: 'change' }],
  description: [{ required: true, message: '请输入描述', trigger: 'blur' }, { min: 10, message: '至少 10 个字符', trigger: 'blur' }]
}

const showHighlightInput = () => { highlightInputVisible.value = true; nextTick(() => highlightInputRef.value?.focus()) }

const addHighlight = () => {
  const val = highlightInputValue.value.trim()
  if (val && !form.highlights.includes(val)) form.highlights.push(val)
  highlightInputVisible.value = false
  highlightInputValue.value = ''
}

const handleSubmit = async () => {
  if (!formRef.value) return
  const valid = await formRef.value.validate().catch(() => false)
  if (!valid) return
  submitting.value = true
  try {
    await new Promise(r => setTimeout(r, 600))
    itemStore.publishItem({ ...form, screenshots: [], sellerId: userStore.currentUser.id, sellerName: userStore.currentUser.username })
    ElMessage.success('发布成功！')
    router.push('/profile?tab=published')
  } catch (err) { ElMessage.error('发布失败：' + err.message) }
  finally { submitting.value = false }
}
</script>

<style lang="scss" scoped>
.publish-page { padding: 24px 0; }

.page-header {
  margin-bottom: 24px;
  .page-desc { font-size: 13px; color: var(--color-text-muted); margin-top: 4px; }
}

.publish-form-card {
  background: var(--color-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: 32px 36px;
  max-width: 720px;
}

.highlights-input {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
}

.hl-tag {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 12px;
  border-radius: 6px;
  background: rgba(var(--color-primary-rgb), 0.1);
  border: 1px solid rgba(var(--color-primary-rgb), 0.2);
  color: var(--color-primary);
  font-size: 12px;

  .hl-close {
    background: none;
    border: none;
    color: var(--color-primary);
    cursor: pointer;
    font-size: 14px;
    padding: 0 2px;
    opacity: 0.6;
    &:hover { opacity: 1; }
  }
}

.hl-input {
  width: 100px;
  padding: 4px 10px;
  border: 1px solid var(--color-primary);
  border-radius: 6px;
  background: transparent;
  color: var(--color-text);
  font-size: 12px;
  font-family: var(--font-body);
  outline: none;
}

.hl-add-btn {
  padding: 4px 12px;
  border: 1px dashed var(--color-border);
  border-radius: 6px;
  background: transparent;
  color: var(--color-text-muted);
  font-size: 12px;
  font-family: var(--font-body);
  cursor: pointer;
  transition: all 0.25s;
  &:hover { border-color: var(--color-primary); color: var(--color-primary); }
}

.publish-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 10px 28px;
  border: none;
  border-radius: var(--radius-sm);
  background: linear-gradient(135deg, var(--color-primary), var(--color-primary-light));
  color: #0A0E17;
  font-size: 14px;
  font-weight: 700;
  font-family: var(--font-body);
  cursor: pointer;
  transition: all 0.25s;
  &:hover { box-shadow: 0 0 20px rgba(var(--color-primary-rgb), 0.4); }
  &:disabled { opacity: 0.6; cursor: not-allowed; }
}

.cancel-btn {
  padding: 10px 20px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  background: transparent;
  color: var(--color-text-secondary);
  font-size: 14px;
  font-family: var(--font-body);
  cursor: pointer;
  margin-left: 12px;
  transition: all 0.25s;
  &:hover { border-color: var(--color-text-muted); }
}
</style>
