"use client";

import { ResponsiveContainer, BarChart as ReBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { ChartDataPoint } from "@/types";

interface BarChartProps {
  data: ChartDataPoint[];
  dataKey: keyof ChartDataPoint;
  color?: string;
  height?: number;
}

export default function BarChart({ data, dataKey, color = "#ED1C24", height = 200 }: BarChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <ReBarChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
        <XAxis
          dataKey="date"
          tick={{ fill: "#9ca3af", fontSize: 11 }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tick={{ fill: "#9ca3af", fontSize: 11 }}
          axisLine={false}
          tickLine={false}
          tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
        />
        <Tooltip
          contentStyle={{ backgroundColor: "#282828", border: "1px solid #ffffff20", borderRadius: "8px" }}
          labelStyle={{ color: "#ffffff" }}
          itemStyle={{ color: color }}
          formatter={(v: number | undefined) => v !== undefined ? [`$${v.toFixed(2)}`, "Ingresos"] : ["$0.00", "Ingresos"]}
        />
        <Bar dataKey={dataKey as string} fill={color} radius={[4, 4, 0, 0]} />
      </ReBarChart>
    </ResponsiveContainer>
  );
}
