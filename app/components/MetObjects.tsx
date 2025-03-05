'use client';
import React, { useEffect, useState } from 'react';
import MetObjectDetailsModal from './MetObjectDetailsModal';
import SelectFilter from './SelectFilter';
import SearchInput from './SearchInput';
import ObjectCard from './ObjectCard';
import PaginationControls from './PaginationControls';

interface MetObjectsProps {
  objectID: number;
  title: string;
  primaryImage: string;
  primaryImageSmall: string;
  artist: string;
  department: string;
  objectName: string;
}

interface paginatedMetObjectsProps {
  objects: MetObjectsProps[];
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

interface Department {
  departmentId: string;
  displayName: string;
}

const MetObjects = () => {
  const [filteredObjects, setFilteredObjects] = useState<MetObjectsProps[]>([]);
  const [page, setPage] = useState(99);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedObject, setSelectedObject] = useState<MetObjectsProps | null>(
    null
  );
  const [selectedDepartment, setSelectedDepartment] = useState<number | null>(
    null
  );
  const [departments, setDepartments] = useState<Department[]>([]);
  const [searchId, setSearchId] = useState('');
  const [searchTitle, setSearchTitle] = useState('');
  const [searchById, setSearchById] = useState(false);
  const limit = 8;

  useEffect(() => {
    fetchMetObjects();
  }, [page, selectedDepartment, searchId, searchTitle]);

  useEffect(() => {
    fetchDepartments();
  }, [page]);

  const fetchDepartments = async () => {
    try {
      const res = await fetch(`/api/met/departments`);
      if (!res.ok) throw new Error('Failed to fetch departments');
      const data = await res.json();
      setDepartments(data.departments);
    } catch (err) {
      setError('Error fetching departments.');
    }
  };

  const fetchMetObjects = async () => {
    setLoading(true);
    setError(null);

    try {
      let url = '';

      // Fetch all data if no search query or filter is applied
      console.log(searchById, searchId, searchTitle, selectedDepartment);

      if (!searchId && !searchTitle && !selectedDepartment) {
        url = `/api/met/objects?page=${page}&limit=${limit}`;
      }
      if (!searchById && selectedDepartment) {
        url += `/api/met/objects?page=${page}&limit=${limit}&departmentId=${selectedDepartment}`;
      }

      if (searchId || searchTitle) {
        url = `/api/met/search?q=${
          searchById ? searchId : searchTitle
        }&searchById=${searchById}&page=${page}&limit=${limit}`;
      }

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const data: paginatedMetObjectsProps = await response.json();

      setFilteredObjects(data.objects);
      setTotalPages(data.totalPages);
      setPage(page);
      setLoading(false);
      setError(null);
    } catch (error) {
      setError((error as Error).message);
      setLoading(false);
    }
  };

  const handleDepartmentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDepartment(e.target.value ? parseInt(e.target.value) : null);
    setPage(1);
    setSearchId('');
    setSearchTitle('');
    setSearchById(false);
  };

  const handleIdSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchId(e.target.value);
    setSearchTitle('');
    setSearchById(true);
    setPage(1);
    setSelectedDepartment(null);
  };

  const handleTitleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTitle(e.target.value);
    setSearchId('');
    setSearchById(false);
    setSelectedDepartment(null);
    setPage(1);
  };

  if (loading) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }
  console.log(departments);
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {selectedObject && (
        <MetObjectDetailsModal
          object={selectedObject}
          onSelectObject={setSelectedObject}
        />
      )}{' '}
      <div className="mb-6 text-gray-800 flex flex-wrap gap-4 md:flex-nowrap justify-between items-center">
        <SelectFilter
          id="department-filter"
          label="Filter by Department"
          options={departments.map((dept) => ({
            id: dept.departmentId,
            name: dept.displayName,
          }))}
          onChange={handleDepartmentChange}
        />

        <SearchInput
          id="id-search"
          label="Search by ID"
          type="number"
          value={searchId}
          onChange={handleIdSearchChange}
          placeholder="Enter object ID"
        />

        <SearchInput
          id="title-search"
          label="Search by Title"
          type="text"
          value={searchTitle}
          onChange={handleTitleSearchChange}
          placeholder="Enter title"
        />
      </div>
      <h1 className="text-3xl font-bold text-center text-gray-700 mt-16">
        {selectedDepartment
          ? `Met Museum Objects for ${departments[selectedDepartment].displayName} department`
          : `Met Museum Objects`}
      </h1>{' '}
      {filteredObjects.length === 0 ? (
        <p className="text-center text-gray-500">No objects found.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">
            {filteredObjects.map((object) => (
              <ObjectCard
                key={object.objectID}
                object={object}
                onSelect={setSelectedObject}
              />
            ))}
          </div>
          <PaginationControls
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </>
      )}
    </div>
  );
};

export default MetObjects;
