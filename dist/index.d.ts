import * as _builder_io_qwik from '@builder.io/qwik';
import { EChartsOption } from 'echarts';

interface QwikEChartsProps {
    options: EChartsOption;
    theme?: string | Record<string, unknown>;
    height?: number;
    autoResize?: boolean;
    class?: string;
    style?: Record<string, string | number>;
}
declare const QwikECharts: _builder_io_qwik.Component<QwikEChartsProps>;

export { QwikECharts, type QwikEChartsProps };
