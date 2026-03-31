<template>
  <div class="home-page">
    <!-- Hero -->
    <section class="hero-section">
      <div class="hero-bg">
        <div class="hero-grid"></div>
        <div class="hero-orb hero-orb-1"></div>
        <div class="hero-orb hero-orb-2"></div>
      </div>
      <div class="container">
        <div class="hero-content">
          <div class="hero-badge">🎮 安全交易平台</div>
          <h1 class="hero-title">
            <span class="title-line">LEVEL UP YOUR</span>
            <span class="title-accent">GAME ACCOUNT</span>
          </h1>
          <p class="hero-desc">海量优质游戏账号 · 担保交易 · 极速发货</p>
          <div class="hero-search">
            <div class="search-box">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
              <input v-model="heroSearch" placeholder="搜索你想要的游戏账号..." @keyup.enter="doSearch" />
              <button class="search-btn" @click="doSearch">搜索</button>
            </div>
          </div>
          <div class="hero-stats">
            <div class="stat-item">
              <span class="stat-num">{{ itemStore.allItems.length }}<span class="stat-plus">+</span></span>
              <span class="stat-label">在售账号</span>
            </div>
            <div class="stat-divider"></div>
            <div class="stat-item">
              <span class="stat-num">6</span>
              <span class="stat-label">热门游戏</span>
            </div>
            <div class="stat-divider"></div>
            <div class="stat-item">
              <span class="stat-num">100<span class="stat-plus">%</span></span>
              <span class="stat-label">担保交易</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 游戏分类 -->
    <section class="page-section">
      <div class="container">
        <h2 class="section-title">热门游戏</h2>
        <div class="game-grid">
          <div
            v-for="(info, key) in GAME_TYPES"
            :key="key"
            class="game-card"
            @click="$router.push(`/list/${key}`)"
          >
            <div class="game-card-bg" :style="{ background: info.bg }">
              <div class="game-card-glow"></div>
              <img v-if="info.image" :src="info.image" :alt="info.label" class="game-cover-img" @error="onImgError" />
              <span class="game-emoji">{{ info.icon }}</span>
            </div>
            <div class="game-card-info">
              <span class="game-name">{{ info.label }}</span>
              <span class="game-count">{{ itemStore.getItemsByGame(key).length }} 个账号</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 热门推荐 -->
    <section class="page-section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">热门推荐</h2>
          <button class="view-all-btn" @click="$router.push('/list')">
            查看全部
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>
        </div>
        <div class="item-grid">
          <ItemCard v-for="item in hotItems" :key="item.id" :item="item" />
        </div>
      </div>
    </section>

    <!-- 最新上架 -->
    <section class="page-section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">最新上架</h2>
          <button class="view-all-btn" @click="$router.push('/list')">
            查看全部
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>
        </div>
        <div class="item-grid">
          <ItemCard v-for="item in latestItems" :key="item.id" :item="item" />
        </div>
      </div>
    </section>

    <!-- 平台优势 -->
    <section class="page-section advantages-section">
      <div class="container">
        <h2 class="section-title">为什么选择 GAMEVAULT</h2>
        <div class="adv-grid">
          <div class="adv-card" v-for="adv in advantages" :key="adv.title">
            <div class="adv-icon-wrap">
              <span class="adv-icon" v-html="adv.svg"></span>
            </div>
            <h3>{{ adv.title }}</h3>
            <p>{{ adv.desc }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useItemStore } from '@/stores/item'
import { GAME_TYPES } from '@/constants'
import ItemCard from '@/components/ItemCard.vue'

const router = useRouter()
const itemStore = useItemStore()
const heroSearch = ref('')

onMounted(() => { itemStore.init() })

const hotItems = computed(() => itemStore.getHotItems())
const latestItems = computed(() => itemStore.getLatestItems())

const doSearch = () => {
  const kw = heroSearch.value.trim()
  if (!kw) return
  router.push({ name: 'Search', query: { q: kw } })
}

const onImgError = (e) => {
  e.target.style.display = 'none'
}

const advantages = [
  { title: '担保交易', desc: '平台全程担保，资金安全有保障', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="28" height="28"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>' },
  { title: '极速发货', desc: '卖家快速响应，账号即买即用', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="28" height="28"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>' },
  { title: '严格验号', desc: '每个账号经过严格审核验证', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="28" height="28"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>' },
  { title: '专属客服', desc: '7×24小时在线客服，随时解答', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="28" height="28"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>' }
]
</script>

<style lang="scss" scoped>
.hero-section {
  position: relative;
  padding: 80px 0 60px;
  overflow: hidden;
}

.hero-bg {
  position: absolute;
  inset: 0;

  .hero-grid {
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(var(--color-primary-rgb), 0.06) 1px, transparent 1px),
      linear-gradient(90deg, rgba(var(--color-primary-rgb), 0.06) 1px, transparent 1px);
    background-size: 40px 40px;
    mask-image: radial-gradient(ellipse at center, black 30%, transparent 70%);
  }

  .hero-orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(80px);
  }

  .hero-orb-1 {
    width: 400px;
    height: 400px;
    background: rgba(var(--color-primary-rgb), 0.12);
    top: -100px;
    right: -50px;
  }

  .hero-orb-2 {
    width: 300px;
    height: 300px;
    background: rgba(var(--color-accent-rgb), 0.08);
    bottom: -80px;
    left: -50px;
  }
}

.hero-content {
  text-align: center;
  position: relative;
  z-index: 1;
}

.hero-badge {
  display: inline-block;
  padding: 6px 16px;
  border-radius: 20px;
  background: rgba(var(--color-primary-rgb), 0.1);
  border: 1px solid rgba(var(--color-primary-rgb), 0.2);
  color: var(--color-primary);
  font-size: 13px;
  font-weight: 500;
  margin-bottom: 24px;
}

.hero-title {
  margin-bottom: 16px;

  .title-line {
    display: block;
    font-family: var(--font-display);
    font-size: 44px;
    font-weight: 900;
    color: var(--color-text);
    letter-spacing: 3px;
    line-height: 1.2;
  }

  .title-accent {
    display: block;
    font-family: var(--font-display);
    font-size: 44px;
    font-weight: 900;
    letter-spacing: 3px;
    line-height: 1.2;
    background: linear-gradient(135deg, var(--color-primary), var(--color-primary-light), var(--color-accent));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}

.hero-desc {
  font-size: 15px;
  color: var(--color-text-secondary);
  margin-bottom: 36px;
  letter-spacing: 2px;
}

.hero-search {
  max-width: 540px;
  margin: 0 auto 44px;

  .search-box {
    display: flex;
    align-items: center;
    background: var(--color-card);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    padding: 4px 4px 4px 16px;
    transition: all 0.3s;

    &:focus-within {
      border-color: rgba(var(--color-primary-rgb), 0.4);
      box-shadow: 0 0 24px rgba(var(--color-primary-rgb), 0.1);
    }

    svg {
      color: var(--color-text-muted);
      flex-shrink: 0;
    }

    input {
      flex: 1;
      border: none;
      background: transparent;
      padding: 10px 12px;
      color: var(--color-text);
      font-size: 14px;
      font-family: var(--font-body);
      outline: none;

      &::placeholder {
        color: var(--color-text-muted);
      }
    }

    .search-btn {
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

      &:hover {
        box-shadow: 0 0 20px rgba(var(--color-primary-rgb), 0.4);
      }
    }
  }
}

.hero-stats {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 40px;

  .stat-item {
    text-align: center;

    .stat-num {
      display: block;
      font-family: var(--font-display);
      font-size: 28px;
      font-weight: 800;
      color: var(--color-text);
    }

    .stat-plus {
      font-size: 16px;
      color: var(--color-primary);
    }

    .stat-label {
      font-size: 12px;
      color: var(--color-text-muted);
      margin-top: 2px;
    }
  }

  .stat-divider {
    width: 1px;
    height: 32px;
    background: var(--color-border);
  }
}

.game-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 14px;
}

.game-card {
  cursor: pointer;
  overflow: hidden;
  text-align: center;
  background: var(--color-card);
  border-radius: var(--radius-md);
  border: 1px solid var(--color-border);
  transition: all 0.35s;

  &:hover {
    border-color: rgba(var(--color-primary-rgb), 0.3);
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0,0,0,0.3);

    .game-card-glow {
      opacity: 1;
    }

    .game-emoji {
      transform: scale(1.15);
    }
  }

  .game-card-bg {
    height: 90px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;

    .game-card-glow {
      position: absolute;
      inset: 0;
      background: radial-gradient(circle at center, rgba(var(--color-primary-rgb), 0.15), transparent 70%);
      opacity: 0;
      transition: opacity 0.35s;
      z-index: 2;
    }

    .game-cover-img {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      z-index: 1;

      & + .game-emoji {
        opacity: 0;
      }
    }

    .game-emoji {
      font-size: 36px;
      filter: drop-shadow(0 2px 8px rgba(0,0,0,0.3));
      position: relative;
      z-index: 0;
      transition: transform 0.35s;
    }
  }

  .game-card-info {
    padding: 10px;

    .game-name {
      display: block;
      font-size: 13px;
      font-weight: 600;
      color: var(--color-text);
      margin-bottom: 2px;
    }

    .game-count {
      font-size: 11px;
      color: var(--color-text-muted);
    }
  }
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;

  .section-title {
    margin-bottom: 0;
  }
}

.view-all-btn {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 6px 14px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  background: transparent;
  color: var(--color-text-secondary);
  font-size: 13px;
  font-family: var(--font-body);
  cursor: pointer;
  transition: all 0.25s;

  &:hover {
    border-color: var(--color-primary);
    color: var(--color-primary);
  }
}

.item-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 18px;
}

.advantages-section {
  padding: 48px 0;
}

.adv-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 18px;
}

.adv-card {
  text-align: center;
  padding: 28px 20px;
  border-radius: var(--radius-md);
  background: var(--color-card);
  border: 1px solid var(--color-border);
  transition: all 0.35s;

  &:hover {
    border-color: rgba(var(--color-primary-rgb), 0.3);
    transform: translateY(-4px);
    box-shadow: 0 0 24px rgba(var(--color-primary-rgb), 0.08);

    .adv-icon-wrap {
      box-shadow: 0 0 20px rgba(var(--color-primary-rgb), 0.3);
    }
  }

  .adv-icon-wrap {
    width: 52px;
    height: 52px;
    border-radius: 14px;
    background: rgba(var(--color-primary-rgb), 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 14px;
    color: var(--color-primary);
    transition: box-shadow 0.35s;
  }

  h3 {
    font-size: 15px;
    font-weight: 600;
    margin-bottom: 6px;
    color: var(--color-text);
  }

  p {
    font-size: 12px;
    color: var(--color-text-muted);
    line-height: 1.6;
  }
}

@media (max-width: 768px) {
  .hero-title .title-line,
  .hero-title .title-accent {
    font-size: 26px;
  }
  .game-grid {
    grid-template-columns: repeat(3, 1fr);
  }
  .item-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .adv-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
