"use client";

import React from "react";
import UnifiedTransportCalculator from "@/components/Calculator";

export default function StandardCalculatorPage() {
  return (
      <div className="min-h-screen bg-[#F5F5F7]">
        <div className="container mx-auto px-4 py-8">
          <UnifiedTransportCalculator calculatorType="standard" />
        </div>
      </div>
  );
}