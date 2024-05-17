import { infinity } from 'ldrs';

infinity.register();

const Loader = () => {
  return (
    <div className="flex h-screen relative items-center justify-center bg-white">
      <div className="rotate-90">
        <l-infinity
          size="200"
          speed={1.5}
          stroke={40}
          stroke-length={0.6}
          color="rgba(25,25,112, 0.8)"
        />
      </div>
    </div>
  );
};

export default Loader;
