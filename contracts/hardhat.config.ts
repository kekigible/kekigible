import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
require('dotenv').config();

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.9",
    settings: {
            optimizer: {
                enabled: true,
                runs: 9999,
            },
          }
  },
  defaultNetwork: "matic",
  networks: {
    hardhat: {
    },
    matic: {
      url: "https://rpc-mumbai.maticvigil.com",
      accounts: [process.env.PRIVATE_KEY as string]
    },
    localhost: {
      url: 'http://127.0.0.1:8545/',
    },
  }
};

export default config;
