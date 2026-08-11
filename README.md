# qwik-echarts 📊

[![npm version](https://shields.io)](https://npmjs.com)
[![license](https://shields.io)](https://github.com)

The enterprise-ready Apache ECharts experience meets the resumable architecture of Qwik in this lightweight library package.

Qwik ECharts provides a small, SSR-safe wrapper around ECharts that initializes the chart only on the client, resizes automatically when the container changes size, and reuses the same chart instance for efficient updates.

## ✨ What is included

- ⚡ Client-only initialization so SSR stays lightweight.
- 📐 Automatic resize support with ResizeObserver.
- 🔄 Efficient redraws via repeated `setOption` calls on the same chart instance.
- 🎨 Theme support through the ECharts `theme` prop.
- 🦺 TypeScript-friendly props and option typing from ECharts.

## 📦 Installation

Install the library alongside ECharts and Qwik in your app:

```bash
pnpm add qwik-echarts echarts @builder.io/qwik
# or
npm install qwik-echarts echarts @builder.io/qwik
```

## 🚀 Quick start

```tsx
import { component$ } from '@builder.io/qwik';
import { QwikLineChart } from 'qwik-echarts';

export default component$(() => {
  return (
    <section style={{ padding: '24px' }}>
      <QwikLineChart
        data={[120, 200, 150, 260, 180]}
        xAxisData={['Jan', 'Feb', 'Mar', 'Apr', 'May']}
        title="Weekly sales"
        seriesName="Sales"
        color="#3b82f6"
        height={320}
      />
    </section>
  );
});
```

## 🔄 Auto-update pattern

The component reuses the same ECharts instance and calls `setOption` whenever the incoming options prop changes. This makes it ideal for reactive dashboards where data values change over time:

```tsx
const state = useStore({
  data: [10, 20, 14, 32],
});

const options: EChartsOption = {
  xAxis: { type: 'category', data: ['A', 'B', 'C', 'D'] },
  yAxis: { type: 'value' },
  series: [{ type: 'line', data: state.data }],
};

return <QwikECharts options={options} height={320} />;
```

When the data in your Qwik store changes, the chart updates without mounting a new canvas.

## ⚙️ Component API

| Prop | Type | Default | Description |
| :--- | :--- | :---: | :--- |
| `options` | `EChartsOption` | — | The ECharts option object to render. |
| `theme` | `string \| Record<string, unknown>` | — | Optional ECharts theme name or theme object. |
| `height` | `number` | `400` | Container height in pixels. |
| `autoResize` | `boolean` | `true` | Enables or disables automatic resize handling. |
| `class` | `string` | — | Optional container class name. |
| `style` | `Record<string, string \| number>` | — | Optional container style overrides. |

## 🛠️ Build the package

```bash
pnpm install
pnpm build
```

## 📄 License

This project is distributed under the MIT License.
