import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  "0x7a3085f4a7814295d581b5a2aaf1288a5bb31b20"
);

export default instance;
