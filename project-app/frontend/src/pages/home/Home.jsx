import FeaturedInfo from "../../component/featuredInfo/FeaturedInfo";
import Charts from "../../component/charts/Charts";
import "./home.css";

import WidgetSm from "../../component/widgetSm/WidgetSm";
import WidgetLg from "../../component/widgetLg/WidgetLg";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [chartData, setChartData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:5000/api/user/perMonth"
        );
        setChartData([...data]);
      } catch (error) {}
    };
    fetchData();
  }, []);
  return (
    <div className="home">
      <FeaturedInfo />
      <Charts
        data={chartData}
        title="User Analytics"
        grid
        dataKey="Active User"
      />
      <div className="homeWidgets">
        <WidgetSm />
        <WidgetLg />
      </div>
    </div>
  );
}
