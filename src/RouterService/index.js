const { AlphaRouter } = require("@uniswap/smart-order-router");
const {
  Token,
  CurrencyAmount,
  TradeType,
  Percent,
} = require("@uniswap/sdk-core");
const { ethers, BigNumber } = require("ethers");
const JSBI = require("jsbi");
const ERC20ABI = require("./abi.json");

const V3_SWAP_ROUTER_ADDRESS = "0x68b3465833fb72a70ecdf485e0e4c7bd8665fc45";

const INFURA_URL_TESTNET = "86efb94627e147b8837ae88237d517fc";
//INFURA_URL_TESTNET

const chainId = 3;

const web3Provider = new ethers.providers.JsonRpcProvider(INFURA_URL_TESTNET);
const router = new AlphaRouter({ chainId: chainId, provider: web3Provider });
const name1 = "Wrapped Ether";
const symbol1 = "WETH";
const decimal1 = 18;
const address1 = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";

const name2 = "Uniswap Token";
const symbol2 = "UNI";
const decimal2 = 18;
const address2 = "0x1f9840a85d5af5bf1d1762f925bdaddc4201f984";

const WETH = new Token(chainId, address1, decimal1, symbol1, name1);
const UNI = new Token(chainId, address2, symbol2, decimal2, name2);

export const getWethContract = () =>
  new ethers.Contract(address1, ERC20ABI, web3Provider);
export const getUniContract = () =>
  new ethers.Contract(address2, ERC20ABI, web3Provider);

export const getPrice = async (
  inputAmount,
  slippageAmount,
  deadLine,
  walletAddress
) => {
  const percentSlippage = new Percent(slippageAmount, 100);
  const wei = ethers.parsUtils(inputAmount.toString(), decimal1);
  const currencyAmount = CurrencyAmount.fromRawAmount(WETH, JSBI, BigInt(wei));
  const route = await router.route(currencyAmount, UNI, TradeType.EXACT_INPUT, {
    recipient: walletAddress,
    slippageTolerance: percentSlippage,
    deadline: deadLine,
  });

  const transaction = {
    data: route.methodParameters.calldata,
    to: INFURA_URL_TESTNET,
    value: BigNumber.from(route.methodParameters.value),
    from: walletAddress,
    gasPrice: BigNumber.from(route.gasPriceWie),
    gasLimit: ethers.hexlify(10000),
  };

  const quoteAmountOut = route.quote.toFixed(6);
  const ratio = (quoteAmountOut / inputAmount).toFixed(3);

  return [transaction, quoteAmountOut, ratio];
};

export const runSwap = async (transaction, signer) => {
  const approvalAmount = ethers.parseUnits("10", 18).toString();
  const contract1 = getWethContract();
  await contract1
    .connect(signer)
    .approve(V3_SWAP_ROUTER_ADDRESS, approvalAmount);

  signer.sendTransaction(transaction);
};
