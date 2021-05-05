import React from 'react';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import SubscriptionsSharpIcon from '@material-ui/icons/SubscriptionsSharp';
import "./style.css";

const Welcome = () => {
  return (
  <div className = "mmodal-body">
    <h2>THANK YOU</h2>
    <CheckBoxIcon className="check"/>
    <h5>WE HAVE RECEIVED<br />YOUR VIDEO/AUDIO <br />&<br /> WE WILL GET BACK SOON</h5>
    <p>CHECK OUR EXPERT VIDEOS</p>
    <SubscriptionsSharpIcon />
    <SubscriptionsSharpIcon />
    <SubscriptionsSharpIcon />
  </div>
  )
}

export default Welcome;