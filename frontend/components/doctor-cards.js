import Link from "next/link";
import AddAppointments from "./add-appoinment";

const DoctorCard = ({ details }) => {
  return (
    <div className="group relative rounded-lg p-4 shadow-md flex items-start bg-white transition duration-300 hover:shadow-lg">
      <div className="flex-grow text-gray-700 text-center">
        <div className="w-full mb-4">
          <div className="border-green-500 border-4 rounded-full overflow-hidden w-24 h-24 mx-auto mb-2 shadow-md">
            <img
              src={
                details?.doctor?.photo_url
                  ? `http://localhost:3000/uploads/${
                      details?.doctor?.photo_url?.split("/")[1]
                    }`
                  : "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
              }
              alt="Doctor"
              className="object-cover w-full h-full"
            />
          </div>
        </div>
        <p className="text-xs font-medium uppercase text-gray-500">
          {details?.doctor?.doctorProfile?.specialization}
        </p>
        <p className="text-lg font-semibold mb-1">{details?.name}</p>
        <p className="text-xs font-medium text-gray-500 uppercase">
          Dr. {details?.doctor?.name}
        </p>
        <div className="mb-2 mt-2 border-t border-gray-200 pt-2">
          <p className="text-sm text-gray-600">{details.description}</p>
          <p className="text-sm font-semibold mt-1">Price: {details.price}</p>
        </div>
        <div className="flex items-center justify-end space-x-2">
          <Link href={`/service-details/${details?.id}`}>
            <button className="bg-white text-sm hover:bg-green-600 text-green-500 border border-green-500 font-semibold py-2 px-4 rounded transition duration-300">
              Details
            </button>
          </Link>
          <AddAppointments details={details} />
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
