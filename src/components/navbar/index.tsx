"use client";

import { Input } from "antd";
import React, { useState, useEffect } from "react";
import {
  SearchOutlined,
  WalletOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { dataStore } from "@/store/dataStore";

export default function Navbar() {
  const [searchValue, setSearchValue] = useState<string | undefined>(undefined);
  const { searchProduct } = dataStore();

  useEffect(() => {
    //Kullanıcı typinge devam ederken search function tetiklenmesini önlüyorum.
    if (searchValue !== undefined) {
      const delayDebounceFn = setTimeout(() => {
        searchProduct(searchValue);
      }, 500);

      return () => clearTimeout(delayDebounceFn);
    }
  }, [searchValue]);

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchValue(value);
  };
  return (
    <nav className="navbar">
      <div className="navbar-wrapper">
        <span className="navbar-wrapper-logo">Eteration</span>
        <div className="navbar-wrapper-search">
          <Input
            addonBefore={<SearchOutlined />}
            placeholder="Search"
            onChange={onSearch}
            allowClear
          />
        </div>
        <div className="navbar-wrapper-userInfo">
          <div className="navbar-wrapper-userInfo-wallet">
            <WalletOutlined />
            <span>117.000₺</span>
          </div>
          <div className="navbar-wrapper-userInfo-profile">
            <UserOutlined />
            <span>Kerem</span>
          </div>
        </div>
      </div>
    </nav>
  );
}
