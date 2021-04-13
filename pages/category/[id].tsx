import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import React from "react";
import Loader from "../../components/common/Loader";
import CategoryAPI from "../../lib/api/category";
import ProductAPI from "../../lib/api/product";
import { ProductType } from "../../lib/types/product";
import { getGlobalData, withGlobalData } from "../../lib/utils/globalData";
import ProductCard from "../../components/product/ProductCard";
import FullWidthContainer from "../../components/containers/FullWidthContainer";
import Head from "next/head";

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
    <>
      <Head>
        <title>QC | Category {router.query?.id}</title>
        <meta
          name="description"
          content={`Category page of ${router.query?.id}`}
        />
      </Head>

      <FullWidthContainer>
        <h1>Category {query.id}</h1>
        {products.map((product) => (
          <ProductCard key={product.ID_Product} item={product} />
        ))}
      </FullWidthContainer>
    </>
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
