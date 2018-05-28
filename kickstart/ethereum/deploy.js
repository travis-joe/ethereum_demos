const HDWalletProvider = require("truffle-hdwallet-provider");
const Web3 = require("web3");
const compiledFactory = require("./build/CampaignFactory.json");

const provider = new HDWalletProvider(
  "account tube bridge swift chimney panda account couple begin split impulse level",
  "https://rinkeby.infura.io/oIVWAAqt431Nwt6VYoJZ "
);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  console.log("account:" + accounts[0]);

  const result = await new web3.eth.Contract(
    JSON.parse(compiledFactory.interface)
  )
    .deploy({ data: "0x" + compiledFactory.bytecode })
    .send({ gas: "1000000", from: accounts[0] });

  console.log("address:" + result.options.address);
};

deploy();
