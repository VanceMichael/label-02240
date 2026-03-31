export const GAME_TYPES = {
  lol: {
    label: '英雄联盟',
    icon: '⚔️',
    image: 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Yasuo_0.jpg',
    images: [
      'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Ahri_0.jpg',
      'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Zed_0.jpg',
      'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Lux_0.jpg',
      'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/LeeSin_0.jpg'
    ],
    svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>`,
    color: '#1E90FF',
    bg: 'linear-gradient(135deg, #0F2027, #203A43, #2C5364)'
  },
  wzry: {
    label: '王者荣耀',
    icon: '👑',
    image: 'https://game.gtimg.cn/images/yxzj/img201606/skin/hero-info/510/510-bigskin-1.jpg',
    images: [
      'https://game.gtimg.cn/images/yxzj/img201606/skin/hero-info/199/199-bigskin-1.jpg',
      'https://game.gtimg.cn/images/yxzj/img201606/skin/hero-info/131/131-bigskin-1.jpg',
      'https://game.gtimg.cn/images/yxzj/img201606/skin/hero-info/112/112-bigskin-1.jpg',
      'https://game.gtimg.cn/images/yxzj/img201606/skin/hero-info/106/106-bigskin-1.jpg'
    ],
    svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M2 4l3 12h14l3-12-5 4-5-4-5 4-5-4z"/><path d="M5 16l-1 4h16l-1-4"/></svg>`,
    color: '#FF6B35',
    bg: 'linear-gradient(135deg, #1A0A2E, #3D1D72, #7B2D8E)'
  },
  yuanshen: {
    label: '原神',
    icon: '✦',
    image: 'https://gi.yatta.moe/assets/UI/UI_Gacha_AvatarImg_Shougun.png',
    images: [
      'https://gi.yatta.moe/assets/UI/UI_Gacha_AvatarImg_Hutao.png',
      'https://gi.yatta.moe/assets/UI/UI_Gacha_AvatarImg_Ganyu.png',
      'https://gi.yatta.moe/assets/UI/UI_Gacha_AvatarImg_Zhongli.png',
      'https://gi.yatta.moe/assets/UI/UI_Gacha_AvatarImg_Ayaka.png'
    ],
    svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>`,
    color: '#FFD93D',
    bg: 'linear-gradient(135deg, #0D1B2A, #1B2838, #2A4858)'
  },
  csgo: {
    label: 'CS2',
    icon: '🎯',
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/730/header.jpg',
    images: [
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/730/ss_796601d9d67faf53486eeb26d0724347cea67ddc.1920x1080.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/730/ss_d830cfd0550fbb64d80e803e93c929c3abb02056.1920x1080.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/730/ss_13bb35638c0267759276f511ee97064773b37a51.1920x1080.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/730/ss_0f8cf82d019c614760fd20801f2bb4001da7ea77.1920x1080.jpg'
    ],
    svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/><path d="M12 2v4M12 18v4M2 12h4M18 12h4"/></svg>`,
    color: '#FF4500',
    bg: 'linear-gradient(135deg, #1A0000, #3D0C02, #5C1A0A)'
  },
  minecraft: {
    label: 'Minecraft',
    icon: '⛏️',
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1672970/header.jpg',
    images: [
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1672970/ss_46ee31494b5d144d5ef6670cb5a1564abbc26fab.1920x1080.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1672970/ss_73b488e696e3ae45f5d0a5750de524c231dab8a2.1920x1080.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1672970/ss_9cb3efba6636610ec78eddd550147ed5ee7be3a0.1920x1080.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1672970/ss_52883e4263c8f8bca14236118ab62c0f70f2c8d0.1920x1080.jpg'
    ],
    svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><rect x="7" y="7" width="4" height="4"/><rect x="13" y="13" width="4" height="4"/></svg>`,
    color: '#4CAF50',
    bg: 'linear-gradient(135deg, #0A1A0A, #1B3A1B, #2D5A2D)'
  },
  valorant: {
    label: 'Valorant',
    icon: '◆',
    image: 'https://media.valorant-api.com/agents/add6443a-41bd-e414-f6ad-e58d267f4e95/fullportrait.png',
    images: [
      'https://media.valorant-api.com/agents/eb93336a-449b-9c1b-0a54-a891f7921d69/fullportrait.png',
      'https://media.valorant-api.com/agents/a3bfb853-43b2-7238-a4f1-ad90e9e46bcc/fullportrait.png',
      'https://media.valorant-api.com/agents/569fdd95-4d10-43ab-ca70-79becc718b46/fullportrait.png',
      'https://media.valorant-api.com/agents/8e253930-4c05-31dd-1b6c-968525494517/fullportrait.png'
    ],
    svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polygon points="12,2 22,8.5 22,15.5 12,22 2,15.5 2,8.5"/><polygon points="12,6 18,9.5 18,14.5 12,18 6,14.5 6,9.5"/></svg>`,
    color: '#FF4655',
    bg: 'linear-gradient(135deg, #1A0A0A, #3D1520, #5C2030)'
  }
}

export const ORDER_STATUS = {
  pending: { label: '待付款', type: 'warning' },
  paid: { label: '已付款', type: 'primary' },
  completed: { label: '已完成', type: 'success' },
  cancelled: { label: '已取消', type: 'info' }
}

export const ITEM_STATUS = {
  on_sale: { label: '在售', type: 'success' },
  sold: { label: '已售', type: 'info' },
  off_shelf: { label: '已下架', type: 'warning' }
}
