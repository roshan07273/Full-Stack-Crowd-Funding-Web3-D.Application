import React, { useState, createContext, useContext } from "react";
import {
  useAddress,
  useContract,
  useMetamask,
  useContractWrite,
} from "@thirdweb-dev/react";
import { ethers } from "ethers";

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  // SECTION Connecting with our contract
  const { contract } = useContract(
    "0x3659dD89f713Be1B27D825C2e1CB3f4437036a0a"
  );

  // SECTION Writing Data in contract {first way to write data with thirdweb}
  const { mutateAsync: createCampaign } = useContractWrite(
    contract,
    "createCampaign"
  );

  // SECTION getting the address of the browser wallet
  const address = useAddress();

  // SECTION Connect with metamask
  const connect = useMetamask();

  // SECTION Create Campaign Function
  const publishCampaign = async (form) => {
    try {
      // NOTE pass the form inside "createCampaign contract function" in same order as inside contract's parameters
      const data = await createCampaign(
        [
          address, // owner = who is creating this campaign
          form.title, // campaign title
          form.description, // description
          form.target, // target amount
          new Date(form.deadline).getTime(), // deadline in current date
          form.image, // image
        ],
        { gasLimit: 2500000 }
      );

      console.log("contract call success", data);
    } catch (error) {
      console.log("contract call failure", error);
    }
  };

  // SECTION Get Campaigns {Reading data from the blockchain}
  // NOTE there's another function in thirdweb to read the data that is "useContractRead"
  const getCampaigns = async () => {
    const campaigns = await contract.call("getCampaigns");

    // NOTE converting bignumbers into human readable data
    const parsedCampaigns = campaigns.map((campaign, i) => ({
      owner: campaign.owner,
      title: campaign.title,
      description: campaign.description,
      target: ethers.utils.formatEther(campaign.target.toString()),
      deadline: campaign.deadline.toNumber(),
      amountCollected: ethers.utils.formatEther(campaign.amountCollected),
      image: campaign.image,
      // campaign ID
      cId: i,
    }));

    return parsedCampaigns;
  };

  // SECTION function to get only the campaigns we created
  const getUserCampaigns = async () => {
    const allCampaigns = await getCampaigns();

    const filteredCampaigns = allCampaigns.filter(
      (campaign) => campaign.owner === address
    );

    return filteredCampaigns;
  };

  // SECTION function to donate {second way to write data with thirdweb}
  const donate = async (cId, amount) => {
    const data = await contract.call("donateToCampaign", cId, {
      value: ethers.utils.parseEther(amount),
    });

    return data;
  };

  // SECTION function to get donators list
  const getDonations = async (cId) => {
    const donations = await contract.call("getDonators", cId);

    // NOTE number of donations on a each specific project
    const numberOfDonations = donations[0].length;

    const parsedDonations = [];

    for (let i = 0; i < numberOfDonations; i++) {
      parsedDonations.push({
        donator: donations[0][i],
        donation: ethers.utils.formatEther(donations[1][i].toString()),
      });
    }

    return parsedDonations;
  };

  return (
    <StateContext.Provider
      value={{
        address,
        connect,
        contract,
        // renaming publishCampaign to createCampaign
        createCampaign: publishCampaign,
        getCampaigns,
        getUserCampaigns,
        donate,
        getDonations,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
