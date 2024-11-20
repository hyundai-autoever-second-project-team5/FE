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
    <ResponsiveContainer width="70%" height="100%" minHeight={200}>
      <BarChart
        data={data}
        margin={{
          bottom: 5,
        }}
        style={{
          padding: '10px',
          backgroundColor: 'rgba(0,0,0,0)',
          borderRadius: '0.5rem'
        }}
      >
        
        <XAxis 
          dataKey="score" 
          stroke="#E5E7EB"
        />
        <YAxis 
          stroke="#E5E7EB"
        />
        <Tooltip 
          contentStyle={{ 
            backgroundColor: 'rgba(31, 41, 55, 0.7)', 
            backdropFilter: 'blur(8px)',  
            border: '1px solid rgba(0, 30, 81, 0.5)',
            borderRadius: '0.4rem',
            color: '#E5E7EB'
          }}
          cursor={{
            fill: 'rgba(255, 105, 180, 0.1)',  
            stroke: '#FF69B4',                
            strokeWidth: 0,                  
            strokeDasharray: " "            
          }}
        />

        <Bar 
          dataKey="count" 
          fill="#FF69B4" 
          radius={[8, 8, 0, 0]}
          barSize={60}
          activeBar={{ 
            stroke: '#FFB6C1',
            strokeWidth: 1,
            fill: '#FFFFFF' ,
            strokeDasharray: "",  
            filter: 'drop-shadow(0 0 4px #FF69B4)'
          }}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ScoreChart;