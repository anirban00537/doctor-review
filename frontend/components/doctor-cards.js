import Link from "next/link";

const DoctorCard = ({ details }) => {
  console.log(details, "details");
  return (
    <Link
      href="/service-details"
      className="group relative rounded-lg p-4 shadow-md flex items-start"
    >
      <div className="flex-grow text-gray-700 text-center">
        <div className="w-full mb-2">
          <div className=" border-green-500 border-4 rounded-full overflow-hidden w-20 h-20 mx-auto mb-2">
            <img
              src={"https://via.placeholder.com/80"}
              alt="Doctor"
              className="object-cover w-full h-full"
            />
          </div>
        </div>
        <p className="text-xs font-medium uppercase">
          {details?.doctor?.doctorProfile?.specialization}
        </p>
        <p className="text-lg font-semibold mb-1">{details?.name}</p>
        <p className="text-xs font-medium uppercase">{details?.doctor?.name}</p>
        <div className="mb-2">
          <p className="text-xs">{details.description}</p>
          <p className="text-sm font-semibold">Price: {details.price}</p>
        </div>
        {/* Add the button for adding appointment to the right */}
        <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded">
          Add Appointment
        </button>
      </div>
    </Link>
  );
};

export default DoctorCard;
