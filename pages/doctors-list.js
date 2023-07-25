import DoctorCard from "@/components/doctor-cards";
import Navbar from "@/components/navbar";
const DoctorsList = () => {
  return (
    <div>
      <Navbar />

      <div className="relative isolate px-6 pt-14 lg:px-8 mt-5">
        <div class="grid grid-cols-5 gap-5">
          <DoctorCard />
          <DoctorCard />
          <DoctorCard />
          <DoctorCard />
          <DoctorCard />
          <DoctorCard />
          <DoctorCard />
          <DoctorCard />
          <DoctorCard />
        </div>
      </div>
    </div>
  );
};

export default DoctorsList;
