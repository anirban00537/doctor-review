import Link from "next/link";

const DoctorCard = ({
  serviceName,
  doctorName,
  description,
  url,
  speciality,
}) => {
  return (
    <Link href="/service-details" className="group relative rounded-lg block bg-black">
      <img
        alt="Developer"
        src={url}
        className="absolute inset-0 h-full w-full object-cover opacity-75 transition-opacity group-hover:opacity-50"
      />
      <div className="relative p-4 sm:p-6 lg:p-8">
        <p className="text-sm font-medium uppercase tracking-widest text-pink-500">
          {speciality}
        </p>
        <p className="text-xl font-bold text-white sm:text-2xl">
          {serviceName}
        </p>
        <p className="text-sm font-medium uppercase tracking-widest text-white">
          {doctorName}
        </p>
        <div className="mt-32 sm:mt-48 lg:mt-64">
          <div className="translate-y-8 transform opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
            <p className="text-sm text-white">{description}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default DoctorCard;
