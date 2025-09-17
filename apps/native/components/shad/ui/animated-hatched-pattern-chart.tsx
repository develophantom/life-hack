"use dom";
import "@/global.css"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/shad/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/shad/ui/chart";
import { Badge } from "@/components/shad/ui/badge";
// import { TrendingUp } from "lucide-react"
import React from "react";



interface ChartProps {
  data: any
  dom?: { matchContents?: boolean; style?: any };
}

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
  mobile: {
    label: "Mobile",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

type ActiveProperty = keyof typeof chartConfig;

export default function AnimatedHatchedPatternAreaChart(props: ChartProps) {
  const [activeProperty, setActiveProperty] =
    React.useState<ActiveProperty | null>(null);

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Hatched Area Chart
          <Badge
            variant="outline"
            className="text-green-500 bg-green-500/10 border-none ml-2"
          >
            icons
            <span>5.2%</span>
          </Badge>
        </CardTitle>
        <CardDescription>
          Showing total visitors for the last 6 months
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart accessibilityLayer data={props.data}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <defs>
              <HatchedBackgroundPattern config={chartConfig} />
              <linearGradient
                id="hatched-background-pattern-grad-desktop"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="5%"
                  stopColor="var(--color-desktop)"
                  stopOpacity={0.4}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-desktop)"
                  stopOpacity={0}
                />
              </linearGradient>
              <linearGradient
                id="hatched-background-pattern-grad-mobile"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="5%"
                  stopColor="var(--color-mobile)"
                  stopOpacity={0.4}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-mobile)"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <Area
              onMouseEnter={() => setActiveProperty("mobile")}
              onMouseLeave={() => setActiveProperty(null)}
              dataKey="mobile"
              type="natural"
              fill={
                activeProperty === "mobile"
                  ? "url(#hatched-background-pattern-mobile)"
                  : "url(#hatched-background-pattern-grad-mobile)"
              }
              fillOpacity={0.4}
              stroke="var(--color-mobile)"
              stackId="a"
              strokeWidth={0.8}
            />
            <Area
              onMouseEnter={() => setActiveProperty("desktop")}
              onMouseLeave={() => setActiveProperty(null)}
              dataKey="desktop"
              type="natural"
              fill={
                activeProperty === "desktop"
                  ? "url(#hatched-background-pattern-desktop)"
                  : "url(#hatched-background-pattern-grad-desktop)"
              }
              fillOpacity={0.4}
              stroke="var(--color-desktop)"
              stackId="a"
              strokeWidth={0.8}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

const HatchedBackgroundPattern = ({ config }: { config: ChartConfig }) => {
  const items = Object.fromEntries(
    Object.entries(config).map(([key, value]) => [key, value.color])
  );
  return (
    <>
      {Object.entries(items).map(([key, value]) => (
        <pattern
          key={key}
          id={`hatched-background-pattern-${key}`}
          x="0"
          y="0"
          width="6.81"
          height="6.81"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(-45)"
          overflow="visible"
        >
          <g overflow="visible" className="will-change-transform">
            <animateTransform
              attributeName="transform"
              type="translate"
              from="0 0"
              to="6 0"
              dur="1s"
              repeatCount="indefinite"
            />
            <rect width="10" height="10" opacity={0.05} fill={value} />
            <rect width="1" height="10" fill={value} />
          </g>
        </pattern>
      ))}
    </>
  );
};
