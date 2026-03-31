<template>
  <footer class="app-footer">
    <div class="footer-glow"></div>
    <div class="container footer-inner">
      <div class="footer-brand">
        <div class="brand-logo">
          <div class="logo-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20">
              <polygon points="12,2 22,8.5 22,15.5 12,22 2,15.5 2,8.5" />
              <polygon points="12,6 18,9.5 18,14.5 12,18 6,14.5 6,9.5" />
            </svg>
          </div>
          <span class="brand-name">GAMEVAULT</span>
        </div>
        <p class="brand-desc">安全、便捷的游戏账号交易平台</p>
      </div>
      <div class="footer-links">
        <div class="link-group">
          <h4>交易服务</h4>
          <span class="footer-link" @click="showTip('买家保障')">买家保障</span>
          <span class="footer-link" @click="showTip('卖家指南')">卖家指南</span>
          <span class="footer-link" @click="showTip('交易流程')">交易流程</span>
        </div>
        <div class="link-group">
          <h4>帮助中心</h4>
          <span class="footer-link" @click="showTip('常见问题')">常见问题</span>
          <span class="footer-link" @click="showTip('联系客服')">联系客服</span>
          <span class="footer-link" @click="showTip('投诉建议')">投诉建议</span>
        </div>
        <div class="link-group">
          <h4>关于我们</h4>
          <span class="footer-link" @click="showTip('平台介绍')">平台介绍</span>
          <span class="footer-link" @click="showTip('用户协议')">用户协议</span>
          <span class="footer-link" @click="showTip('隐私政策')">隐私政策</span>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <div class="container">
        <p>© 2026 GameVault. 仅供学习交流使用，非真实交易平台。</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ElMessage } from 'element-plus'

const showTip = (name) => {
  ElMessage.info(`「${name}」功能正在建设中，敬请期待`)
}
</script>

<style lang="scss" scoped>
.app-footer {
  background: var(--color-bg-elevated);
  color: var(--color-text-secondary);
  margin-top: 60px;
  position: relative;
  overflow: hidden;
}

.footer-glow {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--color-primary), var(--color-primary-light), var(--color-accent), transparent);
  opacity: 0.6;
}

.footer-inner {
  display: flex;
  justify-content: space-between;
  padding: 52px 24px 36px;
  gap: 48px;
}

.footer-brand {
  .brand-logo {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 12px;
  }

  .logo-icon {
    width: 36px;
    height: 36px;
    border-radius: 8px;
    background: linear-gradient(135deg, var(--color-primary), var(--color-primary-light));
    color: #0A0E17;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .brand-name {
    font-family: var(--font-display);
    font-size: 16px;
    font-weight: 800;
    letter-spacing: 2px;
    color: var(--color-text);
  }

  .brand-desc {
    font-size: 13px;
    color: var(--color-text-muted);
    margin-bottom: 16px;
  }
}

.footer-links {
  display: flex;
  gap: 56px;

  .link-group {
    h4 {
      font-family: var(--font-body);
      color: var(--color-text);
      font-size: 13px;
      font-weight: 600;
      margin-bottom: 16px;
      letter-spacing: 0.5px;
    }

    a, .footer-link {
      display: block;
      font-size: 13px;
      color: var(--color-text-muted);
      margin-bottom: 10px;
      cursor: pointer;
      transition: color 0.2s;

      &:hover {
        color: var(--color-primary);
      }
    }
  }
}

.footer-bottom {
  border-top: 1px solid var(--color-border);
  padding: 16px 0;
  text-align: center;
  font-size: 12px;
  color: var(--color-text-muted);
}
</style>
