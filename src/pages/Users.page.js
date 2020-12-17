import React, { useEffect, useReducer, useState } from "react";
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
import Api from "../utils/api";
import DataTable from "../components/DataTable";
import UserActions from "../components/UserActions";
import states from "../utils/constants/states.json";
import getLga from "../helpers/getLga";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  tableContainer: {
    padding: theme.spacing(3),
    height: window.innerHeight - 180,
    display: "flex",
    flexDirection: "column"
    // justifyContent: "space-between"
  },
  inputContainer: {
    margin: theme.spacing(3, 0),
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    [theme.breakpoints.down("md")]: {
      overflowX: "hidden"
    }
  },
  input: { height: 42 },
  searchInput: {
    width: 200,
    marginRight: theme.spacing(2)
  },
  stateInput: {
    width: 99,
    marginRight: theme.spacing(2)
  },
  lgaInput: {
    width: 162,
    marginRight: theme.spacing(2)
  },
  inputContent1: {
    display: "flex"
  }
}));

function UsersPage({ token }) {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [selectedItems, setSelectedItems] = React.useState([]);
  const [isloading, setIsLoading] = useState(false);

  const columns = [
    {
      field: "name",
      headerName: "Full Name",
      width: 150
    },
    {
      field: "gender",
      headerName: "Gender",
      width: 100
    },
    {
      field: "email",
      headerName: "Email Address",
      width: 120
    },
    {
      field: "phone_number",
      headerName: "Phone Number",
      width: 150
    },
    {
      field: "state",
      headerName: "State",
      headerClassName: "ageCell",
      width: 120,
      cellClassName: "ageCell",
      valueFormatter: ({ value }) => {
        return value && value.name;
      }
    },
    {
      field: "lga",
      headerName: "Local Govt. Area",
      width: 130,
      valueFormatter: ({ value }) => {
        return value && value.name;
      }
    },
    {
      field: "",
      headerName: "Status",
      width: 100,
      valueFormatter: ({ data }) => {
        return data.status ? "Active" : "Inactive";
      }
    },
    {
      field: "status",
      headerName: "Actions",
      width: 100,
      renderCell: (params) => (
        <UserActions
          params={params}
          reloadData={loadData}
          triggerLoading={triggerLoading}
        />
      )
    }
  ];

  const [inputValues, setInputValues] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      email: "",
      state: "none",
      lga: "none",
      gender: "none",
      status: "none"
    }
  );

  const triggerLoading = () => {
    setIsLoading(!isloading);
  };

  const loadData = async (params) => {
    const query = params && params.length > 0 ? `?${params.join("&")}` : "";
    setIsLoading(true);
    await Api(token)
      .getUsers(query)
      .then((res) => {
        // console.log(res.data);
        setData(res.data.data);
      })
      .catch((err) => console.log(err));
    setIsLoading(false);
  };

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setInputValues({ [name]: value });
    if (name === "state") {
      setInputValues({ lga: "none" });
    }
  };

  const handleSearch = () => {
    const queryArray = [];
    inputValues.email.length > 0 &&
      queryArray.push(`email=${inputValues.email}`);
    inputValues.state !== "none" &&
      queryArray.push(`state=${inputValues.state}`);
    inputValues.lga !== "none" && queryArray.push(`lga=${inputValues.lga}`);
    inputValues.gender !== "none" &&
      queryArray.push(`gender=${inputValues.gender}`);
    inputValues.status !== "none" &&
      queryArray.push(`status=${inputValues.status}`);
    return loadData(queryArray);
  };

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AdminLayout route="Users">
      <Paper className={classes.tableContainer}>
        <div className={classes.inputContainer}>
          <div className={classes.inputContent1}>
            <OutlinedInput
              placeholder="Search users email"
              name="email"
              value={inputValues.email}
              onChange={handleChange}
              className={clsx(classes.input, classes.searchInput)}
              startAdornment={<Search style={{ color: "#c4c4c4" }} />}
            />
            <Select
              variant="outlined"
              value={inputValues.gender}
              name="gender"
              onChange={handleChange}
              className={clsx(classes.input, classes.lgaInput)}
            >
              <MenuItem value="none">Gender</MenuItem>
              <MenuItem value={"male"}>Male</MenuItem>
              <MenuItem value={"female"}>Female</MenuItem>
            </Select>
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

            <Select
              labelId="demo-mutiple-name-label"
              variant="outlined"
              name="status"
              onChange={handleChange}
              value={inputValues.status}
              className={clsx(classes.input, classes.lgaInput)}
            >
              <MenuItem value="none">Status</MenuItem>
              <MenuItem value={"1"}>Active</MenuItem>
              <MenuItem value={"0"}>Inactive</MenuItem>
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
          {/* <Button
            variant="outlined"
            style={{ width: 135, textTransform: "none" }}
            color="primary"
            className={classes.input}
            onClick={handleCreateModal}
          >
            Create Group
          </Button> */}
        </div>
        <div style={{ display: "flex", height: "100%" }}>
          <div style={{ flexGrow: 1 }}>
            <DataTable
              loading={isloading}
              onSelectionChange={(items) => setSelectedItems(items.rows)}
              selecteditems={selectedItems}
              rightitems={[<Button>Delete</Button>]}
              rows={data}
              columns={columns}
              pageSize={7}
              checkboxSelection={false}
            />
          </div>
        </div>
      </Paper>
    </AdminLayout>
  );
}

const mapStateToProps = (state) => ({
  token: state.currentUser.token
});

export default connect(mapStateToProps)(UsersPage);
