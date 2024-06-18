import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Layout from "./Layout";
export default function Story() {
  return (
    <div>
      <Layout>
        <Header />
      </Layout>

      <div className="bg-gray-100 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-3xl font-bold mb-4 text-purple-900">
            Our Story
          </h1>
          <p className="text-lg text-gray-700 leading-relaxed">
          Welcome to our story! We are a dedicated group of five final-year Computer Engineering students from Ain Shams University, 
          driven by a shared passion for technology and its potential to transform lives. 
          As we approach the culmination of our academic journey, we have embarked on an ambitious 
          and impactful project that merges our technical expertise with a profound commitment to healthcare.
          Our journey has been one of learning, growth, and innovation. From conceptualizing the project to developing sophisticated 
          machine learning models, we have faced numerous challenges and celebrated many milestones.
           Each step has reinforced our belief in the importance of our work and the positive change it can bring.
          </p>
          <h2 className="text-2xl font-bold mt-8 text-purple-900">
          Our Vision
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed mt-4">
          Our project aims to develop an Artificial Intelligence-based system and 
          a user-friendly website for the non-invasive screening and risk assessment of Oral Potentially Malignant Disorders (OPMDs).
           Leveraging the power of advanced machine learning models, our system analyzes personal data,
           clinical photos, and confocal microscopic images to accurately detect staining classes and assess cancer risk.
          </p>
          
          <h2 className="text-2xl font-bold mt-8 text-purple-900">
          Join Us on Our Mission
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed mt-4">
          We invite you to join us on this exciting journey. 
          Explore our website, learn more about our project, and see how our AI-based system can assist in the early detection 
          and risk assessment of OPMDs. Together, we can make a difference in the fight against oral cancer and pave the way
           for a healthier future.<br/>
           Thank you for being a part of our story.
          </p>
        </div>
      </div>

      <Layout>
        <Footer />
      </Layout>
    </div>
  );
}
