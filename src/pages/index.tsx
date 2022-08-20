import type { NextPageWithLayout } from 'next'
import { Layout } from '@/layouts/Layout'
import { HomePage } from '@/pages/Home'

const Home: NextPageWithLayout = () => <HomePage />

Home.getLayout = (page) => <Layout>{page}</Layout>

export default Home
