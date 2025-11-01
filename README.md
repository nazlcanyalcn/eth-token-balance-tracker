# eth-token-balance-tracker
# 🔍 Ethereum Token Balance Tracker

A simple and elegant web application to check Ethereum wallet balances and popular ERC-20 token holdings.

## ✨ Features

- 💰 Check ETH balance for any Ethereum address
- 🪙 View balances of popular ERC-20 tokens (USDT, USDC, DAI, LINK, WBTC)
- 🎨 Clean and modern user interface
- ⚡ Fast and lightweight
- 📱 Fully responsive design

## 🚀 Demo

Simply enter any Ethereum address (starting with `0x`) and click "Check Balance" to see the wallet's holdings.

**Try with Vitalik's address:**
```
0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb
```

## 🛠️ Technologies Used

- **HTML5** - Structure
- **CSS3** - Styling with gradient design
- **JavaScript** - Blockchain interaction
- **Alchemy API** - Ethereum node provider

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/nazlcanyalcn/eth-token-balance-tracker.git
cd eth-token-balance-tracker
```

2. Get a free Alchemy API key:
   - Go to [alchemy.com](https://www.alchemy.com/)
   - Sign up for a free account
   - Create a new app on Ethereum Mainnet
   - Copy your API key

3. Configure the app:
   - Open `config.js`
   - Replace `YOUR_ALCHEMY_API_KEY_HERE` with your actual API key

4. Open `index.html` in your browser

That's it! No build process or dependencies required.

## 🎯 How It Works

The application uses Alchemy's JSON-RPC API to:
1. Fetch ETH balance using `eth_getBalance`
2. Query ERC-20 token balances using `eth_call` with the `balanceOf` function
3. Display results in a user-friendly interface

## 🔒 Security Note

**Important:** Never commit your actual API key to a public repository! 

For production use, consider:
- Using environment variables
- Implementing a backend proxy
- Rate limiting requests

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Nazlıcan Yalçın**
- GitHub: [@nazlcanyalcn](https://github.com/nazlcanyalcn)

## 🙏 Acknowledgments

- Thanks to [Alchemy](https://www.alchemy.com/) for providing free API access
- Inspired by the Ethereum developer community

---

⭐ If you find this project helpful, please give it a star!