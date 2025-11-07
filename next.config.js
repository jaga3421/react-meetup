/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'upload.wikimedia.org',
            },
            {
                protocol: 'https',
                hostname: 'cdn.icon-icons.com',
            },
            {
                protocol: 'https',
                hostname: 'qph.cf2.quoracdn.net',
            },
            {
                protocol: 'https',
                hostname: 'example.com',
            },
            {
                protocol: 'https',
                hostname: 'securitymagazine.com',
            },
            {
                protocol: 'https',
                hostname: 'forbes.com',
            },
            {
                protocol: 'https',
                hostname: 'www.analyticsinsight.net',
            },
            {
                protocol: 'https',
                hostname: 'ncbi.nlm.nih.gov',
            },
            {
                protocol: 'https',
                hostname: 'images.hindustantimes.com',
            },
            {
                protocol: 'https',
                hostname: 'ceblog.s3.amazonaws.com',
            },
            {
                protocol: 'https',
                hostname: 'media.licdn.com',
            },
        ],
    },
}

module.exports = nextConfig
