import { ApexOptions } from 'apexcharts';
import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const options: ApexOptions = {
  chart: {
    fontFamily: 'Quicksand Semibold',
    type: 'bar',
    height: 335,
    stacked: true,
    toolbar: {
      show: true,
    },
    zoom: {
      enabled: false,
    },
  },
  responsive: [
    {
      breakpoint: 1536,
      options: {
        plotOptions: {
          bar: {
            borderRadius: 6,
            columnWidth: '70%',
            distributed: true,
          },
        },
      },
    },
  ],
  plotOptions: {
    bar: {
      horizontal: false,
      borderRadius: 6,
      columnWidth: '40%',
      borderRadiusApplication: 'end',
      borderRadiusWhenStacked: 'last',
      distributed: true,
    },
  },
  colors: ['#FB5454', '#F0950C', '#576BF6'],
  dataLabels: {
    enabled: true,
  },
  xaxis: {
    categories: ['Mayor', 'Minor', 'Observasi'],
  },
  legend: {
    show: false,
  },
};

interface AuditChart {
  series: {
    name: string;
    data: number[];
  }[];
}

const AllAudit: React.FC = ({ dataset }: any) => {
  const [state, setState] = useState<AuditChart>({
    series: [
      {
        name: 'Total',
        data: [dataset?.mayor, dataset?.minor, dataset?.observasi],
      },
    ],
  });

  return (
    <div className="rounded-lg bg-white p-7.5 shadow-lg">
      <div className="mb-4 justify-between gap-4 sm:flex">
        <div>
          <h4 className="text-xl font-semibold text-black dark:text-white">
            Hasil Seluruh Audit
          </h4>
        </div>
      </div>

      <div className="-ml-5 -mb-9">
        {dataset?.minor > 0 && dataset?.mayor > 0 && dataset?.observasi > 0 ? (
          <ReactApexChart
            options={options}
            series={state.series}
            type="bar"
            height={300}
          />
        ) : (
          <span>OK</span>
        )}
      </div>
    </div>
  );
};

export default AllAudit;
