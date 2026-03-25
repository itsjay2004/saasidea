import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background:    "var(--background)",
        foreground:    "var(--foreground)",
        surface:       "var(--surface)",
        "surface-2":   "var(--surface-2)",
        "surface-alt": "var(--surface-alt)",
        border:        "var(--border)",
        "border-light": "var(--border-light)",
        "text-primary": "var(--text-primary)",
        "text-muted":   "var(--text-muted)",
        "text-subtle":  "var(--text-subtle)",
        accent:          "var(--accent)",
        "accent-hover":  "var(--accent-hover)",
        "accent-light":  "var(--accent-light)",
        "accent-subtle": "var(--accent-subtle)",
        success: "var(--success)",
        warning: "var(--warning)",
        danger:  "var(--danger)",
      },
      fontFamily: {
        heading: ['var(--font-newsreader)', 'serif'],
        body:    ['var(--font-dm-sans)', 'sans-serif'],
      },
      borderRadius: {
        card:    '8px',
        'card-lg': '12px',
        button:  '20px',
      },
      boxShadow: {
        card:        'var(--shadow-sm)',
        'card-md':   'var(--shadow-md)',
        'card-lg':   'var(--shadow-lg)',
        'accent':    'var(--shadow-accent)',
      },
      animation: {
        'fade-in-up':  'fadeInUp 0.65s cubic-bezier(0.16,1,0.3,1) both',
        'fade-in':     'fadeIn 0.5s ease both',
        'float':       'float 5s ease-in-out infinite',
        'float-alt':   'floatAlt 6.5s ease-in-out infinite',
        'slide-down':  'slideDown 0.2s ease-out',
        'pulse-dot':   'pulseDot 2s ease-in-out infinite',
        'spin-slow':   'spin 8s linear infinite',
        'marquee':     'marquee 20s linear infinite',
      },
      keyframes: {
        fadeInUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-10px)' },
        },
        floatAlt: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(8px)' },
        },
        slideDown: {
          from: { opacity: '0', transform: 'translateY(-8px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        pulseDot: {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0.35' },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to:   { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
