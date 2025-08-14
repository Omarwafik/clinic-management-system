import { Line, Bar, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { useEffect, useState } from 'react';
import axios from 'axios';

ChartJS.register(
  CategoryScale, LinearScale, PointElement, LineElement, BarElement,
  Title, Tooltip, Legend, ArcElement
);

export default function Charts() {
  const [barData, setBarData] = useState({
    labels: [],
    datasets: [{
      label: 'Dr Categories',
      data: [],
      borderColor: 'rgb(78, 115, 223)',
      backgroundColor: 'rgba(78, 115, 223, 0.05)',
      fill: true,
    }]
  });

  const [LineData, setLineData] = useState({  
    labels: [],
    datasets: [{
      label: 'New Doctors per Month',
      data: [],
      borderColor: 'rgb(78, 115, 223)',
      backgroundColor: 'rgba(78, 115, 223, 0.05)',
      fill: true,
    }]
  });

  const [pieData, setPieData] = useState({
    labels: [],
    datasets: [{
      data: [],
      backgroundColor: ['#4e73df', '#1cc88a', '#36b9cc'],
      hoverBackgroundColor: ['#2e59d9', '#17a673', '#2c9faf'],
      hoverBorderColor: 'rgba(234, 236, 244, 1)',
    }]
  });

  useEffect(() => {
    axios.get('http://localhost:4004/doctors')
      .then(res => {
        const data = res.data;

        // --------- Bar chart logic ----------
        const jobTitles = data.map(item => item.jobTitle);
        const uniqueJobTitles = [...new Set(jobTitles)];
        const barData = {
          labels: uniqueJobTitles, 
          datasets: [{
            label: 'Number Of Doctors in Each Category',
            data: uniqueJobTitles.map(title =>
              data.filter(doc => doc.jobTitle === title).length
            ),
            backgroundColor: 'rgb(78, 115, 223)',
          }]
        };
        setBarData(barData);

        // --------- Line chart logic ----------
        const createTimes = data.map(item => item.createdAt);
        const formattedDates = createTimes.map(date => 
          new Date(date).toLocaleString("default", { month: "short", year: "numeric" })
        );
        const uniqueCreateTime = [...new Set(formattedDates)];
        const counts = uniqueCreateTime.map(date => 
          formattedDates.filter(d => d === date).length
        );
        const lineData = {
          labels: uniqueCreateTime,
          datasets: [{
            label: 'New Doctors per Month',
            data: counts,
            borderColor: 'rgb(78, 115, 223)',
            backgroundColor: 'rgba(78, 115, 223, 0.05)',
            fill: true,
          }]
        };
        setLineData(lineData);

               // ===== Pie Chart: Top 3 Categories by Average Rating =====
        const categoryRatings = {};
        data.forEach(doc => {
          if (!categoryRatings[doc.jobTitle]) categoryRatings[doc.jobTitle] = [];
          categoryRatings[doc.jobTitle].push(doc.rating || 0);
        });

        const avgRatings = Object.entries(categoryRatings).map(([title, ratings]) => ({
          title,
          avg: ratings.reduce((a,b)=>a+b,0)/ratings.length
        }));

        const top3 = avgRatings.sort((a,b)=>b.avg - a.avg).slice(0,3);

        const pieChartData = {
          labels: top3.map(c => c.title),
          datasets: [{
            data: top3.map(c => c.avg),
            backgroundColor: ['#4e73df', '#1cc88a', '#36b9cc'],
            hoverBackgroundColor: ['#2e59d9', '#17a673', '#2c9faf'],
            hoverBorderColor: 'rgba(234, 236, 244, 1)',
          }]
        };
        setPieData(pieChartData);

      })
      .catch(err => console.error(err));
  }, []);


  
  return (
    <div className="row">
      <div className="col-xl-8 col-lg-7">
        <div className="card shadow mb-4">
          <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-primary">Area Chart</h6>
          </div>
          <div className="card-body">
            <Line data={LineData} />
          </div>
        </div>

        <div className="card shadow mb-4">
          <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-primary">Bar Chart</h6>
          </div>
          <div className="card-body">
            <Bar data={barData} />
          </div>
        </div>
      </div>

      <div className="col-xl-4 col-lg-5">
        <div className="card shadow mb-4">
          <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-primary">Donut Chart</h6>
          </div>
          <div className="card-body">
            <Doughnut data={pieData} />
          </div>
        </div>
      </div>
    </div>
  );
}
