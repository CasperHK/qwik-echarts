import { describe, expect, it } from 'vitest';
import { buildLineChartOptions } from './line-chart-options';

describe('buildLineChartOptions', () => {
  it('creates a single-series option from simple data', () => {
    const options = buildLineChartOptions({
      data: [10, 20, 30],
      title: 'Sales',
      color: '#3b82f6',
    });

    expect(options.title).toEqual({ text: 'Sales' });
    expect(options.series).toHaveLength(1);
    expect(options.series?.[0]).toMatchObject({
      type: 'line',
      name: 'Series',
      color: '#3b82f6',
    });
  });

  it('supports multiple series with legend data', () => {
    const options = buildLineChartOptions({
      series: [
        { name: 'Revenue', data: [10, 12, 14] },
        { name: 'Cost', data: [4, 6, 8], color: '#ef4444' },
      ],
      legend: true,
    });

    expect(options.series).toHaveLength(2);
    expect(options.legend).toEqual({ data: ['Revenue', 'Cost'] });
    expect(options.series?.[1]).toMatchObject({
      name: 'Cost',
      color: '#ef4444',
    });
  });
});
