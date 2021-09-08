import fs from "fs";
import path from "path";
import Link from "next/link";

const HomePage = (props) => {
  const { products } = props;

  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>
          <Link href={`/${product.id}`}>{product.title}</Link>
        </li>
      ))}
    </ul>
  );
};

export async function getStaticProps() {
  console.log("re- generating");
  const filePath = path.join(process.cwd(), "data", "data.json");
  const jsonDta = fs.readFileSync(filePath);
  const data = JSON.parse(jsonDta);
  if (!data) {
    return {
      redirect: {
        destination: "/no-data",
      },
    };
  }
  if (data.products.length === 0) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      products: data.products,
    },
    revalidate: 10,
  };
}

export default HomePage;
