
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import QRScanner from "@/components/QRScanner";
import StudentList from "@/components/StudentList";
import Dashboard from "@/components/Dashboard";
import { approvedStudents, allStudents } from "@/utils/mockData";
import { ScanResult } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { QrCode, User, ScanQrCode } from "lucide-react";

const Index = () => {
  const [scanResults, setScanResults] = useState<ScanResult[]>([]);
  
  const handleScanComplete = (result: ScanResult) => {
    setScanResults(prev => [result, ...prev]);
  };

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <header className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-2">
            Smart Exam Permit System
          </h1>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Scan student QR codes to verify exam eligibility. Approved students are automatically verified while others are rejected.
          </p>
        </header>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Tabs defaultValue="scanner" className="w-full">
              <TabsList className="grid grid-cols-3 mb-6">
                <TabsTrigger value="scanner" className="flex items-center space-x-2">
                  <QrCode className="h-4 w-4" />
                  <span>QR Scanner</span>
                </TabsTrigger>
                <TabsTrigger value="students" className="flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span>Students</span>
                </TabsTrigger>
                <TabsTrigger value="results" className="flex items-center space-x-2">
                  <ScanQrCode className="h-4 w-4" />
                  <span>Results</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="scanner" className="mt-0">
                <div className="flex justify-center">
                  <QRScanner onScanComplete={handleScanComplete} />
                </div>
              </TabsContent>
              
              <TabsContent value="students" className="mt-0">
                <div className="grid md:grid-cols-2 gap-6">
                  <StudentList students={approvedStudents} title="Approved Students" />
                  <StudentList students={allStudents.filter(s => !s.approved)} title="Non-Approved Students" />
                </div>
              </TabsContent>
              
              <TabsContent value="results" className="mt-0">
                <Dashboard scanResults={scanResults} />
              </TabsContent>
            </Tabs>
          </div>
          
          <div>
            <Card className="shadow-md">
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold mb-4">Recent Scans</h2>
                {scanResults.length > 0 ? (
                  <div className="space-y-3">
                    {scanResults.slice(0, 5).map((result, index) => (
                      <div 
                        key={index} 
                        className={`p-3 rounded-md flex items-center justify-between ${
                          result.approved ? "bg-green-50" : "bg-red-50"
                        }`}
                      >
                        <div>
                          <p className="font-medium">{result.student.name}</p>
                          <p className="text-sm text-slate-600">{result.student.studentId}</p>
                        </div>
                        <Badge variant={result.approved ? "default" : "destructive"}>
                          {result.approved ? "Approved" : "Rejected"}
                        </Badge>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-10 text-slate-500">
                    <p>No scans recorded yet</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
