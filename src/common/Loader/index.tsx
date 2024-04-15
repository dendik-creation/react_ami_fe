import { zoomies } from 'ldrs';

zoomies.register();

const Loader = () => {
  return (
    <div className="flex h-screen gap-8 items-center flex-col justify-center bg-white">
      <l-zoomies size="200" stroke={10} speed="1" color="#191970" />
    </div>
  );
};

export default Loader;
