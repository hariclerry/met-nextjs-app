interface PaginationControlsProps {
  page: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
}

const PaginationControls = ({
  page,
  totalPages,
  onPageChange,
}: PaginationControlsProps) => {
  return (
    <div className="flex justify-center items-center gap-4 mt-8">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md transition duration-200 ease-in-out hover:bg-blue-700 disabled:bg-gray-400"
      >
        Previous
      </button>
      <span className="text-lg font-semibold text-gray-700">
        Page {page} of {totalPages}
      </span>
      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md transition duration-200 ease-in-out hover:bg-blue-700 disabled:bg-gray-400"
      >
        Next
      </button>
    </div>
  );
};

export default PaginationControls;
