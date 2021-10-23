import { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import Web3Modal from 'web3modal'
import axios from "axios";
import WalletConnectProvider from '@walletconnect/web3-provider'

import { nftaddress } from '../config';
import NFT from '../artifacts/contracts/nft.sol/NFT.json'
// import { f1 } from '../lib/db';

export async function getServerSideProps(context) {
    return {
        props: { aa: 1 }, // will be passed to the page component as props
    }
}

export default function Main(props) {
    // var resp = await axios.post()
    const [minting, setMinting] = useState(false);
    const [imgs, setImgs] = useState([])
    const [img, setImg] = useState('0');
    const [minted, setMinted] = useState(0);
    const [total, setTotal] = useState(0);
    useEffect(async () => {
        // f1();
        console.log(props)
        await getMintCount();
        var ii = []
        for (let i = 0; i < 72; i++) {

            ii.push(i)

        }
        setImgs(ii);
        setInterval(() => {
            var ii = Math.floor(Math.random() * 10);
            setImg(ii.toString());
        }, 200);
    }, [])

    async function getMintCount() {
        var resp = await axios.get('api/getMintCounts');
        // alert(JSON.stringify(resp.data))
        setMinted(resp.data.minted);
        setTotal(resp.data.total);
    }

    async function mint() {
        var mintIndex;
        try {
            setMinting(true);
            const INFURA_ID = '460f40a260564ac4a4f4b3fffb032dad'

            console.log(WalletConnectProvider)
            const providerOptions = {
                /* See Provider Options Section */
                metamask: {
                    id: "injected",
                    name: "MetaMask",
                    type: "injected",
                    check: "isMetaMask"
                },
                walletconnect: {
                    package: WalletConnectProvider,
                    options: {
                        // Mikko's test key - don't copy as your mileage may vary
                        infuraId: "8043bb2cf99347b1bfadfb233c5325c0",
                    }
                },
            };

            const web3Modal = new Web3Modal({
                cacheProvider: false, // optional
                providerOptions, // required
            });

            let connection = await web3Modal.connect()

            const provider = new ethers.providers.Web3Provider(connection)
            const signer = provider.getSigner()
            let contract = new ethers.Contract(nftaddress, NFT.abi, signer)
            console.log('enter')
            var resp = await axios.get('api/randomMint')
            mintIndex = resp.data.mintIndex;
            console.log(resp);
            // url = 'https://gateway.pinata.cloud/ipfs/QmRJreWJVvbQVhb2YutjDhxWVitaHJdinU2E4FpiEE2ZGi'
            let transaction = await contract.createToken(resp.data.tokenUri)
            console.log(transaction)
            let tx = await transaction.wait()
            console.log(tx)
            console.log('eee')
            let event = tx.events[0]
            let value = event.args[2]
            let tokenId = value.toNumber()
            console.log(tokenId);
            var win = window.open('https://testnets.opensea.io/assets/' + nftaddress.toString() + '/' + tokenId.toString(), '_blank');
            if (win) {
                //Browser has allowed it to be opened
                win.focus();
            } else {
                //Browser has blocked it
                alert('Please allow popups for this website'); 
            }
        } catch (e) {

        } finally {
            setMinting(false);
            await axios.post('api/confirmMinted', {mintIndex});
            await getMintCount();
        }

    }
    return (
        <section className="explore-area">
            <div className="" aria-hidden="true" style={{ opacity: 1, transition: 'opacity 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms' }} />
            <div tabIndex={0} data-test="sentinelStart" />

            <div className="container" role="none presentation" tabIndex={-1} style={{ opacity: 1, transition: 'opacity 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms' }}>
                <h1 className="" style={{ margin: '15px auto 0px', display: 'block', textAlign: 'center', color: 'white', fontSize: '50px' }}>✧ﾟ･MINT A Demon NFTs･ﾟ✧</h1>
                <a href="https://rinkeby.etherscan.io/address/0xCBFc74E6873e368480B78A453F395cae824133E6#code" target="_blank" rel="noreferrer" className="EtherscanLink" style={{ textDecoration: 'none', margin: '3px auto 80px', textAlign: 'center', display: 'block', fontSize: '16px', color: 'rgb(115, 63, 215)' }}>CLICK TO VIEW CONTRACT ON ETHERSCAN</a>
                <div className="row justify-content-between" role="dialog" aria-labelledby="customized-dialog-title">
                    <div className="offset-md-2 col-12 col-md-8">
                        <div className="item-form card no-hover">
                            <div className="row">
                                <div className="image-over col-12 col-sm-12 col-lg-6">
                                    {!minting && (
                                        <img src={"rnds/" + img + '.png'} className="card-img-top" alt="Trolls"/>
                                    )}
                                    {minting && (
                                        <div className="loader"></div>
                                    )}
                                </div>
                                <div className="col-12 col-sm-12 col-lg-6">
                                    <div className="card-body">
                                        <div className="seller d-flex align-items-center my-3">
                                            <span>Mint Price: </span>
                                            <h5 className="ml-2 mb-0">0.033 ETH</h5>
                                        </div>
                                        <div className="seller d-flex align-items-center my-3">
                                            <span>AMOUNT MINTED: </span>
                                            <h5 className="ml-2 mb-0">{minted}</h5>
                                        </div>
                                        <div className="seller d-flex align-items-center my-3">
                                            <span>AMOUNT LEFT: </span>
                                            <h5 className="ml-2 mb-0">{total - minted}</h5>
                                        </div>
                                        <div className="seller d-flex align-items-center my-3">
                                            <span>AMOUNT TO MINT: </span>
                                            <div className="col-sm-4">
                                                <input type="number" id="amountToMint" name="Amount to Mint" class="text-center text-light bg-dark form-control" min={1} max={33} defaultValue={1} />    
                                            </div>
                                        </div>
                                        <p className="btn w-100 mt-3 mt-sm-4" onClick={(e) => { if(!minting) mint() }}>
                                            {(minting)? 'Minting...':'CONNECT WALLET AND MINT'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div tabIndex={0} data-test="sentinelEnd" />
            {/* </div> */}

        </section>
    )
}