import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const MonthlyConnectionRequestsChart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      const connectionRequests = {};
      const querySnapshot = await getDocs(collection(db, 'users'));

      // Initialize months
      const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];

      // Initialize connection requests for each month
      months.forEach((month) => {
        connectionRequests[month] = {
          Pending: 0,
          Approved: 0,
          'Connection Released': 0,
        };
      });

      // Process each document
      querySnapshot.forEach((doc) => {
        const data = doc.data();

        // Parse date with DD/MM/YYYY format (adjust separator if needed)
        const dateParts = data.Date_of_Application.split('/');
        const date = new Date(
          parseInt(dateParts[2], 10), // Year
          parseInt(dateParts[1], 10) - 1, // Month (0-indexed)
          parseInt(dateParts[0], 10) // Day
        );

        const month = months[date.getMonth()]; // Get numeric month index

        if (month !== undefined) {
          const status = data.Status.trim();

          // Increment counts based on status (handle missing properties)
          connectionRequests[month][status] =
            connectionRequests[month][status] || 0;
          connectionRequests[month][status] += 1;

          console.log(`Processing ${status} for ${month}`);
          console.log("Data object:", data);
        }
      });

      // Prepare data for the chart
      const labels = Object.keys(connectionRequests);
      const pendingData = labels.map((label) => connectionRequests[label].Pending);
      const approvedData = labels.map((label) => connectionRequests[label].Approved);
      const releasedData = labels.map((label) => connectionRequests[label]['Connection Released']);

      // Set chart data
      setChartData({
        labels: labels,
        datasets: [
          {
            label: 'Pending',
            data: pendingData,
            backgroundColor: 'rgba(255, 206, 86, 0.6)',
          },
          {
            label: 'Approved',
            data: approvedData,
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
          },
          {
            label: 'Connection Released',
            data: releasedData,
            backgroundColor: 'rgba(153, 102, 255, 0.6)',
          },
        ],
      });
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Monthly Connection Requests</h2>
      <Bar
        data={chartData}
        options={{
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
              type: 'linear',
            },
          },
        }}
      />
    </div>
  );
};

export default MonthlyConnectionRequestsChart;