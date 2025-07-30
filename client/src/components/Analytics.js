import React from 'react';
import { Card, Row, Col } from 'antd';
import { PieChart, Pie, Cell, Tooltip, Legend, LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts';

const Analytics = ({ allTransactions }) => {
  // Group income transactions by category
  const incomeByCategory = allTransactions
    .filter(transaction => transaction.type === 'income')
    .reduce((categories, transaction) => {
      categories[transaction.category] = (categories[transaction.category] || 0) + transaction.amount;
      return categories;
    }, {});

  const incomeCategoryData = Object.keys(incomeByCategory).map(category => ({
    name: category,
    value: incomeByCategory[category],
  }));

  // Group expense transactions by category
  const expenseByCategory = allTransactions
    .filter(transaction => transaction.type === 'expense')
    .reduce((categories, transaction) => {
      categories[transaction.category] = (categories[transaction.category] || 0) + transaction.amount;
      return categories;
    }, {});

  const expenseCategoryData = Object.keys(expenseByCategory).map(category => ({
    name: category,
    value: expenseByCategory[category],
  }));

  // Calculate total income and expense
  const totalIncomeAmount = incomeCategoryData.reduce((sum, entry) => sum + entry.value, 0);
  const totalExpenseAmount = expenseCategoryData.reduce((sum, entry) => sum + entry.value, 0);

  // Generate overall timeline data for the line graph
  const overallTimeline = allTransactions.map(transaction => ({
    date: transaction.date, // Assuming 'date' field exists
    income: transaction.type === 'income' ? transaction.amount : 0,
    expense: transaction.type === 'expense' ? transaction.amount : 0,
  }));

  // Colors for the pie charts
  const COLORS = [
    '#28a745', '#007bff', '#dc3545', '#ffc107', '#17a2b8', '#6c757d', '#fd7e14',
  ]; // Add more colors as necessary

  // Inline styles for enhanced design
  const cardStyle = {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)',
    padding: '24px',
    marginBottom: '24px',
    border: '1px solid #e9ecef',
  };

  const titleStyle = {
    color: '#212529',
    fontSize: '20px',
    fontWeight: '700',
    marginBottom: '16px',
    textAlign: 'center',
  };

  const textStyle = {
    color: '#495057',
    fontSize: '16px',
    marginTop: '12px',
    textAlign: 'justify',
  };

  const summaryStyle = {
    color: '#495057',
    fontSize: '18px',
    lineHeight: '1.8',
    marginTop: '20px',
    textAlign: 'center',
  };

  return (
    <Card title="Analytics Overview" style={cardStyle}>
  {/* First Row: Pie Charts Side-by-Side */}
  <Row gutter={[24, 24]}>
    {/* Income Analysis */}
    <Col xs={24} md={12}>
      <Card style={cardStyle}>
        <h3 style={titleStyle}>Income Analysis</h3>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {/* Chart */}
          <PieChart width={300} height={300}>
            <Pie
              data={incomeCategoryData}
              cx="50%"
              cy="50%"
              outerRadius={120}
              dataKey="value"
            >
              {incomeCategoryData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>

          {/* Legend and Description */}
          <div style={{ marginLeft: 20 }}>
            <Legend
              layout="vertical"
              verticalAlign="middle"
              align="left"
            />
            <p style={{ ...textStyle, marginTop: 16 }}>
              <strong>Total Income:</strong> ₹{totalIncomeAmount.toLocaleString()}
            </p>
          </div>
        </div>
      </Card>
    </Col>

    {/* Expense Analysis */}
    <Col xs={24} md={12}>
      <Card style={cardStyle}>
        <h3 style={titleStyle}>Expense Analysis</h3>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {/* Chart */}
          <PieChart width={300} height={300}>
            <Pie
              data={expenseCategoryData}
              cx="50%"
              cy="50%"
              outerRadius={120}
              dataKey="value"
            >
              {expenseCategoryData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>

          {/* Legend and Description */}
          <div style={{ marginLeft: 20 }}>
            <Legend
              layout="vertical"
              verticalAlign="middle"
              align="left"
            />
            <p style={{ ...textStyle, marginTop: 16 }}>
              <strong>Total Expense:</strong> ₹{totalExpenseAmount.toLocaleString()}
            </p>
          </div>
        </div>
        </Card>
        </Col>
      </Row>


      {/* Second Row: Spending Analysis and Overall Analysis */}
      <Row gutter={[24, 24]}>
        <Col xs={24} md={12}>
          <Card style={cardStyle}>
            <h3 style={titleStyle}>Spending Over Time</h3>
            <LineChart
              width={350}
              height={250}
              data={overallTimeline}
              margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="expense" stroke="#dc3545" strokeWidth={2} />
            </LineChart>
          </Card>
        </Col>

        <Col xs={24} md={12}>
          <Card style={cardStyle}>
            <h3 style={titleStyle}>Overall Income and Expense Analysis</h3>
            <LineChart
              width={350}
              height={250}
              data={overallTimeline}
              margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="income" stroke="#28a745" strokeWidth={2} />
              <Line type="monotone" dataKey="expense" stroke="#dc3545" strokeWidth={2} />
            </LineChart>
          </Card>
        </Col>
      </Row>

      {/* Centered Summary Section */}
      <Row justify="center">
        <Col xs={24} md={12}>
          <Card style={cardStyle}>
            <h3 style={titleStyle}>Summary</h3>
            <p style={summaryStyle}>
              💰 <strong>Total Income:</strong> ₹{totalIncomeAmount.toLocaleString()} <br />
              - You've been stacking up well! 🚀 <br />
              <br />
              💸 <strong>Total Expenses:</strong> ₹{totalExpenseAmount.toLocaleString()} <br />
              - Spending like a pro (or a shopaholic?) 😎 <br />
              <br />
              ⚖️ <strong>Net Balance:</strong> ₹{(totalIncomeAmount - totalExpenseAmount).toLocaleString()} <br />
              - You're doing fine! Keep climbing 🧗‍♂️.
            </p>
          </Card>
        </Col>
      </Row>
    </Card>
  );
};

export default Analytics;
