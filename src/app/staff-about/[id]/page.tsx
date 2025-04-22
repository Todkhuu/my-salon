"use client";
import React from "react";

interface StaffAboutPageProps {
  params: {
    id: string;
  };
}

const StaffAboutPage: React.FC<StaffAboutPageProps> = ({ params }) => {
  const { id } = params;

  return (
    <div>
      <h1>Staff Details</h1>
      <p>Viewing details for staff member with ID: {id}</p>
    </div>
  );
};

export default StaffAboutPage;
