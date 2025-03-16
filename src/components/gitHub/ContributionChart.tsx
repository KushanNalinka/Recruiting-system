import { parseISO } from "date-fns";
// import format from "date-fns/format";
import React from "react";
import {
  createContainer,
  VictoryAxis,
  VictoryBrushContainer,
  VictoryChart,
  VictoryGroup,
  VictoryLine,
  VictoryTheme,
  VictoryTooltip,
} from "victory";

import { useWindowSize } from "./useWindowResize.tsx";
import { useZoom } from "./useZoom.tsx";

const CONTRIBUTION_COUNT_LINE_COLOR = "#a7def3";

const VictoryZoomVoronoiContainer = createContainer("zoom", "voronoi");

const labelPresenter = ({ datum }: any) => `
Date: ${(new Date(datum.date), "dd/MM/yyyy")} 
Contributions: ${datum.contributionCount}
`;

function formatter(timeSeries: any) {
  return timeSeries.map((t: any) => ({
    ...t,
    date: parseISO(t.date),
  }));
}

const ContributionChart = ({ contributionDays }: any) => {
  const {
    zoomDomain,
    selectedZoomDomain,
    setSelectedZoomDomain,
    setZoomDomain,
  } = useZoom();

  const formattedTimeSeries = formatter(contributionDays);

  const { width, height } = useWindowSize();

  return (
    <div
      style={{
        maxWidth: "100%",
        margin: "20px auto",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        backgroundColor: "#ffffff",
        width: "100%",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          fontSize: "1.5rem",
          color: "#004080",
          marginBottom: "20px",
        }}
      >
        Contributions Over Time
      </h2>
      <VictoryChart
        width={width - 40} // Adjusting chart width based on window width
        height={height / 2} // Adjusting chart height based on window height
        theme={VictoryTheme.grayscale}
        scale={{ x: "time" }}
        containerComponent={
          <VictoryZoomVoronoiContainer
            responsive={false}
            zoomDimension="x"
            zoomDomain={zoomDomain}
            onZoomDomainChange={setSelectedZoomDomain}
          />
        }
      >
        <VictoryGroup>
          <VictoryLine
            style={{
              data: { stroke: CONTRIBUTION_COUNT_LINE_COLOR },
              parent: { border: "1px solid #ccc" },
            }}
            x="date"
            y="contributionCount"
            labels={labelPresenter}
            labelComponent={<VictoryTooltip />}
            data={formattedTimeSeries}
          />
        </VictoryGroup>
      </VictoryChart>
      <VictoryChart
        width={width - 40} // Adjusting chart width based on window width
        height={90}
        scale={{ x: "time" }}
        padding={{ top: 0, left: 50, right: 50, bottom: 30 }}
        containerComponent={
          <VictoryBrushContainer
            responsive={false}
            brushDimension="x"
            brushDomain={selectedZoomDomain}
            onBrushDomainChange={setZoomDomain}
          />
        }
      >
        {/* <VictoryAxis tickFormat={(x) => format(x, "yyyy-MM-dd")} /> */}
        <VictoryLine
          style={{
            data: { stroke: CONTRIBUTION_COUNT_LINE_COLOR },
          }}
          x="date"
          y="contributionCount"
          data={formattedTimeSeries}
        />
      </VictoryChart>
    </div>
  );
};

export default ContributionChart;
