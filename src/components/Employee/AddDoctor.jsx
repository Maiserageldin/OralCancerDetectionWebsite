import React, { useState } from "react";

const AddDoctor = ({ handleClose, show, addDoctor }) => {
    const [doctorInfo, setDoctorInfo] = useState({
        name: '',
        email: '',
        phone: '',
        username: '',
        age: '',
        gender: 'male',
        specialty: 'prosthodontist'
    });

  const handleInputChange = (event) => {
      const { name, value } = event.target;
      setDoctorInfo({ ...doctorInfo, [name]: value });
  };

  const handleSubmit = (event) => {
      event.preventDefault();
      addDoctor(doctorInfo);
      
      setDoctorInfo({
          name: '',
          email: '',
          phone: '',
          username: '',
          age: '',
          gender: 'male',
          specialty: 'prosthodontist'
      });
  };

  const showHideClass = show ? "modal fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50" : "modal hidden";



  return (
        <div className={showHideClass}>
            {/* Modal content */}
            <div className="modal-overlay fixed inset-0 flex items-center justify-center">
                <div className="modal-content bg-white rounded-lg p-5 w-full max-w-xl">
                    {/* Form */}
                    <form className="grid grid-cols-1 md:grid-cols-2 gap-8" onSubmit={handleSubmit}>
                        {/* Full Name */}
                        <div className="mb-4 col-span-2 text-center">
                            <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Full Name</label>
                            <input
                                id="name"
                                type="text"
                                name="name"
                                value={doctorInfo.name}
                                onChange={handleInputChange}
                                placeholder="Enter doctor's full name"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-purple-400"
                            />
                        </div>
                        {/* Email */}
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email</label>
                            <input
                                id="email"
                                type="email"
                                name="email"
                                value={doctorInfo.email}
                                onChange={handleInputChange}
                                placeholder="Enter doctor's email"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-purple-400"
                            />
                        </div>
                        {/* Phone */}
                        <div className="mb-4">
                            <label htmlFor="phone" className="block text-gray-700 font-bold mb-2">Phone</label>
                            <input
                                id="phone"
                                type="tel"
                                name="phone"
                                value={doctorInfo.phone}
                                onChange={handleInputChange}
                                placeholder="Enter doctor's phone number"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-purple-400"
                            />
                        </div>
                        {/* Username */}
                        <div className="mb-4">
                            <label htmlFor="username" className="block text-gray-700 font-bold mb-2">Username</label>
                            <input
                                id="username"
                                type="text"
                                name="username"
                                value={doctorInfo.username}
                                onChange={handleInputChange}
                                placeholder="Enter doctor's username"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-purple-400"
                            />
                        </div>
                        {/* Age */}
                        <div className="mb-4">
                            <label htmlFor="age" className="block text-gray-700 font-bold mb-2">Age</label>
                            <input
                                id="age"
                                type="number"
                                name="age"
                                value={doctorInfo.age}
                                onChange={handleInputChange}
                                placeholder="Enter doctor's age"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-purple-400"
                            />
                        </div>
                        {/* Gender */}
                        <div className="mb-4">
                            <label htmlFor="gender" className="block text-gray-700 font-bold mb-2">Gender</label>
                            <select
                                id="gender"
                                name="gender"
                                value={doctorInfo.gender}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-purple-400"
                            >
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        {/* Specialty */}
                        <div className="mb-4">
                            <label htmlFor="specialty" className="block text-gray-700 font-bold mb-2">Specialty</label>
                            <select
                                id="specialty"
                                name="specialty"
                                value={doctorInfo.specialty}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-purple-400"
                            >
                                <option value="prosthodontist">Prosthodontist</option>
                                <option value="oral_pathologist">Oral Pathologist</option>
                                <option value="oncologic_dentist">Oncologic Dentist</option>
                                <option value="oral_medicine_specialist">Oral Medicine Specialist</option>
                                <option value="oms">Oral and Maxillofacial Surgeon</option>
                            </select>
                        </div>
                        {/* Submit button */}
                        <div className="flex justify-end col-span-2">
                            <button type="submit" className="bg-purple-500 text-white px-6 py-3 rounded-lg hover:bg-purple-600 mr-4">Add Doctor</button>
                            <button type="button" className="bg-gray-200 text-black px-6 py-3 rounded-lg hover:bg-gray-500" onClick={handleClose}>Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddDoctor;
