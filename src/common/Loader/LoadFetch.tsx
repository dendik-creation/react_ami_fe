import { ring } from 'ldrs';

ring.register();

export default function LoadFetch() {
  return (
    <>
      <div className="w-full h-full flex justify-center items-center">
        <l-ring size="100" speed={2} stroke={30} color="#191970" />
      </div>
    </>
  );
}
