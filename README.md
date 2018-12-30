![University Of Karachi](https://github.com/riazahmed0147/blockchain/blob/master/img/logo.png)

## University Of Karachi - Department Of Computer Science

**Final Year Project (MCS 2017-2018)**<br>
**Project Title**: Ethereum Blockchain - Voting Application<br>
**Supervisor**: Sir Khalid Jamal<br>
**Members**: Riaz Ahmed, Ayesha Qureshi<br>


### Prequisites
1. Install Node LTS 8.x.x (https://nodejs.org/en/download/)
2. Install NPM (if you have installed node it comes with NPM)
3. Install Application dependencies `npm install`
4. Install Truffle (https://truffleframework.com/truffle)
5. Install Ganache (https://truffleframework.com/ganache)
6. Install Metamask (https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en)

### How To Interact With API
Please follow the steps given below, do it in sequence.<br>

#### 1. Open Ganache
Open Ganache and set accounts limit to 100<br><br>

#### 2. Run Test
In the base directory of the project, do the following:<br><br>
> truffle console<br>
> test<br>

It will pass 3 tests

#### 3. Migrate Contract
After passing the test quit truffle console then migrate the contract using `truffle migrate --reset`

#### 4. Run Server
After migrating contract, run command `npm run dev`

#### 5. Connect with Local RPC Server
The server will run the application on your browser. Login into metamask and connect with local server. You can get RPC server address from Ganache.

#### 6. Import Account
After connecting with Ganache get private key from ganache accounts (click on key icon) and put this in metamask in the import account private key and refresh the page.

#### 7. Import Account
Once the account is imported select contestant and caste your vote and for new vote import new account follow step 6