<template>
  <div class="profile-page">
    <div class="container">
      <div class="user-card">
        <div class="user-card-bg"></div>
        <div class="user-info">
          <div class="avatar-ring">
            <el-avatar :size="64" :style="{ background: 'linear-gradient(135deg, #00F0FF, #7B61FF)', color: '#0A0E17', fontSize: '24px', fontWeight: 700 }">
              {{ userStore.currentUser?.username?.charAt(0)?.toUpperCase() }}
            </el-avatar>
          </div>
          <div class="user-detail">
            <h2>{{ userStore.currentUser?.username }}</h2>
            <p>注册时间：{{ formatDate(userStore.currentUser?.createdAt) }}</p>
          </div>
        </div>
        <div class="user-stats">
          <div class="stat" v-for="s in stats" :key="s.label">
            <span class="stat-num">{{ s.num }}</span>
            <span class="stat-label">{{ s.label }}</span>
          </div>
        </div>
      </div>

      <el-tabs v-model="activeTab" class="profile-tabs">
        <el-tab-pane label="我的订单" name="orders">
          <div v-if="myOrders.length" class="order-list">
            <div v-for="order in myOrders" :key="order.id" class="order-item" :class="`status-${order.status}`">
              <div class="order-header">
                <span class="order-id">{{ order.id }}</span>
                <span class="order-status-badge" :class="order.status">
                  <span class="status-dot"></span>
                  {{ ORDER_STATUS[order.status]?.label }}
                </span>
              </div>
              <div class="order-body">
                <div class="order-game-icon" :style="{ background: GAME_TYPES[order.gameType]?.bg }">
                  <img v-if="order.coverImage" :src="order.coverImage" :alt="order.itemTitle" class="order-game-img" @error="(e) => { e.target.style.display='none' }" />
                  <span class="order-game-emoji">{{ GAME_TYPES[order.gameType]?.icon }}</span>
                </div>
                <div class="order-info">
                  <h4>{{ order.itemTitle }}</h4>
                  <p>卖家：{{ order.sellerName }}</p>
                  <p class="order-time">{{ formatDate(order.createdAt) }}</p>
                </div>
                <div class="order-price">
                  <span class="symbol">¥</span><span class="amount">{{ order.amount }}</span>
                </div>
              </div>
              <div class="order-actions">
                <button v-if="order.status === 'pending'" class="act-btn primary" @click="payOrder(order)">去付款</button>
                <button v-if="order.status === 'pending'" class="act-btn" @click="cancelOrder(order)">取消</button>
                <button v-if="order.status === 'paid'" class="act-btn success" @click="confirmOrder(order)">确认收货</button>
                <button class="act-btn ghost" @click="$router.push(`/detail/${order.itemId}`)">查看详情</button>
              </div>
            </div>
          </div>
          <el-empty v-else description="暂无订单" />
        </el-tab-pane>

        <el-tab-pane label="我的发布" name="published">
          <div v-if="myPublished.length" class="pub-list">
            <div v-for="item in myPublished" :key="item.id" class="pub-item">
              <div class="pub-cover" :style="{ background: GAME_TYPES[item.gameType]?.bg }">
                <img v-if="item.coverImage" :src="item.coverImage" :alt="item.title" class="pub-cover-img" @error="(e) => { e.target.style.display='none' }" />
                <span class="pub-cover-emoji">{{ GAME_TYPES[item.gameType]?.icon }}</span>
              </div>
              <div class="pub-info">
                <h4>{{ item.title }}</h4>
                <p>¥{{ item.price }} · {{ item.viewCount }} 次浏览</p>
              </div>
              <button class="act-btn danger" @click="removeItem(item)">删除</button>
            </div>
          </div>
          <el-empty v-else description="暂无发布">
            <button class="act-btn primary" @click="$router.push('/publish')">去发布</button>
          </el-empty>
        </el-tab-pane>

        <el-tab-pane label="我的收藏" name="favorites">
          <div v-if="favItems.length" class="fav-grid">
            <ItemCard v-for="item in favItems" :key="item.id" :item="item" />
          </div>
          <el-empty v-else description="暂无收藏" />
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { useItemStore } from '@/stores/item'
import { useOrderStore } from '@/stores/order'
import { GAME_TYPES, ORDER_STATUS } from '@/constants'
import { ElMessage, ElMessageBox } from 'element-plus'
import ItemCard from '@/components/ItemCard.vue'

const route = useRoute()
const userStore = useUserStore()
const itemStore = useItemStore()
const orderStore = useOrderStore()
const activeTab = ref(route.query.tab || 'orders')

const myOrders = computed(() => orderStore.getMyOrders(userStore.currentUser?.id))
const myPublished = computed(() => itemStore.getMyPublished(userStore.currentUser?.id))
const favItems = computed(() => itemStore.getFavoriteItems())

const stats = computed(() => [
  { num: myPublished.value.length, label: '发布' },
  { num: myOrders.value.length, label: '订单' },
  { num: favItems.value.length, label: '收藏' }
])

const formatDate = (d) => {
  if (!d) return '-'
  return new Date(d).toLocaleDateString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' })
}

const payOrder = async (order) => {
  await ElMessageBox.confirm('确认模拟付款？', '付款确认', { confirmButtonText: '确认付款', cancelButtonText: '取消' })
  orderStore.updateOrderStatus(order.id, 'paid')
  ElMessage.success('付款成功')
}

const cancelOrder = async (order) => {
  await ElMessageBox.confirm('确认取消订单？', '取消订单', { confirmButtonText: '确认', cancelButtonText: '返回', type: 'warning' })
  orderStore.updateOrderStatus(order.id, 'cancelled')
  // 恢复商品状态为可售
  itemStore.updateItemStatus(order.itemId, 'on_sale')
  ElMessage.info('订单已取消')
}

const confirmOrder = async (order) => {
  await ElMessageBox.confirm('确认已收到账号？', '确认收货', { confirmButtonText: '确认收货', cancelButtonText: '取消' })
  orderStore.updateOrderStatus(order.id, 'completed')
  ElMessage.success('交易完成')
}

const removeItem = async (item) => {
  await ElMessageBox.confirm('确认删除？', '删除确认', { confirmButtonText: '删除', cancelButtonText: '取消', type: 'warning' })
  itemStore.removeItem(item.id)
  ElMessage.success('已删除')
}
</script>

<style lang="scss" scoped>
.profile-page { padding: 24px 0; }

.user-card {
  background: var(--color-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: 28px 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  position: relative;
  overflow: hidden;

  .user-card-bg {
    position: absolute;
    top: -50%;
    right: -10%;
    width: 300px;
    height: 300px;
    border-radius: 50%;
    background: rgba(var(--color-primary-rgb), 0.04);
    filter: blur(60px);
  }
}

.user-info {
  display: flex;
  align-items: center;
  gap: 18px;
  position: relative;

  .avatar-ring {
    padding: 3px;
    border-radius: 50%;
    background: linear-gradient(135deg, var(--color-primary), var(--color-primary-light));
  }

  h2 { font-size: 20px; font-weight: 700; color: var(--color-text); }
  p { font-size: 12px; color: var(--color-text-muted); margin-top: 4px; }
}

.user-stats {
  display: flex;
  gap: 36px;
  position: relative;

  .stat {
    text-align: center;
    .stat-num {
      display: block;
      font-family: var(--font-display);
      font-size: 22px;
      font-weight: 700;
      color: var(--color-primary);
    }
    .stat-label { font-size: 12px; color: var(--color-text-muted); }
  }
}

.profile-tabs {
  :deep(.el-tabs__header) {
    background: var(--color-card);
    border-radius: var(--radius-md) var(--radius-md) 0 0;
    padding: 0 24px;
    border: 1px solid var(--color-border);
    border-bottom: none;
    margin-bottom: 0;
  }
  :deep(.el-tabs__nav-wrap::after) {
    background-color: var(--color-border);
    height: 1px;
  }
  :deep(.el-tabs__content) { padding: 24px 0; }
}

.order-list { display: flex; flex-direction: column; gap: 14px; }

.order-item {
  background: var(--color-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: 18px;
  transition: border-color 0.25s;
  &:hover { border-color: rgba(var(--color-primary-rgb), 0.2); }

  &.status-pending { border-left: 3px solid var(--color-warning); }
  &.status-paid { border-left: 3px solid var(--color-primary); }
  &.status-completed { border-left: 3px solid var(--color-success); }
  &.status-cancelled { border-left: 3px solid var(--color-text-muted); opacity: 0.7; }
}

.order-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 14px;
  .order-id { font-size: 11px; color: var(--color-text-muted); font-family: monospace; }
}

.order-status-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;

  .status-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
  }

  &.pending {
    background: rgba(255, 192, 72, 0.12);
    color: var(--color-warning);
    .status-dot { background: var(--color-warning); box-shadow: 0 0 6px var(--color-warning); }
  }
  &.paid {
    background: rgba(var(--color-primary-rgb), 0.12);
    color: var(--color-primary);
    .status-dot { background: var(--color-primary); box-shadow: 0 0 6px var(--color-primary); }
  }
  &.completed {
    background: rgba(11, 232, 129, 0.12);
    color: var(--color-success);
    .status-dot { background: var(--color-success); box-shadow: 0 0 6px var(--color-success); }
  }
  &.cancelled {
    background: rgba(74, 85, 104, 0.15);
    color: var(--color-text-muted);
    .status-dot { background: var(--color-text-muted); }
  }
}

.order-body {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 14px;

  .order-game-icon {
    width: 48px;
    height: 48px;
    border-radius: var(--radius-sm);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 22px;
    flex-shrink: 0;
    overflow: hidden;
    position: relative;

    .order-game-img {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      z-index: 1;

      & ~ .order-game-emoji {
        opacity: 0;
      }
    }

    .order-game-emoji {
      position: relative;
      z-index: 0;
    }
  }

  .order-info {
    flex: 1;
    h4 { font-size: 15px; font-weight: 600; color: var(--color-text); margin-bottom: 4px; }
    p { font-size: 12px; color: var(--color-text-muted); }
    .order-time { margin-top: 2px; font-size: 11px; }
  }
}

.order-price {
  flex-shrink: 0;
  text-align: right;
  .symbol { font-size: 13px; color: var(--color-accent); }
  .amount { font-family: var(--font-display); font-size: 22px; font-weight: 700; color: var(--color-accent); }
}

.order-actions {
  display: flex;
  gap: 8px;
  justify-content: flex-end;
  padding-top: 12px;
  border-top: 1px solid var(--color-border);
}

.act-btn {
  padding: 6px 16px;
  border: 1px solid var(--color-border);
  border-radius: 6px;
  background: transparent;
  color: var(--color-text-secondary);
  font-size: 12px;
  font-family: var(--font-body);
  cursor: pointer;
  transition: all 0.25s;

  &:hover { border-color: var(--color-text-muted); }

  &.primary {
    background: linear-gradient(135deg, var(--color-primary), var(--color-primary-light));
    border-color: transparent;
    color: #0A0E17;
    font-weight: 600;
    &:hover { box-shadow: 0 0 16px rgba(var(--color-primary-rgb), 0.3); }
  }

  &.success {
    border-color: var(--color-success);
    color: var(--color-success);
    &:hover { background: rgba(11, 232, 129, 0.1); }
  }

  &.danger {
    border-color: var(--color-danger);
    color: var(--color-danger);
    &:hover { background: rgba(255, 71, 87, 0.1); }
  }

  &.ghost {
    border: none;
    color: var(--color-primary);
    &:hover { text-decoration: underline; }
  }
}

.pub-list { display: flex; flex-direction: column; gap: 12px; }

.pub-item {
  display: flex;
  align-items: center;
  padding: 14px;
  gap: 14px;
  background: var(--color-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  transition: border-color 0.25s;
  &:hover { border-color: rgba(var(--color-primary-rgb), 0.2); }

  .pub-cover {
    width: 56px;
    height: 56px;
    border-radius: var(--radius-sm);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    flex-shrink: 0;
    overflow: hidden;
    position: relative;

    .pub-cover-img {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      z-index: 1;

      & ~ .pub-cover-emoji {
        opacity: 0;
      }
    }

    .pub-cover-emoji {
      position: relative;
      z-index: 0;
    }
  }

  .pub-info {
    flex: 1;
    h4 { font-size: 14px; font-weight: 600; color: var(--color-text); }
    p { font-size: 12px; color: var(--color-text-muted); margin-top: 4px; }
  }
}

.fav-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 18px;
}

@media (max-width: 768px) {
  .user-card { flex-direction: column; gap: 20px; }
  .fav-grid { grid-template-columns: repeat(2, 1fr); }
}
</style>
