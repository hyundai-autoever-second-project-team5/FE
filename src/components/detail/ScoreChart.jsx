import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const ScoreChart = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          left: -30,
        }}
      >
        {/* <CartesianGrid strokeDasharray="3 3" /> */}
        <XAxis dataKey="score" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" fill="white" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ScoreChart;
