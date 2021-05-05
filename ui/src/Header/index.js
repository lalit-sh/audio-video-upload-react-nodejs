import React from "react";
import SportsHockeyIcon from "@material-ui/icons/SportsHockey";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import SettingsPowerIcon from "@material-ui/icons/SettingsPower";

const HeaderIcons = () => {
  return (
    <header className="container-fluid">
      <div className="row">
        <div className="col-sm-12 text-center">
            <div className="brand-logo">
              <SportsHockeyIcon  />
              <h4>Demo - 4</h4>        
            </div>
            <div className="user-menu pull-right">
              <AccountBoxIcon  />
              <SettingsPowerIcon  />
            </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderIcons;
