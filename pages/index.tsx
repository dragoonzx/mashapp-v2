import dynamic from "next/dynamic";

const DynamicComponentWithNoSSR = dynamic(() => import("../components/Index"), {
  ssr: false,
});

const Index = () => <DynamicComponentWithNoSSR />;

export default Index;
