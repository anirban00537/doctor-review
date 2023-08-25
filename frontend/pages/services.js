import DoctorCard from "@/components/doctor-cards";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import Layout from "@/layout";
import { getAllServiceList } from "@/service/doctor";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const DoctorsList = () => {
  const [lists, setLists] = useState([]);
  const { isLoggedIn } = useSelector((state) => state.userInfo);

  const getAllDoctorService = async () => {
    const response = await getAllServiceList();
    if (response.success) {
      setLists(response.data);
    }
  };

  useEffect(() => {
    getAllDoctorService();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8 mt-20">
        <div
          className="flex items-center justify-between py-2 px-14 relative"
          style={{
            backgroundImage:
              "url('/multicolor-shapes-black-backround_1297-161.jpg')", // Replace with your image path
            backgroundSize: "cover", // Adjust as needed
            backgroundPosition: "center", // Adjust as needed
            height: 150,
          }}
        >
          <div>
            <h3 className="font-semibold text-lg text-white">
              Welcome to patient dashboard
            </h3>
            <p className="text-sm text-white">
              Manage your appointments and more.
            </p>
          </div>
        </div>
        <div
          className="relative isolate px-10  pb-14 lg:px-8 mt-20 overflow-y-auto"
          style={{ height: "100vh", overflow: "hidden" }}
        >
          <div className="grid grid-cols-4 gap-5">
            {lists.map((item) => (
              <DoctorCard
                key={item.id}
                // url="https://images.unsplash.com/photo-1505751172876-fa1923c5c528?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                // serviceName={item?.name}
                // doctorName={item?.doctor?.name}
                // description="This is a service"
                // doctor_img={item?.data}
                // speciality="Eye"
                // servicePrice={55}
                details={item}
              />
            ))}
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default DoctorsList;
