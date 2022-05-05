import React, { createContext, useContext, useEffect, useState } from 'react';
import { Contract } from 'web3-eth-contract';
import { useInjectedProvider } from 'contexts/injectedProviderContext';
import WethAbi from 'contracts/wethAbi.json';

type ContractContextType = {
  contract?: Contract;
  // eslint-disable-next-line no-unused-vars
  setContract: (contract: Contract) => void;
};

export const ContractContext = createContext<ContractContextType>({
  contract: undefined,
  // eslint-disable-next-line no-unused-vars
  setContract: (contract: Contract) => {},
});

interface ContractProps {
  children: any;
}

const wethAddrs: any = {
  mainnet: '0x85FA00f55492B0437b3925381fAaf0E024747627',
  rinkeby: '0xdf032bc4b9dc2782bb09352007d4c57b75160b15',
  kovan: '0xd0a1e359811322d97991e03f863a0c30c2cf029c',
  xdai: '0xe91D153E0b41518A2Ce8Dd3D7944Fa863463a97d',
  matic: '0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270',
  arbitrum: '0x82af49447d8a07e3bd95bd0d56f35241523fbab1',
  'arbitrum-testnet': '0xB47e6A5f8b33b3F17603C83a0535A9dcD7E32681',
  optimism: '0x4200000000000000000000000000000000000006',
  'optimism-kovan': '0x4200000000000000000000000000000000000006',
};

export const ContractContextProvider: React.FC<ContractProps> = ({
  children,
}: ContractProps) => {
  const [contract, setContract] = useState<Contract>();
  const { injectedChain, web3Modal, injectedProvider } = useInjectedProvider();

  useEffect(() => {
    const initContract = async () => {
      console.log('network name', injectedChain.network);
      try {
        const contract: Contract = await new injectedProvider.eth.Contract(
          WethAbi,
          wethAddrs[injectedChain.network],
        );
        console.log('Contract: ', contract);
        setContract(contract);
      } catch (e) {
        console.error(`Could not init contract`);
      }
    };

    if (injectedProvider?.eth && injectedChain?.network) {
      initContract();
    }
  }, [injectedChain, web3Modal.web3]);

  return (
    <ContractContext.Provider value={{ contract, setContract }}>
      {children}
    </ContractContext.Provider>
  );
};

export const useContract = () => {
  const { contract, setContract } = useContext(ContractContext);
  return { contract, setContract };
};
