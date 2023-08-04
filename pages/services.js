import DoctorCard from "@/components/doctor-cards";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
const DoctorsList = () => {
  return (
    <div>
      <Navbar />
      <div className="relative isolate px-6 pt-14 lg:px-8 mt-10">
        <div class="grid grid-cols-5 gap-5">
          <DoctorCard
            url={
              "https://images.unsplash.com/photo-1512678080530-7760d81faba6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1174&q=80"
            }
            serviceName="Eye check up"
            doctorName="Dr mizanur Rahman"
            description="This is a service"
            speciality="Eye"
          />
          <DoctorCard
            url={
              "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
            }
            serviceName="Eye check up"
            doctorName="Dr mizanur Rahman"
            description="This is a service"
            speciality="Eye"
          />
          <DoctorCard
            url={
              "https://images.unsplash.com/photo-1504813184591-01572f98c85f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80"
            }
            serviceName="Eye check up"
            doctorName="Dr mizanur Rahman"
            description="This is a service"
            speciality="Eye"
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DoctorsList;
