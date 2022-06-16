import React, { useEffect, useState } from "react";
import "./featuredInfo.css";
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";
import axios from "axios";
export default function FeaturedInfo() {
  const [yearData, setYearData] = useState({});
  const [monthData, setMonthData] = useState({});
  const [dayData, setDayData] = useState({});
  useEffect(() => {
    const fetchYearData = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:5000/api/revenue/profit/year"
        );
        setYearData(data);
      } catch (error) {}
    };
    const fetchMonthData = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:5000/api/revenue/profit/month"
        );
        setMonthData(data);
      } catch (error) {}
    };
    const fetchDayData = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:5000/api/revenue/profit/day"
        );
        setDayData(data);
      } catch (error) {}
    };
    fetchYearData();
    fetchMonthData();
    fetchDayData();
  }, []);

  const calcPercent = (past, present) => {
    if (past === 0) return "INF";
    let a = 100 * ((present - past) / past);
    if (present === 0) console.log(present, past, a);
    return Math.round(a * 10) / 10;
  };
  const func = (a) => {
    if (a === "INF") return "";
    if (a < 0) return <ArrowDownward className="featuredIcon-n" />;
    else if (a > 0) return <ArrowUpward className="featuredIcon-p" />;
    return " ";
  };
  console.log(dayData);
  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">
          <b>Revenue</b>
        </span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">
            ₹{" "}
            {dayData &&
              dayData.revenue &&
              dayData.revenue.length &&
              dayData.revenue[0].totalSaleAmount}
          </span>

          {dayData && dayData.revenue && dayData.revenue.length && (
            <span className="featuredMoneyRate">
              {calcPercent(
                dayData.lastRevenue[0].totalSaleAmount,
                dayData.revenue[0].totalSaleAmount
              )}{" "}
              %
              {func(
                calcPercent(
                  dayData.lastRevenue[0].totalSaleAmount,
                  dayData.revenue[0].totalSaleAmount
                )
              )}
            </span>
          )}
        </div>
        <span className="featuredSub">Compared to Last Day</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">
          <b>Revenue</b>
        </span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">
            ₹{" "}
            {monthData &&
              monthData.revenue &&
              monthData.revenue.length &&
              monthData.revenue[0].totalSaleAmount}
          </span>
          {monthData && monthData.revenue && monthData.revenue.length && (
            <span className="featuredMoneyRate">
              {calcPercent(
                monthData.lastRevenue[0].totalSaleAmount,
                monthData.revenue[0].totalSaleAmount
              )}{" "}
              %
              {func(
                calcPercent(
                  monthData.lastRevenue[0].totalSaleAmount,
                  monthData.revenue[0].totalSaleAmount
                )
              )}
            </span>
          )}
        </div>
        <span className="featuredSub">Compared to Last Month</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">
          <b>Revenue</b>
        </span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">
            ₹{" "}
            {yearData &&
              yearData.revenue &&
              yearData.revenue.length &&
              yearData.revenue[0].totalSaleAmount}
          </span>
          {yearData && yearData.revenue && yearData.revenue.length && (
            <span className="featuredMoneyRate">
              {calcPercent(
                yearData.lastRevenue[0].totalSaleAmount,
                yearData.revenue[0].totalSaleAmount
              )}{" "}
              %
              {func(
                calcPercent(
                  yearData.lastRevenue[0].totalSaleAmount,
                  yearData.revenue[0].totalSaleAmount
                )
              )}
            </span>
          )}
        </div>
        <span className="featuredSub">Compared to Last Year</span>
      </div>
    </div>
  );
}
