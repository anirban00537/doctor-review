import DoctorCard from "@/components/doctor-cards";
import Footer from "@/components/footer";
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
    <Layout name="Services">
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
    </Layout>
  );
};

export default DoctorsList;
