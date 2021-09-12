import fs from "fs";
import path from "path";

const ProductDetailPage = (props) => {
  const { loadProducts } = props;
  
  return (
    <>
      <h1>{loadProducts.title}</h1>
      <p>{loadProducts.dest}</p>
    </>
  );
};

const getDeta = async () => {
  const filePath = path.join(process.cwd(), "data", "data.json");
  const jsonDta = fs.readFileSync(filePath);
  const data = JSON.parse(jsonDta);

  return data;
};

export async function getStaticProps(context) {
  const { params } = context;

  const productid = params.pid;

  const data = await getDeta();

  const product = data.products.find((product) => (product.id = productid));

  if (!product) {
    return { notFound: true };
  }

  return {
    props: {
      loadProducts: product,
    },
  };
}

export async function getStaticPaths() {
  const data = await getDeta();
  const ids = data.products.map((product) => product.id);

  const pathWithParams = ids.map((id) => ({ params: { pid: id } }));

  return {
    paths: pathWithParams,
    fallback: true,
  };
}
export default ProductDetailPage;
