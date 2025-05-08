import { createContext } from "react";

export const CryptoContext = createContext();

const CryptoContextProvider = ({props}) => {
    const [cryptoList, setCryptoList] = useState([]);
    const [filteredCrytos, setFilteredCrytos] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentCurrency, setCurrentCurrency] = useState({
        name: "usd",
        symbol: "$"
    });

    // API CG-fXeheecUEUf6rXg7hqPU6Rz4
    const fetchCryptoData = async () => {
        const options = {
            method: 'GET',
            headers: {accept: 'application/json', 'x-cg-demo-api-key': 'CG-fXeheecUEUf6rXg7hqPU6Rz4'}
          };
          try {
            const res = await fetch (
                `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currentCurrency.name}`,
                options
            );
            const data = await res.json();
            setCryptoList(data);
          } catch (error) {
            console.error("Failed to fetch crypto data:", err);
          }
    }

    // RE-FETCH WHEN CURRENCY CHANGES
    useEffect(() => {
        fetchCryptoData();
    }, [currentCurrency]);

    


    const contextValue = {};


    return (
        <CryptoContext.Provider value={{contextValue}}>
            {props.children}
        </CryptoContext.Provider>
    )
}

export default CryptoContextProvider;  