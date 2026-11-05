import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const [Owner, Repository] = (process.env.GITHUB_REPOSITORY ?? '').split('/')
const IsUserPage = Repository === `${Owner}.github.io`
const Base = Repository && !IsUserPage ? `/${Repository}/` : '/'

export default defineConfig({ base: Base, plugins: [react()] })
