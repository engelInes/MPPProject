import {useContext} from 'react';
import {PieChart, Pie} from 'recharts';

import { BooksContext } from '../../context/BooksContext';
import { Layout } from '../../components/layout/Layout';
interface GenreCounts {
    [genre: string]: number; 
}
export function ChartPage() {
    const data=useContext(BooksContext)?.books;
    const genreCounts: GenreCounts = data? data.reduce((counts, book) => {
        counts[book.genre] = (counts[book.genre] || 0) + 1;
        return counts;
    }, {} as GenreCounts):{};

    const chartData = Object.entries(genreCounts).map(([genre, count]) => ({
        genre,
        count,
    }));
    return (
        <div className='chart-pie'>
            <Layout>
                <PieChart width={1300} height={500}>
                    <Pie
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
