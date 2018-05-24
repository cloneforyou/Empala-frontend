import Document, { Head, Main, NextScript } from 'next/document';
import stylesheet from '../assets/styles/main.scss';

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <html>
        <Head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <body>
          <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
          <div className="root">
            <Main />
          </div>
          <NextScript />
        </body>
      </html>
    );
  }
}
