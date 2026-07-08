import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Configuração mínima. Quando entrarmos na Fase de assets (Blender/GLB),
// aqui é onde ajustamos limites de tamanho de asset e otimizações de build.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
  },
});
