import { AlphaRouter } from "@uniswap/smart-order-router";
import { Token, CurrencyAmount, TradeType, Percent } from "@uniswap/sdk-core";
import { ethers, BigNumber } from "ethers";
import JSBI from "jsbi";
import * as ERC20ABI from "./abi.json";

const V3_SWAP_ROUTER_ADDRESS = "0x68b3465833fb72a70ecdf485e0e4c7bd8665fc45";

const TESTNET_URL = process.env.INFURA_URL_TESTNET;

//INFURA_URL_TESTNET
const chainId = 11155111; // Ropsten testnet chain ID

const web3Provider = new ethers.providers.JsonRpcProvider(
  `https://sepolia.infura.io/v3/86efb94627e147b8837ae88237d517fc`
);
const router = new AlphaRouter({ chainId: chainId, provider: web3Provider });

const name0 = "Wrapped Ether";
const symbol0 = "WETH";
const decimal0 = 18;
const address0 = "0x6a023ccd1ff6f2045c3309768ead9e68f978f6e1"; // WETH token address

const name1 = "Uniswap Token";
const symbol1 = "UNI";
const decimal1 = 18;
const address1 = "0x1f9840a85d5af5bf1d1762f925bdaddc4201f984"; // UNI token address

const WETH = new Token(chainId, address0, decimal0, symbol0, name0);
const UNI = new Token(chainId, address1, decimal1, symbol1, name1);

export const getWethContract = () =>
  new ethers.Contract(address0, ERC20ABI, web3Provider);

export const getUniContract = () =>
  new ethers.Contract(address1, ERC20ABI, web3Provider);

export const getPrice = async (
  inputAmount,
  slippageAmount,
  deadLine,
  walletAddress
) => {
  const percentSlippage = new Percent(slippageAmount, 100);

  const wei = inputAmount
    ? ethers.utils.parseUnits(inputAmount.toString(), decimal1)
    : ethers.BigNumber.from(0);

  const currencyAmount = CurrencyAmount.fromRawAmount(WETH, JSBI.BigInt(wei));

  const route = await router.route(currencyAmount, UNI, TradeType.EXACT_INPUT, {
    recipient: walletAddress,
    slippageTolerance: percentSlippage,
    deadline: deadLine,
  });

  const transaction = {
    data: route?.methodParameters?.calldata,
    to: V3_SWAP_ROUTER_ADDRESS,
    value: BigNumber.from(route?.methodParameters?.value),
    from: walletAddress,
    gasPrice: BigNumber.from(route.gasPriceWei),
    gasLimit: ethers.hexlify(10000),
  };

  const quoteAmountOut = route?.quote?.toFixed(6);
  const ratio = (inputAmount / quoteAmountOut).toFixed(3);

  return [transaction, quoteAmountOut, ratio];
};

export const runSwap = async (transaction, signer) => {
  const approvalAmount = ethers.parseUnits("10", 18).toString();
  const contract0 = getWethContract();
  await contract0
    .connect(signer)
    .approve(V3_SWAP_ROUTER_ADDRESS, approvalAmount);

  signer.sendTransaction(transaction);
};
