import { zoomies } from 'ldrs';

zoomies.register();

const Loader = () => {
  return (
    <div className="flex h-screen relative items-center justify-center bg-white">
      <div className="rotate-90">
        <l-zoomies size="300" speed={1} stroke={200} color="#191970" />
      </div>
    </div>
  );
};

export default Loader;
