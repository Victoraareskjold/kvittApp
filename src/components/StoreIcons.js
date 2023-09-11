export const getStoreIcon = (storeName) => {
    // Opprett en tilordning mellom butikknavn og ikoninformasjon
    const storeIcons = {
      kiwi: require("../../assets/StoreIcon/kiwi.png"), // Bytt ut stien med den faktiske stien til kiwi-ikonet
      rema1000: require("../../assets/StoreIcon/rema1000.png"), // Bytt ut stien med rema1000-ikonet
      // Legg til flere butikker og deres ikonstier her
    };
  
    // Sjekk om butikknavnet finnes i tilordningen, hvis ikke, bruk et standardikon
    if (storeIcons.hasOwnProperty(storeName)) {
      return storeIcons[storeName];
    } else {
      return require("../../assets/splash.png"); // Bytt ut stien med standardikonet
    }
  };
  