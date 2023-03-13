import {PieChart, Pie, Legend, Cell} from 'recharts'
import './index.css'

const VaccinationByAge = props => {
  const {data} = props

  return (
    <div className="chart-container">
      <h1 className="vaccination-text">Vaccination by age</h1>

      <PieChart height={400} width={500}>
        <Pie
          cx="50%"
          cy="40%"
          outerRadius="55%"
          data={data}
          startAngle={0}
          endAngle={360}
          dataKey="count"
        >
          <Cell name="18-44" fill=" #2d87bb" />
          <Cell name="44-60" fill=" #2cc6c6" />
          <Cell name="Above 60" fill="#a3df9f" />
        </Pie>
        <Legend iconType="circle" />
      </PieChart>
    </div>
  )
}

export default VaccinationByAge
