import { ethers } from "hardhat";
require("dotenv").config()

async function main() {

  // const KioskContract = await ethers.getContractFactory("KioskERC1155");
  // const kiosk = await KioskContract.deploy(
  //   false,  //soulbound
  //   false,  //voidWhenSold
  //   500,    //supply
  //   2,      //BuyBlock
  //   25,     //price
  //   5,      //times
  //   true,   //decay
  //   25000,   //timedelta
  //   process.env.TRUSTED_FORWARDER as string
  // );
  // await kiosk.deployed();
  // console.log("FactoryContract should be deployed at", kiosk.address)

  const FactoryContract = await ethers.getContractFactory("Factory");
  const factory = await FactoryContract.deploy()
  console.log("FactoryContract deployed at ", factory.address)
  

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
