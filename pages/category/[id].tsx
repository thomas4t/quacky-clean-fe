import axios from "axios";
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import styled from "styled-components";
import { CategoryType } from "../../lib/types/category";
import { ProductType } from "../../lib/types/product";
import { SERVER_BACKEND_URL } from "../../lib/utils/constants";

type Props = { products: ProductType[] };

const ProductsContainer = styled.div`
  max-width: 80vw;
  margin: 15px auto;
`;

function CategoryPage(props: Props) {
  const { products } = props;
  const router = useRouter();
  const { id } = router.query;

  return (
    <ProductsContainer>
      <p>Category page: {id}</p>
      {products.map((product) => {
        return (
          <div key={product.ID_Product}>
            <h2>{product.name_p}</h2>
            <span>{product.description_p}</span>
            <span>{product.color}</span>
            <hr />
          </div>
        );
      })}
    </ProductsContainer>
  );
}

// New version of getInitialdata
export const getStaticProps: GetStaticProps = async (context) => {
  // TODO
  // Update product categories
  // maybe have it in utils/loadCategories
  // make sure it uses context API
  // since it should be called on server, we will have access to our constants
  //const url = BACKEND_URL + "/categories";

  //TODO wrap this in state management
  const categoryId = context.params?.id || "";
  const url = SERVER_BACKEND_URL + `/products/category/${categoryId}`;
  const products: ProductType[] = await (await axios.get(url)).data;

  return {
    props: {
      products,
    },
  };
};

//called at build time
export const getStaticPaths: GetStaticPaths = async () => {
  //TODO wrap this in state management
  const url = SERVER_BACKEND_URL + "/categories";
  const categories: CategoryType[] = await (await axios.get(url)).data;

  const paths = categories.map((ctg) => ({
    params: { id: String(ctg.ID_Category) },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
};

export default CategoryPage;
