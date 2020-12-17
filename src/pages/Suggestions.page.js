import React, { useEffect, useReducer } from "react";
import AdminLayout from "../layouts/Admin.layout";
import { Button, makeStyles, MenuItem, Paper, Select } from "@material-ui/core";
import clsx from "clsx";
import { format } from "date-fns";
import Api from "../utils/api";
import DataTable from "../components/DataTable";
import ViewSuggestion from "../components/ViewSuggestion";
import { connect } from "react-redux";
// import states from "../utils/constants/states.json";
// import getLga from "../helpers/getLga";

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
    justifyContent: "space-between"
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

function SuggestionsPage({ token }) {
  const classes = useStyles();
  const [isLoading, setLoading] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [selectedItems, setSelectedItems] = React.useState([]);

  const [inputValues, setInputValues] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      status: "none",
      state: "none",
      lga: "none"
    }
  );

  const columns = [
    {
      field: "user",
      headerName: "Sender Name",
      width: 150,
      valueFormatter: ({ value }) => {
        return value && value.name;
      }
    },
    {
      field: "email",
      headerName: "Sender Email",
      width: 150,
      valueFormatter: ({ data }) => {
        return data.user && data.user.email;
      }
    },
    {
      field: "phone",
      headerName: "Sender Phone",
      width: 150,
      valueFormatter: ({ data }) => {
        return data.user && data.user.phone_number;
      }
    },
    {
      field: "created_at",
      headerName: "Date Received",
      headerClassName: "ageCell",
      width: 150,
      cellClassName: "ageCell",
      valueFormatter: ({ value }) => {
        return format(new Date(value), "MM/dd/yyyy");
      }
    },
    {
      field: "read",
      headerName: "Status",
      width: 150,
      valueFormatter: ({ value }) => {
        return value === 0 ? "Unread" : "Read";
      }
    },
    {
      field: "message",
      headerName: "Message",
      width: 100,
      renderCell: ({ value, data }) => (
        <ViewSuggestion message={value} data={data} reloadData={loadData} />
      )
    }
  ];

  const loadData = async (params) => {
    const query = params && params.length > 0 ? `?${params.join("&")}` : "";
    console.log(query);
    setLoading(true);
    await Api(token)
      .getSuggestions(query)
      .then((res) => {
        console.log(res.data.data);
        setData(res.data.data);
      })
      .catch((err) => console.log(err));
    setLoading(false);
  };

  const handleSearch = () => {
    const queryArray = [];
    inputValues.status !== "none" &&
      queryArray.push(`status=${inputValues.status}`);
    // inputValues.state !== "none" &&
    //   queryArray.push(`state=${inputValues.state}`);
    // inputValues.lga !== "none" && queryArray.push(`lga=${inputValues.lga}`);
    return loadData(queryArray);
  };

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setInputValues({ [name]: value });
    if (name === "state") {
      setInputValues({ lga: "none" });
    }
  };

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <AdminLayout route="Suggestions">
      <Paper className={classes.tableContainer}>
        <div className={classes.inputContainer}>
          <div className={classes.inputContent1}>
            <Select
              variant="outlined"
              value={inputValues.status}
              name="status"
              onChange={handleChange}
              className={clsx(classes.input, classes.stateInput)}
            >
              <MenuItem value="none">Status</MenuItem>
              <MenuItem value={"0"}>Unread</MenuItem>
              <MenuItem value={"1"}>Read</MenuItem>
            </Select>
            {/* <Select
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
            </Select> */}
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
        </div>
        <div style={{ display: "flex", height: "100%" }}>
          <div style={{ flexGrow: 1 }}>
            <DataTable
              loading={isLoading}
              onSelectionChange={(items) => setSelectedItems(items.rows)}
              selecteditems={selectedItems}
              rightitems={[<Button>Delete</Button>]}
              icons={{ columnResize: () => null }}
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

export default connect(mapStateToProps)(SuggestionsPage);
