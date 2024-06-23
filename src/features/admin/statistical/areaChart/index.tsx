import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface Props {
  statisticalOrder: statisticalOrder[]
}

const AreaChartStatistical = ({ statisticalOrder }: Props) => {

  return (
    <>
    <ResponsiveContainer width="100%" height="100%">
    <AreaChart
      width={500}
      height={400}
      data={statisticalOrder}
      margin={{
        top: 10,
        right: 30,
        left: 0,
        bottom: 0,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey='statistical_month'/>
      <YAxis dataKey='statistical_count'/>
      <Tooltip />
      <Area type="monotone" dataKey="statistical_count" stroke="#8884d8" fill="#8884d8" />
    </AreaChart>
  </ResponsiveContainer>
    </>
  )
}

export default AreaChartStatistical