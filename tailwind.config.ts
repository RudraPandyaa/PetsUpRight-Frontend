import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#c3b5df',
          DEFAULT: '#44476f',
          dark: '#000000',
        },
        soft: '#ede7e7',
      },
    },
  },
}