import { initApp } from "./main";

const { app, router, store } = initApp();

declare let window: any;
if (window.__INITIAL_STATE__) {
  // 注水
  store.replaceState(window.__INITIAL_STATE__)
}

router.isReady().then(() => {
  router.beforeResolve((to, from, next) => {
    // 获取要进入页面路径匹配到的 页面组件
    const matched = to.matched;

    // 获取上一个页面路径匹配到的 页面组件
    const prevMatched = from.matched;

    // 两个页面组件不是同一个组件就不过滤调
    let diffed = false
    const activated = matched.filter((c, i) => {
      return diffed || (diffed = (prevMatched[i] !== c))
    })

    const titleHooks: any[] = []; // 设置页面标题
    // 调用每个页面的 asyncData 方法，返回 Promise 对象
    const asyncDataHooks: any[] = []; // 获取同步数据
    activated.forEach((c: any) => {
      const title = c.components.title || c.components.default.title;
      const asyncData = c.components.asyncData || c.components.default.asyncData;
      if (asyncData) {
        asyncDataHooks.push(asyncData({ route: router.currentRoute, store }));
      }

      if (title) {
        titleHooks.push(title);
      }
    });

    // 设置页面标题
    if (titleHooks.length > 0) {
      const titleHook = titleHooks[titleHooks.length - 1];
      if (typeof titleHook === 'function') {
        titleHook().then((t: string) => {
          document.title = t;
        });
      } else if (typeof titleHook === 'string') {
        document.title = titleHook;
      }
    }


    // 没有直接显示界面
    if (!asyncDataHooks.length) {
      return next()
    }
    // 触发全部
    Promise.all(asyncDataHooks).finally(next);
  });

  app.mount("#app");
});
