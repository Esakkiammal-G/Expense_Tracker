import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Select, message, Table, DatePicker } from 'antd';
import Layout from '../components/Layout/Layout';
import axios from 'axios';
import Spinner from '../components/Spinner';
import moment from 'moment';
import { UnorderedListOutlined, AreaChartOutlined, EditOutlined, DeleteOutlined, CalculatorOutlined } from '@ant-design/icons';
import Analytics from '../components/Analytics';
import Calculator from '../components/Layout/calculator'; // Importing the Calculator Component
const { RangePicker } = DatePicker;

const HomePage = () => {
  const [showModal, setShowModal] = useState(false);
  const [showCalculator, setShowCalculator] = useState(false); // State for the calculator modal
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [allTransactions, setAllTransactions] = useState([]);
  const [frequency, setFrequency] = useState('7');
  const [selectedDate, setSelectedDate] = useState([]);
  const [type, setType] = useState('all');
  const [viewData, setViewData] = useState('table');
  const [editable, setEditable] = useState(null);

  // Added states and constants for categories
  const [selectedOption, setSelectedOption] = useState('income');
  const incomeCategories = ['💵 Salary', '🎉 Bonus', '📈 Investments', '💻 Freelancing', '🛍️ Side Business', '💳 Reimbursements'];
  const expenseCategories = [
    '🚗 Transportation',
    '🍽️ Dining/Restaurants',
    '🎬 Entertainment',
    '🛍️ Shopping',
    '✈️ Travel/Vacation',
    '🏥 Health/Medical',
    '🎓 Education',
    '💡 Bills/Utilities',
    '🛡️ Insurance',
    '🏠 Home/Real Estate',
    '💇 Personal Care',
    '🎁 Gifts/Donations',
    '💳 Debt/Loans',
    '💰 Taxes',
    '📺 Subscriptions/Memberships',
  ];

  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      render: (text) => <span>{moment(text).format("DD-MM-YYYY")}</span>,
    },
    {
      title: 'Title',
      dataIndex: 'title',
    },
    {
      title: 'Type',
      dataIndex: 'type',
    },
    {
      title: 'Category',
      dataIndex: 'category',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
    },
    {
      title: 'Description',
      dataIndex: 'description',
    },
    {
      title: 'Actions',
      render: (text, record) => (
        <div>
          <EditOutlined
            style={{ fontSize: '20px', color: '#08c' }}
            onClick={() => {
              setEditable(record);
              setShowModal(true);
            }}
          />
          <DeleteOutlined
            className="mx-3"
            style={{ fontSize: '20px', color: '#990000' }}
            onClick={() => {
              handleDelete(record);
            }}
          />
        </div>
      ),
    },
  ];

  const getAllTransactions = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      setLoading(true);
      const res = await axios.post('/transactions/get-transaction', {
        userid: user._id,
        frequency,
        selectedDate,
        type,
      });
      setLoading(false);
      setAllTransactions(res.data);
      console.log(res.data);
    } catch (error) {
      setLoading(false);
      message.error("Couldn't get transaction");
    }
  };

  const handleFormSubmit = async (values) => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      setLoading(true);
      if (editable) {
        await axios.post('/transactions/edit-transaction', {
          payload: {
            ...values,
            userid: user._id,
          },
          transactionsId: editable._id,
        });
        setLoading(false);
        message.success('Transaction Updated successfully');
      } else {
        await axios.post('/transactions/add-transaction', {
          ...values,
          userid: user._id,
        });
        setLoading(false);
        message.success('Transaction added successfully');
      }

      form.resetFields();
      setEditable(null);
      setShowModal(false);
    } catch (error) {
      setLoading(false);
      message.error('Failed to add transaction');
    }
  };

  const handleDelete = async (record) => {
    try {
      setLoading(true);
      await axios.post('/transactions/delete-transaction', {
        transactionsId: record._id,
      });
      setLoading(false);
      message.success('Transaction deleted successfully');
    } catch (error) {
      setLoading(false);
      message.error('Unable to delete transaction');
    }
  };

  const handleOptionChange = (value) => {
    setSelectedOption(value); // Update the selected option
  };

  const renderCategoryOptions = () => {
    const categories = selectedOption === 'income' ? incomeCategories : expenseCategories;

    return categories.map((category) => (
      <Select.Option key={category} value={category}>
        {category}
      </Select.Option>
    ));
  };

  useEffect(() => {
    getAllTransactions();
    setLoading(false);
  }, [loading, frequency, selectedDate, type]);

  return (
    <Layout>
  {loading && <Spinner />}
  <div className="bg-gradient-to-br from-gray-100 to-blue-50 p-5 rounded-lg shadow-md">
    <div className="flex m-5 justify-between items-center bg-white rounded-lg shadow-sm p-4">
      {/* Frequency Selector */}
      <div className="flex flex-col">
        <h6 className="text-lg font-semibold text-gray-700 mb-2">Select Frequency:</h6>
        <Select
          value={frequency}
          onChange={(values) => setFrequency(values)}
          className="border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        >
          <Select.Option value="7">Last one week</Select.Option>
          <Select.Option value="30">Last one Month</Select.Option>
          <Select.Option value="365">Last one Year</Select.Option>
          <Select.Option value="Custom">Custom</Select.Option>
        </Select>
        {frequency === 'Custom' && (
          <RangePicker
            value={selectedDate}
            onChange={(values) => setSelectedDate(values)}
            className="mt-2 border border-gray-300 rounded-md shadow-sm"
          />
        )}
      </div>

      {/* Type Selector */}
      <div className="flex flex-col">
        <h6 className="text-lg font-semibold text-gray-700 mb-2">Select Type:</h6>
        <Select
          value={type}
          onChange={(values) => setType(values)}
          className="border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          style={{ width: 120 }}
        >
          <Select.Option value="income">Income</Select.Option>
          <Select.Option value="expense">Expense</Select.Option>
          <Select.Option value="all">All</Select.Option>
        </Select>
      </div>

      {/* View Data Icons */}
      <div className="flex gap-4 text-2xl">
        <UnorderedListOutlined
          onClick={() => setViewData('table')}
          className="cursor-pointer text-gray-600 hover:text-blue-500 transition-colors duration-200"
        />
        <AreaChartOutlined
          onClick={() => setViewData('analytics')}
          className="cursor-pointer text-gray-600 hover:text-blue-500 transition-colors duration-200"
        />
        <CalculatorOutlined
          onClick={() => setShowCalculator(true)}
          className="cursor-pointer text-gray-600 hover:text-blue-500 transition-colors duration-200"
        />
      </div>

      {/* Add Transaction Button */}
      <button
        className="bg-gradient-to-r from-blue-500 to-blue-700 hover:bg-gradient-to-r hover:from-blue-700 hover:to-blue-900 text-white font-semibold py-2 px-4 rounded-full shadow-lg transition duration-300 ease-in-out flex items-center"
        onClick={() => {
          setEditable(null); // Reset editable record before opening the modal for adding transaction
          setShowModal(true);
        }}
      >
        <svg
          className="w-6 h-6 mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        Add Transaction
      </button>
    </div>

    {/* Calculator Modal */}
    <Modal
      title="Simple Calculator"
      open={showCalculator}
      onCancel={() => setShowCalculator(false)}
      //footer={null}
      className="rounded-lg shadow-md"
    >
      <Calculator />
    </Modal>

    {/* Add/Edit Transaction Modal */}
    <Modal
      title={editable ? 'Edit Transaction' : 'Add Transaction'}
      open={showModal}
      onCancel={() => setShowModal(false)}
     // footer={false}
      className="rounded-lg shadow-md"
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFormSubmit}
        initialValues={editable ? editable : null}
        className="bg-white rounded-lg shadow-sm p-5"
      >
        <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true, message: 'Please enter the title' }]}
        >
          <Input className="border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
        </Form.Item>
        <Form.Item
          name="amount"
          label="Amount"
          rules={[{ required: true, message: 'Please enter the amount' }]}
        >
          <Input
            type="number"
            className="border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </Form.Item>
        <Form.Item
          name="type"
          label="Type"
          rules={[{ required: true, message: 'Please enter the type' }]}
        >
          <Select
            defaultValue="income"
            onChange={handleOptionChange}
            className="border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          >
            <Select.Option value="income">Income</Select.Option>
            <Select.Option value="expense">Expense</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="category"
          label="Category"
          rules={[{ required: true, message: 'Please enter the category' }]}
        >
          <Select
            defaultValue={incomeCategories[0]}
            className="border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          >
            {renderCategoryOptions()}
          </Select>
        </Form.Item>
        <Form.Item
          name="date"
          label="Date"
          rules={[{ required: true, message: 'Please enter the category' }]}
        >
          <Input
            type="date"
            className="border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: 'Please enter the description' }]}
        >
          <Input
            type="text"
            className="border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </Form.Item>
        <div className="flex justify-end">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md shadow-lg"
            type="submit"
          >
            Save
          </button>
        </div>
      </Form>
    </Modal>

    {/* Transactions Table with Pagination */}
    <div className="content mt-5">
      {viewData === 'table' ? (
        <Table
          columns={columns}
          dataSource={allTransactions}
          pagination={{
            pageSize: 6, // Limit of 5 transactions per page
          }}
          className="rounded-lg shadow-md border border-gray-200"
        />
      ) : (
        <Analytics allTransactions={allTransactions} />
      )}
    </div>
  </div>
</Layout>

  
  );
}

export default HomePage;