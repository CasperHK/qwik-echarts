import type { EChartsOption } from 'echarts';

export interface LineSeriesInput {
  name?: string;
  data: Array<number | { value: number; name?: string }>;
  color?: string;
  smooth?: boolean;
}

export interface LineChartOptionsProps {
  data?: Array<number | { value: number; name?: string }>;
  series?: LineSeriesInput[];
  xAxisData?: string[];
  title?: string;
  seriesName?: string;
  smooth?: boolean;
  color?: string;
  yAxisName?: string;
  legend?: boolean;
}

export function buildLineChartOptions(props: LineChartOptionsProps): EChartsOption {
  const series = (props.series?.length ? props.series : [{ name: props.seriesName ?? 'Series', data: props.data ?? [] }]).map((item) => ({
    type: 'line' as const,
    name: item.name ?? props.seriesName ?? 'Series',
    data: item.data.map((entry) =>
      typeof entry === 'number' ? entry : { value: entry.value, name: entry.name },
    ),
    smooth: item.smooth ?? props.smooth ?? true,
    color: item.color ?? props.color,
  }));

  return {
    title: props.title ? { text: props.title } : undefined,
    tooltip: { trigger: 'axis' },
    legend: props.legend ? { data: series.map((item) => item.name).filter((name): name is string => Boolean(name)) } : undefined,
    xAxis: {
      type: 'category',
      data: props.xAxisData,
    },
    yAxis: {
      type: 'value',
      name: props.yAxisName,
    },
    series,
  };
}
