// SPDX-License-Identifier: MIT
pragma solidity ^0.5.0;

contract Transfer {
    // Événement corrigé
    event Transferer(address indexed from, address indexed to, uint256 amount); 

    // Fonction de transfert, l'argument _from n'est plus nécessaire ici
    function transfer(address payable to) public payable {
        require(to != address(0), "Adresse invalide");
        require(msg.value > 0, "Montant doit être supérieur à 0");

        // Transfert des ethers
        to.transfer(msg.value);

        // Emission de l'événement
        emit Transferer(msg.sender, to, msg.value);
    }
}
