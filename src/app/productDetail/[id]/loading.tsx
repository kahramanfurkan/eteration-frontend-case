import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

export default function ProductLoading() {
  return (
    <div className="productDetail-loading">
      <Spin indicator={<LoadingOutlined spin />} />
    </div>
  );
}
