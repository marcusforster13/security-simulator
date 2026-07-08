/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Paleta "centro de comando" — escuro, com acentos de status.
        // Usada em toda a interface para reforçar a identidade de sala de operações.
        ops: {
          bg: '#0a0e14',
          panel: '#111826',
          border: '#1f2937',
          accent: '#22d3ee',
        },
        status: {
          covered: '#22c55e',   // verde — área monitorada
          partial: '#eab308',   // amarelo — cobertura parcial
          blind: '#ef4444',     // vermelho — ponto cego
        },
      },
    },
  },
  plugins: [],
};
