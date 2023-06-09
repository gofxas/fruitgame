export default {
    includeAssets: ['favicon.svg'],
    manifest: false,
    registerType: 'autoUpdate',
    workbox: {
      runtimeCaching: [
        {
          urlPattern: /(.*?)\.(js|css|ts|md)/, // js /css /ts静态资源缓存
          handler: 'CacheFirst',
          options: {
            cacheName: 'js-css-cache',
          },
        },
        {
          urlPattern: /(.*?)\.(png|jpe?g|svg|gif|bmp|psd|tiff|tga|eps)/, // 图片缓存
          handler: 'CacheFirst',
          options: {
            cacheName: 'image-cache',
          },
        },
      ],
    },
  }