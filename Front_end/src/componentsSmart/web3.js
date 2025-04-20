import Web3 from "web3";

const getWeb3 = ()=>{


    if(window.ethereum){

        const web3 = new Web3(window.ethereum);
       return web3;
    }
};
export default getWeb3;