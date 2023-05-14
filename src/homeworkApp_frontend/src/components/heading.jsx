import React from "react";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import {
  LaptopMacRounded,
  SearchRounded,
} from "../../../../node_modules/@material-ui/icons/index";

function Heading() {
  return (
    <header>
      <h1>TaskDapp -- Simple -- Safe -- On-Chain {<LockOpenIcon />}</h1>
      <div>
        <button title="Search Task">
          <span>
            <SearchRounded />
          </span>
        </button>

        <button title="Log in">
          <span>
            <LaptopMacRounded />
          </span>
        </button>
      </div>
    </header>
  );
}

export default Heading;
