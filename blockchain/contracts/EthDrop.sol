// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.5.0 <0.9.0;

/**
 * @title EthDrop
 * @author Amsavarthan Lv.
 * @dev Storing sender, receiver & ipfs hash in event for lower gas fees.
 **/

contract EthDrop {

  event Transaction(address indexed sender, address indexed receiver, string data, uint indexed timestamp);

  function transferFile(address _to, string calldata _data) external {
    emit Transaction(msg.sender, _to, _data, block.timestamp);
  }

}
