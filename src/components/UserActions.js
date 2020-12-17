import { IconButton, Menu, MenuItem } from "@material-ui/core";
import { MoreVert } from "@material-ui/icons";
import React, { useState } from "react";
import { useAlert } from "react-alert";
import { connect } from "react-redux";
import Api from "../utils/api";
import UpdateUserModal from "./UpdateUserModal";

const GroupActions = ({ params, reloadData, triggerLoading, token }) => {
  // console.log(params);
  const alert = useAlert();
  const anchorRef = React.useRef(null);
  const [visible, setVisible] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);

  const toggleMenu = () => {
    setVisible(!visible);
  };

  const toggleUpdateModal = () => {
    setUpdateModal(!updateModal);
  };

  const enableUser = async () => {
    triggerLoading();
    await Api(token)
      .enableUser(params.data.id)
      .then((res) => {
        if (res.data.status === "success") {
          reloadData();
          alert.success(res.data.message);
        } else {
          triggerLoading();
          alert.error(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
        triggerLoading();
      });
  };
  const disableUser = async () => {
    triggerLoading();
    await Api(token)
      .disableUser(params.data.id)
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
          <MenuItem onClick={enableUser}>Activate</MenuItem>
        ) : (
          <MenuItem onClick={disableUser}>Deactivate</MenuItem>
        )}
        <MenuItem onClick={toggleUpdateModal}>Edit User</MenuItem>
      </Menu>
      <UpdateUserModal
        params={params.data}
        open={updateModal}
        handleClose={toggleUpdateModal}
        reloadData={reloadData}
      />
    </>
  );
};

const mapStateToProps = (state) => ({
  token: state.currentUser.token
});

export default connect(mapStateToProps)(GroupActions);
