"use client";

import { dataStore } from "@/store/dataStore";
import { useEffect, useState } from "react";
import Filters from "@/components/filters";
import Cart from "@/components/cart";
import ProductCard from "@/components/productCard";
import { Pagination, Spin, Drawer, Button } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

export default function Home() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
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
        <div className="showFilters mobile-view">
          <Button type="link" onClick={() => setMobileFiltersOpen(true)}>
            Filters
          </Button>
        </div>

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

      {/*Mobile filters*/}
      <Drawer
        placement="left"
        title="Filters"
        open={mobileFiltersOpen}
        onClose={() => setMobileFiltersOpen(false)}
      >
        <Filters />
      </Drawer>
    </main>
  );
}
