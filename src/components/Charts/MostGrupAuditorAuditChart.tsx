import { ApexOptions } from 'apexcharts';
import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { FiPieChart } from 'react-icons/fi';

const MostGrupAuditorAuditChart: React.FC = ({
  dataset,
}: any | undefined | null) => {
  const options: ApexOptions = {
    chart: {
      fontFamily: 'Quicksand Semibold',
      type: 'donut',
      toolbar: {
        show: true,
      },
    },
    colors: ['#FFEB3B', '#FFD176', '#FFE0B2', '#E3F2FD', '#FFF59D'],
    labels: dataset?.map((item: any) => item.nama_grup),
    legend: {
      show: true,
      showForZeroSeries: true,
      position: 'top',
    },

    plotOptions: {
      pie: {
        donut: {
          size: '55%',
          labels: {
            show: true,
            value: {
              fontSize: '15px',
              formatter: (val) => `Total ${val}x`,
            },
          },
        },
        startAngle: 30,
        expandOnClick: true,
        dataLabels: {
          offset: -1,
        },
      },
    },
    dataLabels: {
      enabled: true,
      formatter: (val, opt) => `${val}%`,
      style: {
        fontFamily: 'Quicksand Semibold',
        fontSize: '18px',
        fontWeight: 'medium',
        colors: ['white'],
      },
      dropShadow: {
        enabled: false,
      },
      textAnchor: 'middle',
    },
  };
  const [state, setState] = useState<any>({
    series: dataset?.map((item: any) => item.total_audit),
  });
  return (
    <div className="rounded-lg bg-white p-7.5 shadow-lg">
      <div className="mb-4 justify-between gap-4 sm:flex">
        <div>
          <h4 className="text-xl font-semibold text-black dark:text-white">
            Grup Auditor Paling Banyak Audit
          </h4>
        </div>
      </div>

      <div className="-ml-5 -mb-9">
        {dataset?.length > 0 ? (
          <ReactApexChart
            options={options}
            series={state.series}
            type="donut"
            height={310}
          />
        ) : (
          <div className="w-full flex flex-col mb-5 justify-center items-center h-[295px]">
            <FiPieChart className="text-9xl text-blue-300" />
            <div className="text-slate-700 font-medium">
              Tidak Ada Grup Yang Mengaudit
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MostGrupAuditorAuditChart;
