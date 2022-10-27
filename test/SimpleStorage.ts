import { ethers } from "hardhat"
import { expect, assert } from "chai"
import { SimpleStorage, SimpleStorage__factory } from "../typechain-types"

describe("SimpleStorage", function () {
  let simpleStorage: SimpleStorage, SimpleStorageFactory: SimpleStorage__factory

  beforeEach(async () => {
    SimpleStorageFactory = (await ethers.getContractFactory(
      "SimpleStorage"
    )) as SimpleStorage__factory
    simpleStorage = await SimpleStorageFactory.deploy()
  })

  it("Should start with a favorite number of 0", async function () {
    let currentValue = await simpleStorage.retrieve()
    expect(currentValue).to.equal(0)
  })

  it("Should update when we call store", async function () {
    let expectedValue = 7
    let transactionResponse = await simpleStorage.store(expectedValue)
    let transactionReceipt = await transactionResponse.wait()
    console.log("Gas used: ", transactionReceipt.gasUsed.toString())
    let currentValue = await simpleStorage.retrieve()
    expect(currentValue).to.equal(expectedValue)
  })

  it("Should add person to the list", async function () {
    const transactionResponse = await simpleStorage.addPerson("Gabriel", 7)
    await transactionResponse.wait(1)
    const person = await simpleStorage.people(0)
    assert.deepEqual(
      [person.favoriteNumber.toString(), person.name],
      ["7", "Gabriel"]
    )
  })
})
