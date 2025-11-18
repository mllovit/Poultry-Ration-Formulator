import React from 'react';

interface HeaderProps {
    category: string;
    type: string;
    stage: string;
}

const Header: React.FC<HeaderProps> = ({ category, type, stage }) => {
  const toTitleCase = (str: string) => str.replace(/-/g, ' ').replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase());
  
  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold leading-tight text-gray-900">
          Ration Formulator
        </h1>
        <p className="text-md text-gray-500 mt-1">
          {toTitleCase(category)}: {toTitleCase(type)} - {toTitleCase(stage)}
        </p>
      </div>
    </header>
  );
};

export default Header;