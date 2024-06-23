import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";

interface Props {
    statisticalProduct: statisticalProduct[]
}

const RadarChartStatistical = ({ statisticalProduct }: Props) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={statisticalProduct}>
        <PolarGrid />
        <PolarAngleAxis dataKey="product_name" />
        <PolarRadiusAxis />
        <Radar
          name="radar"
          dataKey="statistical_count"
          stroke="#8884d8"
          fill="#8884d8"
          fillOpacity={0.6}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
};

export default RadarChartStatistical;
