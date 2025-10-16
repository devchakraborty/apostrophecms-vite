module.exports = async ({
  sourceRoot, input
}) => {
  const vue = await import('@vitejs/plugin-vue');
  const apos = await import('./vite-plugin-apostrophe-alias.mjs');
  const pnpmResolve = await import('./vite-plugin-pnpm-resolve.mjs');

  /** @type {import('vite').UserConfig} */
  return {
    css: {
      preprocessorOptions: {
        scss: {
          // Hardcoded for now, we need to make it configurable in the future.
          additionalData: `
@use 'sass:math';
@use 'sass:color';
@use 'sass:map';

@import "${sourceRoot}/@apostrophecms/ui/apos/scss/mixins/import-all.scss";
`
        }
      }
    },
    plugins: [
      apos.default({
        id: 'apos',
        sourceRoot
      }),
      vue.default(),
      pnpmResolve.default()
    ],
    build: {
      chunkSizeWarningLimit: 2000,
      rollupOptions: {
        input
      }
    }
  };
};
