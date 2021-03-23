import Document, { DocumentContext, DocumentInitialProps } from "next/document";
import { ReactElement } from "react";
import { ServerStyleSheet } from "styled-components";

interface InitialProps extends DocumentInitialProps {
  styles: ReactElement;
}

/**
 * This is here to allow for CSS in JS solutions - in this case - styled components
 * https://gist.github.com/ludder/c29efcbd0aee813a914ddaf8a3d16496
 */
export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext): Promise<InitialProps> {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }
}
