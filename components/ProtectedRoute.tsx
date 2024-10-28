import { ReactElement, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ComponentType } from "react";
import { getAccessToken } from "@/app/store";
// import { userDataStore } from "../store/userdatastore";
// const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
// import Loader from "../components/Loader.json";
// import dynamic from "next/dynamic";

const WithAuth = <P extends object>(WrappedComponent: ComponentType<P>) => {
  const ComponentWithAuth = (props: P) => {
    const accessToken = getAccessToken();
    const router = useRouter();

    useEffect(() => {
      if (!accessToken) {
        router.push("/login");
      }
    }, [accessToken, router]);

    if (!accessToken) {
      return <p>Loading</p>;
    }

    return <WrappedComponent {...props} />;
  };

  return ComponentWithAuth;
};

export default WithAuth;
