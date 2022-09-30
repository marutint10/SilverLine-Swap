const PrivateSale = artifacts.require("PrivateSale");
const Token = artifacts.require("Token");

module.exports = async function(deployer) {
  await deployer.deploy(Token);
  const token = await Token.deployed();

  await deployer.deploy(PrivateSale, token.address);
  const privateSale = await PrivateSale.deployed();

  await token.transfer(privateSale.address, "1000000000000000000000000");
};
