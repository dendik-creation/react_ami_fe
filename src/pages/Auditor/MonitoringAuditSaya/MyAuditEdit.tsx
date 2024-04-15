import React, { FormEvent, useEffect, useState } from 'react';
import 'ldrs/bouncy';
import { Transition } from '@headlessui/react';
import DefaultLayout from '../../../layout/DefaultLayout';
import Breadcrumb from '../../../components/Breadcrumbs/Breadcrumb';
import HeaderAuditEdit from './components/HeaderAuditEdit';
import PihakYangTerlibat from './components/PihakYangTerlibat';
import DetailAuditEdit from './components/DetailAuditEdit';
import { FiSave } from 'react-icons/fi';
import { api, headerAudit, parentNewAudit } from '../../../api/new_audit';
import { api as auditEdit } from '../../../api/my_audits';

import {
  DetailData,
  GetData,
  HeaderData,
  NewAuditType,
} from '../NewAudit/NewAuditInterface';
// import ConfirmSubmit from './components/ConfirmSubmit';
import { useNavigate, useParams } from 'react-router-dom';

const MyAuditEdit: React.FC = () => {
  const { id } = useParams();
};

export default MyAuditEdit;
