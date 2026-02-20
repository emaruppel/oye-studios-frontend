"use client";

import { ResponsiveContainer, LineChart as ReLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { ChartDataPoint } from "@/types";

interface LineChartProps {
  data: ChartDataPoint[];
  dataKey: keyof ChartDataPoint;
  color?: string;
  height?: number;
}

export default function LineChart({ data, dataKey, color = "#ED1C24", height = 200 }: LineChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <ReLineChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
        <XAxis
          dataKey="date"
          tick={{ fill: "#9ca3af", fontSize: 11 }}
          axisLine={false}
          tickLine={false}
          interval="preserveStartEnd"
        />
        <YAxis
          tick={{ fill: "#9ca3af", fontSize: 11 }}
          axisLine={false}
          tickLine={false}
          tickFormatter={(v) => (v >= 1000 ? `${(v / 1000).toFixed(0)}k` : v)}
        />
        <Tooltip
          contentStyle={{ backgroundColor: "#282828", border: "1px solid #ffffff20", borderRadius: "8px" }}
          labelStyle={{ color: "#ffffff" }}
          itemStyle={{ color: color }}
        />
        <Line
          type="monotone"
          dataKey={dataKey as string}
          stroke={color}
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 4, fill: color }}
        />
      </ReLineChart>
    </ResponsiveContainer>
  );
}
