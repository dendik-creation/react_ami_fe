import { ring } from 'ldrs';
import { useEffect, useState } from 'react';
import toastFire from '../../hooks/toastFire';

ring.register();

export default function LoadFetch() {
  const [timeoutValue, setTimeoutValue] = useState<number>(10000);
  const [intervalValue, setIntervalValue] = useState<number>(0);
  let intervalLoop: any;
  useEffect(() => {
    if (intervalValue == timeoutValue) {
      toastFire({
        message: 'Data Sulit Dimuat, Refresh Halaman & Coba Lagi',
        status: false,
      });
      clearInterval(intervalLoop);
    }
  }, [intervalValue]);
  const startInterval = () => {
    intervalLoop = setInterval(() => {
      setIntervalValue((prev: number) => prev + 100);
    }, 100);
  };
  useEffect(() => {
    startInterval();
  }, []);
  return (
    <>
      <div className="w-full h-full flex justify-center items-center">
        <l-ring size="100" speed={2} stroke={30} color="#191970" />
      </div>
    </>
  );
}
