import {
  FiDatabase,
  FiMessageCircle,
  FiMonitor,
  FiPlusSquare,
  FiServer,
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
          name: 'Data Auditor',
          url: '/monitoring/auditor',
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
          url: '/master/users',
        },
        {
          name: 'Data Clausul',
          url: '/master/clausuls',
        },
        {
          name: 'Data Grup Auditor',
          url: '/master/grup-auditor',
        },
      ],
    },
    {
      name: 'Histori Audit',
      icon: <FiServer />,
      url: '/history-audit',
      isGrup: false,
      lists: [],
    },
  ],
  [
    {
      name: 'Pengaruhi Audit',
      url: '/audit-effect',
      isGrup: false,
      icon: <FiUnlock />,
      lists: [],
    },
    {
      name: 'Master Data',
      icon: <FiDatabase />,
      url: '/master',
      isGrup: true,
      lists: [
        {
          name: 'Data User',
          url: '/master/users',
        },
        {
          name: 'Data Clausul',
          url: '/master/clausuls',
        },
        {
          name: 'Data Grup Auditor',
          url: '/master/grup-auditor',
        },
      ],
    },
    {
      name: 'Histori Audit',
      url: '/history-audit',
      isGrup: false,
      lists: [],
    },
  ],
];

export default navsRole;
