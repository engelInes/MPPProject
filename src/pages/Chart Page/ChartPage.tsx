import React, {PureComponent, useContext} from 'react';
import {PieChart, Pie, Sector, Cell, ResponsiveContainer} from 'recharts';
// import {
//     BarChart,
//     Bar,
//     Rectangle,
//     XAxis,
//     YAxis,
//     CartesianGrid,
//     Tooltip,
//     Legend,
//     ResponsiveContainer,
// } from 'recharts';
import { BooksContext } from '../../context/BooksContext';
import { Layout } from '../../components/layout/Layout';
export function ChartPage() {
    const data=useContext(BooksContext)?.books;
    return (
        <div className='chart-pie'>
            <Layout>
                <PieChart width={1400} height={400}>
                    <Pie
                        dataKey='id'
                        startAngle={180}
                        endAngle={0}
                        data={data}
                        cx='50%'
                        cy='50%'
                        outerRadius={80}
                        fill='red'
                        label
                    />
                </PieChart>
                {/* <BarChart
                width={500}
                height={300}
                data={data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis dataKey='name' />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar
                    dataKey='genre'
                    fill='#8884d8'
                    activeBar={<Rectangle fill='pink' stroke='blue' />}
                />
            </BarChart> */}
            </Layout>
        </div>
    );
}
