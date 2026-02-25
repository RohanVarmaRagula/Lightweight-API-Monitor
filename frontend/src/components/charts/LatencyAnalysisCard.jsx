import { Card, CardContent, CardHeader, useMediaQuery } from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";

function LatencyAnalysisCard({p95_latency, p99_latency, avg_latency}) {
  const isMobile = useMediaQuery('(max-width:767px)');
  const chartHeight = isMobile ? 160 : 200;
  const marginLeft = isMobile ? 40 : 50;

  const p95 = p95_latency;
  const p99 = p99_latency;
  const avg = avg_latency;

  return (
    <Card sx={{ width: "100%" }}>
      <CardHeader 
        title="LATENCY SUMMARY"
        subheader="Average and tail latency over the last 24 hours"
         />
      <CardContent sx={{ pt: 1, overflow: 'auto' }}>
        <BarChart
          height={chartHeight}
          layout="horizontal"
          series={[
            {
              data: [avg, p95, p99],
              color: "#1e9275ff",
              label: "Latency (ms)",
            },
          ]}
          xAxis={[
            {
              min: 0,
              label: "ms",
            },
          ]}
          yAxis={[
            {
              scaleType: "band",
              data: ["avg", "p95", "p99"],
            },
          ]}
          margin={{ left: marginLeft, right: 20, top: 10, bottom: 10 }}
        />
      </CardContent>
    </Card>
  );
}

export default LatencyAnalysisCard;
