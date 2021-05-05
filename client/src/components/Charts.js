import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { useParams} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Header from './Header';
import Footer from './Footer';
import { isAuth } from '../helpers/auth';
import { Line, Bar, Pie, Doughnut, PolarArea} from 'react-chartjs-2';
import io from 'socket.io-client';

import { chartData } from "./chartData";
import * as d3 from "d3-scale-chromatic";

const socket = io('http://localhost:5000', {
  transports: ['websocket', 'polling']
});


// https://stackoverflow.com/questions/38529553/multiple-axios-requests-into-reactjs-state
const Charts = () => {  
  const [data, setData] = useState({
    longUrl: "",
    shortUrl: "",
    totalClicks: 0,
    
    lineData: {
      labels: [],
      datasets: [{
        label: "hour",
        data: [],
      }]
    },

    doughnutData: {},
    pieData: {},
    baseData: {},
    barData: {},
  })

  const {longUrl, shortUrl, totalClicks, lineData, doughnutData,pieData,baseData,barData} = data;
  const { url } = useParams();

  const getUrls = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/urls/${url}`)
      .then(res => {

        const {shortUrl, longUrl} = res.data;
        setData(prev => ({...prev, shortUrl, longUrl}));
      })
      .catch(err => {
        console.log(err);
        toast.error('Load Info Error');
      })
  }
  const getTotalClicks = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/urls/${url}/totalClicks`)
      .then(res => {
        setData(prev => ({...prev, totalClicks: res.data}))
      })
      .catch(err => {
        console.log(err);
        toast.error('Load Info Error');
      })

  }
  const getTime = (time) => {
    var tmpData = {
      labels: [],
      datasets: [{
        label: time,
        data: [],
      }]
    }

    axios
      .get(`${process.env.REACT_APP_API_URL}/urls/${url}/${time}`)
      .then(res => {
        res.data.forEach(function (item) {
          var legend = "";
          if (time === "hour") {
              if (item._id.minutes < 10) {
                  item._id.minutes = "0" + item._id.minutes;
              }
              legend = item._id.hour + ":" + item._id.minutes;
          }
          if (time === "day") {
              legend = item._id.hour + ":00";
          }
          if (time === "month") {
              legend = item._id.month + "/" + item._id.day;
          }
          tmpData.labels.push(legend);
          tmpData.datasets[0].data.push(item.count);
        });

        setData(prev => ({...prev, lineData: tmpData}))
      })
  }
  const renderChart = (chart, infos) => {
    var data = [];
    var labels = []

    axios
      .get(`${process.env.REACT_APP_API_URL}/urls/${url}/${infos}`)
      .then(res => {
        res.data.forEach(function (info) {
          data.push(info.count)
          labels.push(info._id)
        })

        if (chart === 'doughnut') {
          const temp = chartData({
            labels: labels,
            data: data,
            colorRangeInfo: {
              colorStart: 0,
              colorEnd: 1,
              useEndAsStart: true,
            },
            scale: d3.interpolateRainbow,
            dataLabel: infos,
          });
          
          setData(prev => ({
            ...prev,
            doughnutData: temp
          }))
        } else if (chart === 'pie') {
          const temp = chartData({
            labels: labels,
            data: data,
            colorRangeInfo: {
              colorStart: 0,
              colorEnd: 1,
              useEndAsStart: true,
            },
            scale: d3.interpolateCool,
            dataLabel: infos,
          });
          setData(prev => ({
            ...prev,
            pieData: temp
          }))
        } else if (chart === 'base') {
          const temp = chartData({
            labels: labels,
            data: data,
            colorRangeInfo: {
              colorStart: 0,
              colorEnd: 1,
              useEndAsStart: true,
            },
            scale: d3.interpolateRdYlBu,
            dataLabel: infos,
          });

          setData(prev => ({
            ...prev,
            baseData: temp
          }))
        } else if (chart === 'bar') {
          const temp = chartData({
            labels: labels,
            data: data,
            colorRangeInfo: {
              colorStart: 0,
              colorEnd: 1,
              useEndAsStart: true,
            },
            scale: d3.interpolateSpectral,
            dataLabel: infos,
          });

          setData(prev => ({
            ...prev,
            barData: temp
          }))
        }
      })
      .catch(err => {
        console.log(err);
        toast.error('Load Info Error');
      })

  }

  const loadInfo = () => {
    getTotalClicks();
    getTime(lineData.datasets[0].label);
    renderChart("doughnut", "referer");
    renderChart("pie", "country");
    renderChart("base", "platform");
    renderChart("bar", "browser");
  }
  // listen for register event to initialize state
  useEffect(() => {
    getUrls();
    loadInfo();
    socket.emit('registerShortUrl', url);  
  }, []);

  // listen for update event to update state
  socket.on('shortUrlUpdated', function () {
    loadInfo();
  });

  const chartForm = () => {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-5 col-md-offset-2">
            <div className="row">
              <h4> Your Long URL is: </h4>
              <a href={longUrl} target="_blank" rel="noopener noreferrer">{longUrl}</a>
            </div>

            <div className="row">
                <h4> Your TinyURL is: </h4>
                <a href={`http://localhost:5000/${shortUrl}`} target="_blank" rel="noopener noreferrer">{`http://localhost:5000/${shortUrl}`}</a>
            </div>
          </div>

          <div className="col-md-3">
              <div className="card">
                  <div className="card-header">Total Clicks</div>
                  <h1 className="card-block">{ totalClicks }</h1>
              </div>
          </div>
        </div>


        <div className="row">
          <div className="col-md-8 col-md-offset-2">
            <div className="card">
              {/* <div className="card-header">
                Clicks for the past: 
                        <a href="#" onClick={(e) => {
                            e.preventDefault();
                            getTime('hour')
                          }} className={ lineData.datasets[0].label === 'hour' ? null: 'text-muted' }> Hour </a>
                        <a href="#" onClick={(e) => {
                          e.preventDefault();
                          getTime('day')
                        }} className={ lineData.datasets[0].label === 'day' ? null: 'text-muted' }> Day </a>
                        <a href="#" onClick={(e) => {
                          e.preventDefault();
                          getTime('month')
                        }} className={ lineData.datasets[0].label === 'month' ? null: 'text-muted' }> Month </a>
              </div> */}

              <div className="card-block">
                  <Line data={lineData} />
              </div>

            </div>
          </div>
        </div>


        <div className="row">
          <div className="col-md-6">
            <div className="card">
              <div className="card-header">
                Referrers
              </div>

              <div className="card-block">
                  <Doughnut data={doughnutData} />
              </div>
            </div>
          </div>

          <div className="col-md-6">
              <div className="card">
                  <div className="card-header">
                      Countries
                  </div>

                  <div className="card-block">
                      <Pie data={pieData} />
                  </div>
              </div>
          </div>
        </div>


        <div className="row">
          <div className="col-md-6">
            <div className="card">
              <div className="card-header">
                Platforms
              </div>

              <div className="card-block">
                  <PolarArea data={baseData} />
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card">
              <div className="card-header">
                Browsers
              </div>

              <div className="card-block">
                  <Bar data={barData} />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  console.log(data)

  return (
    <>
      <Header />
      <ToastContainer />
        {/* {!isAuth() ?  <Redirect to="/login" />: null}  */}
        {chartForm()}
      <Footer />

    </>
  )
}

export default Charts;