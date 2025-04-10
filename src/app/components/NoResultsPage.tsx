import { styles } from "../styles";

const NoResultsPage = () => {
  return (
    <>
      <div className="relative w-full max-w-lg mx-auto bg-white rounded-lg shadow-lg p-8 md:p-10 lg:p-12 border border-gray-300 overflow-hidden -z-10">
        <h1
          className={`text-4xl font-extrabold text-gray-800 text-center mb-6 ${styles.heroSubText}`}
        >
          Oops!
        </h1>

        <p
          className={`text-lg text-gray-600 text-center mb-8 ${styles.heroSubText}`}
        >
          There is no result for your search. Come on, try again!!!
        </p>
      </div>
    </>
  );
};

export default NoResultsPage;
