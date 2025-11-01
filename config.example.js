// Alchemy API Configuration
// INSTRUCTIONS: 
// 1. Copy this file and rename it to 'config.js'
// 2. Replace 'YOUR_ALCHEMY_API_KEY_HERE' with your actual Alchemy API key
// 3. Get your free API key from https://www.alchemy.com/

const CONFIG = {
    // Buraya Alchemy API key'inizi yazın
    ALCHEMY_API_KEY: '7r_Tio0Whb0Guvf2r14BvjzrM0ZnYjCK',
    
    // Alchemy API endpoint (Ethereum Mainnet)
    ALCHEMY_URL: 'https://eth-mainnet.g.alchemy.com/v2/7r_Tio0Whb0Guvf2r14BvjzrM0ZnYjCK',
    
    // Popüler ERC-20 token adresleri
    POPULAR_TOKENS: [
        {
            address: '0xdac17f958d2ee523a2206206994597c13d831ec7',
            symbol: 'USDT',
            name: 'Tether USD',
            decimals: 6
        },
        {
            address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
            symbol: 'USDC',
            name: 'USD Coin',
            decimals: 6
        },
        {
            address: '0x6b175474e89094c44da98b954eedeac495271d0f',
            symbol: 'DAI',
            name: 'Dai Stablecoin',
            decimals: 18
        },
        {
            address: '0x514910771af9ca656af840dff83e8264ecf986ca',
            symbol: 'LINK',
            name: 'Chainlink',
            decimals: 18
        },
        {
            address: '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599',
            symbol: 'WBTC',
            name: 'Wrapped Bitcoin',
            decimals: 8
        }
    ]
};