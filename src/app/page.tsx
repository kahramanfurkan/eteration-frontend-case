"use client";

import { dataStore } from "@/store/dataStore";
import { useEffect } from "react";
import Filters from "@/components/filters";
import Cart from "@/components/cart";

export default function Home() {
  const { getData } = dataStore();

  useEffect(() => {
    getData();
  }, []);

  return (
    <main className="home">
      <section className="home-filterSection">
        <Filters />
      </section>
      <section className="home-productsSection">products</section>
      <section className="home-cartSection">
        <Cart />
      </section>
    </main>
  );
}
