
import React, { useEffect, useState } from "react";

interface QRCodeProps {
  value: string;
  size?: number;
  className?: string;
}

// Simple QR code component (in a real app, you'd use a library like react-qr-code)
const QRCode = ({ value, size = 100, className }: QRCodeProps) => {
  const [qrUrl, setQrUrl] = useState("");

  useEffect(() => {
    // In a real app, we would generate a QR code based on the value
    // For now, we'll simulate it by using a placeholder image that looks like a QR code
    const encodedValue = encodeURIComponent(value);
    setQrUrl(`https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodedValue}`);
  }, [value, size]);

  return (
    <div className={className}>
      <img 
        src={qrUrl} 
        alt="QR Code" 
        width={size} 
        height={size} 
        className="rounded-lg"
      />
      <p className="text-xs text-center mt-1 text-muted-foreground">Scan to verify</p>
    </div>
  );
};

export default QRCode;
