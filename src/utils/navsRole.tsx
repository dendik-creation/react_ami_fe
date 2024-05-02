import {
  FiDatabase,
  FiMessageCircle,
  FiMonitor,
  FiPlusSquare,
  FiCloud,
  FiUnlock,
} from 'react-icons/fi';

const navsRole = [
  [
    {
      name: 'Respon Audit',
      url: '/respon-audit',
      isGrup: false,
      icon: <FiMessageCircle />,
      lists: [],
    },
    {
      name: 'Monitoring Data',
      url: '/monitoring',
      icon: <FiMonitor />,
      isGrup: true,
      lists: [
        {
          name: 'Data Grup Auditor',
          url: '/monitoring/grup-auditor',
        },
        {
          name: 'Histori Audit Saya',
          url: '/monitoring/my-history-audits',
        },
      ],
    },
  ],
  [
    {
      name: 'Input Audit Baru',
      url: '/new-audit',
      isGrup: false,
      icon: <FiPlusSquare />,
      lists: [],
    },
    {
      name: 'Monitoring Data',
      url: '/monitoring',
      icon: <FiMonitor />,
      isGrup: true,
      lists: [
        {
          name: 'Data Grup Auditor',
          url: '/monitoring/grup-auditor',
        },
        {
          name: 'Seluruh Audit Saya',
          url: '/monitoring/my-audits',
        },
      ],
    },
  ],
  [
    {
      name: 'Master Data',
      icon: <FiDatabase />,
      url: '/master',
      isGrup: true,
      lists: [
        {
          name: 'Data User',
          url: '/master/user',
        },
        {
          name: 'Data Clausul',
          url: '/master/clausul',
        },
        {
          name: 'Data Grup Auditor',
          url: '/master/grup-auditor',
        },
        {
          name: 'Data ISO',
          url: '/master/iso',
        },
        {
          name: 'Data Departemen',
          url: '/master/departemen',
        },
        {
          name: 'Data Unit',
          url: '/master/unit',
        },
      ],
    },
    {
      name: 'Histori Seluruh Audit',
      icon: <FiCloud />,
      url: '/history-all-audit',
      isGrup: false,
      lists: [],
    },
  ],
  [
    {
      name: 'Master Data',
      icon: <FiDatabase />,
      url: '/master',
      isGrup: true,
      lists: [
        {
          name: 'Data User',
          url: '/master/user',
        },
        {
          name: 'Data Clausul',
          url: '/master/clausul',
        },
        {
          name: 'Data Grup Auditor',
          url: '/master/grup-auditor',
        },
        {
          name: 'Data ISO',
          url: '/master/iso',
        },
        {
          name: 'Data Departemen',
          url: '/master/departemen',
        },
        {
          name: 'Data Unit',
          url: '/master/unit',
        },
      ],
    },
    {
      name: 'Perpanjang Audit',
      url: '/perpanjang-audit',
      isGrup: false,
      icon: <FiUnlock />,
      lists: [],
    },

    {
      name: 'Histori Seluruh Audit',
      url: '/history-all-audit',
      isGrup: false,
      icon: <FiCloud />,
      lists: [],
    },
  ],
];

export default navsRole;
