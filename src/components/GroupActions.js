import { IconButton, Menu, MenuItem } from "@material-ui/core";
import { MoreVert } from "@material-ui/icons";
import React, { useState } from "react";
import { useAlert } from "react-alert";
import { connect } from "react-redux";
import Api from "../utils/api";
import EditGroupModal from "./EditGroupModal";
import SendGroupMessage from "./SendGroupMessage";

const GroupActions = ({ params, reloadData, triggerLoading, token }) => {
  const alert = useAlert();
  //   console.log(params);
  const anchorRef = React.useRef(null);
  const [visible, setVisible] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [sendmessage, setSendMessage] = useState(false);

  const toggleMenu = () => {
    setVisible(!visible);
  };

  const toggleUpdateModal = () => {
    setUpdateModal(!updateModal);
  };

  const toggleSendMessage = () => {
    setSendMessage(!sendmessage);
  };

  const suspendGroup = async () => {
    triggerLoading();
    await Api(token)
      .suspendGroup(params.data.id)
      .then((res) => {
        if (res.data.status === "success") {
          alert.success(res.data.message);
          reloadData();
        } else {
          alert.error(res.data.message);
          triggerLoading();
        }
      })
      .catch((err) => {
        console.log(err);
        triggerLoading();
      });
  };
  const unSuspendGroup = async () => {
    triggerLoading();
    await Api(token)
      .unSuspendGroup(params.data.id)
      .then((res) => {
        if (res.data.status === "success") {
          alert.success(res.data.message);
          reloadData();
        } else {
          alert.error(res.data.message);
          triggerLoading();
        }
      })
      .catch((err) => {
        console.log(err);
        triggerLoading();
      });
  };

  return (
    <>
      <IconButton onClick={toggleMenu} ref={anchorRef}>
        <MoreVert />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorRef.current}
        keepMounted
        open={visible}
        onClose={toggleMenu}
      >
        {params.value === false ? (
          <MenuItem onClick={suspendGroup}>Suspend</MenuItem>
        ) : (
          <MenuItem onClick={unSuspendGroup}>Activate</MenuItem>
        )}
        <MenuItem onClick={toggleUpdateModal}>Edit Group</MenuItem>
        <MenuItem onClick={toggleSendMessage}>Send Message</MenuItem>
      </Menu>
      <EditGroupModal
        params={params.data}
        open={updateModal}
        handleClose={toggleUpdateModal}
        reloadData={reloadData}
      />
      <SendGroupMessage
        params={params.data}
        open={sendmessage}
        handleClose={toggleSendMessage}
        reloadData={reloadData}
      />
    </>
  );
};

const mapStateToProps = (state) => ({
  token: state.currentUser.token
});

export default connect(mapStateToProps)(GroupActions);
