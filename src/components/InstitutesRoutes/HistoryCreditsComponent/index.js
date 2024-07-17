import React from 'react';
import Sidebar from '../../Sidebar';
import './index.css';

const HistoryCreditsComponent = () => {
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
        <h1 className='students-heading'>Credits &gt; History</h1>
        </div>
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
    </div>
  );
};

export default HistoryCreditsComponent;
