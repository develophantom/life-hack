"use dom"
import React from 'react';
import AnimatedHatchedPatternAreaChart from "@/components/shad/ui/animated-hatched-pattern-chart"

export default function Statistics() {
  const chartData = [
    { month: "January", desktop: 342, mobile: 245 },
    { month: "February", desktop: 876, mobile: 654 },
    { month: "March", desktop: 512, mobile: 387 },
    { month: "April", desktop: 629, mobile: 521 },
    { month: "May", desktop: 458, mobile: 412 },
    { month: "June", desktop: 781, mobile: 598 },
    { month: "July", desktop: 394, mobile: 312 },
    { month: "August", desktop: 925, mobile: 743 },
    { month: "September", desktop: 647, mobile: 489 },
    { month: "October", desktop: 532, mobile: 476 },
    { month: "November", desktop: 803, mobile: 687 },
    { month: "December", desktop: 271, mobile: 198 },
  ];
  return (
    <AnimatedHatchedPatternAreaChart dom={{ matchContents: true }} data={chartData} />
  );
}
