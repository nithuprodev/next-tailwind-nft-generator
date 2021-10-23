import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html>
        <Head>
        <meta charset="utf-8" />
          <link rel="icon" href="/favicon.ico" />
          <meta name="viewport" content="width=device-width,initial-scale=1" />
          <meta name="description" content="COLLECTION OF 3,333 GUCCiTROLL NFTS" />
          <link rel="apple-touch-icon" href="/logo192.png" />
          {/* <link rel="manifest" href="/manifest.json" /> */}
          <link rel="stylesheet" href="assets/css/style.css"/>
        </Head>
        <body style={{overflow:"hidden"}}>
          <Main />
          <NextScript />
              <script src="/assets/js/vendor/core.min.js"></script>
        
          <script src="/assets/js/vendor/popper.min.js"></script>
          <script src="/assets/js/vendor/bootstrap.min.js"></script>

          <script src="/assets/js/vendor/all.min.js"></script>
          <script src="/assets/js/vendor/slider.min.js"></script>
          <script src="/assets/js/vendor/countdown.min.js"></script>
          <script src="/assets/js/vendor/shuffle.min.js"></script>

          <script src="/assets/js/main.js"></script>    
        </body>
      </Html>
    )
  }
}

export default MyDocument