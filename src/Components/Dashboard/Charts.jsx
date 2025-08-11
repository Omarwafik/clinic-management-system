import { Line, Bar, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJS.register(
  CategoryScale, LinearScale, PointElement, LineElement, BarElement,
  Title, Tooltip, Legend, ArcElement
);

export default function Charts() {
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

  const barData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'Revenue',
      data: [4215, 5312, 6251, 7841, 9821, 14984],
      backgroundColor: 'rgb(78, 115, 223)',
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
