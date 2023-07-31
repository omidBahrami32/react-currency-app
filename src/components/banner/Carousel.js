import { makeStyles } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { TrendingCoins } from "../../config/api";
import { CryptoState } from "../../CryptoContext";
import AliceCarousel from "react-alice-carousel";
import { Link } from "react-router-dom";

const FAKE_DATA = [
  {
    id: "bitcoin",
    symbol: "btc",
    name: "Bitcoin",
    image:
      "https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579",
    current_price: 29377,
    market_cap: 571206379102,
    market_cap_rank: 1,
    fully_diluted_valuation: 616939803583,
    total_volume: 5344123609,
    high_24h: 29437,
    low_24h: 29247,
    price_change_24h: 78.44,
    price_change_percentage_24h: 0.26771,
    market_cap_change_24h: 1676676874,
    market_cap_change_percentage_24h: 0.2944,
    circulating_supply: 19443281,
    total_supply: 21000000,
    max_supply: 21000000,
    ath: 69045,
    ath_change_percentage: -57.43931,
    ath_date: "2021-11-10T14:24:11.849Z",
    atl: 67.81,
    atl_change_percentage: 43236.33058,
    atl_date: "2013-07-06T00:00:00.000Z",
    roi: null,
    last_updated: "2023-07-30T16:34:26.892Z",
    price_change_percentage_24h_in_currency: 0.2677136980289396,
  },
  {
    id: "ethereum",
    symbol: "eth",
    name: "Ethereum",
    image:
      "https://assets.coingecko.com/coins/images/279/large/ethereum.png?1595348880",
    current_price: 1877.87,
    market_cap: 225693466872,
    market_cap_rank: 2,
    fully_diluted_valuation: 225693466872,
    total_volume: 3480288829,
    high_24h: 1885.6,
    low_24h: 1872.13,
    price_change_24h: 5.73,
    price_change_percentage_24h: 0.30632,
    market_cap_change_24h: 763901396,
    market_cap_change_percentage_24h: 0.33962,
    circulating_supply: 120181083.259792,
    total_supply: 120181083.259792,
    max_supply: null,
    ath: 4878.26,
    ath_change_percentage: -61.50058,
    ath_date: "2021-11-10T14:24:19.604Z",
    atl: 0.432979,
    atl_change_percentage: 433662.93391,
    atl_date: "2015-10-20T00:00:00.000Z",
    roi: {
      times: 84.45696040979335,
      currency: "btc",
      percentage: 8445.696040979336,
    },
    last_updated: "2023-07-30T16:34:33.317Z",
    price_change_percentage_24h_in_currency: 0.306322920376958,
  },
  {
    id: "ripple",
    symbol: "xrp",
    name: "XRP",
    image:
      "https://assets.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png?1605778731",
    current_price: 0.715535,
    market_cap: 37711653221,
    market_cap_rank: 4,
    fully_diluted_valuation: 71567464044,
    total_volume: 892664377,
    high_24h: 0.72839,
    low_24h: 0.707914,
    price_change_24h: 0.00759765,
    price_change_percentage_24h: 1.07321,
    market_cap_change_24h: 415628891,
    market_cap_change_percentage_24h: 1.11441,
    circulating_supply: 52693851493,
    total_supply: 99988556423,
    max_supply: 100000000000,
    ath: 3.4,
    ath_change_percentage: -78.92937,
    ath_date: "2018-01-07T00:00:00.000Z",
    atl: 0.00268621,
    atl_change_percentage: 26557.46869,
    atl_date: "2014-05-22T00:00:00.000Z",
    roi: null,
    last_updated: "2023-07-30T16:34:27.504Z",
    price_change_percentage_24h_in_currency: 1.0732091408497184,
  },
  {
    id: "solana",
    symbol: "sol",
    name: "Solana",
    image:
      "https://assets.coingecko.com/coins/images/4128/large/solana.png?1640133422",
    current_price: 24.92,
    market_cap: 10076973701,
    market_cap_rank: 10,
    fully_diluted_valuation: 13797936504,
    total_volume: 266568207,
    high_24h: 25.35,
    low_24h: 24.78,
    price_change_24h: -0.16266344586104253,
    price_change_percentage_24h: -0.64861,
    market_cap_change_24h: -66010465.908390045,
    market_cap_change_percentage_24h: -0.6508,
    circulating_supply: 404373524.609878,
    total_supply: 553690064.32398,
    max_supply: null,
    ath: 259.96,
    ath_change_percentage: -90.4063,
    ath_date: "2021-11-06T21:54:35.825Z",
    atl: 0.500801,
    atl_change_percentage: 4879.96003,
    atl_date: "2020-05-11T19:35:23.449Z",
    roi: null,
    last_updated: "2023-07-30T16:34:27.942Z",
    price_change_percentage_24h_in_currency: -0.6486132881224093,
  },
  {
    id: "binancecoin",
    symbol: "bnb",
    name: "BNB",
    image:
      "https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png?1644979850",
    current_price: 243.31,
    market_cap: 37420184888,
    market_cap_rank: 5,
    fully_diluted_valuation: 48643079770,
    total_volume: 344522798,
    high_24h: 243.41,
    low_24h: 241.69,
    price_change_24h: 1.51,
    price_change_percentage_24h: 0.6253,
    market_cap_change_24h: 225906641,
    market_cap_change_percentage_24h: 0.60737,
    circulating_supply: 153856150,
    total_supply: 153856150,
    max_supply: 200000000,
    ath: 686.31,
    ath_change_percentage: -64.54834,
    ath_date: "2021-05-10T07:24:17.097Z",
    atl: 0.0398177,
    atl_change_percentage: 610952.67588,
    atl_date: "2017-10-19T00:00:00.000Z",
    roi: null,
    last_updated: "2023-07-30T16:34:27.023Z",
    price_change_percentage_24h_in_currency: 0.625299924551834,
  },
  {
    id: "dogecoin",
    symbol: "doge",
    name: "Dogecoin",
    image:
      "https://assets.coingecko.com/coins/images/5/large/dogecoin.png?1547792256",
    current_price: 0.079335,
    market_cap: 11141803990,
    market_cap_rank: 8,
    fully_diluted_valuation: 11141769070,
    total_volume: 712378240,
    high_24h: 0.081149,
    low_24h: 0.077907,
    price_change_24h: 0.00132662,
    price_change_percentage_24h: 1.7006,
    market_cap_change_24h: 204153820,
    market_cap_change_percentage_24h: 1.86652,
    circulating_supply: 140387136383.705,
    total_supply: 140386696383.705,
    max_supply: null,
    ath: 0.731578,
    ath_change_percentage: -89.14191,
    ath_date: "2021-05-08T05:08:23.458Z",
    atl: 0.0000869,
    atl_change_percentage: 91306.19852,
    atl_date: "2015-05-06T00:00:00.000Z",
    roi: null,
    last_updated: "2023-07-30T16:34:32.229Z",
    price_change_percentage_24h_in_currency: 1.7006027001135176,
  },
  {
    id: "cardano",
    symbol: "ada",
    name: "Cardano",
    image:
      "https://assets.coingecko.com/coins/images/975/large/cardano.png?1547034860",
    current_price: 0.314254,
    market_cap: 11017469248,
    market_cap_rank: 9,
    fully_diluted_valuation: 14147120031,
    total_volume: 152888947,
    high_24h: 0.317784,
    low_24h: 0.310521,
    price_change_24h: 0.00373335,
    price_change_percentage_24h: 1.20229,
    market_cap_change_24h: 135424633,
    market_cap_change_percentage_24h: 1.24448,
    circulating_supply: 35045020830.3234,
    total_supply: 45000000000,
    max_supply: 45000000000,
    ath: 3.09,
    ath_change_percentage: -89.81551,
    ath_date: "2021-09-02T06:00:10.474Z",
    atl: 0.01925275,
    atl_change_percentage: 1532.94131,
    atl_date: "2020-03-13T02:22:55.044Z",
    roi: null,
    last_updated: "2023-07-30T16:34:32.978Z",
    price_change_percentage_24h_in_currency: 1.202287428791291,
  },
  {
    id: "chainlink",
    symbol: "link",
    name: "Chainlink",
    image:
      "https://assets.coingecko.com/coins/images/877/large/chainlink-new-logo.png?1547034700",
    current_price: 7.7,
    market_cap: 4146232473,
    market_cap_rank: 22,
    fully_diluted_valuation: 7705320004,
    total_volume: 150444438,
    high_24h: 7.87,
    low_24h: 7.71,
    price_change_24h: -0.03649218457232095,
    price_change_percentage_24h: -0.47176,
    market_cap_change_24h: -16450743.878020287,
    market_cap_change_percentage_24h: -0.3952,
    circulating_supply: 538099971.2305644,
    total_supply: 1000000000,
    max_supply: 1000000000,
    ath: 52.7,
    ath_change_percentage: -85.34682,
    ath_date: "2021-05-10T00:13:57.214Z",
    atl: 0.148183,
    atl_change_percentage: 5110.93216,
    atl_date: "2017-11-29T00:00:00.000Z",
    roi: null,
    last_updated: "2023-07-30T16:34:30.928Z",
    price_change_percentage_24h_in_currency: -0.4717567078580595,
  },
  {
    id: "polkadot",
    symbol: "dot",
    name: "Polkadot",
    image:
      "https://assets.coingecko.com/coins/images/12171/large/polkadot.png?1639712644",
    current_price: 5.24,
    market_cap: 6591311406,
    market_cap_rank: 14,
    fully_diluted_valuation: 7014183084,
    total_volume: 78796033,
    high_24h: 5.27,
    low_24h: 5.21,
    price_change_24h: 0.00213592,
    price_change_percentage_24h: 0.04081,
    market_cap_change_24h: 8711523,
    market_cap_change_percentage_24h: 0.13234,
    circulating_supply: 1258756082.64479,
    total_supply: 1339512742.87294,
    max_supply: null,
    ath: 54.98,
    ath_change_percentage: -90.4704,
    ath_date: "2021-11-04T14:10:09.301Z",
    atl: 2.7,
    atl_change_percentage: 94.23721,
    atl_date: "2020-08-20T05:48:11.359Z",
    roi: null,
    last_updated: "2023-07-30T16:34:28.134Z",
    price_change_percentage_24h_in_currency: 0.040812286892690806,
  },
  {
    id: "stellar",
    symbol: "xlm",
    name: "Stellar",
    image:
      "https://assets.coingecko.com/coins/images/100/large/Stellar_symbol_black_RGB.png?1552356157",
    current_price: 0.158226,
    market_cap: 4321077174,
    market_cap_rank: 20,
    fully_diluted_valuation: 7912500634,
    total_volume: 132852453,
    high_24h: 0.161728,
    low_24h: 0.155041,
    price_change_24h: -0.001154959058194405,
    price_change_percentage_24h: -0.72465,
    market_cap_change_24h: -27225094.032593727,
    market_cap_change_percentage_24h: -0.62611,
    circulating_supply: 27306358836.3116,
    total_supply: 50001787265.4736,
    max_supply: 50001787265.4736,
    ath: 0.875563,
    ath_change_percentage: -81.93681,
    ath_date: "2018-01-03T00:00:00.000Z",
    atl: 0.00047612,
    atl_change_percentage: 33117.15629,
    atl_date: "2015-03-05T00:00:00.000Z",
    roi: null,
    last_updated: "2023-07-30T16:34:24.753Z",
    price_change_percentage_24h_in_currency: -0.7246543732900421,
  },
];

const useStyles = makeStyles((theme) => ({
  carousel: {
    height: "50%",
    display: "flex",
    alignItems: "center",
  },
  carouselItem: {
    display: "flex",
    flexDirection: "column",
    gap: '0.7rem',
    alignItems: "center",
    cursor: "pointer",
    textTransform: "uppercase",
    color: "white",
  },
}));

export const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const Carousel = () => {
  const [trending, settrending] = useState([]);
  const classes = useStyles();

  const { currency, symbol } = CryptoState();

  const fetchTrendingCoins = async () => {
    // const { data } = await axios.get(TrendingCoins(currency));
    // settrending(data);
    settrending(FAKE_DATA);
  };
  useEffect(() => {
    fetchTrendingCoins();
  }, [currency]);
  const items = trending.map((coin) => {
    let profit = coin.price_change_percentage_24h >= 0;
    return (
      <Link className={classes.carouselItem} to={`/coins/${coin.id}`}>
        <img src={coin?.image} alt={coin.name} height="80" />
        <span>
          {coin?.symbol}
          &nbsp;
          <span
            style={{
              color: profit > 0 ? "rgb(14, 203, 129)" : "red",
              fontWeight: 500,
            }}
          >
            {profit && "+"}
            {coin.price_change_percentage_24h?.toFixed(2)}
          </span>
        </span>
        <span style={{ fontSize: 22, fontWeight: 500 }}>
          {symbol} {numberWithCommas(coin?.current_price.toFixed(2))}
        </span>
      </Link>
    );
  });

  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 4,
    },
  };

  return (
    <div className={classes.carousel}>
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
        disableButtonsControls
        responsive={responsive}
        autoPlay
        items={items}
      />
    </div>
  );
};

export default Carousel;
