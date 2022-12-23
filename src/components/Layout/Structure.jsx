import TopBar from "./TopBar";
import Layout from "antd/es/layout/layout";
import Sidebar from "./Sidebar";
import { useState } from "react";

const Structure = (props) => {
  const [title, setTitle] = useState("Inbox");

  const titleHandler = (title) => {
    setTitle(title);
  };

  return (
    <Layout>
      <Sidebar onTitleChange={titleHandler} />
      <Layout>
        <TopBar title={title} />
        {props.children}
      </Layout>
    </Layout>
  );
};

export default Structure;
