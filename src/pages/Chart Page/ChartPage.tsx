// import React, {PureComponent, useContext} from 'react';
// import {PieChart, Pie, Sector, Cell, ResponsiveContainer} from 'recharts';

import React, {useContext} from 'react';
import {PieChart, Pie, Cell, ResponsiveContainer} from 'recharts';
import {DataGrid} from '@mui/x-data-grid';
import {useTheme} from '@mui/material/styles';
import { BooksContext } from '../../context/BooksContext';
import { Layout } from '../../components/layout/Layout';
interface GenreCounts {
    [genre: string]: number; // Define the index signature
}
export function ChartPage() {
    const data=useContext(BooksContext)?.books;
    const genreCounts: GenreCounts = data.reduce((counts, book) => {
        counts[book.getGenre()] = (counts[book.getGenre()] || 0) + 1;
        return counts;
    }, {} as GenreCounts);

    // Convert genre counts to an array of objects
    const chartData = Object.entries(genreCounts).map(([genre, count]) => ({
        genre,
        count,
    }));
    return (
        <div className='chart-pie'>
            <Layout>
                <PieChart width={1300} height={500}>
                    <Pie
                        //dataKey='id'
                        dataKey='count'
                        nameKey='genre'
                        startAngle={360}
                        endAngle={0}
                        data={chartData}
                        cx='50%'
                        cy='50%'
                        outerRadius={120}
                        fill='red'
                        label={({genre}) => genre}
                    />
                </PieChart>
            </Layout>
        </div>
    );
}
