import type { EChartsOption } from 'echarts';

export interface BarSeriesInput {
  name?: string;
  data: Array<number | { value: number; name?: string }>;
  color?: string;
}

export interface BarChartOptionsProps {
  data?: Array<number | { value: number; name?: string }>;
  series?: BarSeriesInput[];
  categories?: string[];
  title?: string;
  seriesName?: string;
  color?: string;
  yAxisName?: string;
  legend?: boolean;
  stack?: boolean;
}

export function buildBarChartOptions(props: BarChartOptionsProps): EChartsOption {
  const series = (props.series?.length ? props.series : [{ name: props.seriesName ?? 'Series', data: props.data ?? [] }]).map((item) => ({
    type: 'bar' as const,
    name: item.name ?? props.seriesName ?? 'Series',
    data: item.data.map((entry) =>
      typeof entry === 'number' ? entry : { value: entry.value, name: entry.name },
    ),
    color: item.color ?? props.color,
    ...(props.stack ? { stack: 'total' } : {}),
  }));

  return {
    title: props.title ? { text: props.title } : undefined,
    tooltip: { trigger: 'axis' },
    legend: props.legend ? { data: series.map((item) => item.name).filter((name): name is string => Boolean(name)) } : undefined,
    xAxis: {
      type: 'category',
      data: props.categories,
    },
    yAxis: {
      type: 'value',
      name: props.yAxisName,
    },
    series,
  };
}
