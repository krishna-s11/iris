import { useEffect, useState } from 'react';
import axios from 'axios';

// Caches to prevent unnecessary network calls
const coinImageCache = {};
const symbolToIdCache = {};

const DEFAULT_IMAGE = "https://upload.wikimedia.org/wikipedia/commons/6/6f/Bitcoin_pictogram.svg"; // or your own fallback

const useCoinImages = (coinSymbols = []) => {
  const [images, setImages] = useState({});

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const fetchSymbolToIdMap = async () => {
      if (Object.keys(symbolToIdCache).length) return;

      try {
        const response = await axios.get("https://api.coingecko.com/api/v3/coins/list");
        response.data.forEach(({ id, symbol }) => {
          symbolToIdCache[symbol.toLowerCase()] = id;
        });
      } catch (error) {
        console.error("Failed to fetch symbol-to-id map:", error);
      }
    };

    const fetchImages = async () => {
      await fetchSymbolToIdMap();

      const updatedImages = {};

      for (const symbol of coinSymbols) {
        const lowerSymbol = symbol.toLowerCase();

        // Already cached
        if (coinImageCache[lowerSymbol]) {
          updatedImages[lowerSymbol] = coinImageCache[lowerSymbol];
          continue;
        }

        const coinId = symbolToIdCache[lowerSymbol];
        if (!coinId) {
          console.warn(`CoinGecko ID not found for symbol: ${symbol}`);
          updatedImages[lowerSymbol] = DEFAULT_IMAGE;
          continue;
        }

        try {
          const response = await axios.get(
            `https://api.coingecko.com/api/v3/coins/${coinId}`,
            { signal: controller.signal }
          );

          const logo = response.data.image?.small;
          coinImageCache[lowerSymbol] = logo || DEFAULT_IMAGE;
          updatedImages[lowerSymbol] = logo || DEFAULT_IMAGE;
        } catch (error) {
          if (!axios.isCancel(error)) {
            console.error(`Error fetching logo for ${symbol}:`, error);
          }
          updatedImages[lowerSymbol] = DEFAULT_IMAGE;
        }
      }

      if (isMounted) {
        setImages((prev) => ({ ...prev, ...updatedImages }));
      }
    };

    if (coinSymbols.length > 0) {
      fetchImages();
    }

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [coinSymbols.join(',')]); // stable dependency

  return images;
};

export default useCoinImages;
