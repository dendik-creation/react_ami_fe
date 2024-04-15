import { Fragment, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { logout } from '../../api/auth';
import { Transition, Dialog } from '@headlessui/react';
import 'ldrs/bouncy';
import { credential } from '../../utils/constant';
import { FiChevronDown, FiLogOut, FiUser } from 'react-icons/fi';

const DropdownUser = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isLoggingOut, setLoad] = useState(false);

  const trigger = useRef<any>(null);
  const dropdown = useRef<any>(null);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!dropdown.current) return;
      if (
        !dropdownOpen ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setDropdownOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  const confirmLogout = async () => {
    await setLoad(true);
    await logout(setLoad, setShowModal);
  };

  return (
    <div className="relative">
      <Link
        ref={trigger}
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center gap-4"
        to="#"
      >
        <span className="hidden text-right lg:block">
          <span className="block font-semibold text-black dark:text-white">
            {credential?.user.nama_lengkap}
          </span>
          <span className="block text-sm capitalize">
            {credential?.meta?.active_role}
          </span>
        </span>

        <span className="h-12 w-12 relative overflow-hidden bg-slate-400 flex justify-center items-center rounded-full">
          {/* <HiUser className="text-5xl absolute -bottom-1.5 text-slate-100" /> */}
          <img src="/img/avatar.jpg" alt="" />
        </span>

        <FiChevronDown className="text-xl" />
      </Link>

      {/* <!-- Dropdown Start --> */}
      <div
        ref={dropdown}
        onFocus={() => setDropdownOpen(true)}
        onBlur={() => setDropdownOpen(false)}
        className={`absolute right-0 mt-4 flex w-62.5 flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark ${
          dropdownOpen === true ? 'block' : 'hidden'
        }`}
      >
        <ul className="flex flex-col gap-5 border-b border-stroke px-6 py-4 dark:border-strokedark">
          <li>
            <Link
              to="/profile"
              className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
            >
              <FiUser className="text-xl" />
              <span>Profil Saya</span>
            </Link>
          </li>
        </ul>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-3.5 px-6 py-4 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
        >
          <FiLogOut className="text-xl" />
          <span>Log Out</span>
        </button>
      </div>
      {/* <!-- Dropdown End --> */}

      {/* Confirm Logout */}
      <Transition appear show={showModal} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-9999"
          onClose={() => setShowModal(true)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h1"
                    className="text-2xl font-semibold text-gray-900"
                  >
                    Konfirmasi Log out
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Log out akan menghapus sesi Anda
                    </p>
                  </div>

                  <div className="mt-4 flex justify-center items-center gap-3">
                    <button
                      type="button"
                      disabled={isLoggingOut}
                      className="w-full justify-center rounded-md border border-transparent bg-red-400 px-4 py-2 text-sm font-medium text-slate-200 hover:bg-red-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                      onClick={confirmLogout}
                    >
                      {isLoggingOut ? (
                        <l-bouncy size={30} speed={1.2} color={'#FFFDD0'} />
                      ) : (
                        <span>Log Out</span>
                      )}
                    </button>
                    <button
                      type="button"
                      disabled={isLoggingOut}
                      className={`
                      justify-center rounded-md border disabled:opacity-35 transition-all border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2`}
                      onClick={() => setShowModal(false)}
                    >
                      Batalkan
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default DropdownUser;
