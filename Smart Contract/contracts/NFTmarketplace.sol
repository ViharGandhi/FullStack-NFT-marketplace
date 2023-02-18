//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;



import "hardhat/console.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract NFTmarketplace is ERC721URIStorage {
    using Counters for Counters.Counter;

    Counters.Counter private tokenID;
    Counters.Counter private itemsold;
    address  owner;

    constructor() ERC721('BLOCK','BLC'){
        owner = payable(msg.sender);
    }

    struct ListToken{
        uint tokeid;
        address owner;
        address seller;
        uint price;
        bool islisted;
    }

    mapping(uint256 => ListToken) private idtolisttoken;
    event TokenListedSuccess (
        uint256 indexed tokenId,
        address owner,
        address seller,
        uint256 price,
        bool currentlyListed
    );

    function getLatestidtotoken() public view returns(ListToken memory){
        uint256 latest_token = tokenID.current();
        return idtolisttoken[latest_token];
    }
    function getListedtokenforid(uint256 _tokenid) public view returns(ListToken memory){
        return idtolisttoken[_tokenid];
    }
    function Createtoken(string memory tokenURI,uint price) public returns(uint256){
        tokenID.increment();
        uint newtokenid = tokenID.current();
        _safeMint(msg.sender, newtokenid);
        _setTokenURI(newtokenid, tokenURI);
        Createlistedtoken(price ,newtokenid);
        return newtokenid;
    }
    function Createlistedtoken(uint256 price , uint256 _tokenid)public{
        require(price  >  0 , "Send correct price");
        idtolisttoken[_tokenid] = ListToken(
            _tokenid,
            payable(address(this)),
            payable(msg.sender),
            price,
            true
        );
        _transfer(msg.sender, address(this),_tokenid);
          emit TokenListedSuccess(
            _tokenid,
            address(this),
            msg.sender,
            price,
            true
        );
    }
    function getAllnft() public view returns(ListToken[] memory){
        uint totalnft = tokenID.current();
        ListToken[] memory items = new ListToken[](totalnft);
        uint index = 0;
        uint id = 0;

        for(uint256 i = 0;  i <totalnft ; i++ ){
            id = id + 1;
            ListToken storage newlist = idtolisttoken[id];
            items[index] = newlist;
            index++;
        }
        return items;
    }
    function getMynft() public view returns(ListToken[] memory){
        uint totalnft  = tokenID.current();
        uint itemcounter = 0;
        uint id = 0;
        for(uint256 i  = 0;i<totalnft;i++){
            id = id +1;
            if(idtolisttoken[id].owner==msg.sender || idtolisttoken[id].seller==msg.sender){
                itemcounter+=1;
            }
        }
            ListToken[] memory myitems = new ListToken[](itemcounter);
            uint currentindex = 0;
            uint currentid= 0;
            for(uint256 i = 0;i<totalnft;i++){
                if(idtolisttoken[i+1].owner==msg.sender || idtolisttoken[i+1].seller==msg.sender){
                    currentid = i+1;
                    ListToken storage newitem = idtolisttoken[currentid];
                    myitems[currentindex] = newitem;
                    currentindex+=1;
                }
            }
             return myitems; 
        }
       
    
        function executesale(uint tokenid) public payable{
        uint price = idtolisttoken[tokenid].price;
        address seller = idtolisttoken[tokenid].seller;
        require(msg.value == price, "Please submit the asking price in order to complete the purchase");

        idtolisttoken[tokenid].islisted = true;
        idtolisttoken[tokenid].seller = payable(msg.sender);
        itemsold.increment();

 
        _transfer(address(this), msg.sender, tokenid);
  
        approve(address(this), tokenid);
        transferFrom(msg.sender,address(this),tokenid);

        payable(seller).transfer(msg.value);
        }
}
//0x89374602682204395d34e3c524b641847aF00DC5