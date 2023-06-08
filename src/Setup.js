import { ApiPromise, WsProvider, Keyring } from '@polkadot/api';
import { DispatchError, WeightV2 } from '@polkadot/types/interfaces'
import { numberToHex, u8aToString, stringToU8a, u8aToHex, hexToString, hexToU8a, BN, hexToBn, hexToNumber, } from '@polkadot/util'; // Some helper functions used here
import { ContractPromise, Abi } from '@polkadot/api-contract';
import { typeDefinitions } from '@polkadot/types';

// install with `yarn add @phala/sdk` .   //https://www.npmjs.com/package/@phala/sdk
import { PinkCodePromise, PinkBlueprintPromise, PinkContractPromise, OnChainRegistry, types, create, signCertificate, CertificateData, options, signAndSend } from '@phala/sdk'

import phat_boiler_plate_metadata from './Abis/phat_boiler_plate';  


let phala_api, phat_contract_boiler_plate,polkadot_test_account,certificate, certificateData;
const phat_contractId = "0x502a308532ed7c5253beacbe69fe3f2e68341159631a1a37073868dc3a6514fb"    //NEW PHALA TESTNET


//#region ***** Setup Substrate Chain //*****
const setup_SubstrateChain = async (wsURL = 'Phala') => {

	const wsProvider = new WsProvider('wss://poc5.phala.network/ws');

	const api = await ApiPromise.create({
		provider: wsProvider,
		types: { ...types, ...typeDefinitions }
	});
	console.log('Connected.')

	await api.isReady;
	console.log(`api => : `,api);
	console.log(" ********** API PROPERTIES ********** ");
	console.log((await api.rpc.system.properties()).toHuman());
	 
	console.log(" ********** phatRegistry ********** ");
	const phatRegistry = await OnChainRegistry.create(api)

	console.log(" ********** phat_abi ********** ");
	const phat_abi = phat_boiler_plate_metadata;

	console.log(" ********** phat_contractKey ********** ");
	const phat_contractKey = await phatRegistry.getContractKey(phat_contractId);
	console.log("phat_contractKey: ",phat_contractKey);

	console.log(" ********** Phala contract ********** ");
	const contract = new PinkContractPromise(api, phatRegistry, phat_abi, phat_contractId, phat_contractKey);
	console.log("contract:",contract.abi.messages.map((e)=>{return e.method}))
	
	// const clusterId = phatRegistry.clusterId;
    // // const clusterInfo = phatRegistry.clusterInfo
	// const pruntimeURL = phatRegistry.pruntimeURL;
	// console.log('Cluster ID:', clusterId)
	// console.log('Pruntime Endpoint URL:', pruntimeURL)

	phala_api = api;
	phat_contract_boiler_plate = contract;
	console.log("contract:",contract.abi.messages.map((e)=>{return e.method}))
	console.log(`phala_api is set`);
	await getAccountIdtoHex();   //USED FOR TESTING AND TO BE REPLACED BY POLKADOT EXTENSION
	await get_my_number();
	await get_my_message();

  return {api};
};
//#endregion 


let polkadotInjector = null, polkadotInjectorAddress=null;
const setPolkadotInjector = async (injector, injectorAddress) => { 
    polkadotInjector = injector;
    polkadotInjectorAddress = injectorAddress;
    console.log(`Setup New Polkadot Signer/Injector polkadotInjectorAddress: ${polkadotInjectorAddress} polkadotInjector.address: ${polkadotInjector.address} polkadotInjector: `,polkadotInjector);
	// Setup New Polkadot Signer/Injector polkadotInjectorAddress: 5DAqjjBN3CJteqrmps95HUmo325xDBuErC8BoNd88ud6Cxgo polkadotInjector: ...

console.log(`signCertificate: `,signCertificate);


	// Create the certificate object
	certificate = await signCertificate({
		api: phala_api,
		account: injectorAddress,
		signer: polkadotInjector,
	});

}

// FOR TESTING
//#region getAccountIdtoHex SET UP polkadot_test_account
const getAccountIdtoHex = async (accountI32="") => {
  const keyring = new Keyring({ type: 'sr25519' });
  const PHRASE = 'mean decade kidney strategy surround tilt friend quote kangaroo spice board silver'; //USAGI2 for server
  //ADDRESS   5EZwpfeoyhWbEhmfuSAv8ekL8BWfAc94pvRYJUFK6ASnbg4w
  const Alecia = keyring.addFromUri(PHRASE);
  polkadot_test_account = Alecia;
  console.log(`polkadot_test_account ADDRESS: ${polkadot_test_account.address}`); //5FP8MMBmPdBCMgG5AspTHVNWXXSEoR4vgJwSrehUj1qJAKxN

  certificateData = await signCertificate({
	api: phala_api,
	pair: Alecia, //keypair,
  });

}
//#endregion


//#region PHAT_query get_my_number
const get_my_number = async () => {
    
	if (phala_api) 
	{
		console.log(` ===> get_my_number `,certificateData);
		
		const contract = phat_contract_boiler_plate;

		//For queries use polkadot_test_account 
		const { output, result, debugMessage, gasConsumed, gasRequired, storageDeposit } = await contract.query.getMyNumber(polkadot_test_account.address, {cert: certificateData});

		// The actual result from RPC as `ContractExecResult`
		console.log("===> result.toHuman() : ",result.toHuman());
		// Ok: data: "0x00"

		// the gas consumed for contract execution
		console.log("===> gasRequired.toHuman() : ",gasRequired.toHuman()); 
		// {refTime: '6,219,235,328', proofSize: '131,072'}

		// check if the call was successful
		if (result.isOk) {
		// output the return value
		console.log('Success', output.toHuman());  //Success false
		return  output.toHuman()
		} else {
		console.error('Error', result.asErr);
		return result.asErr
		}

	}
	else { console.log(`PHALA API IS NOT SET UP YET`); return null }
}
//#endregion

const get_my_message = async () => {

	if (phala_api) 
	{
		const contract = phat_contract_boiler_plate;
		const { gasRequired, storageDeposit, result, output } = await contract.query.getMyMessage(polkadot_test_account.address, { cert: certificateData });

		if (result.isOk) {
			// output the return value
			console.log('Success', output.toHuman());  //Success false
			return  output.toHuman()
		} else {
			console.error('Error', result.asErr);
			return result.asErr
		}

	}
	else { console.log(`PHALA API IS NOT SET UP YET`); return null }
}




//THIS RUNS FINE BUT IS FOR TEST ACCOUNT THAT WE KNOW THE KEYPAIR
const set_my_numbers2 = async (newNumber=5) => {
	if (phala_api && phat_contract_boiler_plate) 
	{
		const contract = phat_contract_boiler_plate;
		// console.log(`set_my_number: ${newNumber} polkadotInjectorAddress: `,polkadotInjectorAddress);

	    // console.log(`set_my_number: ${newNumber} certificate: `,certificate);

		//DRY RUN
		const { gasRequired, storageDeposit } = await contract.query.setMyNumber(polkadot_test_account.address, { cert: certificateData }, newNumber);
		console.log("gasRequired & storageDeposit: ",gasRequired.toHuman(),storageDeposit.toHuman());

		const options = {
			gasLimit: gasRequired.refTime,
			storageDepositLimit: storageDeposit.isCharge ? storageDeposit.asCharge : null,
			cert: certificateData,
		}

		const tx = await contract.tx
		.setMyNumber(options, newNumber)
		.signAndSend(polkadot_test_account, { nonce: -1  }, ({ events = [], status, txHash }) => {
		  if (status.isInBlock) {
			  console.log("In Block")
		  }
		  if (status.isCompleted) {
			  console.log("Completed")
		  }
		  if (status.isFinalized) {
			console.log(`Transaction included at blockHash ${status.asFinalized}`);
			console.log(`Transaction hash ${txHash.toHex()}`);
	  
			// Loop through Vec<EventRecord> to display all events
			events.forEach(({ phase, event: { data, method, section } }) => {
			  console.log(`\t' ${phase}: ${section}.${method}:: ${data}`);
			});
		  }
		})
  
	}
	else console.log(`PHALA API IS NOT SET UP YET`);
  
}



//THIS IS WHAT WE WANT SO THE USER CAN SING USIGN HIS POLAKDOT EXTENSION ACCOUNT
const set_my_number = async (newNumber=5) => {
	if (phala_api && phat_contract_boiler_plate) 
	{
		const contract = phat_contract_boiler_plate;
		console.log(`set_my_number: ${newNumber} polkadotInjectorAddress: `,polkadotInjectorAddress);

	    console.log(`set_my_number: ${newNumber} certificate: `,certificate);

		//DRY RUN
		const { gasRequired, storageDeposit } = await contract.query.setMyNumber(polkadotInjectorAddress, { cert: certificate }, newNumber);
		console.log("gasRequired & storageDeposit: ",gasRequired.toHuman(),storageDeposit.toHuman());

		const options = {
			gasLimit: gasRequired.refTime,
			storageDepositLimit: storageDeposit.isCharge ? storageDeposit.asCharge : null,
			cert: certificate 
		}

		const tx = await contract.tx
		.setMyNumber(options, newNumber)
		.signAndSend(polkadotInjectorAddress, { signer:  polkadotInjector.signer }, ({ events = [], status, txHash }) => {
		  if (status.isInBlock) {
			  console.log("In Block")
		  }
		  if (status.isCompleted) {
			  console.log("Completed")
		  }
		  if (status.isFinalized) {
			console.log(`Transaction included at blockHash ${status.asFinalized}`);
			console.log(`Transaction hash ${txHash.toHex()}`);
	  
			// Loop through Vec<EventRecord> to display all events
			events.forEach(({ phase, event: { data, method, section } }) => {
			  console.log(`\t' ${phase}: ${section}.${method}:: ${data}`);
			});
		  }
		})
  
	}
	else console.log(`PHALA API IS NOT SET UP YET`);
  
}

const set_my_message = async (newMessage="Hello Phala World") => {
	if (phala_api && phat_contract_boiler_plate) 
	{
		const contract = phat_contract_boiler_plate;
		console.log(`set_my_number: ${newMessage} polkadotInjectorAddress: `,polkadotInjectorAddress);

		//DRY RUN
		const { gasRequired, storageDeposit } = await contract.query.setMyMessage(polkadot_test_account.address, { cert: certificateData }, newMessage);
		console.log("gasRequired & storageDeposit: ",gasRequired.toHuman(),storageDeposit.toHuman());

		const options = {
			gasLimit: gasRequired.refTime,
			storageDepositLimit: storageDeposit.isCharge ? storageDeposit.asCharge : null,
		}

		const tx = await contract.tx
		.setMyMessage(options, newMessage)
		.signAndSend(polkadotInjectorAddress, { signer:  polkadotInjector.signer }, result => {

			if (result.status.isInBlock) {
				console.log(' =====>>> in a block');
			} else if (result.status.isFinalized) {
				console.log(' =====>>> finalized');
				console.log('result: ',JSON.stringify(result,null,"\t"));
			}
		})
  
	}
	else console.log(`PHALA API IS NOT SET UP YET`);
  
}



export {
          setPolkadotInjector,
          setup_SubstrateChain, 
		  set_my_number,
		  set_my_message,
		  get_my_number,
		  get_my_message,
       };