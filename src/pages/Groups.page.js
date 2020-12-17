import React, { useEffect, useReducer } from "react";
import AdminLayout from "../layouts/Admin.layout";
import {
  Button,
  makeStyles,
  MenuItem,
  OutlinedInput,
  Paper,
  Select
} from "@material-ui/core";
import { Search } from "@material-ui/icons";
import clsx from "clsx";
import CreateGroupModal from "../components/CreateGroupModal";
import states from "../utils/constants/states.json";
import getLga from "../helpers/getLga";
import Api from "../utils/api";
import DataTable from "../components/DataTable";
import GroupActions from "../components/GroupActions";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  tableContainer: {
    padding: theme.spacing(3),
    height: window.innerHeight - 160,
    display: "flex",
    flexDirection: "column"
    // justifyContent: "space-between"
  },
  inputContainer: {
    margin: theme.spacing(3, 0),
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between"
  },
  input: { height: 42 },
  searchInput: {
    width: 200,
    marginRight: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      width: "40vw"
    }
  },
  stateInput: {
    width: 99,
    marginRight: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      width: "40vw"
    }
  },
  lgaInput: {
    width: 162,
    marginRight: theme.spacing(2)
  },
  inputContent1: {
    display: "flex"
    // [theme.breakpoints.down("sm")]: {
    //   flexWrap: "wrap"
    // }
  }
}));

function GroupsPage({ token }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [isLoading, setLoading] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [selectedItems, setSelectedItems] = React.useState([]);
  const [inputValues, setInputValues] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      name: "",
      state: "none",
      lga: "none"
    }
  );

  const columns = [
    {
      field: "name",
      headerName: "Group Name",
      width: 180
    },
    {
      field: "state",
      headerName: "State",
      width: 100,
      valueFormatter: ({ value }) => {
        return value && value.name;
      }
    },
    {
      field: "lga",
      headerName: "Local Govt. Area",
      width: 250,
      valueFormatter: ({ value }) => {
        return value && value.name;
      }
    },
    {
      field: "total_members",
      headerName: "Member Count",
      headerClassName: "ageCell",
      width: 150,
      cellClassName: "ageCell"
    },
    {
      field: "status",
      headerName: "Status",
      headerClassName: "ageCell",
      width: 120,
      cellClassName: "ageCell",
      renderCell: ({ data }) => (data.suspended ? "Suspended" : "Activated")
    },
    {
      field: "suspended",
      headerName: "Actions",
      width: 100,
      renderCell: (params) => (
        <GroupActions
          params={params}
          reloadData={loadData}
          triggerLoading={triggerLoading}
        />
      )
    }
  ];

  const triggerLoading = () => {
    setLoading(!isLoading);
  };

  const loadData = async (params) => {
    const query = params && params.length > 0 ? `?${params.join("&")}` : "";
    setLoading(true);
    await Api(token)
      .getGroups(query)
      .then((res) => {
        setData(res.data.data);
      })
      .catch((err) => console.log(err));
    setLoading(false);
  };

  const handleSearch = () => {
    const queryArray = [];
    inputValues.name.length > 0 && queryArray.push(`name=${inputValues.name}`);
    inputValues.state !== "none" &&
      queryArray.push(`state=${inputValues.state}`);
    inputValues.lga !== "none" && queryArray.push(`lga=${inputValues.lga}`);
    return loadData(queryArray);
  };

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setInputValues({ [name]: value });
    if (name === "state") {
      setInputValues({ lga: "none" });
    }
  };

  const handleCreateModal = () => {
    setOpen(!open);
  };
  return (
    <AdminLayout route="Groups">
      <CreateGroupModal
        open={open}
        handleClose={handleCreateModal}
        reloadData={loadData}
      />
      <Paper className={classes.tableContainer}>
        <div className={classes.inputContainer}>
          <div className={classes.inputContent1}>
            <OutlinedInput
              placeholder="Search group name"
              name="name"
              value={inputValues.name}
              onChange={handleChange}
              className={clsx(classes.input, classes.searchInput)}
              startAdornment={<Search style={{ color: "#c4c4c4" }} />}
            />
            <Select
              variant="outlined"
              name="state"
              onChange={handleChange}
              value={inputValues.state}
              className={clsx(classes.input, classes.stateInput)}
            >
              <MenuItem value="none">State</MenuItem>
              {states.map((el) => (
                <MenuItem value={el.id} key={el.id}>
                  {el.name}
                </MenuItem>
              ))}
            </Select>

            <Select
              labelId="demo-mutiple-name-label"
              variant="outlined"
              name="lga"
              onChange={handleChange}
              value={inputValues.lga}
              className={clsx(classes.input, classes.lgaInput)}
            >
              <MenuItem value="none" disabled>
                Local Govt. Area
              </MenuItem>
              {inputValues.state !== "none" &&
                getLga(Number(inputValues.state)).map((el) => (
                  <MenuItem value={el.id} key={el.id}>
                    {el.name}
                  </MenuItem>
                ))}
            </Select>
            <Button
              variant="contained"
              style={{ width: 98, textTransform: "none" }}
              color="primary"
              className={classes.input}
              onClick={handleSearch}
            >
              Search
            </Button>
          </div>
          <Button
            variant="outlined"
            style={{ width: 135, textTransform: "none" }}
            color="primary"
            className={classes.input}
            onClick={handleCreateModal}
          >
            Create Group
          </Button>
        </div>
        <div
          style={{ display: "flex", flexDirection: "column", height: "100%" }}
        >
          {/* <div style={{ flexGrow: 1 }}> */}
          <DataTable
            loading={isLoading}
            rows={data}
            onSelectionChange={(items) => setSelectedItems(items.rows)}
            selecteditems={selectedItems}
            rightitems={[<Button>Delete</Button>]}
            columns={columns}
            id="id"
            pageSize={7}
            checkboxSelection={false}
          />
          {/* </div> */}
        </div>
      </Paper>
    </AdminLayout>
  );
}

const mapStateToProps = (state) => ({
  token: state.currentUser.token
});

export default connect(mapStateToProps)(GroupsPage);
