"use client";

import React, { useState, useMemo } from 'react';
import { FaUser, FaEnvelope, FaPhone, FaLinkedin, FaSearch } from 'react-icons/fa';
import ButtonComp from './ButtonComp';

interface Applicant {
  id: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  appliedDate: string;
  status: 'pending' | 'reviewed' | 'interviewed' | 'rejected' | 'accepted';
  linkedIn?: string;
  resume?: string;
}

const ApplicantsList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'date' | 'position'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const applicants: Applicant[] = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '+1 234 567 890',
      position: 'Senior Frontend Developer',
      appliedDate: '2024-03-15',
      status: 'pending',
      linkedIn: 'https://linkedin.com/in/johndoe'
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      phone: '+1 234 567 891',
      position: 'Backend Engineer',
      appliedDate: '2024-03-14',
      status: 'interviewed',
      linkedIn: 'https://linkedin.com/in/janesmith'
    }
  ];

  const filteredAndSortedApplicants = useMemo(() => {
    return applicants
      .filter(applicant => {
        const matchesSearch = searchTerm === '' || 
          applicant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          applicant.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          applicant.position.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesRole = filterRole === '' || 
          applicant.position.toLowerCase().includes(filterRole.toLowerCase());

        return matchesSearch && matchesRole;
      })
      .sort((a, b) => {
        if (sortBy === 'date') {
          return sortOrder === 'asc' 
            ? new Date(a.appliedDate).getTime() - new Date(b.appliedDate).getTime()
            : new Date(b.appliedDate).getTime() - new Date(a.appliedDate).getTime();
        }
        if (sortBy === 'name') {
          return sortOrder === 'asc'
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name);
        }
        return sortOrder === 'asc'
          ? a.position.localeCompare(b.position)
          : b.position.localeCompare(a.position);
      });
  }, [applicants, searchTerm, filterRole, sortBy, sortOrder]);

  const uniquePositions = [...new Set(applicants.map(a => a.position))];

  const getStatusColor = (status: Applicant['status']) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      reviewed: 'bg-blue-100 text-blue-800',
      interviewed: 'bg-purple-100 text-purple-800',
      rejected: 'bg-red-100 text-red-800',
      accepted: 'bg-green-100 text-green-800'
    };
    return colors[status];
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">
            Job Applicants 
            <span className="ml-2 text-sm font-normal text-gray-500">
              ({filteredAndSortedApplicants.length} total)
            </span>
          </h2>
        </div>

        {/* Filtros y Búsqueda */}
        <div className="mb-6 space-y-4">
          <div className="flex flex-wrap gap-4">
            {/* Barra de búsqueda */}
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search applicants..."
                  className="pl-10 p-2 border border-gray-300 rounded-lg w-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Filtro por rol */}
            <select
              className="p-2 border border-gray-300 rounded-lg"
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
            >
              <option value="">All Positions</option>
              {uniquePositions.map(position => (
                <option key={position} value={position}>{position}</option>
              ))}
            </select>

            {/* Ordenamiento */}
            <select
              className="p-2 border border-gray-300 rounded-lg"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'name' | 'date' | 'position')}
            >
              <option value="date">Sort by Date</option>
              <option value="name">Sort by Name</option>
              <option value="position">Sort by Position</option>
            </select>

            <button
              className="p-2 border border-gray-300 rounded-lg"
              onClick={() => setSortOrder(current => current === 'asc' ? 'desc' : 'asc')}
            >
              {sortOrder === 'asc' ? '↑' : '↓'}
            </button>
          </div>
        </div>

        {/* Tabla existente */}
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Applicant
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Position
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Applied Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAndSortedApplicants.map((applicant) => (
                <tr key={applicant.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                          <FaUser className="text-gray-500" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{applicant.name}</div>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <FaEnvelope className="text-xs" />
                          <span>{applicant.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <FaPhone className="text-xs" />
                          <span>{applicant.phone}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{applicant.position}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {new Date(applicant.appliedDate).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(applicant.status)}`}>
                      {applicant.status.charAt(0).toUpperCase() + applicant.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex gap-2">
                      <ButtonComp
                        text="View Profile"
                        IsWhite={true}
                      />
                      {applicant.linkedIn && (
                        <a 
                          href={applicant.linkedIn}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <FaLinkedin className="text-xl" />
                        </a>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredAndSortedApplicants.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No applicants found matching your criteria
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApplicantsList; 