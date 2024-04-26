"use client";

import { Radio, Select, Space } from "antd";
import type { RadioChangeEvent } from "antd";
import { dataStore } from "@/store/dataStore";

export default function Filters() {
  const {
    selectedSort,
    getSortedData,
    brands,
    selectedBrands,
    getDataByBrands,
    models,
    selectedModels,
    getDataByModels,
  } = dataStore();

  const brandOptions: { value: string; label: string }[] = brands?.map(
    (brand) => ({ value: brand, label: brand })
  );

  const modelOptions: { value: string; label: string }[] = models?.map(
    (model) => ({ value: model, label: model })
  );

  const radioData: { label: string; sortOrder: string }[] = [
    {
      label: "Old to new",
      sortOrder: "createdAt&asc",
    },
    {
      label: "New to old",
      sortOrder: "createdAt&desc",
    },
    {
      label: "Price high to low",
      sortOrder: "price&desc",
    },
    {
      label: "Price low to high",
      sortOrder: "price&asc",
    },
  ];

  const onSortChange = (e: RadioChangeEvent) => {
    getSortedData(e.target.value);
  };

  const onBrandChange = (selectedBrands: string[]) => {
    getDataByBrands(selectedBrands);
  };

  const onModelChange = (selectedModels: string[]) => {
    getDataByModels(selectedModels);
  };

  return (
    <div className="filters">
      <section className="filters-sortOrder">
        <span className="filter-title">Sort By</span>
        <div className="filter-box">
          <Radio.Group value={selectedSort} onChange={onSortChange}>
            <Space direction="vertical">
              {radioData.map((data, i) => (
                <Radio key={i} value={data.sortOrder}>
                  {data.label}
                </Radio>
              ))}
            </Space>
          </Radio.Group>
        </div>
      </section>
      <section className="filters-brand">
        <span className="filter-title">Brands</span>
        <div className="filter-box">
          <Select
            options={brandOptions}
            allowClear
            showSearch
            placeholder="Search"
            open
            mode="multiple"
            maxTagCount="responsive"
            listHeight={95}
            onChange={onBrandChange}
            value={selectedBrands}
          />
        </div>
      </section>
      <section className="filters-model">
        <span className="filter-title">Model</span>
        <div className="filter-box">
          <Select
            options={modelOptions}
            allowClear
            showSearch
            placeholder="Search"
            open
            mode="multiple"
            maxTagCount="responsive"
            listHeight={95}
            onChange={onModelChange}
            value={selectedModels}
          />
        </div>
      </section>
    </div>
  );
}
