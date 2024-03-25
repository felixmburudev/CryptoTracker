
import Chart from '../Chart';
import "./ChartModal.css"
const ChartModal = ({ crypto, onClose }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <button className="close" onClick={onClose}>Close</button>
        <Chart crypto={crypto} />
      </div>
    </div>
  );
};

export default ChartModal;
