import Layout from "antd/es/layout/layout";
import { useState } from "react";
import Compose from "../mail/Compose/Compose";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";

const Structure = (props) => {
  const [title, setTitle] = useState("");

  const titleHandler = (title) => {
    setTitle(title);
  };

  return (
    <Layout>
      <Sidebar onTitleChange={titleHandler} />
      <Layout>
        <TopBar title={title} />

        <Compose />

        {props.children}
      </Layout>
    </Layout>
  );
};

export default Structure;
