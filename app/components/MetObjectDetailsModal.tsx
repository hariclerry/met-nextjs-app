import Image from 'next/image';

interface MetObjectsProps {
  objectID: number;
  title: string;
  primaryImage: string;
  primaryImageSmall: string;
  artist: string;
  department: string;
  objectName: string;
}

interface MetObjectDetailsModalProps {
  object: MetObjectsProps;
  onSelectObject: (object: MetObjectsProps | null) => void;
}

const MetObjectDetailsModal = ({
  object,
  onSelectObject,
}: MetObjectDetailsModalProps) => {
  return (
    <div
      className="fixed inset-0 backdrop-blur-sm flex items-center justify-center p-4 z-50"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}
      onClick={() => onSelectObject(null)}
    >
      <div
        className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-4 right-4 text-2xl font-bold text-gray-700 hover:text-black cursor-pointer"
          onClick={() => onSelectObject(null)}
        >
          ×
        </button>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="relative w-full h-96">
            {object.primaryImage ? (
              <Image
                src={object.primaryImage}
                alt={object.title}
                width={0}
                height={0}
                sizes="100vw"
                layout="responsive"
                className="object-contain"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-200">
                <span className="text-gray-500">No Image Available</span>
              </div>
            )}
          </div>

          <div className="text-gray-900">
            <h2 className="text-2xl font-bold mb-4">{object.objectName}</h2>

            <div className="space-y-2">
              <p>
                <strong>Artist:</strong> {object.artist || 'Unknown'}
              </p>
              {object.title && (
                <p>
                  <strong>Title:</strong> {object.title}
                </p>
              )}
              {object.department && (
                <p>
                  <strong>Department:</strong> {object.department}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MetObjectDetailsModal;
