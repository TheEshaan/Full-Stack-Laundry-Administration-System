import React, { useEffect, useState } from "react";
import Category from "../../component/category/Category";
import "./laundryCategory.css";
import axios from "axios";

export default function LaundryCategory() {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/category");
        setCategories(data);
      } catch (err) {
        window.alert(err);
      }
    };
    fetchData();
  }, []);
  const func = async (arg1, arg2) => {
    try {
      const { data } = await axios.put("http://localhost:5000/api/category", {
        _id: arg1,
        cost: arg2,
      });

      setCategories((prev) => {
        let newArr = [...prev];
        for (let i = 0; i < newArr.length; i++) {
          if (newArr[i]._id === arg1) {
            newArr[i].cost = arg2;
            break;
          }
        }
        return newArr;
      });
      window.alert("Category cost updated successfully");
    } catch (err) {}
  };
  return (
    <div className="cardContainer">
      {categories.map((category) => (
        <Category
          key={category._id}
          _id={category._id}
          category={category.category}
          cost={category.cost}
          img={category.img}
          func={func}
        />
      ))}
    </div>
  );
}
