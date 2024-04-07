import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
import { GetOrderDetails } from "../../services";

const MONTH_NAMES = {
  1: "January",
  2: "February",
  3: "March",
  4: "April",
  5: "May",
  6: "June",
  7: "July",
  8: "August",
  9: "September",
  10: "October",
  11: "November",
  12: "December"
};

const Metrics = () => {
  const [data, setData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const filterQuery = {}

  const [series, setSeries] = useState([{
    name: 'Total Orders',
    data: []
  }]);
  const [options, setOptions] = useState({
    chart: {
      id: 'apexchart-example'
    },
    xaxis: {
      categories: []
    }
  });

  useEffect(() => {
    async function calculateTotalOrdersRevenueForYear() {
      try {
        // Make an API call to get all of the orders for the year.
        const orders = await GetOrderDetails.getAllOrdermatrix(filterQuery).then((res) => res.data.items);

        // console.log("Orders", orders)
        // Create an array to store the results.
        const results = [];

        // Iterate over the orders and calculate the total revenue for each month.
        for (const order of orders) {
          const month = MONTH_NAMES[new Date(order.OrderDate).getMonth() + 1];
          if (!results.find((result) => result.month === month)) {
            results.push({ month, revenue: 0 });
          }

          const result = results.find((result) => result.month === month);
          result.revenue += order.Total;
        }

        // Convert the results object to an array of objects with the text and value properties.
        const data = results.map((result) => ({
          text: result.month,
          value: result.revenue
        }));

        // Set the state with the results.
        setData(data);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    }

    calculateTotalOrdersRevenueForYear();
  }, []);

  useEffect(() => {
    setSeries([{
      name: 'Total Orders',
      data: data.map((item) => item.value)
    }]);

    setOptions({
      chart: {
        id: 'apexchart-example'
      },
      xaxis: {
        categories: data.map((item) => item.text)
      }
    });
  }, [data]);

  return (
    <div>
      <div style={{ width: '100%' }}>
        <Chart options={options} series={series} type="bar" height={450} />
      </div>
    </div>
  );
};

export default Metrics;
