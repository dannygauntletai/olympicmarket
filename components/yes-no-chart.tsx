"use client"

import { useEffect, useRef } from "react"
import * as d3 from "d3"

type YesNoChartProps = {
  yesPercentage: number
}

export function YesNoChart({ yesPercentage }: YesNoChartProps) {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!svgRef.current) return

    // Clear previous chart
    d3.select(svgRef.current).selectAll("*").remove()

    // Chart dimensions
    const margin = { top: 30, right: 30, bottom: 40, left: 50 }
    const width = svgRef.current.clientWidth - margin.left - margin.right
    const height = 300 - margin.top - margin.bottom

    // Create SVG
    const svg = d3
      .select(svgRef.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`)

    // Data
    const data = [
      { option: "Yes", value: yesPercentage },
      { option: "No", value: 100 - yesPercentage },
    ]

    // X scale
    const x = d3
      .scaleBand()
      .domain(data.map((d) => d.option))
      .range([0, width])
      .padding(0.3)

    // Y scale
    const y = d3.scaleLinear().domain([0, 100]).range([height, 0])

    // Add X axis
    svg
      .append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("font-size", "14px")
      .attr("font-weight", "bold")

    // Add Y axis
    svg
      .append("g")
      .call(
        d3
          .axisLeft(y)
          .tickFormat((d) => `${d}%`)
          .ticks(5),
      )
      .selectAll("text")
      .attr("font-size", "12px")

    // Add horizontal grid lines
    svg
      .append("g")
      .attr("class", "grid")
      .call(
        d3
          .axisLeft(y)
          .tickSize(-width)
          .tickFormat(() => "")
          .ticks(5),
      )
      .selectAll("line")
      .attr("stroke", "#e5e7eb")
      .attr("stroke-dasharray", "5,5")

    // Add bars
    svg
      .selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", (d) => x(d.option) || 0)
      .attr("y", (d) => y(d.value))
      .attr("width", x.bandwidth())
      .attr("height", (d) => height - y(d.value))
      .attr("fill", (d) => (d.option === "Yes" ? "#3b82f6" : "#ef4444"))

    // Add value labels on top of bars
    svg
      .selectAll(".label")
      .data(data)
      .enter()
      .append("text")
      .attr("class", "label")
      .attr("text-anchor", "middle")
      .attr("x", (d) => (x(d.option) || 0) + x.bandwidth() / 2)
      .attr("y", (d) => y(d.value) - 5)
      .text((d) => `${d.value}%`)
      .attr("font-size", "14px")
      .attr("font-weight", "bold")
      .attr("fill", "#333")

    // Add title
    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", -10)
      .attr("text-anchor", "middle")
      .attr("font-size", "16px")
      .attr("font-weight", "bold")
      .text("Market Prediction")
  }, [yesPercentage])

  return (
    <div className="w-full h-[300px] flex justify-center items-center">
      <svg ref={svgRef} className="w-full h-full"></svg>
    </div>
  )
}
