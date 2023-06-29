

import React, { useEffect } from "react";

import ApexCharts from "apexcharts";

import { Link } from "react-router-dom";

import "../../App.css"

const ReportsChartVend = () => {

  useEffect(() => {

    const chartOptions = {

      series: [

        {

          name: "Commandes",

          data: [31, 40, 28, 51, 42, 82, 56],

        },

        {

          name: "Clients",

          data: [11, 32, 45, 32, 34, 52, 41],

        },

        {

          name: "Stocks",

          data: [15, 11, 32, 18, 9, 24, 11],

        },
        

      ],

      chart: {

        height: 350,

        type: "area",

        toolbar: {

          show: false,

        },

      },

      markers: {

        size: 4,

      },

      colors: ["#4154f1", "#2eca6a", "#ff771d"],

      fill: {

        type: "gradient",

        gradient: {

          shadeIntensity: 1,

          opacityFrom: 0.3,

          opacityTo: 0.4,

          stops: [0, 90, 100],

        },

      },

      dataLabels: {

        enabled: false,

      },

      stroke: {

        curve: "smooth",

        width: 2,

      },

      xaxis: {

        type: "datetime",

        categories: [

          "2018-09-19T00:00:00.000Z",

          "2018-09-19T01:30:00.000Z",

          "2018-09-19T02:30:00.000Z",

          "2018-09-19T03:30:00.000Z",

          "2018-09-19T04:30:00.000Z",

          "2018-09-19T05:30:00.000Z",

          "2018-09-19T06:30:00.000Z",

        ],

      },

      tooltip: {

        x: {

          format: "dd/MM/yy HH:mm",

        },

      },

    };

    const chart = new ApexCharts(

      document.querySelector("#reportsChart"),

      chartOptions

    );

    chart.render();

    return () => {

      chart.destroy();

    };

  }, []);

  return (

    <div className="col-12">

      <div className="card">

        {/* <div className="filter">

          <Link to="#" className="icon" data-bs-toggle="dropdown">

            <i className="bi bi-three-dots"></i>

          </Link>

          <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">

            <li className="dropdown-header text-start">

              <h6>Filtrer</h6>

            </li>

            <li>

              <Link to="#" className="dropdown-item" type="button">

                Ajourd'ui

              </Link>

            </li>

            <li>

              <Link to="#" className="dropdown-item" type="button">

                Ce mois

              </Link>

            </li>

            <li>

              <Link to="#" className="dropdown-item" type="button">

                Cette année

              </Link>

            </li>

          </ul>

        </div> */}

        <div className="card-body">

          <h5 className="card-title">

            Rapports <span>/Ajourd'ui</span>

          </h5>

          <div id="reportsChart"></div>

        </div>

      </div>

    </div>

  );

};

export default ReportsChartVend;

