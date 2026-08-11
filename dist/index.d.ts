import * as _builder_io_qwik from '@builder.io/qwik';
import { EChartsOption } from 'echarts';

interface QwikEChartsPlainProps {
    options: EChartsOption;
    theme?: string | Record<string, unknown>;
    height?: number;
    autoResize?: boolean;
    class?: string;
    style?: Record<string, string | number>;
}
declare const QwikEChartsPlain: _builder_io_qwik.Component<QwikEChartsPlainProps>;

interface LineSeriesInput {
    name?: string;
    data: Array<number | {
        value: number;
        name?: string;
    }>;
    color?: string;
    smooth?: boolean;
}
interface LineChartOptionsProps {
    data?: Array<number | {
        value: number;
        name?: string;
    }>;
    series?: LineSeriesInput[];
    xAxisData?: string[];
    title?: string;
    seriesName?: string;
    smooth?: boolean;
    color?: string;
    yAxisName?: string;
    legend?: boolean;
}
declare function buildLineChartOptions(props: LineChartOptionsProps): EChartsOption;

interface QwikLineChartProps extends LineChartOptionsProps {
    height?: number;
    class?: string;
    style?: Record<string, string | number>;
}

declare const QwikLineChart: _builder_io_qwik.Component<QwikLineChartProps>;

export { type LineChartOptionsProps, type LineSeriesInput, QwikEChartsPlain as QwikECharts, type QwikEChartsPlainProps as QwikEChartsProps, QwikLineChart, type QwikLineChartProps, buildLineChartOptions };
