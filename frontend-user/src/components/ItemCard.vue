<template>
  <div class="item-card card-base" @click="goDetail">
    <div class="card-cover" :style="{ background: gameInfo?.bg }">
      <div class="cover-overlay"></div>
      <img v-if="props.item.coverImage" :src="props.item.coverImage" :alt="props.item.title" class="cover-img" @error="onImgError" />
      <span class="game-icon">{{ gameInfo?.icon }}</span>
      <span class="game-tag">{{ gameInfo?.label }}</span>
      <button class="fav-btn" :class="{ active: isFav }" @click.stop="toggleFav">
        <svg viewBox="0 0 24 24" :fill="isFav ? 'currentColor' : 'none'" stroke="currentColor" stroke-width="2" width="14" height="14">
          <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
        </svg>
      </button>
    </div>
    <div class="card-body">
      <h3 class="card-title">{{ item.title }}</h3>
      <div class="card-meta">
        <span class="meta-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="12" height="12"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>
          {{ item.server }}
        </span>
        <span class="meta-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="12" height="12"><path d="M12 15l-2 5-5-2 2-5M12 15l2 5 5-2-2-5M6 9a6 6 0 1112 0"/></svg>
          Lv.{{ item.level }}
        </span>
      </div>
      <div class="card-footer">
        <div class="price">
          <span class="price-symbol">¥</span>
          <span class="price-value">{{ item.price }}</span>
          <span v-if="item.originalPrice" class="price-original">¥{{ item.originalPrice }}</span>
        </div>
        <div class="views">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="13" height="13"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
          {{ item.viewCount }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useItemStore } from '@/stores/item'
import { GAME_TYPES } from '@/constants'
import { ElMessage } from 'element-plus'

const props = defineProps({
  item: { type: Object, required: true }
})

const router = useRouter()
const itemStore = useItemStore()

const gameInfo = computed(() => GAME_TYPES[props.item.gameType])
const isFav = computed(() => itemStore.isFavorited(props.item.id))

const goDetail = () => {
  router.push(`/detail/${props.item.id}`)
}

const onImgError = (e) => {
  e.target.style.display = 'none'
}

const toggleFav = () => {
  const added = itemStore.toggleFavorite(props.item.id)
  ElMessage.success(added ? '已收藏' : '已取消收藏')
}
</script>

<style lang="scss" scoped>
.item-card {
  cursor: pointer;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: var(--radius-md);
    padding: 1px;
    background: linear-gradient(135deg, transparent, rgba(var(--color-primary-rgb), 0.3), transparent);
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    opacity: 0;
    transition: opacity 0.35s;
    pointer-events: none;
  }

  &:hover::before {
    opacity: 1;
  }
}

.card-cover {
  height: 140px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;

  .cover-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.5));
    z-index: 1;
  }

  .cover-img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: 0;

    & ~ .game-icon {
      opacity: 0;
    }
  }

  .game-icon {
    font-size: 44px;
    filter: drop-shadow(0 2px 12px rgba(0,0,0,0.4));
    position: relative;
    z-index: 2;
    transition: transform 0.35s;
  }

  .item-card:hover & .game-icon {
    transform: scale(1.1);
  }

  .game-tag {
    position: absolute;
    top: 10px;
    left: 10px;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(8px);
    color: rgba(255,255,255,0.9);
    font-size: 11px;
    padding: 3px 10px;
    border-radius: 10px;
    border: 1px solid rgba(255,255,255,0.1);
    z-index: 3;
  }

  .fav-btn {
    position: absolute;
    top: 8px;
    right: 8px;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: none;
    background: rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(8px);
    color: rgba(255,255,255,0.7);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.25s;
    z-index: 3;

    &:hover {
      background: rgba(var(--color-accent-rgb), 0.3);
      color: var(--color-accent);
      transform: scale(1.15);
    }

    &.active {
      background: rgba(var(--color-accent-rgb), 0.3);
      color: var(--color-accent);
    }
  }
}

.card-body {
  padding: 14px;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.card-title {
  font-size: 14px;
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: 8px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.card-meta {
  display: flex;
  gap: 12px;
  margin-bottom: 10px;

  .meta-item {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 11px;
    color: var(--color-text-muted);
  }
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-top: auto;

  .price {
    display: flex;
    align-items: baseline;
    gap: 2px;

    .price-symbol {
      font-size: 12px;
      color: var(--color-accent);
      font-weight: 600;
    }

    .price-value {
      font-family: var(--font-display);
      font-size: 20px;
      font-weight: 700;
      color: var(--color-accent);
      line-height: 1;
    }

    .price-original {
      font-size: 11px;
      color: var(--color-text-muted);
      text-decoration: line-through;
      margin-left: 6px;
    }
  }

  .views {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 11px;
    color: var(--color-text-muted);
  }
}
</style>
