import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./App.css"
import ChartModal from './component/ChartModal';
function App() {
  const [cryptoData, setCryptoData] = useState([]);
  const [selectedCrypto, setSelectedCrypto] = useState(null);
  const [searchInput, setSearchInput] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd');
        setCryptoData(response.data);
      } catch (error) {
        console.error('Failed to fetch crypto data:', error);
      }
    };

    fetchData();
  }, []);

  const handleOpenChart = (crypto) => {
    setSelectedCrypto(crypto);
    setIsModalOpen(true); 
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); 
  };
  const handleSearch = (e) => {
    setSearchInput(e.target.value);
  };

  const filteredCryptoData = cryptoData.filter(crypto =>
    crypto.name.toLowerCase().includes(searchInput.toLowerCase()) ||
    crypto.symbol.toLowerCase().includes(searchInput.toLowerCase())
  );

  return (
    <div className="crypto-table-container"> 
      <input
        type="text"
        placeholder="Search cryptocurrency..."
        value={searchInput}
        onChange={handleSearch}
      />
      <table>
        <thead>
          <tr>
            <th>No:</th>
            <th>Logo</th>
            <th>Name</th>
            <th>Symbol</th>
            <th>Current Price (USD)</th>
            <th>Market Cap (USD)</th>
            <th>24h % Change</th>
            <th>Open Chart btn</th> 
          </tr>
        </thead>
        <tbody>
          {filteredCryptoData.map((crypto, index) => (
            <tr key={crypto.id}>
              <td>{index + 1}</td>
              <td><img src={crypto.image} alt={crypto.name} className="crypto-logo" /></td>
              <td>{crypto.name}</td>
              <td>{crypto.symbol}</td>
              <td>{crypto.current_price}</td>
              <td>{crypto.market_cap}</td>
              <td>{crypto.price_change_percentage_24h}</td>
              <td>
              <button onClick={() => handleOpenChart(crypto)}>Open Chart</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isModalOpen && <ChartModal crypto={selectedCrypto} onClose={handleCloseModal} />} 
    </div>
  );
}

export default App;
