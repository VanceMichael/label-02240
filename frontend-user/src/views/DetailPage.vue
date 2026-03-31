<template>
  <div class="detail-page" v-if="item">
    <div class="container">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: `/list/${item.gameType}` }">{{ gameInfo?.label }}</el-breadcrumb-item>
        <el-breadcrumb-item>账号详情</el-breadcrumb-item>
      </el-breadcrumb>

      <div class="detail-layout">
        <div class="detail-left">
          <div class="cover-area" :style="{ background: gameInfo?.bg }">
            <div class="cover-overlay"></div>
            <img v-if="item.coverImage" :src="item.coverImage" :alt="item.title" class="cover-img" @error="onImgError" />
            <span class="cover-icon">{{ gameInfo?.icon }}</span>
            <div class="cover-badge">{{ gameInfo?.label }}</div>
          </div>
          <div class="desc-card">
            <h3 class="desc-title">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="18" height="18"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/></svg>
              账号描述
            </h3>
            <p class="desc-text">{{ item.description }}</p>
            <div v-if="item.highlights?.length" class="highlights">
              <span class="hl-tag" v-for="h in item.highlights" :key="h">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="12" height="12"><path d="M20 6L9 17l-5-5"/></svg>
                {{ h }}
              </span>
            </div>
          </div>
        </div>

        <div class="detail-right">
          <div class="info-card">
            <h1 class="item-title">{{ item.title }}</h1>
            <div class="item-tags">
              <el-tag effect="plain" size="small">{{ item.server }}</el-tag>
              <el-tag effect="plain" size="small" type="warning">Lv.{{ item.level }}</el-tag>
              <el-tag effect="plain" size="small" type="success">{{ ITEM_STATUS[item.status]?.label }}</el-tag>
            </div>

            <div class="price-block">
              <span class="price-label">售价</span>
              <div class="price-main">
                <span class="symbol">¥</span>
                <span class="amount">{{ item.price }}</span>
              </div>
              <span v-if="item.originalPrice" class="price-original">原价 ¥{{ item.originalPrice }}</span>
            </div>

            <div class="info-rows">
              <div class="info-row" v-for="row in infoRows" :key="row.key">
                <span class="info-key">{{ row.key }}</span>
                <span class="info-val">{{ row.val }}</span>
              </div>
            </div>

            <div class="action-btns">
              <button 
                v-if="canBuy" 
                class="buy-btn" 
                :disabled="buying" 
                @click="handleBuy"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/></svg>
                {{ buying ? '处理中...' : '立即购买' }}
              </button>
              <button 
                v-else-if="isMyItem" 
                class="buy-btn disabled-btn" 
                disabled
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
                这是您发布的账号
              </button>
              <button 
                v-else-if="isPurchased" 
                class="buy-btn disabled-btn" 
                disabled
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>
                该账号已售出
              </button>
              <button 
                v-else 
                class="buy-btn disabled-btn" 
                disabled
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><path d="M18 6L6 18M6 6l12 12"/></svg>
                该账号已下架
              </button>
              <button class="fav-btn-lg" :class="{ active: isFav }" @click="toggleFav">
                <svg viewBox="0 0 24 24" :fill="isFav ? 'currentColor' : 'none'" stroke="currentColor" stroke-width="2" width="18" height="18">
                  <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
                </svg>
                {{ isFav ? '已收藏' : '收藏' }}
              </button>
            </div>
          </div>

          <div class="safety-card">
            <h4>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="16" height="16"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><path d="M12 9v4M12 17h.01"/></svg>
              交易安全提示
            </h4>
            <ul>
              <li>请通过平台担保交易，切勿私下转账</li>
              <li>购买前请仔细核实账号信息</li>
              <li>交易完成后请及时修改密码</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="container" style="padding: 80px 0; text-align: center;">
    <el-empty description="账号不存在或已下架" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useItemStore } from '@/stores/item'
import { useOrderStore } from '@/stores/order'
import { useUserStore } from '@/stores/user'
import { GAME_TYPES, ITEM_STATUS } from '@/constants'
import { ElMessage, ElMessageBox } from 'element-plus'

const route = useRoute()
const router = useRouter()
const itemStore = useItemStore()
const orderStore = useOrderStore()
const userStore = useUserStore()
const buying = ref(false)

onMounted(() => {
  itemStore.init()
  if (route.params.id) itemStore.incrementView(route.params.id)
})

const item = computed(() => itemStore.getItemById(route.params.id))
const gameInfo = computed(() => item.value ? GAME_TYPES[item.value.gameType] : null)
const isFav = computed(() => item.value ? itemStore.isFavorited(item.value.id) : false)

// 判断是否是自己发布的账号
const isMyItem = computed(() => {
  if (!item.value || !userStore.isLoggedIn) return false
  return item.value.sellerId === userStore.currentUser.id
})

// 判断账号是否已被购买
const isPurchased = computed(() => {
  if (!item.value) return false
  return orderStore.isItemPurchased(item.value.id)
})

// 判断是否可以购买
const canBuy = computed(() => {
  if (!item.value) return false
  if (isMyItem.value) return false // 自己的账号不能购买
  if (isPurchased.value) return false // 已被购买的不能再买
  return item.value.status === 'on_sale'
})

const onImgError = (e) => {
  e.target.style.display = 'none'
}

const formatDate = (d) => new Date(d).toLocaleDateString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit' })

const infoRows = computed(() => {
  if (!item.value) return []
  return [
    { key: '游戏', val: gameInfo.value?.label },
    { key: '区服', val: item.value.server },
    { key: '等级', val: `Lv.${item.value.level}` },
    { key: '卖家', val: item.value.sellerName },
    { key: '浏览', val: `${item.value.viewCount} 次` },
    { key: '发布', val: formatDate(item.value.createdAt) }
  ]
})

const toggleFav = () => {
  if (!item.value) return
  const added = itemStore.toggleFavorite(item.value.id)
  ElMessage.success(added ? '已收藏' : '已取消收藏')
}

const handleBuy = async () => {
  if (!userStore.isLoggedIn) {
    ElMessage.warning('请先登录')
    router.push({ name: 'Login', query: { redirect: route.fullPath } })
    return
  }
  
  // 再次检查是否可以购买
  if (!canBuy.value) {
    ElMessage.warning('该账号不可购买')
    return
  }
  
  try {
    await ElMessageBox.confirm(`确认购买「${item.value.title}」？\n价格：¥${item.value.price}`, '确认购买', {
      confirmButtonText: '确认', cancelButtonText: '取消', type: 'info'
    })
    buying.value = true
    await new Promise(r => setTimeout(r, 800))
    
    // 创建订单
    orderStore.createOrder(item.value, userStore.currentUser.id)
    
    // 更新商品状态为已售
    itemStore.updateItemStatus(item.value.id, 'sold')
    
    ElMessage.success('下单成功！请前往个人中心查看订单')
    buying.value = false
    router.push('/profile')
  } catch { 
    buying.value = false 
  }
}
</script>

<style lang="scss" scoped>
.detail-page {
  padding: 24px 0;

  .el-breadcrumb { margin-bottom: 24px; }
}

.detail-layout {
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 24px;
  align-items: start;
}

.cover-area {
  height: 320px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  border-radius: var(--radius-md);
  margin-bottom: 20px;

  .cover-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, transparent 30%, rgba(0,0,0,0.6));
    z-index: 1;
  }

  .cover-img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: 0;

    & ~ .cover-icon {
      opacity: 0;
    }
  }

  .cover-icon {
    font-size: 88px;
    filter: drop-shadow(0 4px 16px rgba(0,0,0,0.4));
    position: relative;
    z-index: 2;
  }

  .cover-badge {
    position: absolute;
    top: 16px;
    left: 16px;
    background: rgba(0,0,0,0.5);
    backdrop-filter: blur(8px);
    color: white;
    padding: 5px 14px;
    border-radius: 14px;
    font-size: 13px;
    border: 1px solid rgba(255,255,255,0.1);
    z-index: 3;
  }
}

.desc-card {
  background: var(--color-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: 24px;

  .desc-title {
    font-size: 15px;
    font-weight: 600;
    margin-bottom: 12px;
    color: var(--color-text);
    display: flex;
    align-items: center;
    gap: 8px;

    svg { color: var(--color-primary); }
  }

  .desc-text {
    font-size: 13px;
    color: var(--color-text-secondary);
    line-height: 1.8;
    margin-bottom: 16px;
  }

  .highlights {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
  }

  .hl-tag {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 4px 12px;
    border-radius: 6px;
    background: rgba(var(--color-primary-rgb), 0.08);
    border: 1px solid rgba(var(--color-primary-rgb), 0.15);
    color: var(--color-primary);
    font-size: 12px;
  }
}

.info-card {
  background: var(--color-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: 28px;
}

.item-title {
  font-size: 20px;
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: 12px;
  line-height: 1.4;
}

.item-tags {
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
}

.price-block {
  background: rgba(var(--color-accent-rgb), 0.06);
  border: 1px solid rgba(var(--color-accent-rgb), 0.12);
  border-radius: var(--radius-sm);
  padding: 18px;
  margin-bottom: 20px;

  .price-label {
    font-size: 12px;
    color: var(--color-text-muted);
  }

  .price-main {
    margin-top: 4px;

    .symbol {
      font-size: 16px;
      color: var(--color-accent);
      font-weight: 600;
    }

    .amount {
      font-family: var(--font-display);
      font-size: 34px;
      font-weight: 800;
      color: var(--color-accent);
      line-height: 1;
    }
  }

  .price-original {
    font-size: 12px;
    color: var(--color-text-muted);
    text-decoration: line-through;
    margin-top: 4px;
    display: block;
  }
}

.info-rows { margin-bottom: 24px; }

.info-row {
  display: flex;
  justify-content: space-between;
  padding: 9px 0;
  border-bottom: 1px solid var(--color-border);
  font-size: 13px;

  .info-key { color: var(--color-text-muted); }
  .info-val { color: var(--color-text); font-weight: 500; }
}

.action-btns {
  display: flex;
  gap: 12px;
}

.buy-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
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

  &:hover:not(:disabled) {
    box-shadow: 0 0 24px rgba(var(--color-primary-rgb), 0.4);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &.disabled-btn {
    background: var(--color-border);
    color: var(--color-text-muted);
    cursor: not-allowed;
    opacity: 0.8;

    &:hover {
      box-shadow: none;
    }
  }
}

.fav-btn-lg {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 12px 20px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  background: transparent;
  color: var(--color-text-secondary);
  font-size: 14px;
  font-family: var(--font-body);
  cursor: pointer;
  transition: all 0.25s;

  &:hover {
    border-color: var(--color-accent);
    color: var(--color-accent);
  }

  &.active {
    border-color: var(--color-accent);
    color: var(--color-accent);
    background: rgba(var(--color-accent-rgb), 0.08);
  }
}

.safety-card {
  background: rgba(var(--color-warning), 0.04);
  border: 1px solid rgba(255, 192, 72, 0.15);
  border-radius: var(--radius-md);
  padding: 18px;
  margin-top: 16px;

  h4 {
    font-size: 13px;
    color: var(--color-warning);
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    gap: 6px;
  }

  ul {
    padding-left: 16px;
    margin: 0;

    li {
      font-size: 12px;
      color: var(--color-text-muted);
      line-height: 2;
    }
  }
}

@media (max-width: 768px) {
  .detail-layout { grid-template-columns: 1fr; }
}
</style>
