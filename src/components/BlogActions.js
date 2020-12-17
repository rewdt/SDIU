import { IconButton, Menu, MenuItem } from "@material-ui/core";
import { MoreVert } from "@material-ui/icons";
import React, { useState } from "react";
import { useAlert } from "react-alert";
import { connect } from "react-redux";
import Api from "../utils/api";
import EditGroupModal from "./EditGroupModal";

const BlogActions = ({ params, reloadData, triggerLoading, token }) => {
  // console.log(params.data);
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

  const publishBlog = async () => {
    triggerLoading();
    await Api(token)
      .publishBlog(params.data.id)
      .then((res) => {
        // console.log(res.data);
        if (res.data.status === "success") {
          reloadData();
          alert.success(res.data.message);
        } else {
          alert.error(res.data.message);
          // triggerLoading();
        }
      })
      .catch((err) => {
        console.log(err);
      });
    triggerLoading();
  };
  const unPublishBlog = async () => {
    triggerLoading();
    await Api(token)
      .unPublishBlog(params.data.id)
      .then((res) => {
        if (res.data.status === "success") {
          alert.success(res.data.message);
          reloadData();
        } else {
          alert.error(res.data.message);
          // triggerLoading();
        }
      })
      .catch((err) => {
        console.log(err);
      });
    triggerLoading();
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
        {!params.data.is_published ? (
          <MenuItem onClick={publishBlog}>Publish</MenuItem>
        ) : (
          <MenuItem onClick={unPublishBlog}>Unpublish</MenuItem>
        )}
        {/* <MenuItem onClick={toggleUpdateModal}>Update Group</MenuItem>
        <MenuItem onClick={toggleSendMessage}>Send Message</MenuItem> */}
      </Menu>
      <EditGroupModal
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

export default connect(mapStateToProps)(BlogActions);
