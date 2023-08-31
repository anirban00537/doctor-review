import AddPatientHistory from "@/components/add-patient-history";
import Footer from "@/components/footer";
import NoItemFound from "@/components/noItemFound";
import PatientHistoryDetailsModal from "@/components/patient-history-details-modal";
import Layout from "@/layout";
import { doctorProfileEdit } from "@/service/doctor";
import { getMedicalHistoryUser, profileEdit } from "@/service/user";
import { SSRAuthCheck } from "@/utils/ssr";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const Profile = () => {
  const { user } = useSelector((state) => state.userInfo);
  const [userInfo, setUserInfo] = useState(user);
  const [medicalHistory, setMedicalHistory] = useState([]);
  const [editedUserInfo, setEditedUserInfo] = useState({
    name: userInfo?.name,
    age: userInfo?.age,
    sex: userInfo?.sex,
  });

  const getMedicalHistoryData = async () => {
    const { data } = await getMedicalHistoryUser();
    console.log(data, "Tjos ");
    setMedicalHistory(data);
  };

  useEffect(() => {
    setMedicalHistory([]); // Resetting medicalHistory on user change
    setUserInfo(user);
    setEditedUserInfo({
      name: userInfo?.name,
      age: userInfo?.age,
      sex: userInfo?.sex,
    });
    getMedicalHistoryData();
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      [name]: value,
    }));
  };

  const editProfile = async () => {
    const response = await profileEdit(
      editedUserInfo.sex,
      editedUserInfo.age,
      editedUserInfo.name
    );
    if (response.success) {
      toast.success(response.message);
    } else {
      toast.error(response.message);
    }
  };

  useEffect(() => {
    setUserInfo(user);
    getMedicalHistoryData();
  }, [user]);

  // Helper function to format the join date
  const formatJoinDate = (dateString) => {
    const joinDate = new Date(dateString);
    return joinDate.toDateString();
  };

  // Placeholder URL for default profile picture from Unsplash
  const defaultProfilePicUrl =
    "https://as2.ftcdn.net/v2/jpg/01/34/29/31/1000_F_134293169_ymHT6Lufl0i94WzyE0NNMyDkiMCH9HWx.jpg";

  // State to track the selected profile picture
  const [selectedProfilePic, setSelectedProfilePic] = useState(null);

  // Function to handle profile picture selection
  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    setSelectedProfilePic(URL.createObjectURL(file));
  };

  return (
    <Layout>
      <div
        className="flex items-center justify-between py-2 px-14 relative"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1506792006437-256b665541e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80')", // Replace with your image path
          backgroundSize: "cover", // Adjust as needed
          backgroundPosition: "center", // Adjust as needed
          height: 250,
        }}
      >
        <div>
          <h3 className="font-semibold text-lg text-white">Profile Section</h3>
          <p className="text-sm text-white">Manage your profile from here</p>
        </div>
      </div>
      <section className="text-gray-600 body-font relative ">
        <div className="container px-5 py-14 mx-auto">
          <div className="flex flex-col text-center w-full mb-12">
            <div className="relative rounded-full w-24 h-24 mx-auto mb-4 border-4 border-green-500 overflow-hidden">
              {/* Profile Picture */}
              <img
                src={
                  selectedProfilePic ||
                  userInfo?.photo_url ||
                  defaultProfilePicUrl
                }
                alt="Profile"
                className="object-cover w-full h-full"
              />
              <label
                htmlFor="profilePic"
                className="absolute bottom-0 right-0 cursor-pointer"
              >
                <i className="fas fa-edit text-green-500 bg-white rounded-full p-1"></i>
                <input
                  type="file"
                  id="profilePic"
                  name="profilePic"
                  accept="image/*"
                  className="hidden"
                  onChange={handleProfilePicChange}
                />
              </label>
            </div>
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
              {userInfo?.name}
            </h1>
            <AddPatientHistory getMedicalHistoryData={getMedicalHistoryData} />

            <p className="text-sm text-gray-500">
              Joined: {formatJoinDate(userInfo?.createdAt)}
            </p>
          </div>
          <div className="">
            <div className="flex flex-wrap -m-2">
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label className="leading-7 text-sm text-gray-600">
                    Name
                  </label>
                  <input
                    type="text"
                    value={editedUserInfo?.name}
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label className="leading-7 text-sm text-gray-600">
                    Email
                  </label>
                  <input
                    type="email"
                    value={userInfo?.email}
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    readOnly
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="p-2 w-1/2">
                <label
                  htmlFor="Age"
                  className="block text-sm font-medium text-gray-700"
                >
                  Age
                </label>
                <input
                  type="number"
                  id="Age"
                  name="age"
                  value={editedUserInfo?.age}
                  className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                  onChange={handleInputChange}
                />
              </div>

              {/* New sex select input field */}
              <div className="p-2 w-1/2">
                <label
                  htmlFor="Sex"
                  className="block text-sm font-medium text-gray-700"
                >
                  Sex
                </label>
                <select
                  id="Sex"
                  name="sex"
                  value={editedUserInfo?.sex}
                  onChange={handleInputChange}
                  className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                  readOnly
                >
                  <option value="">Select Sex</option>
                  <option value="MALE">MALE</option>
                  <option value="FEMALE">FEMALE</option>
                  <option value="OTHER">OTHER</option>
                </select>
              </div>
              <div className="p-2 w-full">
                <button
                  className="flex mx-auto text-white bg-green-500 border-0 py-2 px-8 focus:outline-none hover:bg-green-600 rounded text-lg"
                  onClick={editProfile}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-5 mb-40">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Diagnosis
              </th>
              <th scope="col" className="px-6 py-3">
                DoctorName
              </th>
              <th scope="col" className="px-6 py-3">
                Follow Up Date
              </th>
              <th scope="col" className="px-6 py-3">
                Hospital Name
              </th>
              <th scope="col" className="px-6 py-3">
                Details
              </th>
            </tr>
          </thead>

          <tbody>
            {medicalHistory?.map((history) => (
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th
                  scope="row"
                  className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <div className="pl-3">
                    <div className="text-base font-semibold">
                      {history?.diagnosis}
                    </div>
                  </div>
                </th>
                <td className="px-6 py-4">
                  {/* {moment(history?.doctorName).format("MMMM Do YYYY, h:mm:ss a")} */}
                  {history?.doctorName}
                </td>
                <td className="px-6 py-4">
                  {moment(history?.followUpDate).format(
                    "MMMM Do YYYY, h:mm:ss a"
                  )}
                </td>
                <td className="px-6 py-4">{history?.hospitalName}</td>
                <td className="px-6 py-4">
                  <PatientHistoryDetailsModal history={history} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {medicalHistory?.length <= 0 && (
          <NoItemFound message={"No Service Found"} />
        )}
      </div>
      <Footer />
    </Layout>
  );
};

export const getServerSideProps = async (ctx) => {
  await SSRAuthCheck(ctx);

  return {
    props: {},
  };
};

export default Profile;
