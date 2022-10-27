import { HardhatUserConfig } from "hardhat/config"
import "@nomicfoundation/hardhat-toolbox"
import "dotenv/config"
import "@nomiclabs/hardhat-waffle"
import "@nomiclabs/hardhat-etherscan"
import "@nomiclabs/hardhat-ethers"
import "@typechain/hardhat"
import "hardhat-gas-reporter"
import "solidity-coverage"
import "./tasks/block-number"

const MUMBAI_RPC_URL =
  process.env.MUMBAI_RPC_URL || "https://rpc-mumbai.maticvigil.com"
const PRIVATE_KEY: any = process.env.PRIVATE_KEY || ""
const ETHERSCAN_API_KEY: any = process.env.ETHERSCAN_API_KEY || ""
const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY || ""

const config: HardhatUserConfig = {
  solidity: "0.8.8",
  defaultNetwork: "hardhat",
  networks: {
    mumbai: {
      url: MUMBAI_RPC_URL,
      accounts: [PRIVATE_KEY],
      chainId: 80001,
    },
    localhost: {
      url: "http://127.0.0.1:8545",
      chainId: 31337,
    },
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
  gasReporter: {
    enabled: true,
    currency: "USD",
    outputFile: "gas-report.txt",
    noColors: true,
    token: "MATIC",
    coinmarketcap: COINMARKETCAP_API_KEY,
  },
}

export default config
