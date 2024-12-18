import React from "react";

const Hero = () => {
  return (
    <>
      <section className="bg-indigo-700 dark:bg-indigo-900 py-20 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold text-white dark:text-indigo-100 sm:text-5xl md:text-6xl">
            Find a Recipe
          </h1>
          <p className="mt-4 text-xl text-indigo-200 dark:text-indigo-300">
            Discover recipes that match your taste
          </p>
        </div>
      </section>
    </>
  );
};

export default Hero;
