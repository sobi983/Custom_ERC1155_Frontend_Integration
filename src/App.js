import './App.css';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import NFTimage1 from './assests/1.png';
import NFTimage2 from './assests/2.png';
import Web3 from 'web3';
import ABI from './Exhibition.json'
import {ethers, BigNumber} from "ethers";

const ADDRESS = '0x85Bd624aD83de7441c5E4aeCEFf4f4b6b9972750'
var account = null
var contract = null

async function connect() {
  try {
    if (window.ethereum) {
      var web3 = new Web3(window.ethereum)
      await window.ethereum.send('eth_requestAccounts')
      var accounts = await web3.eth.getAccounts()
      account = accounts[0]


      const nodeList = document.querySelectorAll(".wallet-connect");
      for (let i = 0; i < nodeList.length; i++) {
        nodeList[i].textContent = account;
      }
  
    }
  } catch (err) {
    console.log('Error')
  }
}

async function Mint() {
  if(window.ethereum){

    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    contract = new ethers.Contract(ADDRESS, ABI, signer)
    try{
      const response = await contract.mint(account, BigNumber.from(1), BigNumber.from(11), "0x", {
        value: ethers.utils.parseEther((0.02).toString()),
    });
    }catch(err){
      console.log(err)
    }
  }

}


function App() {
  return (
    <div className="App" style={{ margin: '50px' }}>
      <h2>Mint Portal</h2>
      <div className='container'>

        <div class='row mt-5 '>

          <div class='col-6 '>
            <form class='gradient border border-primary rounded p-2 shadow' >
              <h5 class='text-white'>Please connect your wallet</h5>
              <Button onClick={connect}>Connect Wallet</Button>
              <div></div>
              <img src={NFTimage1} alt="BigCo Inc. logo" height={300} width={300} class='m-3'></img>

              <div class='card p-2 shadow-lg' id='wallet-address' >
                <label for='floatingInput ' class='wallet-connect'>Wallet Address</label>
                <Button onClick={Mint}>Mint/Purchase</Button>
              </div>

              <label class='m-2  text-white '>Price is 0.02 BNB each mint</label>
            </form>
          </div>



          <div class='col-6'>
            <form class='gradient border border-primary rounded p-2 shadow' >
              <h5 class='text-white'>Please connect your wallet</h5>
              <Button onClick={connect}>Connect Wallet</Button>
              <div></div>
              <img src={NFTimage2} alt="BigCo Inc. logo" height={300} width={300} class='m-3'></img>

              <div class='card p-2 shadow-lg' id='wallet-address'>
                <label for='floatingInput' class='wallet-connect'>Wallet Address</label>
                <Button onClick={Mint}>Mint/Purchase</Button>
              </div>

              <label class='m-2  text-white'>Price is 0.02 BNB each  mint</label>
            </form>
          </div>


        </div>
      </div>
    </div>
  );
}

export default App;
