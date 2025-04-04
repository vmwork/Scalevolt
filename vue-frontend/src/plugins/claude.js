import { generateWithClaude, claudeHelpers } from '@/services/claudeService';

export default {
  install(app) {
    // Make claude available as a global property
    app.config.globalProperties.$claude = {
      generate: generateWithClaude,
      ...claudeHelpers
    };
  }
};