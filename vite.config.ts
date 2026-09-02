import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"
import path from "path"

// https://vite.dev/config/
export default defineConfig({
	plugins: [react(), tailwindcss()],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
	build: {
		target: "esnext",
		cssCodeSplit: true,
		minify: "esbuild",
		rollupOptions: {
			output: {
				manualChunks(id) {
					if (id.includes("node_modules")) {
						if (id.includes("react") || id.includes("react-dom")) {
							return "vendor-react"
						}
						if (id.includes("gsap") || id.includes("simplex-noise")) {
							return "vendor-animations"
						}
						if (id.includes("lucide-react")) {
							return "vendor-icons"
						}
						if (id.includes("@supabase")) {
							return "vendor-supabase"
						}
						return "vendor-libs"
					}
				},
			},
		},
		chunkSizeWarningLimit: 600,
	},
})
