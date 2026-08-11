import { describe, expect, it } from 'vitest';
import { buildBarChartOptions } from './bar-chart-options';

describe('buildBarChartOptions', () => {
  it('creates a single-series option from simple data', () => {
    const result = buildBarChartOptions({
      data: [10, 20, 15],
      categories: ['A', 'B', 'C'],
      title: 'Sales',
      seriesName: 'Revenue',
      color: '#3b82f6',
      yAxisName: 'Units',
    });

    expect(result.title).toEqual({ text: 'Sales' });
    expect(result.xAxis).toEqual({ type: 'category', data: ['A', 'B', 'C'] });
    expect(result.yAxis).toEqual({ type: 'value', name: 'Units' });
    expect(result.series).toEqual([
      {
        type: 'bar',
        name: 'Revenue',
        data: [10, 20, 15],
        color: '#3b82f6',
      },
    ]);
  });

  it('supports multi-series stacked bar data with legend', () => {
    const result = buildBarChartOptions({
      series: [
        { name: 'Actual', data: [4, 6, 5] },
        { name: 'Target', data: [3, 5, 7] },
      ],
      categories: ['Jan', 'Feb', 'Mar'],
      stack: true,
      legend: true,
    });

    expect(result.legend).toEqual({ data: ['Actual', 'Target'] });
    expect(result.series).toEqual([
      {
        type: 'bar',
        name: 'Actual',
        data: [4, 6, 5],
        stack: 'total',
      },
      {
        type: 'bar',
        name: 'Target',
        data: [3, 5, 7],
        stack: 'total',
      },
    ]);
  });
});
