<template>
  <div class="list-page">
    <div class="container">
      <div class="filter-bar">
        <div class="filter-row">
          <span class="filter-label">游戏</span>
          <div class="filter-tags">
            <button
              class="ftag" :class="{ active: !selectedGame }"
              @click="selectGame(null)"
            >全部</button>
            <button
              v-for="(info, key) in GAME_TYPES" :key="key"
              class="ftag" :class="{ active: selectedGame === key }"
              @click="selectGame(key)"
            >{{ info.icon }} {{ info.label }}</button>
          </div>
        </div>
        <div class="filter-row">
          <span class="filter-label">排序</span>
          <el-radio-group v-model="sortBy" size="small">
            <el-radio-button value="default">默认</el-radio-button>
            <el-radio-button value="price_asc">价格↑</el-radio-button>
            <el-radio-button value="price_desc">价格↓</el-radio-button>
            <el-radio-button value="newest">最新</el-radio-button>
            <el-radio-button value="popular">最热</el-radio-button>
          </el-radio-group>
          <div class="filter-price">
            <el-input v-model.number="priceMin" placeholder="最低价" size="small" style="width: 100px" />
            <span class="price-sep">—</span>
            <el-input v-model.number="priceMax" placeholder="最高价" size="small" style="width: 100px" />
            <button class="price-filter-btn" @click="applyPriceFilter">筛选</button>
          </div>
        </div>
      </div>

      <div class="result-info">
        共找到 <strong>{{ filteredItems.length }}</strong> 个账号
      </div>

      <div v-if="filteredItems.length" class="item-grid">
        <ItemCard v-for="item in paginatedItems" :key="item.id" :item="item" />
      </div>
      <el-empty v-else description="暂无符合条件的账号" />

      <div v-if="filteredItems.length > pageSize" class="pagination-wrap">
        <el-pagination
          v-model:current-page="currentPage"
          :page-size="pageSize"
          :total="filteredItems.length"
          layout="prev, pager, next"
          background
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useItemStore } from '@/stores/item'
import { GAME_TYPES } from '@/constants'
import ItemCard from '@/components/ItemCard.vue'

const route = useRoute()
const router = useRouter()
const itemStore = useItemStore()

const selectedGame = ref(route.params.game || null)
const sortBy = ref('default')
const priceMin = ref(null)
const priceMax = ref(null)
const priceFilterApplied = ref(false)
const currentPage = ref(1)
const pageSize = 12

onMounted(() => { itemStore.init() })

watch(() => route.params.game, (val) => {
  selectedGame.value = val || null
  currentPage.value = 1
})

watch(currentPage, () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
})

const selectGame = (game) => {
  selectedGame.value = game
  currentPage.value = 1
  router.replace({ params: { game: game || undefined } })
}

const applyPriceFilter = () => {
  priceFilterApplied.value = true
  currentPage.value = 1
}

const filteredItems = computed(() => {
  let list = selectedGame.value
    ? itemStore.getItemsByGame(selectedGame.value)
    : [...itemStore.allItems]

  if (priceFilterApplied.value) {
    if (priceMin.value != null && priceMin.value !== '') list = list.filter(i => i.price >= priceMin.value)
    if (priceMax.value != null && priceMax.value !== '') list = list.filter(i => i.price <= priceMax.value)
  }

  switch (sortBy.value) {
    case 'price_asc': list.sort((a, b) => a.price - b.price); break
    case 'price_desc': list.sort((a, b) => b.price - a.price); break
    case 'newest': list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); break
    case 'popular': list.sort((a, b) => b.viewCount - a.viewCount); break
  }
  return list
})

const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  return filteredItems.value.slice(start, start + pageSize)
})
</script>

<style lang="scss" scoped>
.list-page {
  padding: 24px 0;
}

.filter-bar {
  background: var(--color-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: 20px 24px;
  margin-bottom: 20px;
}

.filter-row {
  display: flex;
  align-items: center;
  gap: 14px;
  flex-wrap: wrap;

  & + .filter-row {
    margin-top: 14px;
    padding-top: 14px;
    border-top: 1px solid var(--color-border);
  }
}

.filter-label {
  font-size: 13px;
  font-weight: 600;
  color: var(--color-text-secondary);
  flex-shrink: 0;
  width: 40px;
}

.filter-tags {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}

.ftag {
  padding: 5px 14px;
  border: 1px solid var(--color-border);
  border-radius: 6px;
  background: transparent;
  color: var(--color-text-secondary);
  font-size: 12px;
  font-family: var(--font-body);
  cursor: pointer;
  transition: all 0.25s;

  &:hover {
    border-color: rgba(var(--color-primary-rgb), 0.3);
    color: var(--color-primary);
  }

  &.active {
    background: rgba(var(--color-primary-rgb), 0.15);
    border-color: var(--color-primary);
    color: var(--color-primary);
    font-weight: 600;
  }
}

.filter-price {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: auto;

  .price-sep {
    color: var(--color-text-muted);
    font-size: 12px;
  }
}

.price-filter-btn {
  padding: 5px 16px;
  border: 1px solid var(--color-primary);
  border-radius: 6px;
  background: rgba(var(--color-primary-rgb), 0.1);
  color: var(--color-primary);
  font-size: 12px;
  font-weight: 600;
  font-family: var(--font-body);
  cursor: pointer;
  transition: all 0.25s;

  &:hover {
    background: rgba(var(--color-primary-rgb), 0.2);
  }
}

.result-info {
  margin-bottom: 16px;
  font-size: 13px;
  color: var(--color-text-muted);

  strong {
    color: var(--color-primary);
  }
}

.item-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 18px;
  min-height: 400px;
}

.pagination-wrap {
  display: flex;
  justify-content: center;
  margin-top: 32px;
}

@media (max-width: 768px) {
  .item-grid { grid-template-columns: repeat(2, 1fr); }
  .filter-price { margin-left: 0; }
}
</style>
