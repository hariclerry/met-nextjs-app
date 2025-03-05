import Image from 'next/image';

interface ObjectCardProps {
  object: {
    objectID: number;
    objectName: string;
    title: string;
    artist: string;
    department: string;
    primaryImage: string;
  };
  onSelect: (object: any) => void;
}

const ObjectCard = ({ object, onSelect }: ObjectCardProps) => {
  return (
    <div
      key={object.objectID}
      onClick={() => onSelect(object)}
      className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200 cursor-pointer hover:shadow-lg transition"
    >
      {object.primaryImage ? (
        <Image
          src={object.primaryImage}
          alt={object.title}
          className="w-full h-48 object-cover"
          width={0}
          height={0}
          sizes="100vw"
        />
      ) : (
        <div className="w-full h-48 flex items-center justify-center bg-gray-200">
          <span className="text-gray-500">No Image Available</span>
        </div>
      )}
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800">
          {object.objectName || 'Unknown'}
        </h2>
        <p className="text-gray-700 line-clamp-2">{object.title}</p>
        <p className="text-gray-500">
          <span className="font-semibold">Artist:</span>{' '}
          {object.artist || 'Unknown'}
        </p>
        <p className="text-gray-500">
          <span className="font-semibold">Department:</span> {object.department}
        </p>
      </div>
    </div>
  );
};

export default ObjectCard;
