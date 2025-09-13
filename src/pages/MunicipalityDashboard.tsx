import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Phone, User, Clock, AlertCircle } from "lucide-react";
import { useNavigate } from 'react-router-dom';

interface CivicReport {
  id: number;
  citizenName: string;
  citizenPhone: string;
  problemName: string;
  description: string;
  location: string;
  photo: string | null;
  status: string;
  dateReported: string;
  timeReported: string;
}

const MunicipalityDashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(sessionStorage.getItem('user') || '{}');
  const [reports, setReports] = useState<CivicReport[]>([]);
  const [filteredReports, setFilteredReports] = useState<CivicReport[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>('all');

  useEffect(() => {
    // Load reports from localStorage (mock database)
    const storedReports = JSON.parse(localStorage.getItem('civicReports') || '[]');
    setReports(storedReports);
    setFilteredReports(storedReports);
  }, []);

  useEffect(() => {
    if (statusFilter === 'all') {
      setFilteredReports(reports);
    } else {
      setFilteredReports(reports.filter(report => report.status.toLowerCase() === statusFilter.toLowerCase()));
    }
  }, [reports, statusFilter]);

  const handleStatusChange = (reportId: number, newStatus: string) => {
    const updatedReports = reports.map(report => 
      report.id === reportId ? { ...report, status: newStatus } : report
    );
    setReports(updatedReports);
    localStorage.setItem('civicReports', JSON.stringify(updatedReports));
  };

  const handleLogout = () => {
    sessionStorage.removeItem('user');
    navigate('/');
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'in progress': return 'bg-blue-100 text-blue-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityIcon = (problemName: string) => {
    const highPriority = ['potholes', 'broken street lights', 'water related problems'];
    return highPriority.some(p => problemName.toLowerCase().includes(p.toLowerCase())) 
      ? <AlertCircle className="h-4 w-4 text-red-500" /> 
      : <AlertCircle className="h-4 w-4 text-gray-400" />;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div>
              <h1 className="text-xl font-semibold text-gray-900">
                Municipality Dashboard
              </h1>
              <p className="text-sm text-gray-600">Welcome, {user.userId}</p>
            </div>
            <Button variant="outline" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Summary Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <AlertCircle className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Reports</p>
                  <p className="text-2xl font-bold text-gray-900">{reports.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <Clock className="h-6 w-6 text-yellow-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Pending</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {reports.filter(r => r.status === 'Pending').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <AlertCircle className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">In Progress</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {reports.filter(r => r.status === 'In Progress').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <AlertCircle className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Resolved</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {reports.filter(r => r.status === 'Resolved').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Reported Issues</h2>
          <div className="flex items-center space-x-4">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Issues</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="in progress">In Progress</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Reports List */}
        <div className="space-y-4">
          {filteredReports.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <p className="text-gray-500">No reports found.</p>
              </CardContent>
            </Card>
          ) : (
            filteredReports.map((report) => (
              <Card key={report.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="grid md:grid-cols-3 gap-6">
                    
                    {/* Citizen Info */}
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                        <User className="h-4 w-4 mr-2 text-gray-500" />
                        Citizen Information
                      </h4>
                      <div className="space-y-1 text-sm text-gray-600">
                        <div className="flex items-center">
                          <span className="font-medium">Name:</span>
                          <span className="ml-2">{report.citizenName}</span>
                        </div>
                        <div className="flex items-center">
                          <Phone className="h-3 w-3 mr-1" />
                          <span>{report.citizenPhone}</span>
                        </div>
                      </div>
                    </div>

                    {/* Problem Details */}
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                        {getPriorityIcon(report.problemName)}
                        <span className="ml-2">Problem Details</span>
                      </h4>
                      <div className="space-y-1 text-sm">
                        <div className="font-medium text-gray-900">{report.problemName}</div>
                        <div className="text-gray-600 line-clamp-2">{report.description}</div>
                        <div className="flex items-center text-gray-500">
                          <MapPin className="h-3 w-3 mr-1" />
                          <span className="truncate">{report.location}</span>
                        </div>
                      </div>
                    </div>

                    {/* Status & Actions */}
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Status & Actions</h4>
                      <div className="space-y-3">
                        <Badge className={getStatusColor(report.status)}>
                          {report.status}
                        </Badge>
                        
                        <div className="text-xs text-gray-500">
                          <div>Reported: {report.dateReported}</div>
                          <div>Time: {report.timeReported}</div>
                        </div>

                        <Select 
                          value={report.status} 
                          onValueChange={(value) => handleStatusChange(report.id, value)}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Pending">Pending</SelectItem>
                            <SelectItem value="In Progress">In Progress</SelectItem>
                            <SelectItem value="Resolved">Resolved</SelectItem>
                            <SelectItem value="Rejected">Rejected</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default MunicipalityDashboard;