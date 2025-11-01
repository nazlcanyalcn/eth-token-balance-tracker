// DOM Elements
const walletInput = document.getElementById('walletAddress');
const checkButton = document.getElementById('checkBalance');
const loadingDiv = document.getElementById('loading');
const errorDiv = document.getElementById('error');
const resultsDiv = document.getElementById('results');
const ethBalanceDiv = document.getElementById('ethBalance');
const tokenListDiv = document.getElementById('tokenList');

// Event Listeners
checkButton.addEventListener('click', handleCheckBalance);
walletInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleCheckBalance();
});

// Main Function
async function handleCheckBalance() {
    const address = walletInput.value.trim();
    
    // Validate address
    if (!isValidAddress(address)) {
        showError('Please enter a valid Ethereum address (0x...)');
        return;
    }
    
    // Show loading
    hideAll();
    loadingDiv.classList.remove('hidden');
    
    try {
        // Get ETH balance
        const ethBalance = await getEthBalance(address);
        
        // Get token balances
        const tokenBalances = await getTokenBalances(address);
        
        // Display results
        displayResults(ethBalance, tokenBalances);
        
    } catch (error) {
        console.error('Error:', error);
        showError('Failed to fetch balances. Please check your API key and try again.');
    }
}

// Validate Ethereum Address
function isValidAddress(address) {
    return /^0x[a-fA-F0-9]{40}$/.test(address);
}

// Get ETH Balance
async function getEthBalance(address) {
    const url = CONFIG.ALCHEMY_URL + CONFIG.ALCHEMY_API_KEY;
    
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            jsonrpc: '2.0',
            id: 1,
            method: 'eth_getBalance',
            params: [address, 'latest']
        })
    });
    
    const data = await response.json();
    
    if (data.error) {
        throw new Error(data.error.message);
    }
    
    // Convert from Wei to ETH
    const balanceWei = parseInt(data.result, 16);
    const balanceEth = balanceWei / 1e18;
    
    return balanceEth;
}

// Get Token Balances
async function getTokenBalances(address) {
    const url = CONFIG.ALCHEMY_URL + CONFIG.ALCHEMY_API_KEY;
    const balances = [];
    
    for (const token of CONFIG.POPULAR_TOKENS) {
        try {
            const balance = await getTokenBalance(address, token, url);
            if (balance > 0) {
                balances.push({
                    ...token,
                    balance: balance
                });
            }
        } catch (error) {
            console.error(`Error fetching ${token.symbol}:`, error);
        }
    }
    
    return balances;
}

// Get Individual Token Balance
async function getTokenBalance(address, token, url) {
    // ERC-20 balanceOf function signature
    const data = '0x70a08231000000000000000000000000' + address.slice(2);
    
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            jsonrpc: '2.0',
            id: 1,
            method: 'eth_call',
            params: [{
                to: token.address,
                data: data
            }, 'latest']
        })
    });
    
    const result = await response.json();
    
    if (result.error || !result.result || result.result === '0x') {
        return 0;
    }
    
    // Convert from smallest unit to token amount
    const balanceRaw = parseInt(result.result, 16);
    const balance = balanceRaw / Math.pow(10, token.decimals);
    
    return balance;
}

// Display Results
function displayResults(ethBalance, tokenBalances) {
    hideAll();
    
    // Display ETH balance
    ethBalanceDiv.textContent = ethBalance.toFixed(4) + ' ETH';
    
    // Display token balances
    tokenListDiv.innerHTML = '';
    
    if (tokenBalances.length === 0) {
        tokenListDiv.innerHTML = '<p style="text-align: center; color: #666; padding: 20px;">No popular tokens found in this wallet.</p>';
    } else {
        tokenBalances.forEach(token => {
            const tokenCard = document.createElement('div');
            tokenCard.className = 'token-item';
            tokenCard.innerHTML = `
                <div class="token-info">
                    <span class="token-symbol">${token.symbol}</span>
                    <span class="token-name">${token.name}</span>
                </div>
                <div class="balance-amount">${formatBalance(token.balance)}</div>
            `;
            tokenListDiv.appendChild(tokenCard);
        });
    }
    
    resultsDiv.classList.remove('hidden');
}

// Format Balance
function formatBalance(balance) {
    if (balance >= 1000000) {
        return (balance / 1000000).toFixed(2) + 'M';
    } else if (balance >= 1000) {
        return (balance / 1000).toFixed(2) + 'K';
    } else if (balance < 0.01) {
        return balance.toFixed(6);
    } else {
        return balance.toFixed(2);
    }
}

// Show Error
function showError(message) {
    hideAll();
    errorDiv.textContent = message;
    errorDiv.classList.remove('hidden');
}

// Hide All Sections
function hideAll() {
    loadingDiv.classList.add('hidden');
    errorDiv.classList.add('hidden');
    resultsDiv.classList.add('hidden');
}