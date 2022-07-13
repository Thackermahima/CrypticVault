// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "./CrypticVaultToken.sol";

contract CrypticVault is Ownable {
    struct emergencyAlert {
        address user;
        string subject;
        string message;
    }

    mapping(address => bool) private loginStatus;
    mapping(address => mapping(address => bool)) private transferStatus;
    mapping(address => address) private users;
    mapping(address => string[]) private members;

    mapping(address => uint256) private tokenIds;
    mapping(address => emergencyAlert) private alerts;
    mapping(address => string[]) private documents;

    event TokenCreated(address, address);
    event TokenTransfered(address, address, address, uint256);

    function getLoginStatus(address caller) public view returns (bool) {
        return loginStatus[caller];
    }

    function createToken(string memory name, string memory symbol) public {
        address _address = address(new CrypticVaultToken(name, symbol)); // Created Token contract.

        emit TokenCreated(msg.sender, _address);
    }

    function bulkMintERC721(
        address tokenAddress,
        uint256 start,
        uint256 end
    ) public {
        for (uint256 i = start; i < end; i++) {
            CrypticVaultToken(tokenAddress).safeMint(msg.sender);
        }
        loginStatus[msg.sender] = true;
        users[msg.sender] = tokenAddress;
        setTokenId(end - 1);
    }

    function transferToken(
        address from,
        address payable to,
        address token,
        uint256 amount
    ) public {
        CrypticVaultToken(token).transferTokens(from, to, token, amount);
        transferStatus[from][to] = true;
        emit TokenTransfered(from, to, token, amount);
    }

    function getTokenAddress(address userAddress)
        public
        view
        returns (address)
    {
        return users[userAddress];
    }

    function storeDocuments(string memory cid) public {
        documents[msg.sender].push(cid);
    }

    function getDocuments(address userAddress)
        public
        view
        returns (string[] memory)
    {
        return documents[userAddress];
    }

    function createMembers(string memory cid) public {
        members[msg.sender].push(cid);
    }

    function getMembers(address userAddress)
        public
        view
        returns (string[] memory)
    {
        return members[userAddress];
    }

    function createEmergencyAlert(
        address userAddress,
        string memory subject,
        string memory message
    ) public {
        emergencyAlert storage newAlert = alerts[msg.sender];
        newAlert.user = userAddress;
        newAlert.subject = subject;
        newAlert.message = message;
    }

    function getEmergencyAlert(address userAddress)
        public
        view
        returns (emergencyAlert memory)
    {
        return alerts[userAddress];
    }

    function setTokenId(uint256 tokenId) public {
        tokenIds[msg.sender] = tokenId;
    }

    function getTokenId(address userAddress) public view returns (uint256) {
        return tokenIds[userAddress];
    }

    function getTransferStatus(address adminAddress, address memberAddress)
        public
        view
        returns (bool)
    {
        return transferStatus[adminAddress][memberAddress];
    }
}
