import axios from "axios";
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";
import Loader from "../../components/common/Loader";
import CategoryAPI from "../../lib/api/category";
import ProductAPI from "../../lib/api/product";
import { ProductType } from "../../lib/types/product";
import { getGlobalData, withGlobalData } from "../../lib/utils/globalData";

const ProductsContainer = styled.div`
  max-width: 80vw;
  margin: 15px auto;
`;

function CategoryPage(props: { products: ProductType[] }) {
  const router = useRouter();
  const { products } = props;
  const { query, isFallback } = router;

  // If the page is not yet generated, this will be displayed
  // initially until getStaticProps() finishes running
  if (isFallback) {
    return <Loader />;
  }

  if (products.length === 0) {
    return <h2>Category not found - 404</h2>;
  }

  return (
    <ProductsContainer>
      <p>Category page: {query.id}</p>
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

//called at build time
export const getStaticPaths: GetStaticPaths = async () => {
  const categories = await CategoryAPI.getAll();
  const paths = categories.map((ctg) => ({
    params: { id: String(ctg.ID_Category) },
  }));
  // Enable statically generating additional pages
  // Fallback ensures we have up to date paths
  return { paths, fallback: true };
};

// New version of getInitialdata
export const getStaticProps: GetStaticProps = async (ctx) => {
  const data = await getGlobalData();
  const categoryId = ctx.params?.id || "";
  const products = await ProductAPI.get(Number(categoryId));
  return {
    props: {
      ...data,
      products,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every second
    revalidate: 1,
  };
};

export default withGlobalData(CategoryPage);
