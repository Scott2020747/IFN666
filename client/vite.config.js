import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: "/construction-cost-estimator",
  plugins: [react()],
})