import Link from "next/link";

const DoctorCard = ({
  serviceName,
  doctorName,
  description,
  speciality,
  doctor_img,
  servicePrice,
}) => {
  return (
    <Link
      href="/service-details"
      className="group relative bg-gradient-to-b from-green-500 to-purple-500 hover:from-green-600 hover:to-purple-600 rounded-lg p-4 shadow-md flex items-center"
    >
      <div className="w-1/8 h-20 mr-4">
        <img
          src={doctor_img ? doctor_img : "https://via.placeholder.com/80"}
          alt="Doctor"
          className="rounded-full object-cover h-20 w-20"
        />
      </div>
      <div className="flex-grow">
        <p className="text-xs font-medium uppercase text-white">{speciality}</p>
        <p className="text-lg font-semibold mb-1 text-white">{serviceName}</p>
        <p className="text-xs font-medium uppercase text-white">{doctorName}</p>
        <div className="text-white">
          <p className="text-xs mb-1">{description}</p>
          <p className="text-sm font-semibold">Price: {servicePrice}</p>
        </div>
      </div>
    </Link>
  );
};

export default DoctorCard;
