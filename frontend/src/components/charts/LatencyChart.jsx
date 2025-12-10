import { Card, CardContent, CardHeader } from "@mui/material";
import { LineChart } from "@mui/x-charts";

function LatencyChart({latencies}) {
  // const latencies = [
  //   { time: "2025-12-07T10:01:00Z", latency: 120 },
  //   { time: "2025-12-07T10:02:00Z", latency: 94 },
  //   { time: "2025-12-07T10:03:00Z", latency: 310 },
  //   { time: "2025-12-07T10:04:00Z", latency: 180 },
  //   { time: "2025-12-07T10:05:00Z", latency: 210 },
  //   { time: "2025-12-07T10:06:00Z", latency: 135 },
  //   { time: "2025-12-07T10:07:00Z", latency: 420 },
  //   { time: "2025-12-07T10:08:00Z", latency: 155 },
  //   { time: "2025-12-07T10:09:00Z", latency: 260 },
  //   { time: "2025-12-07T10:10:00Z", latency: 510 },
  //   { time: "2025-12-07T10:11:00Z", latency: 142 },
  //   { time: "2025-12-07T10:12:00Z", latency: 186 },
  //   { time: "2025-12-07T10:13:00Z", latency: 320 },
  //   { time: "2025-12-07T10:14:00Z", latency: 105 },
  //   { time: "2025-12-07T10:15:00Z", latency: 265 },
  //   { time: "2025-12-07T10:16:00Z", latency: 400 },
  //   { time: "2025-12-07T10:17:00Z", latency: 158 },
  //   { time: "2025-12-07T10:18:00Z", latency: 226 },
  //   { time: "2025-12-07T10:19:00Z", latency: 301 },
  //   { time: "2025-12-07T10:20:00Z", latency: 192 },
  //   { time: "2025-12-07T10:21:00Z", latency: 175 },
  //   { time: "2025-12-07T10:22:00Z", latency: 240 },
  //   { time: "2025-12-07T10:23:00Z", latency: 315 },
  //   { time: "2025-12-07T10:24:00Z", latency: 198 },
  //   { time: "2025-12-07T10:25:00Z", latency: 145 },
  //   { time: "2025-12-07T10:26:00Z", latency: 265 },
  //   { time: "2025-12-07T10:27:00Z", latency: 288 },
  //   { time: "2025-12-07T10:28:00Z", latency: 350 },
  //   { time: "2025-12-07T10:29:00Z", latency: 410 },
  //   { time: "2025-12-07T10:30:00Z", latency: 190 },
  //   { time: "2025-12-07T10:31:00Z", latency: 210 },
  //   { time: "2025-12-07T10:32:00Z", latency: 330 },
  //   { time: "2025-12-07T10:33:00Z", latency: 260 },
  //   { time: "2025-12-07T10:34:00Z", latency: 138 },
  //   { time: "2025-12-07T10:35:00Z", latency: 158 },
  //   { time: "2025-12-07T10:36:00Z", latency: 405 },
  //   { time: "2025-12-07T10:37:00Z", latency: 175 },
  //   { time: "2025-12-07T10:38:00Z", latency: 225 },
  //   { time: "2025-12-07T10:39:00Z", latency: 320 },
  //   { time: "2025-12-07T10:40:00Z", latency: 470 },
  //   { time: "2025-12-07T10:41:00Z", latency: 260 },
  //   { time: "2025-12-07T10:42:00Z", latency: 180 },
  //   { time: "2025-12-07T10:43:00Z", latency: 140 },
  //   { time: "2025-12-07T10:44:00Z", latency: 230 },
  //   { time: "2025-12-07T10:45:00Z", latency: 350 },
  //   { time: "2025-12-07T10:46:00Z", latency: 410 },
  //   { time: "2025-12-07T10:47:00Z", latency: 298 },
  //   { time: "2025-12-07T10:48:00Z", latency: 250 },
  //   { time: "2025-12-07T10:49:00Z", latency: 175 },
  //   { time: "2025-12-07T10:50:00Z", latency: 220 },
  //   { time: "2025-12-07T10:51:00Z", latency: 360 },
  //   { time: "2025-12-07T10:52:00Z", latency: 305 },
  //   { time: "2025-12-07T10:53:00Z", latency: 260 },
  //   { time: "2025-12-07T10:54:00Z", latency: 190 },
  //   { time: "2025-12-07T10:55:00Z", latency: 165 },
  //   { time: "2025-12-07T10:56:00Z", latency: 210 },
  //   { time: "2025-12-07T10:57:00Z", latency: 330 },
  //   { time: "2025-12-07T10:58:00Z", latency: 295 },
  //   { time: "2025-12-07T10:59:00Z", latency: 240 },
  //   { time: "2025-12-07T11:00:00Z", latency: 185 },
  //   { time: "2025-12-07T11:01:00Z", latency: 215 },
  //   { time: "2025-12-07T11:02:00Z", latency: 260 },
  //   { time: "2025-12-07T11:03:00Z", latency: 310 },
  //   { time: "2025-12-07T11:04:00Z", latency: 350 },
  //   { time: "2025-12-07T11:05:00Z", latency: 420 },
  //   { time: "2025-12-07T11:06:00Z", latency: 280 },
  //   { time: "2025-12-07T11:07:00Z", latency: 265 },
  //   { time: "2025-12-07T11:08:00Z", latency: 198 },
  //   { time: "2025-12-07T11:09:00Z", latency: 155 },
  //   { time: "2025-12-07T11:10:00Z", latency: 175 },
  //   { time: "2025-12-07T11:11:00Z", latency: 240 },
  //   { time: "2025-12-07T11:12:00Z", latency: 330 },
  //   { time: "2025-12-07T11:13:00Z", latency: 410 },
  //   { time: "2025-12-07T11:14:00Z", latency: 280 },
  //   { time: "2025-12-07T11:15:00Z", latency: 260 },
  //   { time: "2025-12-07T11:16:00Z", latency: 190 },
  //   { time: "2025-12-07T11:17:00Z", latency: 145 },
  //   { time: "2025-12-07T11:18:00Z", latency: 215 },
  //   { time: "2025-12-07T11:19:00Z", latency: 295 },
  //   { time: "2025-12-07T11:20:00Z", latency: 355 },
  //   { time: "2025-12-07T11:21:00Z", latency: 420 },
  //   { time: "2025-12-07T11:22:00Z", latency: 310 },
  //   { time: "2025-12-07T11:23:00Z", latency: 205 },
  //   { time: "2025-12-07T11:24:00Z", latency: 165 },
  //   { time: "2025-12-07T11:25:00Z", latency: 150 },
  //   { time: "2025-12-07T11:26:00Z", latency: 275 },
  //   { time: "2025-12-07T11:27:00Z", latency: 330 },
  //   { time: "2025-12-07T11:28:00Z", latency: 390 },
  //   { time: "2025-12-07T11:29:00Z", latency: 450 },
  //   { time: "2025-12-07T11:30:00Z", latency: 360 },
  //   { time: "2025-12-07T11:31:00Z", latency: 310 },
  //   { time: "2025-12-07T11:32:00Z", latency: 250 },
  //   { time: "2025-12-07T11:33:00Z", latency: 195 },
  //   { time: "2025-12-07T11:34:00Z", latency: 170 },
  //   { time: "2025-12-07T11:35:00Z", latency: 205 },
  //   { time: "2025-12-07T11:36:00Z", latency: 295 },
  //   { time: "2025-12-07T11:37:00Z", latency: 345 },
  //   { time: "2025-12-07T11:38:00Z", latency: 410 },
  //   { time: "2025-12-07T11:39:00Z", latency: 320 },
  //   { time: "2025-12-07T11:40:00Z", latency: 260 }
  // ];

  return (
    <Card sx={{width:'100%'}}>
      <CardHeader
        title="LATENCY DISTRIBUTION"
        subheader="Latency per successful API request"
        sx={{pb:0.5}}
      />
      <CardContent>
        <LineChart
          width={900}
          height={300}
          xAxis={[
            {
              scaleType: "time",
              data: latencies.map(item => new Date(item.time)),
              label: "Time",
            },
          ]}
          yAxis={[{label: "Latency (ms)"}]}
          series={[
            {
              data: latencies.map(item => item.latency),
              label: "Latency (ms)",
              curve: "monotoneX",
              showMark: false,
              color: '#1e9275ff',
              area: true
            },
          ]}
          hideLegend={true}
          // grid={{ horizontal: true }}
        />
      </CardContent>
    </Card>
  );
}

export default LatencyChart;
