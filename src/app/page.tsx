"use client";

import { dataStore } from "@/store/dataStore";
import { useEffect } from "react";
import Filters from "@/components/filters";
import Cart from "@/components/cart";
import ProductCard from "@/components/productCard";
import { Pagination, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

export default function Home() {
  const { getInitialData, getPage, loading, products, total, currentPage } =
    dataStore();

  useEffect(() => {
    getInitialData();
  }, []);

  const onPaginationChange = (page: number) => {
    getPage(page);
  };

  return (
    <main className="home">
      <section className="home-filterSection">
        <Filters />
      </section>

      <section className="home-productsSection">
        {loading && (
          <div className="home-productsSection-loading">
            <Spin indicator={<LoadingOutlined spin />} />
          </div>
        )}

        {!loading && products?.length > 0 && (
          <div>
            <div className="products-wrapper">
              {products?.map((product, i) => (
                <ProductCard key={i} {...product} />
              ))}
            </div>

            <div className="products-pagination">
              <Pagination
                current={currentPage}
                defaultCurrent={1}
                defaultPageSize={12}
                total={total}
                showSizeChanger={false}
                onChange={onPaginationChange}
              />
            </div>
          </div>
        )}

        {!loading && products?.length < 1 && (
          <p className="home-productsSection-notFound">
            Aradığınız kriterlere uygun ürün bulunamadı.
          </p>
        )}
      </section>
      <section className="home-cartSection">
        <Cart />
      </section>
    </main>
  );
}
