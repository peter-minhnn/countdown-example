'use client'
import ShiftingCountdown from '@/components/ShiftingCountdown';
import { Button } from '@/components/ui/button';
import React, { useState, useEffect } from 'react';

export default function Home() {
  const [count, setCount] = useState(10); // Start countdown from 10
  const [timer, setTimer] = useState<any>(); // Start countdown from 10

  const start = () => {

  }
  useEffect(() => {
    let timer: any;
    if (count > 0) {
      timer = setInterval(() => setCount(count - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [count]);

  return (
    <main className="flex w-full min-h-screen flex-col items-center justify-between bg-black">
      <ShiftingCountdown />
    </main>
  );
}
