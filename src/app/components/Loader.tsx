const Loader = ({ redirecting }: { redirecting?: boolean }) => {
  const loader = redirecting ? "loader2" : "loader";
  return (
    <>
      <div className="flex justify-center items-center w-full h-full">
        {loader ? (
          <div className="flex flex-col justify-center items-center">
            <span className="loader3 font-bigShoulderStencil text-5xl">Redirecting</span>
            <span className="loader2"></span>
          </div>
        ) : (
          <span className="loader"></span>
        )}
      </div>
    </>
  );
};

export default Loader;
