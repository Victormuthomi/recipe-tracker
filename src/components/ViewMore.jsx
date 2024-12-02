import { Link } from "react-router-dom";

const ViewMore = () => {
  return (
    <>
      <div className="flex items-center justify-center">
        <Link
          to="/recipes"
          className="bg-blue-500 text-white px-4 py-4 rounded hover:bg-blue-600 "
        >
          View More Recipes
        </Link>
      </div>
    </>
  );
};

export default ViewMore;
