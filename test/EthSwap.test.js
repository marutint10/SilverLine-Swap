const Token = artifacts.require("Token");
const PrivateSale = artifacts.require("PrivateSale");

require("chai")
  .use(require("chai-as-promised"))
  .should();

function tokens(n) {
  return web3.utils.toWei(n, "ether");
}

contract("PrivateSale", ([deployer, investor]) => {
  let token, privateSale;

  before(async () => {
    token = await Token.new();
    privateSale = await PrivateSale.new(token.address);
    await token.transfer(privateSale.address, tokens("1000000"));
  });

  describe("Token deployement", async () => {
    it("contract has a name", async () => {
      const name = await token.name();
      assert.equal(name, "SilverLine");
    });
  });

  describe("PrivateSale deployement", async () => {
    it("contract has a name", async () => {
      const name = await privateSale.name();
      assert.equal(name, "SilverLine exchange");
    });
  });

  it("contract has tokens", async () => {
    let balance = await token.balanceOf(privateSale.address);
    assert.equal(balance.toString(), tokens("1000000"));
  });

  describe("buyTokens()", async () => {
    let result;

    before(async () => {
      result = await privateSale.buyTokens({
        from: investor,
        value: web3.utils.toWei("1", "ether"),
      });
    });
    it("Allows user to instantly purchase tokens from privateSale for a fixed price", async () => {
      let investorBalance = await token.balanceOf(investor);
      assert.equal(investorBalance.toString(), tokens("100"));

      let privateSaleBalance;
      privateSaleBalance = await token.balanceOf(privateSale.address);
      assert.equal(privateSaleBalance.toString(), tokens("999900"));
      privateSaleBalance = await web3.eth.getBalance(privateSale.address);
      assert.equal(
        privateSaleBalance.toString(),
        web3.utils.toWei("1", "Ether")
      );

      const event = result.logs[0].args;
      assert.equal(event.account, investor);
      assert.equal(event.token, token.address);
      assert.equal(event.amount.toString(), tokens("100").toString());
      assert.equal(event.rate.toString(), "100");
    });
  });

  describe("sellTokens()", async () => {
    let result;

    before(async () => {
      await token.approve(privateSale.address, tokens("100"), {
        from: investor,
      });
      result = await privateSale.sellTokens(tokens("100"), { from: investor });
    });

    it("Allows user to instantly sell tokens to privateSale for a fixed price", async () => {
      let investorBalance = await token.balanceOf(investor);
      assert.equal(investorBalance.toString(), tokens("0"));
      let privateSaleBalance;
      privateSaleBalance = await token.balanceOf(privateSale.address);
      assert.equal(privateSaleBalance.toString(), tokens("1000000"));
      privateSaleBalance = await web3.eth.getBalance(privateSale.address);
      assert.equal(
        privateSaleBalance.toString(),
        web3.utils.toWei("0", "Ether")
      );

      const event = result.logs[0].args;
      assert.equal(event.account, investor);
      assert.equal(event.token, token.address);
      assert.equal(event.amount.toString(), tokens("100").toString());
      assert.equal(event.rate.toString(), "100");

      await privateSale.sellTokens(tokens("500"), { from: investor }).should.be
        .rejected;
    });
  });
});
