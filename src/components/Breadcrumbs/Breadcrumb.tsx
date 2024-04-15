import { FiArrowLeft } from 'react-icons/fi';
import { NavigateFunction, useNavigate, useLocation } from 'react-router-dom';

interface BreadcrumbProps {
  pageName: string | undefined;
  description?: string | null;
}
const Breadcrumb = ({ pageName, description }: BreadcrumbProps) => {
  const location = useLocation();
  const { pathname } = location;
  const navigate: NavigateFunction = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };
  return (
    <div className="mb-6 flex items-center justify-start gap-3">
      {pathname != '/' ? (
        <button
          onClick={handleBack}
          className="border-2 border-slate-300 transition-all hover:bg-slate-800 hover:text-white hover:border-slate-800 w-10 rounded-md h-12 flex justify-center items-center"
        >
          <FiArrowLeft className="text-xl" />
        </button>
      ) : (
        ''
      )}
      <div className="flex gap-1 flex-col">
        <h2 className="text-title-md2 font-semibold text-black dark:text-white">
          {pageName}
        </h2>
        <h4 className="font-medium text-slate-600">{description}</h4>
      </div>
    </div>
  );
};

export default Breadcrumb;
