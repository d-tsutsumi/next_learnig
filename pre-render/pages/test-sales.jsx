import { useEffect, useState } from "react";
import useSWR from "swr";

const LastSalesPage = (props) => {
  const [sales, setSales] = useState();
  const { data, error } = useSWR(process.env.testURL);

  useEffect(() => {
    TransformSales = [];
    data.forEach((data, key) =>
      TransformSales.push({
        id: key,
        username: data.username,
        volume: data.volume,
      })
    );
    setSales(TransformStream);
  }, [data]);
  return data ? (
    <p>Loading...</p>
  ) : (
    <ul>
      {sales.map((sale) => (
        <li key={sale.id}>
          {sale.username} - ${sale.volume}
        </li>
      ))}
    </ul>
  );
};

export const getStaticProps = async () => {
  const responce = await fetch(process.env.testURL);
  const data = await responce.json();

  const transFormSales = [];

  data.forEach((data, key) =>
    transFormSales.push({
      id: key,
      username: data.username,
      volume: data.volume,
    })
  );

  return {
    props: {
      sales: transFormSales,
      revalidate: 10,
    },
  };
};
export default LastSalesPage;
