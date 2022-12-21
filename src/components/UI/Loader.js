import { Spinner } from "@chakra-ui/react";

import React from "react";
import classes from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={classes.loader}>
      <Spinner
        position="absolute"
        top="50%"
        left="50%"
        size="xl"
        color="pink.400"
        thickness="4px"
        speed="0.55s"
      />
    </div>
  );
};

export default Loader;
