import "@/styles/globals.css";
import { Provider } from "react-redux";
import store from "../store/index";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BasicLayout from "@/layout/basic.layout";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Provider store={store}>
        <BasicLayout>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme={"light"}
          />
          <Component {...pageProps} />
        </BasicLayout>
      </Provider>
    </>
  );
}
