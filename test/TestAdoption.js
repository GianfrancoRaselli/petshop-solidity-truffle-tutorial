const Adoption = artifacts.require("Adoption");

contract("AdoptionTest", () => {

  before(async () => {
    // The address of the adoption contract to be tested
    this.adoption = await Adoption.deployed();

    // The id of the pet that will be used for testing
    this.expectedPetId = 7;

    // The expected owner of adopted pet
    this.expectedAdopter = '0xFC35bCC90AF057B2F5B367990c63C9C0C2A20b87';
  });

  it("Testing the adopt() function", async () => {
    await this.adoption.adopt(this.expectedPetId, { from: this.expectedAdopter });
  });

  it("Testing retrieval of a single pet's owner", async () => {
    const adopter = await this.adoption.adopters(this.expectedPetId);

    assert.equal(adopter, this.expectedAdopter, "Owner of the expected pet should be this contract");
  });

  it("Testing retrieval of all pet owners", async () => {
    const adopters = await this.adoption.getAdopters();

    assert.equal(adopters[this.expectedPetId], this.expectedAdopter, "Owner of the expected pet should be this contract");
  });

});
