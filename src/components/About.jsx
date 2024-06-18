import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Layout from "./Layout";
import'./about.css';
export default function About() {
  return (
    <div >
      <Layout>
        <Header />
      </Layout>
     
      <div className="bg-gray-100 py-12 bg-with-image">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-3xl font-bold mb-4 text-purple-900">
            About Our Website
          </h1>
          <p className="text-lg text-gray-700 leading-relaxed">
            This project aims to develop an Artificial Intelligence-based system
            and user-friendly website for the non-invasive screening and risk
            assessment of Oral Potentially Malignant Disorders (OPMDs). The
            system utilizes advanced machine learning models to analyze personal
            data, clinical photos, and confocal microscopic images to accurately
            detect staining classes and assess cancer risk.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed mt-4">
            Early detection is crucial for effective management of OPMDs. This
            website seeks to enhance early detection, facilitate informed
            decision-making for dental practitioners and healthcare
            professionals, and empower users with accessible and efficient oral
            cancer risk evaluation.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed mt-4">
            The system and website address a critical need for accurate and
            non-invasive diagnostic tools for OPMDs by leveraging the power of
            artificial intelligence and machine learning.
          </p>
          <h2 className="text-2xl font-bold mt-8 text-purple-900">
            Business Context
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed mt-4">
            In the field of dentistry and healthcare, the system and website
            address a critical need for accurate and non-invasive diagnostic
            tools for OPMDs. By harnessing the power of artificial intelligence
            and machine learning, the system seeks to advance early detection,
            thereby improving patient outcomes and reducing the societal burden
            of oral cancer.
          </p>
         
        </div>
      </div>

      <Layout>
        <Footer />
      </Layout>
    </div>
  );
}
