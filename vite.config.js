import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { ghPages } from "vite-plugin-gh-pages";

// https://vite.dev/config/
export default defineConfig({
  base: "/CRUD-Training/",
  plugins: [react(), tailwindcss(), ghPages()],
});
