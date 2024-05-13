import { ApexOptions } from 'apexcharts';
import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { FiBarChart2 } from 'react-icons/fi';

interface AuditChart {
  series: {
    name: string;
    data: number[];
  }[];
}

interface Dataset {
  dataset: {
    mayor: number;
    minor: number;
    observasi: number;
    total?: number;
  };
}

const AllAudit: React.FC<Dataset> = ({ dataset }) => {
  const [state, setState] = useState<AuditChart>({
    series: [
      {
        name: 'Total',
        data: [dataset?.mayor, dataset?.minor, dataset?.observasi],
      },
    ],
  });

  const options: ApexOptions = {
    chart: {
      fontFamily: 'Output Sans Regular',
      type: 'bar',
      height: 335,
      stacked: false,
      toolbar: {
        show: true,
      },
      zoom: {
        enabled: true,
      },
    },
    yaxis: {
      min: 0,
      tickAmount: 4,
      labels: {
        formatter: (val, opts) => `${Math.floor(val)}`,
      },
      max: Math.max(dataset?.mayor, dataset?.minor, dataset?.observasi) * 5,
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
        {dataset?.minor > 0 || dataset?.mayor > 0 || dataset?.observasi > 0 ? (
          <ReactApexChart
            options={options}
            series={state.series}
            type="bar"
            height={300}
          />
        ) : (
          <div className="w-full flex flex-col mb-5 justify-center items-center h-[295px]">
            <FiBarChart2 className="text-9xl text-blue-300" />
            <div className="text-slate-700 font-medium">
              Temuan tidak pernah ditemukan pada audit manapun
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllAudit;
