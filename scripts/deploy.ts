import { ethers, run, network } from "hardhat"

async function main() {
  // 1. Deploy the contract
  const SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage")
  console.log("Deploying contract...")
  const simpleStorage = await SimpleStorageFactory.deploy()
  await simpleStorage.deployed()

  console.log("Deployed contract to:", simpleStorage.address)

  // 2. verify contract
  if (network.config.chainId === 80001 && process.env.ETHERSCAN_API_KEY) {
    console.log("Waiting for 6 blocks confirmations...")
    await simpleStorage.deployTransaction.wait(6)
    console.log("Verifying contract...")
    await verify(simpleStorage.address, [])
  }

  // 3. test contract
  let currentValue = await simpleStorage.retrieve()
  console.log(`Current value: ${currentValue}`)

  // 4. set new value
  console.log("Updating contract...")
  let transactionResponse = await simpleStorage.store(7)
  await transactionResponse.wait(1) // returns transaction receipt

  currentValue = await simpleStorage.retrieve()
  console.log(`Updated value: ${currentValue}`)
}

// This function is called at the end of the script to verify the contract
async function verify(contractAddress: string, args: any[]) {
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
    })
  } catch (e: any) {
    if (
      e.message.toLowerCase().includes("contract source code already verified")
    ) {
      console.log("Contract already verified")
    } else {
      console.log("Error verifying contract: ", e)
    }
  }
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
