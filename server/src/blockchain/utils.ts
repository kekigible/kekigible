require("dotenv").config()

const ethers = require("ethers");
const provider = new ethers.providers.JsonRpcProvider("https://rpc-mumbai.maticvigil.com");
const signer = new ethers.Wallet(process.env.PRIVATE_KEY as string, provider)

//@ts-ignore
import factorySol from '../../../contracts/artifacts/contracts/Factory.sol/Factory.json'

//@ts-ignore
import kioskSol from '../../../contracts/artifacts/contracts/KioskERC1155.sol/KioskERC1155.json'

const factory = new ethers.Contract(process.env.FACTORY_ADDRESS, kioskSol.abi, signer)

export {provider, signer, factorySol, kioskSol}