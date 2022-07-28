import { ethers } from "hardhat";

async function main() {
  // const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  // const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
  // const unlockTime = currentTimestampInSeconds + ONE_YEAR_IN_SECS;

  // const lockedAmount = ethers.utils.parseEther("1");

  // const Lock = await ethers.getContractFactory("Lock");
  // const lock = await Lock.deploy(unlockTime, { value: lockedAmount });

  // await lock.deployed();

  // console.log("Lock with 1 ETH deployed to:", lock.address);

  const KioskContract = await ethers.getContractFactory("KioskERC1155");
  const kiosk = await KioskContract.deploy(
    false,  //soulbound
    false,  //voidWhenSold
    500,    //supply
    2,      //BuyBlock
    25,     //price
    5,      //times
    true,   //decay
    25000   //timedelta
  );
  await kiosk.deployed();
  console.log("FactoryContract should be deployed at", kiosk.address)
  

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
