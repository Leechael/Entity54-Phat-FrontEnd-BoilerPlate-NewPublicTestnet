#![cfg_attr(not(feature = "std"), no_std)]
extern crate alloc;

// pink_extension is short for Phala ink! extension
use pink_extension as pink;

#[pink::contract(env=PinkEnvironment)]
mod phat_boiler_plate {
    use super::pink;
    use ink::prelude::{format, string::String};
    use pink::{http_get, PinkEnvironment};
    use scale::{Decode, Encode};
    use serde::Deserialize;
    // you have to use crates with `no_std` support in contract.
    use serde_json_core;

    #[derive(Debug, PartialEq, Eq, Encode, Decode)]
    #[cfg_attr(feature = "std", derive(scale_info::TypeInfo))]
    pub enum Error {
        InvalidEthAddress,
        HttpRequestFailed,
        InvalidResponseBody,
    }

    /// Type alias for the contract's result type.
    pub type Result<T> = core::result::Result<T, Error>;

    /// Defines the storage of your contract.
    /// All the fields will be encrypted and stored on-chain.
    /// In this stateless example, we just add a useless field for demo.
    #[ink(storage)]
    pub struct PhatBoilerPlate {
        demo_field: bool,
        my_message: String,
        my_number: u8,
    }

    #[derive(Deserialize, Encode, Clone, Debug, PartialEq)]
    pub struct EtherscanResponse<'a> {
        status: &'a str,
        message: &'a str,
        result: &'a str,
    }

    impl PhatBoilerPlate {
        /// Constructor to initializes your contract
        #[ink(constructor)]
        pub fn new() -> Self {
            Self {
                demo_field: true,
                my_message: String::from("Hello World1"),
                my_number: 0,
            }
        }

        /// A function to handle direct off-chain Query from users.
        /// Such functions use the immutable reference `&self`
        /// so WILL NOT change the contract state.
        #[ink(message)]
        pub fn get_eth_balance(&self, account: String) -> Result<String> {
            if !account.starts_with("0x") && account.len() != 42 {
                return Err(Error::InvalidEthAddress);
            }

            // get account ETH balance with HTTP requests to Etherscan
            // you can send any HTTP requests in Query handler
            let resp = http_get!(format!(
                "https://api.etherscan.io/api?module=account&action=balance&address={}",
                account
            ));
            if resp.status_code != 200 {
                return Err(Error::HttpRequestFailed);
            }

            let result: EtherscanResponse = serde_json_core::from_slice(&resp.body)
                .or(Err(Error::InvalidResponseBody))?
                .0;
            Ok(String::from(result.result))
        }

        #[ink(message)]
        pub fn set_my_message(&mut self, new_message: String) {
            self.my_message = new_message;
        }

        #[ink(message)]
        pub fn get_my_message(&self) -> String {
            self.my_message.clone()
        }

        #[ink(message, payable)]
        pub fn set_my_number(&mut self, new_number: u8) {
            self.my_number = new_number;
        }

        #[ink(message)]
        pub fn get_my_number(&self) -> u8 {
            self.my_number
        }

        /// get contract balance
        #[ink(message)]
        pub fn contract_balance(&self) -> Balance {
            self.env().balance()
        }

        /// get contract address
        #[ink(message)]
        pub fn contract_address(&self) -> AccountId {
            self.env().account_id()
        }

        /// check if account is a contract
        #[ink(message)]
        pub fn account_is_contract(&self, account: AccountId) -> bool {
            self.env().is_contract(&account)
        }

        /// get_existential_deposit
        #[ink(message)]
        pub fn get_existential_deposit(&self) -> Balance {
            self.env().minimum_balance() //1
        }

        /// Withdraw all your balance from the contract.
        #[ink(message, payable)]
        pub fn withdraw(&mut self) {
            let caller = self.env().caller();
            let balance_to_transfer = self.env().balance() - self.env().minimum_balance();
            self.env().transfer(caller, balance_to_transfer).unwrap()
        }

        #[ink(message, payable)]
        pub fn give_me(&mut self, value: Balance) {
            ink::env::debug_println!("requested value: {}", value);
            ink::env::debug_println!("contract balance: {}", self.env().balance());

            assert!(value <= self.env().balance(), "insufficient funds!");

            if self.env().transfer(self.env().caller(), value).is_err() {
                panic!(
                    "requested transfer failed. this can be the case if the contract does not\
                     have sufficient free funds or if the transfer would have brought the\
                     contract's balance below minimum balance."
                )
            }
        }

        /// get account balance
        #[ink(message)]
        pub fn get_eoa_native_balance(&self) -> Balance {
            let caller = self.env().caller();
            pink::system::SystemRef::instance().total_balance_of(caller)
        }
    }

    /// Unit tests in Rust are normally defined within such a `#[cfg(test)]`
    /// module and test functions are marked with a `#[test]` attribute.
    /// The below code is technically just normal Rust code.
    #[cfg(test)]
    mod tests {
        /// Imports all the definitions from the outer scope so we can use them here.
        use super::*;
        /// Imports `ink_lang` so we can use `#[ink::test]`.
        use ink_lang as ink;

        /// We test a simple use case of our contract.
        #[ink::test]
        fn it_works() {
            // when your contract is really deployed, the Phala Worker will do the HTTP requests
            // mock is needed for local test
            pink_extension_runtime::mock_ext::mock_all_ext();

            let phat_boiler_plate = PhatBoilerPlate::new();
            let account = String::from("0xD0fE316B9f01A3b5fd6790F88C2D53739F80B464");
            let res = phat_boiler_plate.get_eth_balance(account.clone());
            assert!(res.is_ok());

            // run with `cargo +nightly test -- --nocapture` to see the following output
            println!("Account {} gets {} Wei", account, res.unwrap());
        }
    }
}
