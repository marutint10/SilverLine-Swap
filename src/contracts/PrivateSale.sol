//SPDX-License-Identifier: MIT
pragma solidity^0.8.13;

import "./Token.sol";

contract PrivateSale {
    string public name = "SilverLine exchange";
    Token public token;
    uint256 public rate = 100;

    event TokensPurchased(
        address account,
        address token,
        uint256 amount,
        uint256 rate
    );

    event TokensSold(
        address account,
        address token,
        uint256 amount,
        uint256 rate
    );

    constructor(Token _token) {
        token = _token;
    }

    function buyTokens() public payable {
        uint256 tokenAmount = msg.value * rate;

        require(token.balanceOf(address(this)) >= tokenAmount);

        token.transfer(msg.sender, tokenAmount);

        emit TokensPurchased(msg.sender, address(token), tokenAmount, rate);
    }

    function sellTokens(uint256 _amount) public  {
        require(token.balanceOf(msg.sender) >= _amount);

        uint256 etherAmount = _amount / rate;

        require(address(this).balance >= etherAmount);

        token.transferFrom(msg.sender, address(this), _amount);
        payable(msg.sender).transfer(etherAmount);

        emit TokensSold(msg.sender, address(token), _amount, rate);
    }
}