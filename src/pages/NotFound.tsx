import { Transition } from '@headlessui/react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound: React.FC = () => {
  const [show, setShow] = useState<boolean>(false);
  const navigate = useNavigate();
  const handlePrev = () => {
    setShow(false);
    setTimeout(() => {
      navigate(-1);
    }, 500);
  };
  useEffect(() => {
    setTimeout(() => {
      setShow(true);
    }, 250);
  }, []);
  return (
    <>
      <div className="mx-auto w-full h-[100vh] bg-slate-800 overflow-hidden">
        <div className="rounded-sm h-full flex justify-center items-center">
          <div className="mx-auto flex justify-evenly flex-col md:flex-row items-center w-full">
            <Transition
              show={show}
              enter="transform transition duration-300 delay-[500ms]"
              enterFrom="opacity-0 scale-110"
              enterTo="opacity-100 scale-100"
              leave="transform duration-300 transition ease-in-out"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-75"
              as="img"
              src="/img/log-in.svg"
              className="w-3/4 md:w-1/2 h-full"
            ></Transition>

            <Transition
              show={show}
              enter="transform transition duration-300 delay-[750ms]"
              enterFrom="opacity-0 scale-110"
              enterTo="opacity-100 scale-100"
              leave="transform duration-300  transition ease-in-out"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-75"
              className="mt-7.5 text-center mx-2 md:mx-0 md:text-end"
            >
              <h2 className="mb-3 text-4xl font-bold text-white">
                404 Not Found
              </h2>
              <p className="font-medium text-white">
                Halaman yang kamu cari sepertinya dialihkan atau tidak pernah
                ada
              </p>
              <button
                onClick={handlePrev}
                className="mt-7.5 inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 font-medium text-white hover:bg-opacity-90"
              >
                <svg
                  className="fill-current"
                  width="16"
                  height="14"
                  viewBox="0 0 16 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.7492 6.38125H2.73984L7.52109 1.51562C7.77422 1.2625 7.77422 0.86875 7.52109 0.615625C7.26797 0.3625 6.87422 0.3625 6.62109 0.615625L0.799219 6.52187C0.546094 6.775 0.546094 7.16875 0.799219 7.42188L6.62109 13.3281C6.73359 13.4406 6.90234 13.525 7.07109 13.525C7.23984 13.525 7.38047 13.4687 7.52109 13.3562C7.77422 13.1031 7.77422 12.7094 7.52109 12.4563L2.76797 7.64687H14.7492C15.0867 7.64687 15.368 7.36562 15.368 7.02812C15.368 6.6625 15.0867 6.38125 14.7492 6.38125Z"
                    fill=""
                  ></path>
                </svg>
                <span>Kembali Ke Sebelumnya</span>
              </button>
            </Transition>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
