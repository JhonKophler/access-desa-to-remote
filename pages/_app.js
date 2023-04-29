import MyApp from './MyApp';
import '../styles/globals.css';

function MyAppWrapper({ Component, pageProps }) {
  return <MyApp Component={Component} pageProps={pageProps} />
}

export default MyAppWrapper;