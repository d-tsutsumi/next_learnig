import fs from "fs";
import path from "path";

const ProductDetailPage = (props) => {
  const { loadProducts } = props;

  if(!loadProducts) {
    return <p>Loading....</p>
  }
  return (
    <>
      <h1>{loadProducts.title}</h1>
      <p>{loadProducts.dest}</p>
    </>
  );
};

export async function getStaticProps(context) {
  const { params } = context;

  const productid = params.pid;
  const filePath = path.join(process.cwd(), "data", "data.json");
  const jsonDta = fs.readFileSync(filePath);
  const data = JSON.parse(jsonDta);

  const product = data.products.find((product) => (product.id = productid));

  return {
    props: {
      loadProducts: product,
    },
  };
}

export async function getStaticPaths () {
  return {
    paths: [
      { params: { pid: "p1" } },
      { params: { pid: "p2" } },
      { params: { pid: "p3" } },
    ],
    fallback: true
    // fallback: "blocking"
  };
}
export default ProductDetailPage;
