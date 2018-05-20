pragma solidity ^0.4.24;

contract Lottery {
    address public manager;
    address[] public players;

    constructor() public payable{
        manager = msg.sender;

    }

    function enter() public payable{
        require(msg.value > 0.01 ether);

        players.push(msg.sender);
    }

    function random() private view returns (uint) {
        return uint(keccak256(block.difficulty, now, players));
    }

    function pickWinner() public onlyManagerCanCall {
        uint index = random() % players.length;
        players[index].transfer(address(this).balance);
        players = new address[](0);
    }

    modifier onlyManagerCanCall() {
        require(msg.sender == manager);
        _;
    }
    function returnEntries() onlyManagerCanCall {

    }

    function getPlayers() public view returns (address[]){
        return players;
    }
}