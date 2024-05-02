import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import SidebarLinkGroup from './SidebarLinkGroup';
import { FiExternalLink, FiGithub, FiGrid, FiLink, FiX } from 'react-icons/fi';
import navsRole from '../../utils/navsRole';
import { credential } from '../../utils/constant';

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

interface ParentItem {
  name: string;
  url: string;
  icon: React.ReactNode;
  isGrup: boolean;
  lists?: ChildItem[];
}

interface ChildItem {
  name: string;
  url: string;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const location = useLocation();
  const { pathname } = location;

  const [activeNavs, setNavs] = useState<ParentItem[] | any | null>(null);

  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);

  const storedSidebarExpanded = localStorage.getItem('sidebar-expanded');
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true',
  );

  useEffect(() => {
    setNavs(navsRole[credential?.meta?.level_role - 1]);
  }, []);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  useEffect(() => {
    localStorage.setItem('sidebar-expanded', sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector('body')?.classList.add('sidebar-expanded');
    } else {
      document.querySelector('body')?.classList.remove('sidebar-expanded');
    }
  }, [sidebarExpanded]);

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 transition-all top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0 ease-out' : '-translate-x-full ease-in-out'
      }`}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
        <NavLink
          to="/"
          className="flex justify-start text-white items-start flex-col gap-2"
        >
          <h2 className="text-5xl font-bold">AMI</h2>
          <span className="font-medium">Sistem Audit</span>
        </NavLink>

        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden"
        >
          <FiX className="text-white text-4xl" />
        </button>
      </div>
      {/* <!-- SIDEBAR HEADER --> */}

      <div className="no-scrollbar relative flex flex-col overflow-y-auto duration-300 ease-linear">
        {/* <!-- Sidebar Menu --> */}
        <nav className="mt-5 py-4 px-4 lg:px-6">
          {/* <!-- Menu Group --> */}
          <div>
            <h3 className="mb-4 uppercase ml-4 text-sm font-semibold text-bodydark2">
              MENU {credential?.meta?.active_role}
            </h3>

            <ul className="mb-6 flex flex-col gap-1.5">
              {/* <!-- Menu Item Dashboard --> */}
              <li>
                <NavLink
                  to="/"
                  className={`group relative flex items-center gap-2.5 rounded-md py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname === '/' ? 'bg-graydark dark:bg-meta-4' : ''
                  }`}
                >
                  <FiGrid />
                  Dashboard
                </NavLink>
              </li>
              {/* <!-- Menu Item Dashboard --> */}

              {/* Menu By Role */}
              {activeNavs?.map(
                (parentItem: ParentItem, parentIndex: number) => (
                  <div className="" key={parentIndex}>
                    {parentItem.isGrup ? (
                      <SidebarLinkGroup
                        activeCondition={
                          pathname === parentItem.url ||
                          pathname.includes(parentItem.url)
                        }
                      >
                        {(handleClick, open) => (
                          <React.Fragment>
                            <NavLink
                              to="#"
                              className={`group relative transition-all flex items-center gap-2.5 rounded-md py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                                (pathname === parentItem.url ||
                                  pathname.includes(parentItem.url)) &&
                                'bg-graydark dark:bg-meta-4'
                              }`}
                              onClick={(e) => {
                                e.preventDefault();
                                sidebarExpanded
                                  ? handleClick()
                                  : setSidebarExpanded(true);
                              }}
                            >
                              {parentItem.icon}
                              <span>{parentItem.name}</span>
                              <svg
                                className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                                  open && 'rotate-180'
                                }`}
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                                  fill=""
                                />
                              </svg>
                            </NavLink>
                            {/* <!-- Dropdown Menu Start --> */}
                            <div
                              className={`translate transform overflow-hidden ${
                                !open && 'hidden'
                              }`}
                            >
                              <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
                                {parentItem.lists?.map(
                                  (
                                    childItem: ChildItem,
                                    childIndex: number,
                                  ) => (
                                    <li key={childIndex}>
                                      <NavLink
                                        to={childItem.url}
                                        className={({ isActive }) =>
                                          'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                          (isActive && '!text-white')
                                        }
                                      >
                                        {childItem.name}
                                      </NavLink>
                                    </li>
                                  ),
                                )}
                              </ul>
                            </div>
                            {/* <!-- Dropdown Menu End --> */}
                          </React.Fragment>
                        )}
                      </SidebarLinkGroup>
                    ) : (
                      <li key={parentIndex}>
                        <NavLink
                          to={parentItem.url}
                          className={`group relative transition-all flex items-center gap-2.5 rounded-md py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                            pathname.includes(parentItem.url) &&
                            'bg-graydark dark:bg-meta-4'
                          }`}
                        >
                          {parentItem.icon}
                          <span>{parentItem.name}</span>
                        </NavLink>
                      </li>
                    )}
                  </div>
                ),
              )}
              {/* Menu By Role */}
            </ul>
          </div>
        </nav>
        {/* <!-- Sidebar Menu --> */}

        <div className="fixed bottom-8 left-8 flex items-center gap-6">
          {/* <NavLink to={'https://github.com/dendik-creation'} target="_blank">
            <FiGithub className="text-slate-500 text-3xl transition-all hover:text-slate-50" />
          </NavLink> */}
          <div className="text-slate-400">
            <div className="text-md font-semibold">ISO</div>
            <div className="text-sm">{credential?.meta?.kode_iso}</div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
