//https://nitro.unjs.io/config
export default defineNitroConfig({
  srcDir: "server",
  compatibilityDate: "2025-01-01",
  runtimeConfig: {
    apiToken: "dev_token",
    jwtSecret: "secret"
  }
});