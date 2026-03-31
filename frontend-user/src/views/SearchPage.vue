<template>
  <div class="search-page">
    <div class="container">
      <div class="search-header">
        <h2 class="section-title">
          搜索结果
          <span class="search-keyword" v-if="keyword">「{{ keyword }}」</span>
        </h2>
        <p class="result-count">共找到 <strong>{{ results.length }}</strong> 个相关账号</p>
      </div>

      <div v-if="results.length" class="item-grid">
        <ItemCard v-for="item in results" :key="item.id" :item="item" />
      </div>

      <el-empty v-else description="未找到相关账号，换个关键词试试？">
        <button class="back-btn" @click="$router.push('/')">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          返回首页
        </button>
      </el-empty>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useItemStore } from '@/stores/item'
import ItemCard from '@/components/ItemCard.vue'

const route = useRoute()
const itemStore = useItemStore()

onMounted(() => { itemStore.init() })

const keyword = computed(() => route.query.q || '')
const results = computed(() => keyword.value ? itemStore.searchItems(keyword.value) : itemStore.allItems)
</script>

<style lang="scss" scoped>
.search-page { padding: 24px 0; }

.search-header {
  margin-bottom: 24px;

  .search-keyword {
    color: var(--color-primary);
    font-family: var(--font-body);
    font-size: 16px;
  }

  .result-count {
    font-size: 13px;
    color: var(--color-text-muted);
    margin-top: 4px;
    strong { color: var(--color-primary); }
  }
}

.item-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 18px;
}

.back-btn {
  display: inline-flex;
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
  &:hover { background: rgba(var(--color-primary-rgb), 0.1); }
}

@media (max-width: 768px) {
  .item-grid { grid-template-columns: repeat(2, 1fr); }
}
</style>
