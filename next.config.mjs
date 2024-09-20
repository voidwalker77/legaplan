/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
                source: '/',
                destination: '/home-tarefas',
                permanent: false,
            },
        ]
    },
}

export default nextConfig
