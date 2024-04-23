import { Input } from "antd";
import {
  SearchOutlined,
  WalletOutlined,
  UserOutlined,
} from "@ant-design/icons";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-wrapper">
        <span className="navbar-wrapper-logo">Eteration</span>
        <div className="navbar-wrapper-search">
          <Input addonBefore={<SearchOutlined />} placeholder="Search" />
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
