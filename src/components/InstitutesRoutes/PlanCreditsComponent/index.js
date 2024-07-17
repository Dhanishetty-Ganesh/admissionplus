import React, { useState } from 'react';
import { FaHistory } from 'react-icons/fa';
import Sidebar from '../Sidebar';
import "./index.css"

const CreditsPage = () => {
  const [isTableVisible, setIsTableVisible] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState(null); // No initial selection
  const [inputCredit, setInputCredit] = useState('');
  const [inputAmount, setInputAmount] = useState('');

  const toggleTableVisibility = () => {
    setIsTableVisible(!isTableVisible);
  };

  const data = [
    { credit: 1000, amount: 900 },
    { credit: 2000, amount: 1600 },
    { credit: 3000, amount: 2100 },
    { credit: 4000, amount: 2400 },
    { credit: 5000, amount: 2500 },
  ];

  const handleRadioChange = (amount) => {
    setSelectedAmount(amount);
  };

  const handleCreditInputChange = (e) => {
    const credit = parseInt(e.target.value, 10) || '';
    setInputCredit(credit);

    let calculatedAmount = 0;
    if (credit < 1000) {
      calculatedAmount = credit * 1; // 1 rupee per credit below 1000
    } else if (credit > 5000) {
      calculatedAmount = credit * 0.5; // 0.5 paise per credit above 5000
    } else {
      // Use an interpolated rate or a fixed rate for intermediate values
      calculatedAmount = credit * 0.9; // Example rate for values between 1000 and 5000
    }

    setInputAmount(calculatedAmount.toFixed(2)); // Convert to a fixed 2 decimal places string
    setSelectedAmount(calculatedAmount); // Automatically select the radio button
  };

  const sampleData = [
    { serialNo: 1, dateTime: '2024-07-01 10:00', orderId: 'ORD1234', amount: '1100', status: 'Paid' },
    { serialNo: 2, dateTime: '2024-07-01 11:00', orderId: 'ORD1235', amount: '800', status: 'Unpaid' },
    { serialNo: 3, dateTime: '2024-07-01 12:00', orderId: 'ORD1236', amount: '1200', status: 'Paid' },
    { serialNo: 4, dateTime: '2024-07-01 9:00', orderId: 'ORD1237', amount: '600', status: 'Unpaid' },
    { serialNo: 5, dateTime: '2024-07-01 4:00', orderId: 'ORD1238', amount: '900', status: 'Paid' },
  ];

  return (
    <div>
      <Sidebar />
      <div className='students-top-content'>
        <h1 className='students-heading'>Credits &gt; Plans</h1>
        <div className='students-add-button-container'>
          <button className='credits-history-button' onClick={toggleTableVisibility}>
            <FaHistory className='credit-history-logo' />
            {isTableVisible ? ' Hide Credits History' : ' Show Credits History'}
          </button>
        </div>
      </div>

      {!isTableVisible ? (
        <div className='credits-bottom-section'>
          <div>
            <table className="paymentTable">
              <thead className="paymentHeader">
                <tr>
                  <th className="paymentHeader__cell">Credit</th>
                  <th className="paymentHeader__cell">Amount</th>
                  <th className="paymentHeader__cell">Select</th>
                </tr>
              </thead>
              <tbody>
                {data.map((row, index) => (
                  <tr key={index} className="paymentRow">
                    <td className="paymentCell">{row.credit}</td>
                    <td className="paymentCell">{row.amount}</td>
                    <td className="paymentCell">
                      <input
                        type="radio"
                        name="amountSelect"
                        value={row.amount}
                        onChange={() => handleRadioChange(row.amount)}
                        checked={selectedAmount === row.amount}
                      />
                    </td>
                  </tr>
                ))}
                <tr className="paymentRow">
                  <td className="paymentCell">
                    <input
                      type="number"
                      value={inputCredit}
                      onChange={handleCreditInputChange}
                      placeholder="Enter credits"
                    />
                  </td>
                  <td className="paymentCell">{inputAmount}</td>
                  <td className="paymentCell">
                    <input
                      type="radio"
                      name="amountSelect"
                      value={inputAmount}
                      onChange={() => handleRadioChange(parseFloat(inputAmount))}
                      checked={selectedAmount === parseFloat(inputAmount)}
                    />
                  </td>
                </tr>
                <tr className="paymentTotalRow">
                  <td className="paymentCell" colSpan="2">Total Selected Amount</td>
                  <td className="paymentCell">{selectedAmount !== null ? `${selectedAmount} /-` : '0 /-'}</td>
                </tr>
              </tbody>
            </table>
            <p className='payment-note'>
              <span className='note-text'>Note : </span>
              1 rupee for recharges below 1000 credits, 0.5 paise for recharges exceeding 5000 credits
            </p>
            <p className='payment-note'>
              <span className='note-text'>Note : </span>
              1 credit = 27 sec of IVR
            </p>
            <button className='make-payment-button'>Make Payment</button>
          </div>
          <div className="available-credits-container">
            <div className='available-credits-card'>
              <h1 className='credits-main-heading'>Available Credits</h1>
              <h1>11</h1>
              <p className='credits-para'>Voice IVR</p>
            </div>
            <button className='talk-button'>
              <img src="https://res.cloudinary.com/dvwnbhpcy/image/upload/v1720023253/download_1_ow6he3.png" alt="whatsup" className='whatsapp-logo' /> Talk to Us
            </button>
          </div>
        </div>
      ) : (
        <div className="credit-table-container">
          <table className="credit-table">
            <thead className="credit-table-header">
              <tr>
                <th className="credit-table-header-cell">S.No</th>
                <th className="credit-table-header-cell">Date & Time</th>
                <th className="credit-table-header-cell">Order ID</th>
                <th className="credit-table-header-cell">Amount</th>
                <th className="credit-table-header-cell">Status</th>
              </tr>
            </thead>
            <tbody>
              {sampleData.map((row, index) => (
                <tr key={index} className="credit-table-row">
                  <td className="credit-table-cell">{row.serialNo}</td>
                  <td className="credit-table-cell">{row.dateTime}</td>
                  <td className="credit-table-cell">{row.orderId}</td>
                  <td className="credit-table-cell">{row.amount}</td>
                  <td className="credit-table-cell">{row.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CreditsPage;
