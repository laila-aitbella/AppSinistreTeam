import React from 'react';
import { useState,useEffect } from 'react';
import getWeb3 from './web3';
import getContract from './contrat';

function TransferTest() {
    const [account,setAccount]=useState("");
    const [contract , setContract]=useState(null);
    const[amount,setAmount]=useState("");
    
    useEffect(
        ()=>{

            const compte = await getWeb3.getAccounts();
            const contract = await getContract();
            await contract.methods

        }
    )


  return (
    <div>TransferTest</div>
  )
}

export default TransferTest