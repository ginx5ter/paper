const contractAddress = '0x9AeB0ff23DF8c3d3a251AC31a0923419d8bCB43C';
const contractABI = [
    [
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_playerChoice",
                    "type": "uint256"
                }
            ],
            "name": "play",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "player",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "playerChoice",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ]
];

const web3 = new Web3('https://data-seed-prebsc-1-s1.binance.org:8545'); // Binance Smart Chain Testnet

const rockPaperScissorsContract = new web3.eth.Contract(contractABI, contractAddress);

async function playGame() {
    const choice = parseInt(document.getElementById('choice').value);

    try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0];

        const valueToSend = web3.utils.toWei('0.0001', 'ether'); // 0.0001 tBNB
        const result = await rockPaperScissorsContract.methods.play(choice).send({
            from: account,
            value: valueToSend
        });
        displayResult(result);
    } catch (error) {
        console.error('Error playing the game:', error);
    }
}

function displayResult(result) {
    const resultElement = document.getElementById('result');

    if (result.events && result.events.GameResult) {
        const gameResult = result.events.GameResult.returnValues[0];
        resultElement.innerHTML = `<strong>Result is:</strong> ${gameResult}`;
    } else {
        resultElement.innerHTML = '<strong>Error:</strong> Unable to determine the game result.';
    }
}
