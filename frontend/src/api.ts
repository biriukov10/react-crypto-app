import {
    CryptoDataRequest,
    CryptoAssetsData,
    cryptoAssets,
    cryptoData,
} from "./data";

export function fakeFetchCrypto(): Promise<CryptoDataRequest> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(cryptoData);
        }, 1);
    });
}

export function fakeFetchAssets(): Promise<CryptoAssetsData[]> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(cryptoAssets);
        }, 1);
    });
}
