const MostGrubAuditMe = ({ grupAuditorList }: any) => {
  return (
    <div className="rounded-lg w-full bg-white shadow-lg p-5 ">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        Grup Auditor Paling Banyak Mengaudit Saya
      </h4>

      <div className="flex flex-col">
        <div className="grid grid-cols-5 rounded-sm bg-gray-2 dark:bg-meta-4">
          <div className="text-center p-2">
            <h5 className="text-sm font-medium uppercase xsm:text-base">No</h5>
          </div>
          <div className="text-center p-2">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Nama Grup
            </h5>
          </div>
          <div className="text-center p-2">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Ketua Auditor
            </h5>
          </div>
          <div className="text-center p-2">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Departemen Ketua Auditor
            </h5>
          </div>
          <div className="text-center p-2">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Jumlah Mengaudit Saya
            </h5>
          </div>
        </div>

        {grupAuditorList?.length == 0 || grupAuditorList == null ? (
          <div className="flex items-center justify-center p-2">
            <p className="text-black">Anda Belum Pernah Diaudit Sama Sekali</p>
          </div>
        ) : (
          grupAuditorList?.length > 0 &&
          grupAuditorList?.map((item: any, key: number) => (
            <div
              className={`grid grid-cols-5 ${
                key === grupAuditorList.length - 1
                  ? ''
                  : 'border-b border-stroke dark:border-strokedark'
              }`}
              key={key}
            >
              <div className="flex items-center justify-center p-2">
                <p className="text-black dark:text-white">{key + 1}</p>
              </div>
              <div className="flex items-center justify-center p-2">
                <p className="text-black dark:text-white">{item.nama_grup}</p>
              </div>
              <div className="flex items-center justify-center p-2">
                <p className="text-black dark:text-white">
                  {item.ketua_auditor?.user?.nama_lengkap ?? '-'}
                </p>
              </div>
              <div className="flex items-center justify-center p-2">
                <p className="text-black dark:text-white">
                  {item.ketua_auditor?.user?.departemen?.nama_departemen ?? '-'}{' '}
                  |{' '}
                  {item.ketua_auditor?.user?.departemen?.unit?.nama_unit ?? '-'}
                </p>
              </div>
              <div className="flex items-center justify-center p-2">
                <p className="text-black font-semibold">{item.total_audit}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MostGrubAuditMe;
