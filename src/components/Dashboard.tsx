
import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ScanResult } from "@/types";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Check, ScanQrCode, X } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface DashboardProps {
  scanResults: ScanResult[];
}

const Dashboard: React.FC<DashboardProps> = ({ scanResults }) => {
  const approvedCount = scanResults.filter(result => result.approved).length;
  const rejectedCount = scanResults.length - approvedCount;
  
  return (
    <Card className="shadow-md">
      <CardHeader className="bg-slate-50 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <ScanQrCode className="h-5 w-5 text-blue-600" />
            <h3 className="font-semibold">Scan Results</h3>
          </div>
          <div className="flex space-x-2">
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              {approvedCount} Approved
            </Badge>
            <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
              {rejectedCount} Rejected
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        {scanResults.length > 0 ? (
          <ScrollArea className="h-[300px]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[180px]">Student</TableHead>
                  <TableHead>ID</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead className="text-right">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {scanResults.map((result, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{result.student.name}</TableCell>
                    <TableCell>{result.student.studentId}</TableCell>
                    <TableCell>{format(new Date(result.timestamp), 'HH:mm:ss')}</TableCell>
                    <TableCell className="text-right">
                      {result.approved ? (
                        <div className="flex items-center justify-end space-x-1">
                          <Check className="h-4 w-4 text-green-600" />
                          <span className="text-green-600 font-medium">Approved</span>
                        </div>
                      ) : (
                        <div className="flex items-center justify-end space-x-1">
                          <X className="h-4 w-4 text-red-600" />
                          <span className="text-red-600 font-medium">Rejected</span>
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        ) : (
          <div className="py-8 text-center text-slate-500">
            <ScanQrCode className="h-10 w-10 mx-auto mb-2 text-slate-300" />
            <p>No scan results yet</p>
            <p className="text-sm">Scan a student's QR code to see results here</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default Dashboard;
