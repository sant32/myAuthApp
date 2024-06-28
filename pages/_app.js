import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import store from '../store';
import '../style/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
      <ToastContainer />
    </Provider>
  );
}

export default MyApp;
