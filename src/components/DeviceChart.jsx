/* eslint-disable react/prop-types */
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const COLORS = ["#4CAF50", "#2196F3", "#FFC107", "#FF5722", "#673AB7"]; // New color palette

export default function DeviceChart({ stats }) {
  if (!stats || stats.length === 0) {
    return <p className="text-gray-500 text-center">No data available</p>; // Updated message styling
  }

  const deviceCount = stats.reduce((acc, item) => {
    if (!acc[item.device]) {
      acc[item.device] = 0;
    }
    acc[item.device]++;
    return acc;
  }, {});

  const result = Object.keys(deviceCount).map((device) => ({
    device,
    count: deviceCount[device],
  }));

  return (
    <div
      style={{ width: "100%", height: 300 }}
      className="shadow-lg rounded-lg overflow-hidden"
    >
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={result}
            labelLine={false}
            label={({ device, percent }) =>
              `${device}: ${(percent * 100).toFixed(0)}%`
            }
            dataKey="count"
            animationBegin={0}
            animationDuration={800}
            animationEasing="ease-out"
            isAnimationActive={true} // Enable animation
          >
            {result.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="text-center mt-4">
        <h2 className="font-bold text-lg">Device Distribution</h2>
      </div>
    </div>
  );
}
