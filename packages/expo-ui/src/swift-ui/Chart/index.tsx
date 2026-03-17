import { requireNativeView } from 'expo';
import type { ColorValue, StyleProp, ViewStyle } from 'react-native';

import { createViewModifierEventListener } from '../modifiers/utils';
import { CommonViewModifierProps } from '../types';

/**
 * The type of chart to display.
 * - `line` charts show continuous lines with optional dash array, width, point symbols, and color.
 * - `point` charts show discrete colored points with optional point style (circle, square, diamond) and size.
 * - `bar` charts show vertical bars using system colors or individual ChartDataPoint colors, with optional corner radius and width styling.
 * - `area` charts show filled areas under lines with color.
 * - `pie` charts show pie slices with optional inner radius and angular inset. Pie charts require iOS 17.0+.
 * - `rectangle` charts show rectangular data visualization.
 * @platform ios
 */
export type ChartType = 'line' | 'point' | 'bar' | 'area' | 'pie' | 'rectangle';

/**
 * Point symbol style options.
 */
export type PointStyle = 'circle' | 'square' | 'diamond';

/**
 * Axis stride unit for controlling axis intervals.
 */
export type AxisStrideUnit = 'number' | 'day' | 'week' | 'month' | 'year';

/**
 * Configuration for chart axis customization.
 */
export type AxisConfig = {
  /**
   * Whether the axis is visible.
   * @default true
   */
  visible?: boolean;
  /**
   * Whether to show tick marks on the axis.
   * @default true
   */
  showTicks?: boolean;
  /**
   * Whether to show grid lines from the axis.
   * @default true
   */
  showGridLines?: boolean;
  /**
   * Whether to show labels on the axis.
   * @default true
   */
  showLabels?: boolean;
  /**
   * The unit type for axis intervals.
   * @default 'number'
   */
  strideBy?: AxisStrideUnit;
  /**
   * The count for axis stride intervals (e.g., every 7 days, every 3 months).
   * @default 1
   */
  strideCount?: number;
  /**
   * Whether to center labels between tick marks (only applies to X-axis).
   * @default false
   */
  labelCentered?: boolean;
};

/**
 * Data point for the chart.
 */
export type ChartDataPoint = {
  /**
   * X-axis value (can be a label string or numeric value).
   */
  x: string | number;
  /**
   * Y-axis value (numeric).
   */
  y: number;
  /**
   * Optional color for this specific data point.
   */
  color?: ColorValue;
};

/**
 * Line chart specific styling options.
 */
export type LineChartStyle = {
  /**
   * Dash pattern array. Empty array or undefined for solid lines.
   * @example [5, 5] for dashed line, [2, 2] for dotted line
   */
  dashArray?: number[];
  /**
   * Line stroke width.
   */
  width?: number;
  /**
   * Point symbol style.
   */
  pointStyle?: PointStyle;
  /**
   * Point symbol size.
   */
  pointSize?: number;
  /**
   * Line color.
   */
  color?: ColorValue;
};

/**
 * Area chart specific styling options.
 */
export type AreaChartStyle = {
  /**
   * Area fill color.
   */
  color?: ColorValue;
};

/**
 * Bar chart specific styling options.
 */
export type BarChartStyle = {
  /**
   * Corner radius for rounded bar corners.
   */
  cornerRadius?: number;
  /**
   * Custom bar width.
   */
  width?: number;
};

/**
 * Pie chart specific styling options.
 */
export type PieChartStyle = {
  /**
   * Inner radius ratio (0.0 = full pie, 0.5 = donut).
   */
  innerRadius?: number;
  /**
   * Space between slices in points.
   */
  angularInset?: number;
};

/**
 * Point chart specific styling options.
 */
export type PointChartStyle = {
  /**
   * Point symbol style.
   */
  pointStyle?: PointStyle;
  /**
   * Point symbol size.
   */
  pointSize?: number;
};

export type RectangleChartStyle = {
  /**
   * Color of the rectangle.
   */
  color?: ColorValue;
  /**
   * Corner radius of the rectangle.
   */
  cornerRadius?: number;
};

export type RuleChartStyle = {
  /**
   * Color of the rule line.
   */
  color?: ColorValue;
  /**
   * Line width of the rule.
   */
  lineWidth?: number;
  /**
   * Dash pattern array for the rule line.
   */
  dashArray?: number[];
};

export type ChartProps = {
  /**
   * Array of data points to display.
   */
  data: ChartDataPoint[];
  /**
   * Type of chart to render.
   */
  type?: ChartType;
  /**
   * Whether to show grid lines.
   */
  showGrid?: boolean;
  /**
   * Whether to animate chart changes.
   */
  animate?: boolean;
  /**
   * Whether to show chart legend.
   * - Only works when individual dataPoint colors are NOT provided (uses categorical styling)
   * - Useful for `bar` and `pie` charts (shows category colors)
   * - Not applicable for `line` and `area` charts (single-series data)
   * - If dataPoint has individual colors, legend won't appear - use data without colors to see legend
   */
  showLegend?: boolean;
  /**
   * Optional reference lines to overlay on the chart as rule marks.
   */
  referenceLines?: ChartDataPoint[];
  /**
   * Line chart specific styling options.
   */
  lineStyle?: LineChartStyle;
  /**
   * Point chart specific styling options.
   */
  pointStyle?: PointChartStyle;
  /**
   * Area chart specific styling options.
   */
  areaStyle?: AreaChartStyle;
  /**
   * Bar chart specific styling options.
   */
  barStyle?: BarChartStyle;
  /**
   * Pie chart specific styling options.
   */
  pieStyle?: PieChartStyle;
  /**
   * Rectangle chart specific styling options.
   */
  rectangleStyle?: RectangleChartStyle;
  /**
   * Rule mark specific styling options.
   */
  ruleStyle?: RuleChartStyle;
  /**
   * X-axis configuration for custom axis styling and intervals.
   */
  xAxisConfig?: AxisConfig;
  /**
   * Y-axis configuration for custom axis styling and intervals.
   */
  yAxisConfig?: AxisConfig;
} & CommonViewModifierProps;

const ChartNativeView: React.ComponentType<ChartProps> = requireNativeView('ExpoUI', 'ChartView');

/**
 * Renders a native Chart component using Swift Charts.
 * @platform ios 16.0+
 * @platform tvos 16.0+
 */
export function Chart({
  style,
  data,
  modifiers,
  referenceLines,
  ...props
}: ChartProps & { style?: StyleProp<ViewStyle> }) {
  return (
    <ChartNativeView
      data={data}
      referenceLines={referenceLines}
      modifiers={modifiers}
      {...(modifiers ? createViewModifierEventListener(modifiers) : undefined)}
      {...props}
    />
  );
}
