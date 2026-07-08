import React, { useEffect, useRef, useState } from "react";
import Card from "./components/Card";
import { cardsData } from "./data";

const App = () => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState(cardsData);
  const timer = useRef(null);

  const params = new URLSearchParams(window.location.search);

  const handleSearch = (e) => {
    let val = e.target.value.trim();
    setSearch(val);
    if (val !== "") params.set("search", val);
    else params.delete("search");
    window.history.replaceState(
      {},
      "",
      `${window.location.pathname}?${params.toString()}`,
    );

    clearTimeout(timer.current);
    timer.current = setTimeout(() => filterCard(val), 300);
  };

  const filterCard = (val) => {
    val = val.toLowerCase();
    const filteredData = cardsData.filter(
      (card) =>
        card.title.toLowerCase().includes(val) ||
        card.desc.toLowerCase().includes(val) ||
        card.tags.some((tag) => tag.toLowerCase().includes(val)),
    );
    setData(filteredData);
  };

  useEffect(() => {
    const value = params.get("search");
    if (value) {
      filterCard(value);
      setSearch(value);
    }
  }, []);
  return (
    <div className="app-wrapper roboto">
      <h1>Product Card Filter</h1>
      <input type="text" value={search} onChange={handleSearch} />

      <div className="card-container">
        {data.map((dt, ind) => (
          <Card key={ind} {...dt} />
        ))}
      </div>
    </div>
  );
};

export default App;
