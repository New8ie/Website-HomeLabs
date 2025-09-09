declare module "astro:db" {
  export const db: import("/src/db/config.ts").AstroDB;
  export * from "/src/db/config.ts";
  export { default } from "/src/db/config.ts";
}
