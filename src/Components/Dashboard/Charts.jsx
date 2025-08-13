import { Line, Bar, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { useEffect, useState } from 'react';
import axios from 'axios';

ChartJS.register(
  CategoryScale, LinearScale, PointElement, LineElement, BarElement,
  Title, Tooltip, Legend, ArcElement
);

const areaData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [{
    label: 'Earnings',
    data: [0, 10000, 5000, 15000, 10000, 20000],
    borderColor: 'rgb(78, 115, 223)',
    backgroundColor: 'rgba(78, 115, 223, 0.05)',
    fill: true,
  }]
};

const pieData = {
  labels: ['Direct', 'Referral', 'Social'],
  datasets: [{
    data: [55, 30, 15],
    backgroundColor: ['#4e73df', '#1cc88a', '#36b9cc'],
    hoverBackgroundColor: ['#2e59d9', '#17a673', '#2c9faf'],
    hoverBorderColor: 'rgba(234, 236, 244, 1)',
  }]
};
export default function Charts() {
  const [barData , setBarData]=useState({
    labels: [],
    datasets: [{
    label: 'Dr Categories',
    data: [],
    borderColor: 'rgb(78, 115, 223)',
    backgroundColor: 'rgba(78, 115, 223, 0.05)',
    fill: true,
  }]
  });
  useEffect(() => {
  axios.get('http://localhost:4004/doctors')
    .then(res => {
      const jobTitles = res.data.map(item => item.jobTitle);
      const uniqueJobTitles = [...new Set(jobTitles)];
      const barData = {
        labels: uniqueJobTitles, 
        datasets: [{
          label: 'Number Of Doctors in Each Category',
          data: uniqueJobTitles.map(title =>
            res.data.filter(doc => doc.jobTitle === title).length
          ),
          backgroundColor: 'rgb(78, 115, 223)',
        }]
      };
      console.log(barData); 
      setBarData(barData)
    })
    .catch(err => console.log(err));
}, []);


  
  return (
    <div className="row">
      <div className="col-xl-8 col-lg-7">
        <div className="card shadow mb-4">
          <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-primary">Area Chart</h6>
          </div>
          <div className="card-body">
            <Line data={areaData} />
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
