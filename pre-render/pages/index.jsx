import fs from "fs";
import path from "path"

const HomePage = (props) => {
  const { products } = props;

  return (
    <ul>
      {products.map(product => <li key={product.id}>{product.title}</li>)}
    </ul>
  );
};

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'data', 'data.json')
  const jsonDta = fs.readFileSync(filePath);
  const data = JSON.parse(jsonDta);

  return {
    props: {
      products: data.products,
    },
  };
}

export default HomePage;
