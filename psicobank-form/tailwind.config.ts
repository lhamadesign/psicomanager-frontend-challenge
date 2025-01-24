import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Roboto", "sans-serif"],
      },
      fontSize: {
        'heading-2': ['24px', { lineHeight: '24px' }],
        'heading-3': ['20px', { lineHeight: '20px' }],
        'heading-4': ['20px', { lineHeight: '20px' }],
        'body-1': ['16px', { lineHeight: '24px' }],
        'body-2': ['14px', { lineHeight: '20px' }],
        'body-4': ['12px', { lineHeight: '20px' }]
      },
      colors: {
        'primary': {
          '00': '#334094',
          '10': '#D5DBFF',
          '20': '#96A5FF',
          '30': '#00127A',
          '40': '#000C52',
        },
        'secondary': {
          '00': '#005359',
          '10': '#00C4D1',
          '20': '#99E8ED',
        },
        'neutral': {
          '00': '#FFFFFF',
          '05': '#F5F5F5',
          '10': '#EFF0F0',
          '20': '#E8E9E9',
          '30': '#CCD1D3',
          '40': '#AEB9BF',
          '50': '#90A4AE',
          '60': '#7D8C94',
          '70': '#677176',
          '80': '#4C5153',
          '90': '#3D3D3D',
        },
        'context': {
          'sucess': {
            'light': '#DEF7E4',
            'medium': '#28A745',
            'dark': '#1C7330',
          },
          'warning': {
            'light': '#FFFAD6',
            'medium': '#F4D400',
            'dark': '#CCB400',
          },
          'information': {
            'light': '#ECF5FE',
            'medium': '#2196F3',
            'dark': '#042C4E',
          },
          'error': {
            'light': '#FEF2EC',
            'medium': '#F44336',
            'dark': '#83171A',
          },
        },
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      boxShadow: {
        '16': '0 0 16 0 rgba(125, 140, 148, 0.5)',
        '32': '0 0 32 0 rgba(125, 140, 148, 0.5)'
      },
      screens: {
        'phone': '360px',
        'tablet': '768px', 
        'desktop': '1920px'
      }
    },
  },
  plugins: [],
} satisfies Config;
