import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useOrderStore = defineStore('order-store', () => {
  const orders = ref([])

  const createOrder = (item, buyerId) => {
    const order = {
      id: 'ord_' + Date.now(),
      itemId: item.id,
      itemTitle: item.title,
      gameType: item.gameType,
      coverImage: item.coverImage || '',
      amount: item.price,
      buyerId,
      sellerId: item.sellerId,
      sellerName: item.sellerName,
      status: 'pending', // pending -> paid -> completed / cancelled
      createdAt: new Date().toISOString()
    }
    orders.value.unshift(order)
    return order
  }

  const getMyOrders = (userId) => {
    return orders.value.filter(o => o.buyerId === userId)
  }

  const updateOrderStatus = (orderId, status) => {
    const order = orders.value.find(o => o.id === orderId)
    if (order) order.status = status
  }

  const isItemPurchased = (itemId) => {
    return orders.value.some(o => o.itemId === itemId && o.status !== 'cancelled')
  }

  const getItemBuyer = (itemId) => {
    const order = orders.value.find(o => o.itemId === itemId && o.status !== 'cancelled')
    return order ? order.buyerId : null
  }

  return { orders, createOrder, getMyOrders, updateOrderStatus, isItemPurchased, getItemBuyer }
}, {
  persist: true
})
