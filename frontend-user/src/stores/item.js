import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { GAME_TYPES } from '@/constants'

// 生成初始演示数据
const generateSeedData = () => {
  const items = []
  const games = Object.keys(GAME_TYPES)
  const servers = ['电信一区', '网通二区', '双线三区', '全服', '安卓服', 'iOS服']
  const titles = {
    lol: ['钻石段位满皮肤号', '大师段位稀有皮肤', '全英雄全皮肤账号', '王者段位传承号'],
    wzry: ['荣耀王者百星号', '全英雄全皮肤号', '巅峰赛2500+', '限定皮肤收藏号'],
    yuanshen: ['满命五星角色号', 'AR60满探索号', '深渊满星账号', '限定角色全收集'],
    csgo: ['全球精英账号', '龙狙+蝴蝶刀', '十年陈号稀有皮肤', '高段位信誉号'],
    minecraft: ['正版Java+基岩版', '大量稀有皮肤', '高级会员账号', 'Hypixel高等级'],
    valorant: ['永恒钻石段位', '全特工解锁号', '稀有枪皮收藏', '超凡入圣账号']
  }
  const descs = [
    '账号状态良好，无任何封禁记录。所有装备/皮肤均为正规获取，支持验号。',
    '老号转让，投入大量时间和精力，现因工作原因忍痛出售。',
    '精心培养的账号，数据优秀，适合想要高起点的玩家。',
    '稀有收藏号，多个绝版道具/皮肤，极具收藏价值。'
  ]

  games.forEach(game => {
    const gameTitles = titles[game] || titles.lol
    const gameImages = GAME_TYPES[game]?.images || []
    for (let i = 0; i < 4; i++) {
      items.push({
        id: `item_${game}_${i}`,
        title: gameTitles[i],
        gameType: game,
        server: servers[Math.floor(Math.random() * servers.length)],
        level: Math.floor(Math.random() * 200) + 30,
        price: Math.floor(Math.random() * 5000) + 100,
        originalPrice: Math.floor(Math.random() * 3000) + 5000,
        description: descs[i],
        screenshots: [],
        coverImage: gameImages[i] || '',
        highlights: ['无封禁记录', '支持验号', '可改绑手机'],
        sellerId: 'u_seed_seller',
        sellerName: '官方精选卖家',
        status: 'on_sale',
        viewCount: Math.floor(Math.random() * 500) + 50,
        createdAt: new Date(Date.now() - Math.random() * 30 * 86400000).toISOString()
      })
    }
  })
  return items
}

export const useItemStore = defineStore('item-store', () => {
  const items = ref([])
  const favorites = ref([]) // 收藏的 itemId 列表

  // 初始化数据
  const init = () => {
    if (items.value.length === 0) {
      items.value = generateSeedData()
    } else if (items.value.some(i => i.coverImage === undefined)) {
      // 迁移：为旧数据补充 coverImage
      const gameImageIndex = {}
      items.value.forEach(item => {
        const images = GAME_TYPES[item.gameType]?.images || []
        if (item.coverImage === undefined && images.length) {
          if (!gameImageIndex[item.gameType]) gameImageIndex[item.gameType] = 0
          item.coverImage = images[gameImageIndex[item.gameType] % images.length]
          gameImageIndex[item.gameType]++
        }
      })
    }
  }

  const allItems = computed(() => items.value.filter(i => i.status === 'on_sale'))

  const getItemById = (id) => items.value.find(i => i.id === id)

  const getItemsByGame = (gameType) => {
    return allItems.value.filter(i => i.gameType === gameType)
  }

  const searchItems = (keyword) => {
    const kw = keyword.toLowerCase()
    return allItems.value.filter(i =>
      i.title.toLowerCase().includes(kw) ||
      i.description.toLowerCase().includes(kw) ||
      (GAME_TYPES[i.gameType]?.label || '').toLowerCase().includes(kw)
    )
  }

  const getHotItems = () => {
    return [...allItems.value].sort((a, b) => b.viewCount - a.viewCount).slice(0, 8)
  }

  const getLatestItems = () => {
    return [...allItems.value].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 8)
  }

  const publishItem = (data) => {
    // 为新发布的账号随机分配一张该游戏的封面图
    const images = GAME_TYPES[data.gameType]?.images || []
    const coverImage = images.length ? images[Math.floor(Math.random() * images.length)] : ''
    const newItem = {
      ...data,
      id: 'item_' + Date.now(),
      coverImage: data.coverImage || coverImage,
      status: 'on_sale',
      viewCount: 0,
      createdAt: new Date().toISOString()
    }
    items.value.unshift(newItem)
    return newItem
  }

  const incrementView = (id) => {
    const item = items.value.find(i => i.id === id)
    if (item) item.viewCount++
  }

  const toggleFavorite = (itemId) => {
    const idx = favorites.value.indexOf(itemId)
    if (idx === -1) {
      favorites.value.push(itemId)
      return true
    } else {
      favorites.value.splice(idx, 1)
      return false
    }
  }

  const isFavorited = (itemId) => favorites.value.includes(itemId)

  const getFavoriteItems = () => {
    return items.value.filter(i => favorites.value.includes(i.id))
  }

  const getMyPublished = (userId) => {
    return items.value.filter(i => i.sellerId === userId)
  }

  const removeItem = (id) => {
    const idx = items.value.findIndex(i => i.id === id)
    if (idx !== -1) items.value.splice(idx, 1)
  }

  const updateItemStatus = (id, status) => {
    const item = items.value.find(i => i.id === id)
    if (item) item.status = status
  }

  return {
    items, favorites, allItems, init,
    getItemById, getItemsByGame, searchItems,
    getHotItems, getLatestItems, publishItem,
    incrementView, toggleFavorite, isFavorited,
    getFavoriteItems, getMyPublished, removeItem, updateItemStatus
  }
}, {
  persist: true
})
