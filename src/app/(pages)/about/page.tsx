import React from 'react';

interface FeatureProps {
  heading: string;
  description: string;
}

const FundYourHomie: React.FC = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Fund Your Homie
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Fund Your Homie is a crowdfunding platform that allows individuals to raise funds for various causes, projects, or personal needs. It provides a simple and user-friendly interface for users to create fundraising campaigns and receive donations from others.
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 gap-y-10 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-12">
          <Feature
            heading="Registration Process"
            description="To get started on 'Fund Your Homie,' users need to create a free account by completing a simple registration process. During registration, users provide basic information such as their name, email address, and password. Once registered, users gain access to their dashboard, where they can manage their fundraising campaigns and donations."
          />
          <Feature
            heading="Dashboard"
            description="The dashboard serves as the central hub for users to monitor and manage their fundraising activities. Upon logging in, users are presented with their personalized dashboard, which includes features such as personal profile links, campaign management, donation management, and withdrawal management."
          />
          <Feature
            heading="Donation Process"
            description="Supporters who wish to contribute to a fundraising campaign on 'Fund Your Homie' can do so by visiting the user's personal profile link. They can make donations using various payment methods, including credit/debit cards, PayPal, or other online payment platforms. Donors have the flexibility to choose the donation amount and include a personalized message to the fundraiser."
          />
          <Feature
            heading="Simple to Use"
            description="'Fund Your Homie' is designed to be user-friendly and intuitive. The platform's straightforward interface makes it easy for users to navigate, create fundraising campaigns, and receive donations. Whether you're new to crowdfunding or an experienced user, 'Fund Your Homie' ensures a seamless and hassle-free experience."
          />
        </div>
      </div>
    </div>
  );
};

const Feature: React.FC<FeatureProps> = ({ heading, description }) => {
  return (
    <div className="relative">
      <div className="text-center">
        <h3 className="text-lg font-medium leading-6 text-gray-900">{heading}</h3>
        <p className="mt-2 text-base text-gray-600">{description}</p>
      </div>
    </div>
  );
};

export default FundYourHomie;
