import React, {PureComponent, useContext} from 'react';
import {PieChart, Pie, Sector, Cell, ResponsiveContainer} from 'recharts';

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
            </Layout>
        </div>
    );
}
