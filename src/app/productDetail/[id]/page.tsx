import AddCartButton from "@/components/addCartButton";
import axios from "axios";
import Image from "next/image";

export default async function ProductDetail({
  params,
}: {
  params: { id: string };
}) {
  const { data } = await axios.get(
    `https://5fc9346b2af77700165ae514.mockapi.io/products/${params.id}`
  );
  return (
    <div className="productDetail-page">
      <section className="productDetail-page-image">
        <Image
          width={549}
          height={422}
          src={data.image}
          alt={data.name}
          priority
        />
      </section>
      <section className="productDetail-page-detail">
        <div className="productDetail-page-detail-name">{data.name}</div>
        <div className="productDetail-page-detail-price">{data.price} ₺</div>
        <div className="productDetail-page-detail-button">
          {<AddCartButton {...data} />}
        </div>
        <div className="productDetail-page-detail-description">
          {data.description}
        </div>
      </section>
    </div>
  );
}
